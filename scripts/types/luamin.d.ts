declare module "luamin" {
  /**
   * Minifies a Lua source string, or a luaparse AST produced with
   * `{ scope: true }`.
   */
  export function minify(argument: string | object): string;

  export const version: string;
}
