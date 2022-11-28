const redis = require('redis');

const client = redis.createClient();

client.connect();

client.on('connect', () => {
  console.log('Connected!');
});

client.on('error', () => {
  console.log('Unable to connect!');
});

module.exports = client;
