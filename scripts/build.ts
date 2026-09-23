import { compileMap, logger, ProjectConfigurationLoader } from "./utils";

function main(): void {
  const config = ProjectConfigurationLoader.load();
  if (!config.mapPath) {
    throw new Error("Unable to build map without the 'mapPath' configured");
  }

  compileMap(config.mapPath, config.outDir, config.minifyScript, false);
}

try {
  main();
  logger.info("Build completed successfully!");
} catch (err: any) {
  logger.error(err.toString());
  process.exit(1);
}
