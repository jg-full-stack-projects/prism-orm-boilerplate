module.exports = async (req, res, proceed) => {
  const { auth } = req.body;
  const { getEncryptedValue } = sails.helpers.generic;

  const user = await getEncryptedValue.with({
    key: 'userId',
    value: auth,
    table: 'User',
  });

  const isValid = user.userId === auth;

  if (isValid) {
    return proceed();
  }

  return res.forbidden();
};
