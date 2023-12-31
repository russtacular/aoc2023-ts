/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export const sum = (acc: number, curr: number) => acc + curr;

export const multiply = (acc: number, curr: number) => acc * curr;

export function intersect<T>(base: Set<T>, ...rest:Set<T>[]) {
  return new Set([...base].filter((x) => rest.reduce((acc, curr) => acc && curr.has(x), true)));
}

export const range = (start: number, length: number, step: number = 1) => {
  return Array.from({ length }, (_, i) => start + i * step);
}

export function chunkArray<T>(arr: T[], chunkSize: number) {
  return [...Array(Math.ceil(arr.length/chunkSize))].map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));
}

export const strToNum = (str: string) => parseInt(str, 10);
