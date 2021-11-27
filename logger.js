// Import the http and filesystem modules
const http= require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    // Request object: req, Response object: res 
    const { url, method } = req; 

    const logObj = JSON.stringify({// Defining log request information as an object 
        url,
        method,
        time: Date.now(),
      });

    if(req.url=='/'||req.url=='/home'){ // capture for home page request
        res.writeHead(200);// sets the HTTP status code of the response 200 means 'OK'
        res.end('<h1>You are in Home Page</h1>'); // writes the HTTP response back to who requested it
        writeLogger(logObj);// Calling the write function
    } else if (req.url == '/about') {// capture for about page request
        res.writeHead(200);
        res.end('<h1>You are in About Page</h1>');
        writeLogger(logObj);
    }else if (req.url == '/contact') {// capture for contact page request
        res.writeHead(200);
        res.end('<h1>You are in Contact Page</h1>');
        writeLogger(logObj);
    } else {// capture the request that not exist pages
        res.writeHead(404);// sets the HTTP status code of the response  404 means 'not found'
        res.write('<h1>404</h1> \n Page not found!');
        res.end();
        writeLogger('Request for not exist page');   // If the page does not exist   
      }       
});

function writeLogger(logObj) { // Add/write the request information to the file
    //fs.appendFile : it will add without overwrite the current data. Also if destination file does not exist it will create.
   fs.appendFile('logsData.txt', logObj+'\n', err => {
    if (err) {
      console.error(err)
      return;
    }
  })
} 

server.listen(3000);
