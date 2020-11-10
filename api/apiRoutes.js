const express = require("express");
const router = express.Router();
const connection = require("../models/connection");

//************CRUD işlemleri yapılacak********************

//READ == Get!
router.route("/api/uyeler").get(function(req, res) {
    connection.query("Select * from UYE", function(err, rows, files) {
      if (!err) {
        res.send(rows);
      } else {
        res.send("tüm üyeler getirilirken hatayla karşılaşıldı!");
      }
    });
  })
  //CREATE == post
  .post(function(req, res) {

    connection.query("INSERT INTO `UYE` (`uye_id`,`uye_nick`,`uye_ad`,`uye_soyad`,`uye_tel`,`uye_email`,`uye_sifre`) VALUES (" + req.body.uye_id +
      ",'" + req.body.uye_nick + "','" + req.body.uye_ad + "','" + req.body.uye_soyad + "','" + req.body.uye_tel + "','" +
      req.body.uye_email + "','" + req.body.uye_sifre + "')",

      function(err, rows, files) {
        if (!err) {
          res.send("İnsert başarılı!");
        } else {
          res.send(err);
        }
      });
  })

  //DELETE == DELETE
  .delete(function(req, res) {
    connection.query("Delete from `UYE`", function(err, rows, files) {
      if (!err) {
        res.send("Tüm üyeler tablodan silindi!");
      } else {
        res.send(err);
      }
    });
  })
//-----------------Spesifik Alanlar için Gerekli işlemler /uyeler/:uye-nick--------------------------------------------------

//Uye-nick'i verilen url db'den veri çeken fonksiyon!
router.route("/api/uyeler/:uye_nick").get(function(req, res) {
    connection.query("Select * from UYE where uye_nick ='" + req.params.uye_nick + "'", function(err, rows, field) {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    });
  })
  //Uye-nick'i verilen url db'den uyenin email'ini güncelleyen fonksiyon!
  .put(function(req, res) {

    connection.query("Update UYE set uye_email = '" + req.body.uye_email + "'  where uye_nick = '" + req.params.uye_nick + "'", function(err, rows, field) {
      if (!err) {
        res.send("Güncelleme İşlemi Başarılı!");
      } else {
        res.send(err);
      }
    });
  })
  //Uye-nick'i verilen url db'den uyeyi silen fonksiyon!
  .delete(function(req, res) {

    connection.query("Delete from UYE where uye_nick ='" + req.params.uye_nick + "'", function(err, rows, field) {
      if (!err) {
        res.send("İstenilen eleman silindi!");
      } else {
        res.send(err);
      }
    });
  })




module.exports = router;