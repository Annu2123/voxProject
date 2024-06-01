// import React, { useEffect } from 'react';
// import amqp from 'amqplib/callback_api.js';
// import toast from 'react-hot-toast';

// const Recevie = () => {
//     useEffect(() => {
//         let connection;

//         const consumeMessages = () => {
//             amqp.connect('amqp://49.205.193.250', function(error0, conn) {
//                 if (error0) {
//                     throw error0;
//                 }
//                 connection = conn;
//                 connection.createChannel(function(error1, channel) {
//                     if (error1) {
//                         throw error1;
//                     }

//                     var queue = 'hello';

//                     channel.assertQueue(queue, {
//                         durable: false
//                     });

//                     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

//                     channel.consume(queue, function(msg) {
//                         const message = msg.content.toString();
//                         console.log(" [x] Received %s", message);
//                         toast.info(message);
//                     }, {
//                         noAck: true
//                     });
//                 });
//             }); 
//         };

//         consumeMessages();

//         return () => {
//             if (connection) {
//                 connection.close();
//             }
//         };
//     }, []);

//     // // Return null if you don't have any JSX to render in this component
//     // return null;
//     return(
//         <>
//             hi
//         </>
//     )
// };

// export default Recevie;



// import React, { useState, useEffect } from 'react';
// import amqp from 'amqplib';
// import { Buffer } from 'buffer';

// const Recevie = () => {
//   const [messages, setMessages] = useState([]);
//   const [connection, setConnection] = useState(null);
//   const [channel, setChannel] = useState(null);
//   console.log(Buffer)

//   useEffect(() => {
//     const connectToRabbitMQ = async () => {
//       try {
//         const conn = await amqp.connect('amqp://49.205.193.250');
//         const ch = await conn.createChannel();
//         setConnection(conn);
//         setChannel(ch);
//         await ch.assertQueue('hello');
//         ch.consume('hello', (msg) => {
//           if (msg !== null) {
//             setMessages(prevMessages => [...prevMessages, msg.content.toString()]);
//             ch.ack(msg);
//           }
//         });
//       } catch (error) {
//         console.error('Error connecting to RabbitMQ:', error);
//       }
//     };

//     connectToRabbitMQ();

//     return () => {
//       if (connection) connection.close();
//     };
//   }, []);

//   const sendMessage = async (message) => {
//     try {
//         if (channel) {
//             const bufferMessage = Buffer.from(message);
//             await channel.sendToQueue('hello', bufferMessage);
//           }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>RabbitMQ Demo</h1>
//       <button onClick={() => sendMessage('Hello from React!')}>
//         Send Message
//       </button>
//       <h2>Received Messages:</h2>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Recevie;



import React, { useEffect, useState } from 'react';
import { connect } from 'amqplib';

const Receive = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectToRabbitMQ = async () => {
      try {
        const connection = await connect('amqp://49.205.193.250');
        const channel = await connection.createChannel();

        const exchange = 'amq.topic';
        const routingKey = 'messages';
        const queueName = 'hello';

        await channel.assertQueue(queueName, { durable: false });
        await channel.bindQueue(queueName, exchange, routingKey);

        const textDecoder = new TextDecoder();

        channel.consume(queueName, (msg) => {
          if (msg !== null) {
            const message = textDecoder.decode(msg.content);
            console.log('Received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            channel.ack(msg);
          }
        });
      } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
      }
    };

    connectToRabbitMQ();
  }, []);

  return (
    <div>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Receive;

