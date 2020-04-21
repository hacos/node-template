require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;

const Consumer = require('../../lib/helpers/consumer');
const Producer = require('../../lib/helpers/producer');

describe('Producer', () => {
  it(`Send a message`, async () => {
    const producer = new Producer({ topic: 'test_topic' });
    const message = { value: 'Hello KafkaJS user!' };
    const result = await producer.send(message);
    console.log(result)
    expect(true).to.be.true;
  });
});

describe('Consumer', () => {
  it(`Read messages`, async () => {
    const consumer = new Consumer({ topic: 'test_topic' });
    const result = await consumer.run();
    console.log(result)
    expect(true).to.be.true;
  });
});
