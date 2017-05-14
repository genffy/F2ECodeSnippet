const path = require('path')
const express = require('express')
const app = express()
const opn = require('opn')

const PORT = 3001
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
  opn(`http://127.0.0.1:${PORT}`, {app: ['google chrome', '--incognito']}).then(() => {
	  
  })
})