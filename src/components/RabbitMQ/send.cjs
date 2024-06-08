#!/usr/bin/env node
// import amqp from 'amqplib/callback_api.js'
// var amqp = require('amqplib/callback_api.js');
// const amqp = require('amqplib/callback_api')
// amqp.connect('amqps://gswlymrx:WaFJHnewbnHjLJ0ogMlupWhUSRJT0XHC@shrimp.rmq.cloudamqp.com/gswlymrx', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';
//         var msg = 'Hello World!ghjnhbgdfg';

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         channel.sendToQueue(queue, Buffer.from(msg));

//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });


const amqp = require('amqplib/callback_api');

const sendToRabbitMQ = (message) => {
  return new Promise((resolve, reject) => {
    console.log('Connecting to RabbitMQ...');
    amqp.connect('amqps://gswlymrx:WaFJHnewbnHjLJ0ogMlupWhUSRJT0XHC@shrimp.rmq.cloudamqp.com/gswlymrx', (error0, connection) => {
      if (error0) {
        console.error('Error connecting to RabbitMQ:', error0);
        reject(error0);
        return;
      }
      
      console.log('Connected to RabbitMQ');
      connection.createChannel((error1, channel) => {
        if (error1) {
          console.error('Error creating channel:', error1);
          connection.close();
          reject(error1);
          return;
        }

        const queue = 'your-queue-name';
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(" [x] Sent %s", message);

        setTimeout(() => {
          connection.close();
          resolve();
        }, 500);
      });
    });
  });
};

// Usage
sendToRabbitMQ('Hello RabbitMQ!')
  .then(() => console.log('Message sent successfully'))
  .catch((error) => console.error('Error sending message:', error));

