const kafka = require('kafka-node');

const Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);
    
const entity = {
  'id': 'urn:ngsi-ld:Vehicle:V2345',
  'type': 'Vehicle',
  'speed': {
    'type': 'Property',
    'value': 100
  }
};

const message = new kafka.KeyedMessage(entity.id, JSON.stringify(entity));

const payload = {
   topic: 'test_ld',
   messages: message,
   attributes: 2          // Ask for compression
};

producer.on('ready', function () {
    producer.send([payload], function (err, data) {
        console.log('Added: ', data);
        producer.close(() => {}, true);
    });
});

producer.on('error', function (err) {
  console.error('Producer Error: ', err);
});
