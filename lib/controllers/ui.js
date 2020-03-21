const { axios } = require('../helpers');

module.exports = {
  list: async (req, res, next) => {
    try {
      const response = await axios({ method: 'GET', url: 'v1/widgets' });
      const widgets = response && response.data;
      res.render('widgets', { widgets });
    } catch (error) {
      throw error;
    }
  },

  get: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const response = await axios({ method: 'GET', url: `v1/widgets/${name}` });
      const widgets = response && response.data;
      res.render('widgets', { widgets });
    } catch (error) {
      throw error;
    }
  },

  new: async (req, res, next) => {
    const DEFAULT = {
      name: 'foo',
      status: 'active',
      count: 10
    }
    res.render('new', { widget: DEFAULT });
  },

  post: async (req, res, next) => {
    try {
      const body = req && req.body;
      const response = await axios({ method: 'POST', url: `v1/widgets/`, data: body });
      res.redirect(`/widgets`);
    } catch (error) {
      throw error;
    }
  },

  put: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const body = req && req.body;
      const response = await axios({ method: 'PUT', url: `v1/widgets/${name}`, data: body });
      res.redirect(`/widgets/${name}`);
    } catch (error) {
      throw error;
    }
  },

  delete: async (req, res, next) => {
    try {
      const name = req && req.params && req.params.name;
      const body = req && req.body;
      const response = await axios({ method: 'DELETE', url: `v1/widgets/${name}` });
      res.redirect(`/widgets`);
    } catch (error) {
      throw error;
    }
  }
}
