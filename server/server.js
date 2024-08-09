const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();
const dbconfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/usersRoutes');
const productsRoute = require('./routes/productsRoute');
const expenseRoute = require('./routes/expenseRoute');
const bidsRoute = require('./routes/bidsRoute');
const notificationsRoute = require('./routes/notificationsRoute');
const settlementRoute = require('./routes/settlementRoute');

app.use('/api/bids',bidsRoute);
app.use('/api/users',usersRoute);
app.use('/api/products',productsRoute);
app.use('/api/expense',expenseRoute);
app.use('/api/notifications',notificationsRoute);
app.use('/api/settlement',settlementRoute);


// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port,()=>console.log(`Node/express JS Server started on port ${port}`));