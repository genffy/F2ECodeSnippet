const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})