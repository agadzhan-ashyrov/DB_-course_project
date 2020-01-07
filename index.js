const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./server/connection/connection");

const app = express();
app.use(cors());

app.use(express.json());

require('./server/routes/index')(app)



db.sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, ()=> {
      console.log(`server started on the ${PORT}`);
     
  });

});

