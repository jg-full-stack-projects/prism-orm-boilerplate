/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  register: async (req, res) => {
    try {
      const { userId } = req.body;
      const { getEncryptedValue } = sails.helpers.generic;
      const doesExist = await getEncryptedValue.with({
        key: 'userId',
        value: userId,
        table: 'User',
      });

      if (!doesExist) {
        await User.create({
          userId,
        });
        return res.json({ status: 'registered' });
      }
      return res.json({ status: 'exists' });
      // }
    } catch (e) {
      return res.json({ status: e });
    }
  },
};
