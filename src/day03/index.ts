import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split('\n').map(l => l.split(''));

const isPart = (x: number, y:number, xlen: number, arr: string[][]) => {
  const xMin = Math.max(0, x-1);
  const xMax = Math.min(x+xlen, arr[0].length - 1);
  const yMin = Math.max(0, y-1);
  const yMax = Math.min(arr.length - 1, y+1);

  // console.log(xMin,yMin);
  // console.log(xMax,yMax);
  
  let isPart = false;
  isAdjacent: {
    for(let xx = xMin; xx <= xMax; xx++) {
      for(let yy = yMin; yy <= yMax; yy++) {
        if(arr[yy][xx].match(/[^\d\.]/)) {
          isPart = true;
          break isAdjacent;
        }
      }
    }  
  }
  return isPart;
};

const getDigits = (arr: string[]) => {
  const end = arr.findIndex(v => v.match(/[^\d]/));
  if(end === -1) {
    return arr.join('');
  }
  return arr.slice(0, end).join('');
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let partSum = 0;

  input.forEach((l,idx) => {
    for(let cidx = 0; cidx < l.length; cidx++) {
      if(l[cidx].match(/\d/)) {
        let stringyNum = getDigits(l.slice(cidx));
        // console.log(stringyNum);
        if(isPart(cidx, idx, stringyNum.length, input)) {
          partSum += parseInt(stringyNum, 10);
        }
        cidx += stringyNum.length;
      }
    }
  });
  return partSum;
};

const findDigits = (x:number, y:number, arr: string[][]) => {
  const xMin = Math.max(0, x-1);
  const xMax = Math.min(x+1, arr[y].length - 1);
  const yMin = Math.max(0, y-1);
  const yMax = Math.min(arr.length - 1, y+1);

  let res = [];

  for(let yy = yMin; yy <= yMax; yy++) {
    for(let xx = xMin; xx <= xMax; xx++) {
      if(arr[yy][xx].match(/\d/)) {
        let digitMin = xx-1, digitMax = xx+1;
        let stringyNum = arr[yy][xx];
        while (digitMin >= 0) {
          if(arr[yy][digitMin].match(/\d/)) {
            stringyNum = arr[yy][digitMin] + stringyNum;
            digitMin--;
          } else {
            break;
          }
        }
        while (digitMax < arr[yy].length) {
          if(arr[yy][digitMax].match(/\d/)) {
            stringyNum = stringyNum + arr[yy][digitMax];
            digitMax++;
          } else {
            break;
          }
        }
        // console.log(stringyNum);
        res.push(parseInt(stringyNum,10));
        xx = digitMax;
      }
    }
  }
  return res.length === 2 ? res : null;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let ratioSum = 0;

  input.forEach((l,idx) => {
    for(let cidx = 0; cidx < l.length; cidx++) {
      if(l[cidx] === '*') {
        const partNumbers = findDigits(cidx, idx, input);
        // console.log(partNumbers);
        ratioSum += partNumbers ? partNumbers[0]*partNumbers[1] : 0;
        // console.log(ratioSum);
      }
    }
  });
  return ratioSum;
};

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
