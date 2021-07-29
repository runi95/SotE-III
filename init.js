const fs = require("fs-extra");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filename = "settings.json";

async function run() {
    let wc3Path = undefined;
    while (wc3Path === undefined) {
        await new Promise((resolve, reject) => {
            rl.question("Path to Warcraft III executable: ", (path) => {
                if (!fs.existsSync(path)) {
                    console.log("ERROR: the path", path, "does not exist!");
                    return resolve();
                }

                if (fs.lstatSync(path).isDirectory()) {
                    console.log("ERROR:", path, "is a directory!");
                    return resolve();
                }

                try {
                    fs.accessSync(path, fs.constants.X_OK);
                } catch (err) {
                    console.log("ERROR:", path, "is not an executable!");
                    return resolve();
                }

                wc3Path = path;

                resolve();
            });
        });
    }

    rl.close();

    const data = {
        map: {
            dir: "maps",
            filename: "map.w3x",
        },
        build: {
            preCleanup: true,
        },
        game: {
            path: wc3Path,
            arguments: [
                "-launch",
                "-windowmode",
                "windowed",
                "-nowfpause",
            ],
        },

    };

    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

run();