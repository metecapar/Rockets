  const express = require("express");
  const router = express.Router();
  const connection = require("../models/connection");
  const multer = require("multer");
  const path = require("path");


  router.get("/admin-giris", function(req, res) {
    res.render("admin-giris");
  });

  router.post("/admin-giris", function(req, res) {

    var adminEmail = req.body.adminEmail;
    var adminSifre = req.body.adminSifre;

    connection.query("Select * from ADMİN", function(err, rows) {
      if (!err) {
        if (rows[0].admin_email === adminEmail && rows[0].admin_sifre === adminSifre) {
          //Uye emaili girilenle eşitse
          //şifreleri karşılaştırabiliriz.
          res.json({
            data: true
          })
        } else {
          //Email eşit değil demek ki!
          res.json({
            data: false
          })
        }
      }
    });
  });
  //Tum Randevuları Görüntüle!
  router.get("/adminDashboard", function(req, res) {
    res.render("admin/admin-dashboard");
  });
  router.get("/admin-goruntule", function(req, res) {
    var r_gun = req.query.r_gun;
    connection.query("Select * from RANDEVU where r_gun='" + r_gun + "'", function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          data: rows
        });
      }
    });
  })
  router.get("/iletisimGuncelle", function(req, res) {
    res.render("admin/iletisimGuncelle");
  });
  router.post("/iletisimGuncelle", function(req, res) {


    var telefon = req.body.telefon;
    var adres = req.body.adres;

    //1 tane halısahamız olacağı için id_halisaha her zmana = 1;
    connection.query("Update Halısaha set telefon=?,Adres=? where id_halisaha=" + 1 + "", [telefon, adres], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("Update Başarılı!");
        console.log(rows);
      }
    })
  });

  router.get("/sikayet-oneri", function(req, res) {
    connection.query("Select * from Sikayetler", function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.render("admin/sikayet-öneriler", {
          rows: rows
        });
      }
    });
  });
  router.post("/sikayet-oneri", function(req, res) {
    var r_id = req.body.veri;
    connection.query("Delete from Sikayetler where Sikayetler_id=" + r_id + "", function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          data: true
        })
      }
    });
  });

  router.get("/SifreDegistir", function(req, res) {
    res.render("admin/sifre-degistir");
  });

  router.post("/SifreDegistir", function(req, res) {

    var yeniSifre = req.body.yeniSifre;

    connection.query("Update ADMİN set admin_sifre='" + yeniSifre + "'", function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sifre Başarıyla Değiştirildi!");
      }
    })


  });

  router.get("/duyuru-galeri-ekle", function(req, res) {
    res.render("admin/duyuru-ve-image-ekle");
  });

  router.post("/duyuru-galeri-ekle", function(req, res) {

    var duyuru1 = req.body.duyuru_1;
    var duyuru2 = req.body.duyuru_2;

    connection.query("Update Halısaha set Duyurular=?,Duyurular2=? where id_halisaha=1", [duyuru1, duyuru2], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("Duyurular Eklendi!");
      }
    });
  });

  //Multer paketini kullanarak public/uploads lara image ekleyeceğiz!
  const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage
  }).single('myImage');

  router.post("/galeri-ekle", function(req, res) {

    upload(req, res, (err) => {
      if (err) {
        res.render("/admin/duyuru-ve-image-ekle", {
          msg: err
        })
      } else {
        var filename = req.file.filename;

        //DB'ye ekleyeğimiz yer!
        connection.query("insert into halisaha_galeri set filename = ?", [filename], function(err, rows) {
          if (err) {
            console.log(err);
          } else {
            console.log(rows);
          }
        })
        console.log(req.file);
        console.log(req.file.filename);
        res.send("test");
      }
    });
  });

  router.get("/admin-uye-goruntule", function(req, res) {
    connection.query("Select * from UYE", function(err, rows) {
      if (!err) {
        res.render("admin/admin-uye-goruntule", {
          rows: rows
        });
      }
    })


  });

  router.get("/admin-reklam-yonetim", function(req, res) {
    res.render("admin/admin-reklam-yonetim");
  });

  const storageReklam = multer.diskStorage({
    destination: './public/reklam',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
  });

  const uploadReklam = multer({
    storage: storageReklam
  }).single('reklam');

  router.post("/reklam-ekle", function(req, res) {

    uploadReklam(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        //Db'ye ekleyeceğimiz yer!
        var reklam = req.file.filename;
        connection.query("insert into halisaha_reklam set reklam_filename=?", [reklam], function(err, rows) {
          if (err) {
            console.log(err);
          } else {
            console.log(rows);
          }
        })
      }
    })

  });

  module.exports = router;