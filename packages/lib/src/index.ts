export type SharedPackageName = "ui" | "sections" | "theme" | "cms" | "lib";

export type SharedPackageMetadata = {
  readonly name: SharedPackageName;
};

export function createSharedPackageMetadata(name: SharedPackageName): SharedPackageMetadata {
  return { name };
}

export const libPackage: SharedPackageMetadata = createSharedPackageMetadata("lib");
