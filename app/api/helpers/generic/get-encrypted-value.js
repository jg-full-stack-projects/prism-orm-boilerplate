module.exports = {
  friendlyName: 'Get value by key of (decrypted) data in an array',
  sync: false,
  description: '',
  inputs: {
    key: {
      type: 'ref',
      required: true,
    },
    value: {
      type: 'ref',
      required: true,
    },
    table: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Results parsed succesfully.',
    },
  },

  fn: async (inputs, exits) => {
    try {
      if (!inputs) {
        return exits.error(new Error('No arguments provided'));
      }
      const { table, key, value } = inputs;
      const parseResults = (results, key, value) => {
        return results.find((item) => item[key] === value);
      };
      switch (table) {
        case 'User':
          const data = await User.find({}).decrypt();
          const lookup = parseResults(data, key, value);
          return exits.success(lookup);
        default:
          break;
      }
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  },
};
