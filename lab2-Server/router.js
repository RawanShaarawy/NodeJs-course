const fs = require('fs');
module.exports = (path, next) => {
    switch(path){
        case '/':
          next(200, 'text/html','<div style="text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center"><h1>Please use one of the following paths:</h1><h2>/watch</h2><h2>/tea</h2><h2>/book</h2></div>');
        break;

        case '/book':
          fs.readFile('./book.jpg', (err, data) => {
              if(err) next(500, 'text/plain', 'something went wrong!');
              next(200, 'image/jpeg', data);
          });
           break;

        case '/watch':
          fs.readFile('./watch.jpg', (err, data) => {
              if(err) next(500, 'text/plain', 'something went wrong!');
              next(200, 'image/jpeg', data);
          });
           break;

        case '/tea':
          fs.readFile('./tea.jpg', (err, data) => {
              if(err) next(500, 'text/plain', 'something went wrong!');
              next(200, 'image/jpeg', data);
          });
           break;
        default: 
          content = 'Page not found';
          statusCode = 404;
          next(404, 'text/html', '<h1 style="color:red; text-align:center; margin-top: 20%; font-size:40px">Page Not Found<h1>');
    }
}