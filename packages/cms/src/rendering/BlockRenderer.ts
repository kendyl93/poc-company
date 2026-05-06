import type { CmsLayoutBlock } from "../blocks/index.js";
import { blockMap } from "./blockMap.js";

type UnknownBlock = {
  blockType: string;
  [key: string]: unknown;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderUnknownBlock(block: UnknownBlock): string {
  return `<div data-block="cms-unknown" data-block-type="${escapeHtml(
    block.blockType,
  )}">Unsupported block: ${escapeHtml(block.blockType)}</div>`;
}

export function BlockRenderer(
  blocks: readonly (CmsLayoutBlock | UnknownBlock)[],
): string {
  return blocks
    .map((block) => {
      const renderer = blockMap[block.blockType as keyof typeof blockMap] as
        | ((block: CmsLayoutBlock) => string)
        | undefined;

      return renderer
        ? renderer(block as CmsLayoutBlock)
        : renderUnknownBlock(block);
    })
    .join("");
}
