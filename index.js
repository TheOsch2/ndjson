const express = require('express');
const util = require('util');

const PORT = process.env.PORT || 5000;

express().get('/', (req, res) => {
  try {
    if (!res.query.url) {
      throw new Error('Correct call: "...?url=<url to fetch and convert>"');
    }
    res.writeHead(200, 'Ok');
    res.end(util.inspect(req.query));
  } catch (err) {
    console.log(err);
    res.writeHead(500, 'Server error', {
      'Content-Type': 'application/json'
    });
    res.end(util.inspect(err));
  }
}).listen(PORT);

