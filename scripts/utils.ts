/// <reference path="./types/luamin.d.ts" />
import War3Map from "mdx-m3-viewer/dist/cjs/parsers/w3x/map";
import { createLogger, format, transports } from "winston";
import { createDiagnosticReporter, transpileProject } from "typescript-to-lua";
import { DiagnosticCategory, ExitStatus } from "typescript";
import { TextEncoder } from "util";
import type { SourceFile } from "typescript";
import type { Format } from "logform";
import * as luamin from "luamin";
import * as fs from "fs-extra";
import * as path from "path";

interface IConfigFile {
  mapPath?: string;
  outDir?: string;
  saveAsFolder?: boolean;
  minifyScript?: boolean;

  gameExecutable?: string;
  launchArgs?: string[];
  winePath?: string;
  winePrefix?: string;
  launchEnv?: Record<string, string>;
}

export class ProjectConfigurationLoader {
  private static PROJECT_CONFIG_FILE_NAME =
    process.env.PROJECT_CONFIG_FILE_PATH || "project-config.json";
  private static USER_CONFIG_FILE_NAME = "config.json";

  // Build configuration
  private _mapPath?: string;
  private _outDir: string = "./dist";
  private _saveAsFolder: boolean = false;
  private _minifyScript: boolean = false;

  // Run configuration
  private _gameExecutable?: string;
  private _winePath?: string;
  private _winePrefix?: string;
  private _launchEnv: Record<string, string> = {};
  private _launchArgs: string[] = [];

  private constructor() {}

  public static load(): ProjectConfigurationLoader {
    const configurationLoader = new ProjectConfigurationLoader();

    try {
      const projectConfigFile = fs.readFileSync(
        ProjectConfigurationLoader.PROJECT_CONFIG_FILE_NAME,
      );
      const projectConfig = JSON.parse(projectConfigFile.toString());
      configurationLoader.setConfigFromJSON(projectConfig);
      logger.debug(
        `${ProjectConfigurationLoader.PROJECT_CONFIG_FILE_NAME} loaded`,
      );
    } catch (err: any) {
      if (err?.code === "ENOENT") {
        logger.warn(
          `Missing project configuration file: ${ProjectConfigurationLoader.PROJECT_CONFIG_FILE_NAME}`,
        );
      } else {
        throw err;
      }
    }

    try {
      const configOverrideFile = fs.readFileSync(
        ProjectConfigurationLoader.USER_CONFIG_FILE_NAME,
      );
      const configOverrides = JSON.parse(configOverrideFile.toString());
      configurationLoader.setConfigFromJSON(configOverrides);
      logger.debug(
        `${ProjectConfigurationLoader.USER_CONFIG_FILE_NAME} loaded`,
      );
    } catch (err: any) {
      if (err?.code === "ENOENT") {
        logger.debug(
          `User configuration file ${ProjectConfigurationLoader.USER_CONFIG_FILE_NAME} does not exist`,
        );
      } else {
        throw err;
      }
    }

    return configurationLoader;
  }

  private setConfigFromJSON(json: IConfigFile) {
    if (json.mapPath) this._mapPath = json.mapPath;
    if (json.outDir) this._outDir = json.outDir;
    if (json.saveAsFolder) this._saveAsFolder = json.saveAsFolder;
    if (json.minifyScript) this._minifyScript = json.minifyScript;
    if (json.gameExecutable) this._gameExecutable = json.gameExecutable;
    if (json.launchArgs) this._launchArgs = json.launchArgs;
    if (json.winePath) this._winePath = json.winePath;
    if (json.winePrefix) this._winePrefix = json.winePrefix;
    if (json.launchEnv) this._launchEnv = json.launchEnv;
  }

  public get mapPath(): string | undefined {
    return process.env.PROJECT_MAP_NAME ?? this._mapPath;
  }

  public get outDir(): string {
    return process.env.PROJECT_OUT_DIR ?? this._outDir;
  }

  public get saveAsFolder(): boolean {
    return process.env.PROJECT_SAVE_AS_FOLDER
      ? process.env.PROJECT_SAVE_AS_FOLDER.toLowerCase() === "true" ||
          process.env.PROJECT_SAVE_AS_FOLDER === "1"
      : this._saveAsFolder;
  }

  public get minifyScript(): boolean {
    return process.env.PROJECT_MINIFY_SCRIPT
      ? process.env.PROJECT_MINIFY_SCRIPT.toLowerCase() === "true" ||
          process.env.PROJECT_MINIFY_SCRIPT === "1"
      : this._minifyScript;
  }

  public get gameExecutable(): string | undefined {
    return process.env.PROJECT_GAME_EXECUTABLE ?? this._gameExecutable;
  }

  public get launchArgs(): string[] {
    return process.env.PROJECT_LAUNCH_ARGS_CSV
      ? process.env.PROJECT_LAUNCH_ARGS_CSV.split(",")
      : this._launchArgs;
  }

  public get winePath(): string | undefined {
    return process.env.PROJECT_WINE_PATH ?? this._winePath;
  }

  public get winePrefix(): string | undefined {
    return process.env.PROJECT_WINE_PREFIX ?? this._winePrefix;
  }

  /**
   * Extra environment variables for the game process (e.g. GAMEID/PROTONPATH for umu-run).
   */
  public get launchEnv(): Record<string, string> {
    return this._launchEnv;
  }
}

