require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../lib/app');

describe('App', () => {
  it(`Should GET /health-check and return 200`, (done) => {
    chai.request(app)
      .get(`/health-check`)
      .end((error, res) => {
        // console.log(JSON.stringify(res));
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
