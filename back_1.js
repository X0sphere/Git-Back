const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

const itemsArr = ['apple','banana'];
app.use(bodyParser.json());

app.get("/",(req,res)=> { res.send('My first backend work'); });

app.get('/items', (req, res) => {
  res.json(itemsArr);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  itemsArr.push(newItem);
  res.json({ message: 'Item added successfully', newItem });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
