const settings = require('./settings.json');
const fs = require('fs-extra');
const typescriptToLua = require('typescript-to-lua');
const ts = require('typescript');
const { execSync } = require('child_process');

class Builder {
    constructor(buildSettings) {
        this._buildSettings = { preCleanup: true, ...buildSettings };
    }

    build() {
        if (this.buildSettings.preCleanup) {
            console.log('Running pre-cleanup...');
            this.cleanup();
        }

        console.log('Copying map...');
        fs.mkdirSync('target');
        fs.copySync(`${settings.map.dir}/${settings.map.filename}`, `target/${settings.map.filename}`);

        console.log('Extracting war3map.lua...');
        new Runner('"tools/MPQEditor/x64/MPQEditor.exe"', [
            'extract',
            `"target/${settings.map.filename}"`,
            '"war3map.lua"',
            `"${settings.map.dir}/map"`,
        ]).run();

        console.log('Transpiling project...');
        const { emitResult, diagnostics } = typescriptToLua.transpileProject('tsconfig.json');
        diagnostics.forEach((diagnostic) => {
            console.log(diagnostic.messageText);
            if (diagnostic.code !== 2306) {
                console.error('FATAL: Error in typescript');
                throw diagnostic;
            }
        });

        emitResult.forEach(({ name, text }) => ts.sys.writeFile(name, text));

        console.log('Building lua map...');
        new Runner('"tools/ceres/ceres.exe"', ['build', '--', '--map', 'map', '--output', 'dir']).run();

        console.log('Replacing local functions...');
        fs.removeSync('./target/map.dir/war3map.w3a');
        fs.removeSync('./target/map.dir/war3map.w3b');
        fs.removeSync('./target/map.dir/war3map.w3d');
        fs.removeSync('./target/map.dir/war3map.w3h');
        fs.removeSync('./target/map.dir/war3map.w3q');
        fs.removeSync('./target/map.dir/war3map.w3t');
        fs.removeSync('./target/map.dir/war3map.w3u');
        // new Runner('"tools/sed.exe"', ['-i', '"s/local function __module_/function __module_/g"', '"target/map.dir/war3map.lua"']).run();

        console.log('Adding compiled lua files...');
        new Runner('"tools/MPQEditor/x64/MPQEditor.exe"', [
            'add',
            '"target/map.w3x"',
            '"target/map.dir/*"',
            '"/c"',
            '"/auto"',
            '"/r"',
        ]).run();
    }

    cleanup() {
        if (fs.existsSync(`./lua`)) {
            fs.removeSync('./lua');
        }
        if (fs.existsSync(`./target`)) {
            fs.removeSync('./target');
        }
    }

    get buildSettings() {
        return this._buildSettings;
    }

    set buildSettings(buildSettings) {
        this._buildSettings = buildSettings;
    }
}

class Runner {
    constructor(file, args) {
        this._file = file;
        this._arguments = args;
    }

    run() {
        const stdout = execSync(`${this.file} ${this.arguments.join(' ')}`).toString('utf8');
        if (stdout) {
            console.log(stdout);
        }
    }

    get file() {
        return this._file;
    }

    get arguments() {
        return this._arguments;
    }
}

class CommandHandler {
    static get helpText() {
        return `
        Usage: build.js [options]
            options:
                -b, --build             Build the project
                -r, --run               Run the map in Warcraft 3
                -t, --test              Run the tests in busted (currently not implemented)
                --buildnumber <number>  Set the ingame buildnumber for the map
                --release <num.num.num> Set The full release version
                -h, --help              Shows this help menu
        `;
    }

    constructor(args) {
        if (args.length === 1 && args[0] === '--help') {
            console.log(this.helpText);
            return process.exit(0);
        }

        args.forEach((argument) => {
            if (argument === 'build') {
                console.log('Building...');
                try {
                    new Builder().build();
                } catch (err) {
                    if (err.stdout && err.stdout.toString) {
                        console.log(err.stdout.toString());
                    }

                    if (err.stderr && err.stderr.toString) {
                        console.error(err.stderr.toString());
                    }

                    console.error(err);
                    process.exit(1);
                }
            }

            if (argument === 'run') {
                console.log('Starting Warcraft III...');
                try {
                    new Runner(`"${settings.game.path}"`, [
                        ...settings.game.arguments,
                        '-loadfile',
                        `"${process.cwd()}/target/map.w3x"`,
                    ]).run();
                } catch (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        });
    }

    get helpText() {
        return this._helpText;
    }
}

new CommandHandler(process.argv.slice(2));
