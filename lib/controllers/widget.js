const { Widget } = require('../models');

module.exports = {
  list: async (req, res, next) => {
    try {
      const results = await Widget.getAll();
      const code = results.length > 0 ? 200 : 204;
      res.status(code).send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  get: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const results = await Widget.getOne({ name });
      const code = results ? 200 : 204;
      res.status(code).send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  post: async (req, res, next) => {
    try {
      const body = req && req.body;
      const results = await Widget.insert(body);
      const code = results || results.length > 0 ? 200 : 204;
      res.status(code).send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  put: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const body = req && req.body;
      const results = await Widget.updateOne({ name }, body);
      const code = results ? 200 : 204;
      res.status(code).send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const results = await Widget.delete({ name });
      const code = results.length > 0 ? 200 : 204;
      res.status(code).send(results);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
