import { createSharedPackageMetadata } from "@poc-company/lib";

export {
  Button,
  Container,
  Heading,
  Section,
  type ButtonProps,
  type ButtonSize,
  type ContainerProps,
  type ContainerWidth,
  type HeadingLevel,
  type HeadingProps,
  type SectionProps,
  type SectionTone,
  type TextTone,
} from "./primitives.js";

export const uiPackage = createSharedPackageMetadata("ui");
