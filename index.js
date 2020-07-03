const http = require('http');
const path = require('path');
const fs = require('fs');

const data = require('./data');


http.createServer((req,res) => {
    const thePath = req.url.toLowerCase();
    switch(thePath) {
      case '/':
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Home page</h1>' + '\n' + 'Array length: ' + data.getAll().length);
        break;
      case '/about':
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });  
        break;
      default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
        break;
      }
  }).listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));



// 2
// Old version; simple text, does not use html or css

// http.createServer((req,res) => {
//     const path = req.url;
//     switch(path) {
//       case '/':
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('<h1>Home page</h1>' + '\n' + 'Array length: ' + data.getAll().length);
//         break;
//       case '/about':
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end('About page' + '\n' + '\n' + 'My name is David and this is my website!');
//         break;
//       default:
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Not found');
//         break;
//       }
//   }).listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));




// 3
//Does not work; the else statement causes the first condition (the '/' path) to do nothing, and shows up as "Not found" (goes to the else statement)

// http.createServer((req,res) => {
//     if(req.url === '/') {
//         fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
//             if(err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(data);
//         });  
//     }

//     if(req.url === '/about') {
//         fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
//             if(err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(data);
//         });  
//     }

//     else {
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Not found');
//     }

        
//   }).listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));