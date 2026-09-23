declare module "war3tstlhelper" {
  /**
   * Generates TypeScript declarations for the `gg_*` globals that the world
   * editor writes into `war3map.lua`.
   */
  class War3TSTLHelper {
    constructor(luaCode: string);

    contents: string;

    genTSDefinitions(): string;
  }

  export = War3TSTLHelper;
}
