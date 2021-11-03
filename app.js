const express = require('express');
const app = express();
const port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('images'));

app.get('/', (req, res) => {
//   res.send('hello');
    res.sendFile('index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})