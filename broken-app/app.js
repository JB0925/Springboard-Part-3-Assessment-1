const express = require('express');
const ExpressError = require("./expressError");
let axios = require('axios');
var app = express();

app.use(express.json());

const getDataFromUrl = async (developer) => {
  let res = await axios.get(`https://api.github.com/users/${developer}`);
  return res.data;
}

app.post('/', async function(req, res, next) {
  try {
    let developerInfo = [];
    for (let developer of req.body.developers) {
      await getDataFromUrl(developer)
      .then(dev => developerInfo.push({name: dev.name, bio: dev.bio}));
    };
    let resolvedDevloperInfo = await Promise.all(developerInfo);
    return res.json(resolvedDevloperInfo);
  } catch(err) {
    next(err);
  }
});

app.use((req, res, next) => {
  let notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});


app.use((err, req, res, next) => {
  let message = err.message;
  let status = err.status || 500;
  return res.status(status).json({
    error: {message, status}
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});
