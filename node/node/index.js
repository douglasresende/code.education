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

const sql = `INSERT INTO people(name) values('Douglas');`
connection.query(sql)

app.get('/', (req,res) => {
  const sql_select_last_user = `SELECT name FROM people ORDER BY id DESC LIMIT 1;`
  connection.query(sql_select_last_user, function(err, result, fields){
    if (err) throw err;
    const nome_do_banco = result[0].name;
    res.send('<h1>Full Cycle!</h1><br>' + nome_do_banco)
  })
  connection.end()
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})
