require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../lib/app');
const { Widget } = require('../../lib/models');

const DATA = {
  name: 'foo',
  status: 'active',
  count: 10
}

const NEW_DATA = {
  name: 'bar',
  status: 'inactive',
  count: -1
}

describe('widgetController', () => {
  describe('auth', () => {
    it(`Should GET /v1/widgets and return 401 without authentication token`, (done) => {
      chai.request(app)
        .get(`/v1/widgets`)
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(401);
          done();
        });
    });

    it(`Should GET /v1/widgets and return 204 with authentication token in query`, (done) => {
      chai.request(app)
        .get(`/v1/widgets`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(204);
          done();
        });
    });
  });

  describe('LIST/GET', () => {
    before(async () => {
      await Widget.deleteAll();
      await Widget.insert(DATA);
      await Widget.insert(NEW_DATA);
    });

    it(`Should GET /v1/widgets and return 200 with two widgets`, (done) => {
      chai.request(app)
        .get(`/v1/widgets`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widgets = JSON.parse(res.text);
          expect(widgets).to.be.an('array');
          expect(widgets.length).to.be.equal(2);
          expect(widgets[0]).to.deep.equal(DATA);
          expect(widgets[1]).to.deep.equal(NEW_DATA);
          done();
        });
    });

    it(`Should GET /v1/widgets/${DATA.name} and return 200 with a single widget`, (done) => {
      chai.request(app)
        .get(`/v1/widgets/${DATA.name}`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widget = JSON.parse(res.text);
          expect(widget).to.deep.equal(DATA);
          done();
        });
    });

    it(`Should GET /v1/widgets/fake and return 204`, (done) => {
      chai.request(app)
        .get(`/v1/widgets/fake`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(204);
          done();
        });
    });

    after(async () => {
      await Widget.deleteAll();
    });
  });

  describe('POST', () => {
    before(async () => {
      await Widget.deleteAll();
    });

    it(`Should POST /v1/widgets with one widget`, (done) => {
      chai.request(app)
        .post(`/v1/widgets`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .send(DATA)
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widget = JSON.parse(res.text);
          expect(widget).to.deep.equal(DATA);
          done();
        });
    });

    it(`Should POST /v1/widgets with two widgets`, (done) => {
      chai.request(app)
        .post(`/v1/widgets`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .send([ DATA, NEW_DATA ])
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widgets = JSON.parse(res.text);
          expect(widgets).to.be.an('array');
          expect(widgets.length).to.be.equal(2);
          expect(widgets[0]).to.deep.equal(DATA);
          expect(widgets[1]).to.deep.equal(NEW_DATA);
          done();
        });
    });

    after(async () => {
      await Widget.deleteAll();
    });
  });

  describe('PUT', () => {

    before(async () => {
      await Widget.deleteAll();
      await Widget.insert(DATA);
    });

    it(`Should PUT /v1/widgets/${DATA.name} and change status and count`, (done) => {
      chai.request(app)
        .put(`/v1/widgets/${DATA.name}`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .send(NEW_DATA)
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widget = JSON.parse(res.text);
          expect(widget).to.deep.equal(NEW_DATA);
          done();
        });
    });

    it(`Should PUT /v1/widgets/fake and return 204`, (done) => {
      chai.request(app)
        .put(`/v1/widgets/fake`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .send(NEW_DATA)
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(204);
          done();
        });
    });

    after(async () => {
      await Widget.deleteAll();
    });
  });

  describe('DELETE', () => {
    before(async () => {
      await Widget.deleteAll();
      await Widget.insert(DATA);
      await Widget.insert(NEW_DATA);
    });

    it(`Should DELETE /v1/widgets/${DATA.name}`, (done) => {
      chai.request(app)
        .delete(`/v1/widgets/${DATA.name}`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(200);
          expect(res).to.have.property('text');
          const widgets = JSON.parse(res.text);
          expect(widgets).to.be.an('array');
          expect(widgets.length).to.be.equal(1);
          expect(widgets[0]).to.deep.equal(DATA);
          done();
        });
    });

    it(`Should DELETE /v1/widgets/fake and return 204`, (done) => {
      chai.request(app)
        .delete(`/v1/widgets/fake`)
        .query({ access_token: process.env.ACCESS_TOKEN })
        .end((error, res) => {
          // console.log(JSON.stringify(res));
          expect(res.status).to.be.equal(204);
          done();
        });
    });

    after(async () => {
      await Widget.deleteAll();
    });
  });
});
