const { User } = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token); //the findByToken instance methodis exists in our db model
    console.log('token!!!!!!!');
    res.json(user);
    req.user = user;
    next();
  } catch (error) {
    error.status = 502;
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('You shall not pass!');
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
