const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: `node-template-${process.env.NODE_ENV}`,
  brokers: [ `localhost:9092` ]
});

const producer = kafka.producer();

class Producer {
  constructor({ topic }) {
    this.topic = topic
  }

  async send(message) {
    await producer.connect();
    const result = await producer.send({
      topic: this.topic,
      messages: [ message ],
    });
    await producer.disconnect();
    return result
  }
}

module.exports = Producer
