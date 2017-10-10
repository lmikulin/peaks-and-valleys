const fs = require('fs');
const defaultFileName = './castle-data.json';

function getPeaksAndValleysIndexes(landscape) {
  let index =0, prev, current, next, max = landscape.length -1, peaksAndValleys = [];
  while (index < max) {
    let prevIndex = index - 1;
    if (prevIndex < 0) {
      peaksAndValleys[index] = '*';
      index++;
      continue;
    }
    prev = landscape[prevIndex];
    // increment index proceed until there is a change to account for multiples
    while ((index < max) && (landscape[index] === landscape[index +1])) {
      index++;
    }
    if (index >= max) {
      peaksAndValleys[index] = '*';
      break;
    }

    current = landscape[index];
    next = landscape[index + 1];
    if (prev != landscape[prevIndex]){
      prev = landscape[prevIndex];
    }
    if ((current < prev) && (current < next)) {
      // valley
      peaksAndValleys[index] = 'v';
      index++;
      continue;
    }
    if ((current > prev) && (current > next)) {
      // peak
      peaksAndValleys[index] = 'p';
      index++;
      continue;
    }
    index++;
  }
  return peaksAndValleys;
}

function printArrays(landscape, indexes) {
  landscape.forEach((item, index) => {
    console.log(`${indexes[index] || ' '}: ${item}`);
  })
}

let fileName = process.argv[2] || defaultFileName;
fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.log(`error reading file: ${fileName}`);
  } else {
    try {
      let landscape = JSON.parse(data);
      let indexes = getPeaksAndValleysIndexes(landscape);
      printArrays(landscape, indexes);
    } catch (error) {
      console.log(`error parsing file: ${fileName}\n${error.message}`)
    }
  }
});
