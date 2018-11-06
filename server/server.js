//nodejs path
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//to serve public path html pages
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});