function getFilesInDirectory(dir: string): string[] {
  const filePaths: string[] = [];
  const walk = (dirPath: string) => {
    const dirFiles = fs.readdirSync(dirPath);
    for (const file of dirFiles) {
      const filePath = path.join(dirPath, file);
      const fileStat = fs.lstatSync(filePath);
      if (fileStat.isDirectory()) {
        walk(filePath);
        continue;
      }

      filePaths.push(filePath);
    }
  };
  walk(dir);

  return filePaths;
}

interface IMapFile {
  filePath: string;
  content: Uint8Array;
}
export function compileMap(
  mapPath: string,
  outDir: string,
  minifyScript: boolean,
  saveAsFolder: boolean,
): void {
  logger.info(`Building "${mapPath}"...`);
  const war3mapLuaPath = `${mapPath}/war3map.lua`;
  if (fs.existsSync(`${mapPath}/war3map.j`))
    throw new Error(
      `Detected an unexpected war3map.j file in map, please check map options and ensure that the "Script Language" is set to "Lua" and NOT "JASS"`,
    );
  if (!fs.existsSync(war3mapLuaPath))
    throw new Error(
      `Unable to find the original lua script file "${war3mapLuaPath}"`,
    );
  const war3mapLua = fs.readFileSync(war3mapLuaPath);

  const files: IMapFile[] = getFilesInDirectory(mapPath).map((filePath) => ({
    filePath: path.relative(mapPath, filePath),
    content: fs.readFileSync(filePath),
  }));

  logger.info("Transpiling TypeScript to Lua...");

  const reportDiagnostic = createDiagnosticReporter(true);
  const textEncoder = new TextEncoder();
  const result = transpileProject(
    "tsconfig.json",
    {
      luaBundle: "war3map.lua",
    },
    (
      fileName: string,
      data: string,
      _writeByteOrderMark: boolean,
      _onError?: unknown,
      _sourceFiles?: readonly SourceFile[],
    ) => {
      let mergedLuaFiles = war3mapLua.toString("utf8") + data;
      if (minifyScript) {
        logger.info(`Minifying lua script...`);
        mergedLuaFiles = luamin.minify(mergedLuaFiles);
      }

      files.push({
        filePath: path.basename(fileName),
        content: textEncoder.encode(mergedLuaFiles),
      });
    },
  );

  result.diagnostics.forEach(reportDiagnostic);
  if (
    result.diagnostics.filter((d) => d.category === DiagnosticCategory.Error)
      .length > 0
  ) {
    process.exit(
      result.emitSkipped
        ? ExitStatus.DiagnosticsPresent_OutputsSkipped
        : ExitStatus.DiagnosticsPresent_OutputsGenerated,
    );
  }

  createMapFromFiles(
    `${outDir}/${path.basename(mapPath)}`,
    files,
    saveAsFolder,
  );
}

/**
 * Creates a w3x archive from a directory
 * @param output The output filename
 * @param dir The directory to create the archive from
 */
export function createMapFromFiles(
  output: string,
  mapFiles: IMapFile[],
  saveAsFolder: boolean,
): void {
  logger.info(`Saving map to "${output}"...`);
  if (saveAsFolder) {
    try {
      const stat = fs.lstatSync(output);
      if (!stat.isDirectory())
        throw new Error(
          `Unable to save map as dir over existing file with same name: "${output}"`,
        );
    } catch (err: any) {
      if (err?.code === "ENOENT") {
        fs.mkdirsSync(output);
      } else {
        throw err;
      }
    }

    for (const mapFile of mapFiles) {
      const buildFilePath = `${output}/${mapFile.filePath}`;
      fs.mkdirsSync(path.dirname(buildFilePath));
      fs.writeFileSync(buildFilePath, Buffer.from(mapFile.content));
    }
  } else {
    try {
      const stat = fs.lstatSync(output);
      if (stat.isDirectory())
        throw new Error(
          `Unable to save map as file over existing dir with same name: "${output}"`,
        );
    } catch (err: any) {
      if (err?.code === "ENOENT") {
        fs.mkdirsSync(path.dirname(output));
      } else {
        throw err;
      }
    }

    const map = new War3Map();
    map.archive.resizeHashtable(mapFiles.length);
    for (const mapFile of mapFiles) {
      const imported = map.import(
        mapFile.filePath,
        mapFile.content as unknown as ArrayBuffer,
      );
      if (!imported) {
        throw new Error(`Failed to import ${mapFile.filePath}`);
      }
    }

    const result = map.save();
    if (!result) {
      throw new Error("Failed to save archive.");
    }

    fs.writeFileSync(output, new Uint8Array(result));
  }
}

/**
 * Formatter for log messages.
 */
const loggerFormatFunc: Format = format.printf(
  ({ level, message, timestamp }) => {
    return `[${
      String(timestamp).replace("T", " ").split(".")[0]
    }] ${level}: ${message}`;
  },
);

/**
 * The logger object.
 */
export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        loggerFormatFunc,
      ),
    }),
    new transports.File({
      filename: "project.log",
      format: format.combine(format.timestamp(), loggerFormatFunc),
    }),
  ],
  level: process.env.LOG_LEVEL || "info",
});
