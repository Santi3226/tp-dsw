import fs from 'node.fs'; //Hay q instalarlo?

const data = fs.readFile('.node-version');
console.log(data);
