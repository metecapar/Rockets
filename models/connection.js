const express = require("express");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'halısahaDB'
});

connection.connect(function(err) {
  if (err) {
    console.log(err.stack);
  } else {
    console.log("DB bağlantısı başarılı!")
  }
});

module.exports = connection;