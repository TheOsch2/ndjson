import express from 'express';
import util from 'util';
import fetch from 'node-fetch';
import { rmSync } from 'fs';

const PORT = process.env.PORT || 5000;

express().get('/', async (req, res) => {
  try {
    if (!req.query || !req.query.url) {
      throw new Error('Correct call: "...?url=<url to fetch and convert> (don\'t forget to replace & with &26)"');
    }
    // A temporary solution. The working one will load items one by one
    // to achieve a normal performance on ...s of records 
    const url = req.query.url;
    const incoming = await fetch(url);
    // Test
    res.writeHead(200, 'Ok', {
      'Content-Type': 'application/json'
    });
    res.end(incoming);
  } catch (err) {
    console.log(err);
    res.writeHead(500, 'Server error', {
      'Content-Type': 'application/json'
    });
    res.end(util.inspect(err));
  }
}).listen(PORT);

