/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getStats: async (req, res) => {
    try {
      return res.json({ status: 'hi' });
    } catch (e) {
      return res.json({ status: e });
    }
  },
};
