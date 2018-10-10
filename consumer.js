const kafka = require('kafka-node');

const Consumer = kafka.Consumer,
      client = new kafka.Client();

const topics = [{
  'topic': 'test_ld',
  'partition': 0
}];

const consumerOptions = {
  'autoCommit': true
}

const consumer = new Consumer(client, topics, consumerOptions);

consumer.on('message', (message) => {
  console.log('Message received: ', message.value);  
});

consumer.on('error', function (err) {
  console.error('Consumer Error: ', err);
  consumer.close(true, () => {});
});

console.log('Consumer Running ...');
