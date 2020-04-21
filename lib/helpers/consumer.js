const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: `node-template-${process.env.NODE_ENV}`,
  brokers: [ `localhost:9092` ]
});

const consumer = kafka.consumer({ groupId: 'test-group' });

class Consumer {
  constructor({ topic }) {
    this.topic = topic
  }

  async run() {
    await consumer.connect()
    await consumer.subscribe({ topic: this.topic, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const result = []
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        result.push(`- ${prefix} ${message.key}#${message.value}`)
      },
    })
    await consumer.disconnect()
    return result
  }
}

module.exports = Consumer
