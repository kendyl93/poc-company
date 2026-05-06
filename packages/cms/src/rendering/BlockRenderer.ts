import type { CmsLayoutBlock } from "../blocks/index.js";
import { blockMap } from "./blockMap.js";

type UnknownBlock = {
  blockType: string;
  [key: string]: unknown;
};

type BlockInput = CmsLayoutBlock | UnknownBlock;

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

function isKnownBlock(block: BlockInput): block is CmsLayoutBlock {
  return block.blockType in blockMap;
}

function renderKnownBlock(block: CmsLayoutBlock): string {
  switch (block.blockType) {
    case "hero":
      return blockMap.hero(block);
    case "feature-grid":
      return blockMap["feature-grid"](block);
    case "cta":
      return blockMap.cta(block);
    case "testimonials":
      return blockMap.testimonials(block);
  }
}

export function BlockRenderer(
  blocks: readonly BlockInput[],
): string {
  return blocks
    .map((block) =>
      isKnownBlock(block) ? renderKnownBlock(block) : renderUnknownBlock(block),
    )
    .join("");
}
