const fs = require('fs');
const brain = require('brain.js');
const MESSAGE = "That rug really pulled the room together";

let trainedNet;

function encode(arg) {
  return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
  return data.filter(d => typeof(d.input) !== 'undefined' && d.input.length > 20)
  .map(d => {
    return {
      input: encode(d.input.slice(0, 20)),
      output: d.output
    }
  });
}

function train(data, previousData) {
  let net = new brain.NeuralNetwork();

  if (typeof previousData !== 'undefined') {
      net.fromJSON(previousData);
  } else {
    net.train(processTrainingData(data), {
      log: true
    });

    fs.writeFile('./training.json', JSON.stringify(net.toJSON()), (err) => {
      if (err) {
        console.log('Failed to write training data: ' + err);
      }
      console.log('Wrote training data');
    });
  }

  trainedNet = net.toFunction();
  console.log('Finished training');
}

function execute(input) {
  let data = trainedNet(encode(input));
  let topResult = Object.keys(data).reduce((sum, key) => {
    sum.push([key, data[key]]);
    return sum;
  }, [])
    .sort((a,b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    } else {
      return 0;
    }
    })
    [0];

  if (isNaN(topResult[1])) {
    return `I can't say`
  }

  return `I'm ${(topResult[1] * 100).toFixed(2)}% confident that ${topResult[0]} said that`;
}

fs.stat('./training.json', (err, stat) => {
  if (err == null) {
    console.log('Existing training data found');
    train(undefined, require('./training.json'));
    console.log(execute(MESSAGE));
  } else if (err.code == 'ENOENT') {
    require('./training.js').dataPromise().then((data) => {
      train(data, undefined);
      console.log(execute(MESSAGE));
    },
    (err) => {
      console.log(err);
    });
  }
});
