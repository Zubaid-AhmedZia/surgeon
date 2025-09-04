// Minimal shims to satisfy TS when Sanity packages are not installed locally
declare module "sanity" {
  export function defineConfig(config: any): any;
}

declare module "@sanity/structure" {
  export function structureTool(...args: any[]): any;
}

