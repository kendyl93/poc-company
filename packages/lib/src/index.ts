export type SharedPackageName = "ui" | "sections" | "theme" | "cms" | "lib";

export type SharedPackageMetadata = {
  name: SharedPackageName;
};

export function createSharedPackageMetadata(
  name: SharedPackageName,
): SharedPackageMetadata {
  return { name };
}

export const libPackage = createSharedPackageMetadata("lib");
