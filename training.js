const fs = require('fs');
const directory = './general/';

// Get persons
const usersJSON = require('./users.json');
const users = usersJSON.reduce((all, user) => {
  all[user.id] = user.name;
  return all;
}, {});

function dataPromise() {
  let data = [];

  // Get general data
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      files.forEach(file => {
        let datum = require(`${directory}${file}`).reduce((sum, msg) => {
          let attribution = {};
          attribution[users[msg.user]] = 1;

          return sum.concat({
            input: msg.text,
            output: attribution
          });
        }, []);
        data = data.concat(datum);
      });

      resolve(data);
    });
  });
}

module.exports = {
  dataPromise: dataPromise
};