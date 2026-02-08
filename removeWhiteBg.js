#!/usr/bin/env node

/**
 * SVG White Background Remover
 *
 * Removes ONLY:
 *   - <rect> elements that are white backgrounds
 *   - <path> elements that are white backgrounds
 *
 * Safety:
 *   - Does NOT touch paths with strokes or fills that are not pure white
 *   - Preserves all other SVG content
 *   - Works with inline style="fill:#ffffff;stroke:none" or fill/stroke attributes
 */

const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, 'assets/decks/default/face');

// Check directory exists
if (!fs.existsSync(SVG_DIR)) {
  console.error('Error: Directory not found:', SVG_DIR);
  process.exit(1);
}

// Utility to check if a rect tag is white background
function isWhiteRect(tag) {
  // Direct attributes
  const fillAttr = tag.match(/fill\s*=\s*["']([^"']+)["']/i);
  const strokeAttr = tag.match(/stroke\s*=\s*["']([^"']+)["']/i);

  // Inline style
  const styleMatch = tag.match(/style\s*=\s*["']([^"']+)["']/i);
  let fillStyle, strokeStyle;
  if (styleMatch) {
    const style = styleMatch[1].toLowerCase();
    fillStyle = style.match(/fill\s*:\s*(#[0-9a-f]{3,6})/i);
    strokeStyle = style.match(/stroke\s*:\s*([^;]+)/i);
  }

  const fill = (fillAttr ? fillAttr[1] : fillStyle ? fillStyle[1] : '').toLowerCase();
  const stroke = (strokeAttr ? strokeAttr[1] : strokeStyle ? strokeStyle[1] : '').toLowerCase();

  // Must be white fill
  if (fill !== '#fff' && fill !== '#ffffff') return false;

  // Stroke must be none or empty
  if (stroke && stroke !== 'none') return false;

  // Safety: ignore opacity, masks, gradients
  if (/opacity\s*=|fill-opacity|stroke-opacity|mask=|clip-path=|url\(/i.test(tag)) return false;

  return true;
}

// Utility to check if a path tag is white background
function isWhitePath(tag) {
  // Direct attributes
  const fillAttr = tag.match(/fill\s*=\s*["']([^"']+)["']/i);
  const strokeAttr = tag.match(/stroke\s*=\s*["']([^"']+)["']/i);

  // Inline style
  const styleMatch = tag.match(/style\s*=\s*["']([^"']+)["']/i);
  let fillStyle, strokeStyle;
  if (styleMatch) {
    const style = styleMatch[1].toLowerCase();
    fillStyle = style.match(/fill\s*:\s*(#[0-9a-f]{3,6})/i);
    strokeStyle = style.match(/stroke\s*:\s*([^;]+)/i);
  }

  const fill = (fillAttr ? fillAttr[1] : fillStyle ? fillStyle[1] : '').toLowerCase();
  const stroke = (strokeAttr ? strokeAttr[1] : strokeStyle ? strokeStyle[1] : '').toLowerCase();

  // Must be white fill
  if (fill !== '#fff' && fill !== '#ffffff') return false;

  // Stroke must be none or empty
  if (stroke && stroke !== 'none') return false;

  // Safety: ignore opacity, masks, gradients
  if (/opacity\s*=|fill-opacity|stroke-opacity|mask=|clip-path=|url\(/i.test(tag)) return false;

  return true;
}

// Remove white backgrounds from SVG content
function removeWhiteBackgrounds(content, filename) {
  let modified = content;

  // Remove rects
  const rectRegex = /<rect\b[^>]*\/?>/gi;
  modified = modified.replace(rectRegex, match => (isWhiteRect(match) ? '' : match));

  // Remove paths
  const pathRegex = /<path\b[^>]*\/?>/gi;
  modified = modified.replace(pathRegex, match => (isWhitePath(match) ? '' : match));

  return modified;
}

// Process all SVG files
function processSVGFiles() {
  const files = fs.readdirSync(SVG_DIR).filter(f => f.toLowerCase().endsWith('.svg'));
  if (files.length === 0) {
    console.log('No SVG files found.');
    return;
  }

  console.log(`Processing ${files.length} SVG files in ${SVG_DIR}...\n`);

  let modifiedCount = 0;

  for (const filename of files) {
    const filepath = path.join(SVG_DIR, filename);
    const original = fs.readFileSync(filepath, 'utf8');
    const updated = removeWhiteBackgrounds(original, filename);

    if (updated !== original) {
      fs.writeFileSync(filepath, updated, 'utf8');
      console.log(`✓ Removed white background from ${filename}`);
      modifiedCount++;
    } else {
      console.log(`– No white background found in ${filename}`);
    }
  }

  console.log(`\nDone! Modified ${modifiedCount} of ${files.length} files.`);
}

// Run
processSVGFiles();