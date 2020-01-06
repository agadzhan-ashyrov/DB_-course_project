const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./server/connection/connection");

const app = express();
app.use(express.json());
app.use(cors);

db.sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, ()=> {
      console.log(`server started on the ${PORT}`)
  });

});
// const authMiddleware = require('./middleware/auth');

// const auth = require('./controllers/auth');
// const app = express();

// app.use(express.json());
// app.use(cors());

// console.log(process.env.DB_PASSWORD);
// db.sequelize.sync({force: false}).then(() => {

//   console.log('Drop and Resync with { force:  }');

// });
// app.post('/singin', auth.singIn);
// app.post('/refresh-token', auth.refreshTokens);
// app.post('/singup', auth.singUp);

// app.get('/', authMiddleware, (req, res)=>{
//   res.status(200).json({message: "onswwer"});
// })
// app.listen(3000);
