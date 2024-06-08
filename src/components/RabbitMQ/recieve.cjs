const amqp = require('amqplib/callback_api');

const receiveFromRabbitMQ = () => {
  amqp.connect('amqps://gswlymrx:WaFJHnewbnHjLJ0ogMlupWhUSRJT0XHC@shrimp.rmq.cloudamqp.com/gswlymrx', (error0, connection) => {
    if (error0) {
      console.error('Error connecting to RabbitMQ:', error0);
      return;
    }
    
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error('Error creating channel:', error1);
        connection.close();
        return;
      }

      const queueName = 'your-queue-name';
      channel.assertQueue(queueName, { durable: false });

      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);

      channel.consume(queueName, (msg) => {
        if (msg !== null) {
          console.log(" [x] Received %s", msg.content.toString());
          channel.ack(msg);
        }
      });
    });
  });
};

// Usage
receiveFromRabbitMQ();
