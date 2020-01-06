const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { secret, tokens } = require('../config/config').jwt;
const Token = require('../connection/connection').Token;

const generateAccessToken = (userId) => {
    const payload = {
        userId, 
        type: tokens.access.type,
    };
    const options = { expiresIn: tokens.access.expiresIn };
    return jwt.sign(payload, secret, options);
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid(), 
        type: tokens.refresh.type,
    };
    const options = {expiresIn: tokens.refresh.expiresIn };
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    }
}

const replaceDbRefreshToken = (tokenId, user) =>{
    const userId = user.id;
    console.log('===========================================');
    console.log(userId);

    return Token.destroy({
        where: {
          userId,
          
        }
      }).then((res) => {
          Token.create({tokenId, userId})

        console.log(res);
      });
    
    // return Token.findOrCreate({ where: { userId }, defaults: { tokenId }})
    // .then(([userf, created]) => {
    //     if (userf){
    //         Token.update({tokenId}, {where: {userId}})
    //     }
    // }) 
} 

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
}