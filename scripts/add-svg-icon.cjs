#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── Output directory ────────────────────────────────────────────────────────
const iconsDir = path.resolve(__dirname, '..', 'src', 'components', 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

// ─── Colors ──────────────────────────────────────────────────────────────────
const color = (t, c) => `\u001b[${c}m${t}\u001b[0m`;
const green = (t) => color(t, 32);
const cyan = (t) => color(t, 36);
const yellow = (t) => color(t, 33);
const red = (t) => color(t, 31);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toPascalCase(name) {
  return name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (m) => m.toUpperCase());
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (ans) => { rl.close(); resolve(ans); });
  });
}

function collectPaste() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const lines = [];
    rl.on('line', (line) => {
      if (line.trim() === 'END') { rl.close(); resolve(lines.join('\n')); }
      else lines.push(line);
    });
    rl.on('close', () => resolve(lines.join('\n')));
  });
}

// ─── SVG file chooser ────────────────────────────────────────────────────────
async function chooseFile(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.svg'));
  if (files.length === 0) { console.log(yellow('No .svg files found.')); return null; }
  console.log(cyan('\nFound SVG files:'));
  files.forEach((f, i) => console.log(yellow(`  [${i + 1}] `) + f));
  const choice = await prompt(cyan('\nEnter number to select file, or 0 to cancel: '));
  const idx = parseInt(choice, 10);
  if (!idx || idx < 1 || idx > files.length) return null;
  return path.join(dir, files[idx - 1]);
}

// ─── SVG normalisation ───────────────────────────────────────────────────────
const VOID_ELEMENTS = [
  'path','circle','rect','line','polyline','polygon',
  'ellipse','use','image','stop','feBlend','feColorMatrix',
  'feComposite','feFlood','feGaussianBlur','feMergeNode',
  'feOffset','feTile','feTurbulence',
];

function normalizeSvg(raw) {
  let svg = raw.replace(/<\?xml[\s\S]*?\?>/i, '').trim();

  if (!/<svg[\s\S]*?>/i.test(svg)) {
    throw new Error('Input does not appear to contain a valid <svg> element.');
  }

  const voidRe = new RegExp(
    `<(${VOID_ELEMENTS.join('|')})(\\s[^>]*)?>(?:<\\/(?:${VOID_ELEMENTS.join('|')})>)?`,
    'gi'
  );
  svg = svg.replace(voidRe, (match, tag, attrs) => {
    if (match.trimEnd().endsWith('/>')) return match;
    return `<${tag}${(attrs || '').trimEnd()} />`;
  });

  svg = svg.replace(/<svg([^>]*)\/>/i, '<svg$1></svg>');

  svg = svg.replace(/<svg([^>]*)>/i, (match, attrs) => {
    let cleaned = attrs
      .replace(/\s*\bwidth\s*=\s*"[^"]*"/gi, '')
      .replace(/\s*\bheight\s*=\s*"[^"]*"/gi, '')
      .replace(/\s*\bwidth\s*=\s*'[^']*'/gi, '')
      .replace(/\s*\bheight\s*=\s*'[^']*'/gi, '')
      .replace(/\s*width=\{[^}]*\}/g, '')
      .replace(/\s*height=\{[^}]*\}/g, '')
      .replace(/\s*\{\.\.\.props\}/g, '');
    cleaned = ' ' + cleaned.trim();
    cleaned = cleaned.trimEnd() + ' width={size ?? width ?? 24} height={size ?? height ?? 24} {...props}';
    return `<svg${cleaned}>`;
  });

  svg = svg.split('\n').map((l) => l.trimStart()).join('\n');
  svg = svg.replace(/([^\n])<\/svg>/gi, '$1\n</svg>');

  return svg;
}

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text.split('\n').map((line) => (line.trim() ? pad + line : '')).join('\n');
}

