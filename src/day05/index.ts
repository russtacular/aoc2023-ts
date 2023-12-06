import run from "aocrunner";
import { assert } from "console";
import { range, chunkArray } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const segments = rawInput.split('\n\n');
  const seeds = segments[0].substring(segments[0].indexOf(':')+1).trimStart().split(' ').map(str => parseInt(str, 10));

  const mappings = segments.slice(1).map(rules => {
    return rules.split('\n').slice(1).map(r => {
      return r.split(' ').map(str => parseInt(str, 10)) as Rule;
    });
  })

  return {
    seeds,
    mappings
  }
}

type Rule = [ number, number, number ];

const matchRule = (start: number, rule: Rule) => {
  const foundMatch = rule[1] <= start && (rule[1] + rule[2]) > start;
  // console.log("Found Match: ", foundMatch, start, rule);
  return foundMatch;
}

const mapId = (start: number, rule: Rule) => {
  // console.assert(matchRule(start, rule));
  return start - rule[1] + rule[0];
}

const mapIdWithRules = (start: number, rules: Rule[]) => {
  const matchedRule = rules.findIndex(r => matchRule(start, r));

  if(matchedRule >= 0) {
    return mapId(start, rules[matchedRule]);
  } else {
    return start; 
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const locs = input.seeds.map(s =>
    input.mappings.reduce((start, curr) => mapIdWithRules(start, curr), s)
  );

  return Math.min(...locs);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let locMin:number;

  chunkArray(input.seeds, 2).forEach(rng => {
    for(let i = rng[0]; i < rng[0] + rng[1]; i++) {
      const loc = input.mappings.reduce((start, curr) => mapIdWithRules(start, curr), i);
      locMin = locMin ? Math.min(locMin, loc) : loc;
    }
  });
  
  return locMin;

  // const locs = chunkArray(input.seeds, 2).map(rng => {
  //   return range(rng[0], rng[1]).map(s => {
  //     return input.mappings.reduce((start, curr) => mapIdWithRules(start, curr), s);
  //   }).reduce((acc, l) => {
  //     return Math.min(l, acc);
  //   })
  // });
  // return Math.min(...locs);
};

const testInput = 
`
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
