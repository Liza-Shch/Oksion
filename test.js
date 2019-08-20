const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('line', (input) => {
      args = input.split(' ');
      let sum = 0;
      args.forEach(item => {
          sum += +item;
      });
      console.log(sum);
      rl.close();
  })

// const fs = require('fs');

// fs.readFile('input.txt', 'utf8', (err, data) => {
//     args = data.split(' ');
//     let sum = 0;
//     args.forEach(item => {
//         sum += +item;
//     });

//     fs.writeFile('output.txt', sum, 'utf8', (err) => {});
// });