function buildComponent(compName, svgMarkup) {
  const indented = indent(svgMarkup.trim(), 4);
  return [
    `import * as React from "react";`,
    ``,
    `type Props = React.SVGProps<SVGSVGElement> & { size?: number | string };`,
    ``,
    `export function ${compName}({ size, width, height, ...props }: Props) {`,
    `  return (`,
    indented,
    `  );`,
    `}`,
    ``,
    `export default ${compName};`,
    ``,
  ].join('\n');
}

function updateIndex(indexPath, compName) {
  const exportLine = `export { ${compName} } from "./${compName}";`;
  let existing = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  if (existing.includes(exportLine)) {
    console.log(yellow(`Export already present in ${indexPath}`));
    return;
  }
  const lines = existing.split('\n').map((l) => l.trim()).filter(Boolean);
  lines.push(exportLine);
  lines.sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(indexPath, lines.join('\n') + '\n', 'utf8');
  console.log(green(`Updated ${indexPath}`));
}

async function run() {
  console.log(green('\nAdd SVG icon — interactive mode'));

  let name = (await prompt(cyan('Component name (PascalCase, leave blank to auto-derive): '))).trim();

  console.log(cyan('\nInput options:'));
  console.log(yellow('  [1] Enter an SVG file path'));
  console.log(yellow('  [2] Paste SVG code directly'));
  console.log(yellow('  [3] Choose an SVG file from a directory'));
  const opt = (await prompt(cyan('\nSelect option (1/2/3): '))).trim();

  let svgContent = null;

  if (opt === '1') {
    const p = await prompt(cyan('Enter path to SVG file: '));
    const filePath = path.resolve(process.cwd(), p.trim());
    if (!fs.existsSync(filePath)) { console.error(red(`File not found: ${filePath}`)); process.exit(2); }
    svgContent = fs.readFileSync(filePath, 'utf8');
    if (!name) name = toPascalCase(path.basename(filePath, path.extname(filePath)));

  } else if (opt === '3') {
    const dir = await prompt(cyan('Enter directory to scan (leave blank = current dir): '));
    const dirPath = path.resolve(process.cwd(), dir.trim() || '.');
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      console.error(red(`Directory not found: ${dirPath}`)); process.exit(2);
    }
    const file = await chooseFile(dirPath);
    if (!file) { console.error(red('No file selected.')); process.exit(2); }
    svgContent = fs.readFileSync(file, 'utf8');
    if (!name) name = toPascalCase(path.basename(file, path.extname(file)));

  } else if (opt === '2') {
    console.log(cyan('\nPaste SVG code below. When done, type END on its own line and press Enter.'));
    svgContent = await collectPaste();
    if (!svgContent.trim()) { console.error(red('No SVG content received.')); process.exit(2); }
    if (!name) {
      const hint = (await prompt(cyan('Component name (required for pasted SVG): '))).trim();
      if (!hint) { console.error(red('Component name is required.')); process.exit(2); }
      name = hint;
    }

  } else {
    console.error(red('Invalid option. Choose 1, 2, or 3.')); process.exit(2);
  }

  if (!name) { console.error(red('Could not determine component name.')); process.exit(2); }

  const compName = toPascalCase(name);

  let svg;
  try {
    svg = normalizeSvg(svgContent);
  } catch (err) {
    console.error(red(`SVG error: ${err.message}`)); process.exit(2);
  }

  const component = buildComponent(compName, svg);

  const outPath = path.join(iconsDir, `${compName}.tsx`);
  if (fs.existsSync(outPath)) {
    const overwrite = (await prompt(yellow(`\n${compName}.tsx already exists. Overwrite? (y/N): `))).trim().toLowerCase();
    if (overwrite !== 'y') { console.log(yellow('Aborted.')); process.exit(0); }
  }
  fs.writeFileSync(outPath, component, 'utf8');
  console.log(green(`\nWrote ${outPath}`));

  const indexPath = path.join(iconsDir, 'index.ts');
  updateIndex(indexPath, compName);

  console.log(green('\nDone. Import with:'));
  console.log(cyan(`  import { ${compName} } from '@/components/icons';`));
}

run().catch((err) => { console.error(red(`\nUnexpected error: ${err.message}`)); process.exit(1); });
