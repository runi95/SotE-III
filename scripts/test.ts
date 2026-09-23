import { execFile, execSync } from "child_process";
import { logger, compileMap, ProjectConfigurationLoader } from "./utils";
import * as path from "path";

function main(): void {
  const config = ProjectConfigurationLoader.load();
  if (!config.mapPath) {
    throw new Error("Unable to compile map without the 'mapPath' configured");
  }

  compileMap(
    config.mapPath,
    config.outDir,
    config.minifyScript,
    config.saveAsFolder,
  );

  const filename = path.resolve(
    `${config.outDir}/${path.basename(config.mapPath)}`,
  );

  logger.info(`Launching map "${filename.replace(/\\/g, "/")}"...`);

  if (config.gameExecutable === undefined) {
    throw new Error(
      "Unable to start map without any 'gameExecutable' configured",
    );
  }

  if (config.winePath) {
    const wineFilename = `"Z:${filename}"`;
    const prefix = config.winePrefix ? `WINEPREFIX=${config.winePrefix}` : "";
    execSync(
      `${prefix} ${config.winePath} "${config.gameExecutable}" ${["-loadfile", wineFilename, ...config.launchArgs].join(" ")}`,
      { stdio: "ignore" },
    );
  } else {
    execFile(
      config.gameExecutable,
      ["-loadfile", filename, ...config.launchArgs],
      (err: any) => {
        if (err && err.code === "ENOENT") {
          logger.error(
            `No such file or directory "${config.gameExecutable}". Make sure gameExecutable is configured properly in config.json.`,
          );
        }
      },
    );
  }
}

try {
  main();
} catch (err) {
  logger.error(err.toString());
  process.exit(1);
}
