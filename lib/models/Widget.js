const _ = require('lodash');

let _data = [];

module.exports = {
  /**
    @param {object} query takes the form of { foo: 'bar' }
    @returns {object} the resulting object that matchd the query or null if it was unable to find a match
  */
  getOne: async (query) => {
    const index = _.findIndex(_data, query);
    if (index !== -1) {
      return _data[index];
    } else {
      return null;
    }
  },

  getAll: () => {
    return _data;
  },

  /**
    @param {object or array<object>} data One or more objects to insert
  */
  insert: async (data) => {
    _data.push(data);
    return data;
  },

  /**
    @param {object} query takes the form of { foo: 'bar' }
    @param {object} data takes the form of { fizz: 'buzz' }
    @returns {object} the resulting object that was updated or null if it was unable to find a match
  */
  updateOne: async (query, data) => {
    const index = _.findIndex(_data, query);
    if (index !== -1) {
      _data[index] = data;
      return _data[index];
    } else {
      return null;
    }
  },

  /**
    @param {object} query takes the form of { foo: 'bar' }
    @returns {array<object>} the new array of removed elements
  */
  delete: async (query) => {
    const elements = _.remove(_data, query);
    return elements;
  },

  /**
    @param {object} query takes the form of { foo: 'bar' }
    @returns {array<object>} the new array of removed elements
  */
  deleteAll: async () => {
    _data = [];
  }
}
