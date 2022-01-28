import express from 'express';
import util from 'util';

const PORT = process.env.PORT || 5000;

express().get('/', (req, res) => {
  try {
    // Test yet
    req.writeHead(200, 'Ok');
    res.end(util.inspect(req.query));
  } catch (err) {
    console.log(err);
    res.writeHead(500, 'Server error');
    res.end(util.inspect(err));
  }
}).listen(PORT);

