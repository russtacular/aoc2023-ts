import run from "aocrunner";
import { sum } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  return rawInput.split('\n');
};

const lfind = RegExp(/^.*?(\d).*/);
const rfind = RegExp(/.*(\d).*?$/);

const str2num: Record<string, number|undefined> = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine' : 9
};

const p2str2num = RegExp("^.*?(" + ["\\d"].concat(Object.keys(str2num)).join('|') + ").*");
const p2rtl = RegExp("^.*?(" + ["\\d"].concat(
  Object.keys(str2num).map(k => k.split('').reverse().join(''))).join('|') + ").*");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map(l => {
    const lnum = l.replace(lfind, "$1")
    const rnum = l.replace(rfind, "$1");
    return parseInt(lnum + rnum, 10);
  }).reduce(sum);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.map(l => {
    const lNum = l.replace(p2str2num, "$1");
    const rNum = l.split('').reverse().join('').replace(p2rtl, "$1").split('').reverse().join(''); 

    return parseInt([lNum, rNum].map(n => {
      const sub = str2num[n];
      if(sub === undefined) {
        return n;
      }
      return sub;
    }).join(''), 10);
  }).reduce(sum);
};

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
