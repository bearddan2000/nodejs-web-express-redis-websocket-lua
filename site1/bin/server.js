const express = require('express');
var redis = require('ioredis');
var client = redis.createClient(6379, 'redis'); //creates a new client

const app = express();

client.on('connect', function() {
  console.log('connected');
});

// This will define a command echo:
client.defineCommand("echo", {
  numberOfKeys: 2,
  lua: "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}",
});

app.get('/', (req, res) => {
  client.echo("k1", "k2", "a1", "a2", (err, result) => {
      res.json({
          message: result[0]
      });
  });
});

app.listen(8000, () => {
    console.log('server is listening on port 8000');
});
