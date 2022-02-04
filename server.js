const express = require('express');
const app = express();
const cors = require('cors');
const usersRoute = require("./routes/usersRoute");

app.use(express.urlencoded({ extended: false }));
app.use(express.text());
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('./public'));

app.use('/api/users/', usersRoute);

app.all('*', function (req, res) {
  throw new Error("Bad request")
})

app.use(function (e, req, res, next) {
  if (e.message === "Bad request") {
    res.status(400).json({ msg: e.message });
  }
});

var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
