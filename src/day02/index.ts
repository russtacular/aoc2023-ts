import run from "aocrunner";
import { sum, multiply } from "../utils/index.js";

const redSearch = RegExp(/(\d+)\s(?=red)/);
const greenSearch = RegExp(/(\d+)\s(?=green)/);
const blueSearch = RegExp(/(\d+)\s(?=blue)/);

const parseInput = (rawInput: string): Game[] => {
  return rawInput.split('\n').map((game, idx) => {
    return {
      id: idx + 1,
      rolls: game.substring(game.indexOf(':')).split(';').map(roll => {
        const dice = roll.split(',');
        const red = parseInt('0' + roll.match(redSearch)?.at(0) , 10);
        const green = parseInt('0' + roll.match(greenSearch)?.at(0) , 10);
        const blue = parseInt('0' + roll.match(blueSearch)?.at(0) , 10);

        // console.log(dice, {red, green, blue});

        return {
          r: 0 + red,
          g: 0 + green,
          b: 0 + blue,
        }
      })
    };
  });
};

type Game = {
  id: number,
  rolls: Die[]
}

type Die = {
  r: number,
  g: number,
  b: number
}

const p1Max = {
  r: 12,
  g: 13,
  b: 14
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.filter(game => {
    const gameMax = game.rolls.reduce((prev, curr) => {
      return {
        r: Math.max(prev.r, curr.r),
        g: Math.max(prev.g, curr.g),
        b: Math.max(prev.b, curr.b) 
      };
    }, {r:0, g:0, b:0});
    return p1Max.r >= gameMax.r && p1Max.g >= gameMax.g && p1Max.b >= gameMax.b;
  }).map(g => g.id).reduce(sum, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.map(game => {
    return game.rolls.reduce((prev, curr) => {
      return {
        r: Math.max(prev.r, curr.r),
        g: Math.max(prev.g, curr.g),
        b: Math.max(prev.b, curr.b) 
      };
    }, {r: 0, g: 0, b: 0})
  }).map(d => Object.values(d).reduce(multiply, 1))
  .reduce(sum, 0);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
