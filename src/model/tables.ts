/*
 * Copyright (c) Ali Shakiba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A table, read from its drawing in svg-table/: the id is the file's name, the
 * rest is data- attributes on the drawing's root <svg>.
 */
export interface TableInfo {
  id: string;
  /** data-name */
  name: string;
  /** data-color: the picker's swatch */
  color: string;
  /** data-blurb: a line about it, for the table menu */
  blurb: string;
  /** data-order: the picker shows tables by it, then by name; the first is the default */
  order: number;
  /** the drawing */
  svg: string;
}

const files = import.meta.glob<string>("../svg-table/*.svg", { query: "?raw", import: "default", eager: true });

/**
 * A drawing's text as an element, parsed by the page's own html parser in a
 * template, so nothing in it loads or shows until it is put in the page.
 */
export const parseDrawing = (text: string): SVGSVGElement => {
  const template = document.createElement("template");
  template.innerHTML = text;
  return template.content.querySelector("svg");
};

/** what a shape in a drawing is, if it is a part: its inkscape:label, or data-pinball-label */
export const labelOf = (element: Element): string | null =>
  element.getAttribute("inkscape:label") || element.getAttribute("data-pinball-label");

const readTable = (path: string, svg: string): TableInfo => {
  const id = path.slice(path.lastIndexOf("/") + 1, -".svg".length);
  const root = parseDrawing(svg);
  const data = (name: string) => root.getAttribute("data-" + name);
  return {
    id,
    name: data("name") ?? id,
    color: data("color") ?? "#888888",
    blurb: data("blurb") ?? "",
    order: data("order") != null ? Number(data("order")) : Infinity,
    svg,
  };
};

/** The tables, in the order the picker shows them. */
export const TABLES: TableInfo[] = Object.entries(files)
  .map(([path, svg]) => readTable(path, svg))
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

export function getTable(id: string): TableInfo | undefined {
  return TABLES.find((table) => table.id === id);
}

/** the table named in the page's hash, so a link or a reload opens the same one */
export function tableFromHash(): string {
  const id = location.hash.slice(1);
  return getTable(id) ? id : TABLES[0].id;
}
