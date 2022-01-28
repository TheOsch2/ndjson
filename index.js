const express = require('express');
const util = require('util');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 5000;

express().get('/', async (req, res) => {
  try {
    if (!req.query.url) {
      throw new Error('Correct call: "...?url=<url to fetch and convert>"');
    }
    res.writeHead(200, 'Ok', {
      'Content-Type': 'application/x-ndjson'
    });
    // A temporary solution. The working one will load items one by one
    // to achieve a normal performance on ...s of records 
    const url = res.query.url;
    const incoming = await fetch(req.query.url).json();
    // Test
    res.end(JSON.stringify(incoming, null, 2));
  } catch (err) {
    console.log(err);
    res.writeHead(500, 'Server error', {
      'Content-Type': 'application/json'
    });
    res.end(util.inspect(err));
  }
}).listen(PORT);

