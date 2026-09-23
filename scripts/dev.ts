/// <reference path="./types/war3tstlhelper.d.ts" />
import { logger, ProjectConfigurationLoader } from "./utils";
import War3TSTLHelper = require("war3tstlhelper");
import * as fs from "fs-extra";

function main(): void {
  const config = ProjectConfigurationLoader.load();
  if (!config.mapPath) {
    throw new Error(
      "Unable to create definitions file without the 'mapPath' configured",
    );
  }

  // Create definitions file for generated globals
  const luaFile = `${config.mapPath}/war3map.lua`;
  const contents = fs.readFileSync(luaFile, "utf8");
  const parser = new War3TSTLHelper(contents);
  const result = parser.genTSDefinitions();
  fs.writeFileSync("src/war3map.d.ts", result);
}

try {
  main();
  logger.info("Definitions successfully created!");
} catch (err: any) {
  logger.error(err.toString());
  process.exit(1);
}
