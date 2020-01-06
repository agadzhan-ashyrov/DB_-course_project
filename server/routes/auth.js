const auth = require('./../controllers/auth');

module.exports = (app)=>{
    app.post('./singin', auth.singIn);
    
}