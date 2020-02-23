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

        console.log('Creating directories...');
        fs.mkdirSync('target');
        fs.mkdirSync('target/map.dir');

        console.log('Extracting war3map.lua...');
        new Runner('"tools/mpqtool.exe"', ['extract', '--output', 'target/map.dir2', `${settings.map.dir}/${settings.map.filename}`]).run();

        fs.copySync(`target/map.dir2`, `target/map.dir`);
        fs.copySync(`target/map.dir/war3map.lua`, `${settings.map.dir}/map/war3map.lua`);

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

        console.log('Copying war3map files...');
        const regex = new RegExp(`.+war3map\.w3.`);
        fs.copySync(`target/map.dir2`, `target/map.dir`, {
            filter: (src, dest) => {
                if (src === 'target\\map.dir2' || src === 'target/map.dir2') {
                    return true;
                }

                return src.match(regex);
            },
        });

        console.log('Adding compiled files...');
        new Runner('"tools/mpqtool.exe"', ['new', 'target/map.dir', 'target/map.w3x']).run();
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
