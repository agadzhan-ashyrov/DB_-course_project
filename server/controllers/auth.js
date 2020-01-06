const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection/connection");
const authHelper = require("../helpers/authHelpers");
const { secret } = require("../config/config").jwt;

const updateTokens = user => {
  const accessToken = authHelper.generateAccessToken(user.id);
  const refreshToken = authHelper.generateRefreshToken();
  return authHelper
    .replaceDbRefreshToken(refreshToken.id, user)
    .then(res => ({
      accessToken,
      refreshToken: refreshToken.token,
      user: user.email
    }));
};

const singIn = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  if (!email || !password)
    return;
  
    
  db.User.findOne({ where: { email } })
    .then(user => {
      if (!user) res.status(401).json({ message: "User does not exist!" });
      const isValid = bCrypt.compareSync(password, user.password);
      if (isValid) {
        updateTokens(user).then(tokens => {
          res.json(tokens);
        });
      } else {
        res.status(401).json({ message: "Invalid credentals! " });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};
const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== "refresh") {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Token expirede!" });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: "Invalid token!" });
      return;
    }
  }

  db.Token.findOne({ where: { tokenId: payload.id } })
    .then(token => {
      if (token === null) {
        throw new Error("Invalid token");
      }
      return updateTokens(token.userId);
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({ message: err.message }));
};

const singUp = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  db.User.findOne({ where: { email } })
    .then(user => {
      if (!!user) {
        res.status(409).json({ message: "email existing!" });
        return;
      } else {
        db.User.create({
          email,
          password: bCrypt.hashSync(password, 4)
        })
          .then(result => {
            res.status(200).json({ message: "Account created successfully" });
          })
          .catch(err => res.status(500).json({ message: err.message }));
      }
      return;
    })
    .catch(e => {
      console.log(e);
      return;
    });
};

module.exports = {
  singIn,
  refreshTokens,
  singUp
};
