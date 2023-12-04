import run from "aocrunner";
import { sum, intersect } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map(l => {
    const scratcher = l.substring(l.indexOf(':') + 1).trim().split(' | ');
    const played = new Set(scratcher[1].split(/\s+/).map(n => parseInt(n, 10)));
    const winners = new Set(scratcher[0].split(/\s+/).map(n => parseInt(n, 10)));

    return {
      played,
      winners
    }
  })
};

type scratcher = {
  played: Set<number>,
  winners: Set<number>
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  return input.map(s => {
    return Math.floor(Math.pow(2, intersect(s.played, s.winners).size - 1));
  }).reduce(sum, 0);
};

const dupeCards = (start: number, num:number, game: scratcher[][]): scratcher[][] => {
  for(let i=start; i<start+num; i++) {
    game[i].push(game[i][0]);
  }
  return game;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let cards = input.map(s => [s]);
  cards.forEach((cardRound, idx, game) => {
    cardRound.forEach((card) => {
      dupeCards(idx+1, intersect(card.played, card.winners).size, game);
    }); 
  });
  return cards.flat(1).length;
};

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
