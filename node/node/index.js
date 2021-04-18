const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql_create_table = `CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL) ENGINE=INNODB;`
connection.query(sql_create_table)

const sql = `INSERT INTO people(name) VALUES ('Douglas'), ('Maria'), ('José');`
connection.query(sql)

app.get('/', (req,res) => {
  const sql_select_last_user = `SELECT name FROM people;`
  connection.query(sql_select_last_user, function(err, rows){
    if (err) throw err;
    let html_result = '<h1>Full Cycle!</h1><br>'
    html_result = html_result+'<ul>'
    rows.forEach(function(value){
      console.log(value.name)
      html_result = html_result+'<li>'+value.name+'</li>'
    })
    html_result = html_result+'</ul>'
    res.send(html_result)
  })
  // connection.end()
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})
