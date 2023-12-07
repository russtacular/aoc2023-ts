import run from "aocrunner";
import { multiply } from "../utils/index.js";

const parseInput = (rawInput: string) => {
  const parsed = rawInput.split('\n').map(row => row.split(/\s+/));
  return {
    times: parsed[0].splice(1).map(i => parseInt(i,10)),
    distances: parsed[1].splice(1).map(i => parseInt(i,10))
  };
};

const parseInput2 = (rawInput: string) => {
  const parsed = rawInput.split('\n').map(row => row.split(/\s+/));
  return {
    time: parseInt(parsed[0].splice(1).join(''), 10),
    distance: parseInt(parsed[1].splice(1).join(''), 10)
  };
};

const distanceTraveled = (timeHeld: number, totalTime: number) => (totalTime - timeHeld) * timeHeld;

const isWinner = (timeHeld:number, totalTime: number, refDistance: number) =>
  distanceTraveled(timeHeld, totalTime) > refDistance;

const findWinners = (time: number, refDistance:number) => {
  const midpoint = Math.floor(time/2);
  let winCount = 0;

  while (isWinner(midpoint - winCount, time, refDistance)) {
    winCount++;
  }

  return winCount * 2 - Number(!(time%2));
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.times.map((t, idx) => findWinners(t, input.distances[idx])).reduce(multiply);
};


// Quadratic formula! Mrs. Maddy would be proud
// th^2 - tt*th + d = 0
const findTimeHeld = (distanceC: number, totalTimeB: number) => (totalTimeB - Math.sqrt(Math.pow(totalTimeB,2) - 4 * 1 * distanceC))/2

const findWinners2 = (time: number, refDistance: number) => {
  return (Math.floor(time/2) - Math.floor(findTimeHeld(refDistance, time))) * 2 - Number(!(time%2));
}

const part2 = (rawInput: string) => {
  const input = parseInput2(rawInput);

  return findWinners2(input.time, input.distance);
};

const testInput = `
Time:      7  15   30
Distance:  9  40  200
`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
