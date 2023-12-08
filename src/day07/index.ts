import run from "aocrunner";
import { strToNum, sum } from "../utils/index.js";

const parseInput = (rawInput: string): Hand[] => {
  return rawInput.split('\n').map(h => {
    return {
      cards: h.split(/\s+/)[0].split(''), //.map(valueCard),
      bid: strToNum(h.split(/\s+/)[1])
    }
  });
};

const valueCard = (card: string) => {
  let cardVal = 0;
  switch (card) {
    case 'A':
      cardVal = 14
      break;
    case 'K':
      cardVal = 13
      break;
    case 'Q':
      cardVal = 12
      break;
    case 'J':
      cardVal = 11
      break;
    case 'T':
      cardVal = 10
      break;
    
    default:
      cardVal = strToNum(card);
      break;
  }
  return cardVal;
}

type Hand = {
  cards: string[],
  bid: number
}

type Map<T> = {
  [key:string]: T
}

const scoreHand = (cards: string[]) => {
  const score = Object.values(cards.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {} as Map<number>)).reduce((acc, curr) => {
    acc += Math.pow(10, curr-1);
    return acc;
  }, 0);

  const cardValues = cards.map(valueCard)

  return {
    score,
    cardValues
  }
}

const compareCards = (a: number[], b: number[]) => {
  const results = a.map((aCard, idx) => {
    return aCard - b[idx];
  });

  // console.log(a,b,results);

  return results.find(v => v != 0) || 1;
}

const sortHands = (a: Hand, b: Hand) => {
  const aScore = scoreHand(a.cards);
  const bScore = scoreHand(b.cards);

  // console.log(aScore, bScore);

  if(aScore.score == bScore.score) {
    return compareCards(aScore.cardValues, bScore.cardValues);
  }

  return aScore.score - bScore.score;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // console.log(input);
  input.sort(sortHands);
  // console.log(input);

  return input.map((s, idx) => s.bid * (idx+1)).reduce(sum);
};




const valueCard2 = (card: string) => {
  let cardVal = 0;
  switch (card) {
    case 'A':
      cardVal = 14
      break;
    case 'K':
      cardVal = 13
      break;
    case 'Q':
      cardVal = 12
      break;
    case 'J':
      cardVal = 1
      break;
    case 'T':
      cardVal = 10
      break;
    
    default:
      cardVal = strToNum(card);
      break;
  }
  return cardVal;
}

const scoreHand2 = (cards: string[]) => {
  const groupings = cards.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {} as Map<number>);

  // console.log("before jokers", groupings);

  const jokers = groupings['J'] || 0;
  delete groupings['J'];
  // console.log("after jokers", groupings);

  const score = Object.values(groupings).sort().reverse();
  
  // console.log('score before jokers', score);
  score[0] += jokers;
  // console.log('score after jokers', score);
  const talliedScore = score.reduce((acc, curr) => {
    acc += Math.pow(10, curr-1);
    return acc;
  }, 0) || 10000;

  if(!talliedScore) {
    console.log(talliedScore, cards);
  }

  const cardValues = cards.map(valueCard2)

  return {
    score: talliedScore,
    cardValues
  }
}

const sortHands2 = (a: Hand, b: Hand) => {
  const aScore = scoreHand2(a.cards);
  const bScore = scoreHand2(b.cards);

  // console.log(aScore, bScore);

  if(aScore.score == bScore.score) {
    return compareCards(aScore.cardValues, bScore.cardValues);
  }

  return aScore.score - bScore.score;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.sort(sortHands2);
  console.log(input.slice(900));

  return input.map((s, idx) => s.bid * (idx+1)).reduce(sum);
};

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
