//Bu sayfa kullanıcının yapacağı get isteklerini içeriyor
// Ayırmamın sebebi app.js çok karışmaması için  ~ Oğuzhan Bayrak
const express = require("express");
const router = express.Router();
const connection = require("../models/connection");
const passport = require("passport");
const passportSetup = require("../config/passport-setup");


router.get("/", function(req, res) {
  //Halısaha Duyurularını Anasayfa'da bas!
  connection.query("Select Duyurular,Duyurular2 from Halısaha", function(err, rows) {
    if (!err) {
      if (req.session.loggedin) {
        console.log(req.session);
        res.render("anasayfa", {
          rows: rows
        });
      } else {

        res.render("anasayfa", {
          rows: rows
        });

      }
    }
  });
});


router.get("/google", passport.authenticate('google', {
  scope: ['profile']
}));


router.get("/auth/google/redirect", passport.authenticate('google'), function(req, res) {
  req.session.loggedin = true;
  req.session.username = req.user.username;
  console.log(req);
  res.redirect("/");
})
router.get("/facebook", function(req, res) {
  res.send("test");
});

router.get("/kayit-ol", function(req, res) {
  res.render("kayıtOl");
});

router.post("/kayit-ol", function(req, res) {

  var yeniUye = {
    uye_nick: req.body.k_adi,
    uye_ad: req.body.isim,
    uye_soyad: req.body.soyisim,
    uye_tel: req.body.telefon,
    uye_email: req.body.email,
    uye_sifre: req.body.sifre
  }

  connection.query("INSERT INTO UYE SET ?", yeniUye, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Kayit işlemi başarılı!");
      console.log(req);
    }
  });
});

router.get("/uye-giris", function(req, res) {
  res.render("uyeGiris");
});

router.post("/uye-giris", function(req, res) {

  var uyeEmail = req.body.email; //email => ajax'tan geliyor!
  var uyeSifre = req.body.sifre;
  if (uyeEmail && uyeSifre) {
    connection.query("select * from UYE where uye_email = ? AND uye_sifre = ?", [uyeEmail, uyeSifre], function(err, results, fields) {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = uyeEmail;
        //Ajax'a gönderiyoruz success mesajını!
        res.json({
          success: true
        });

      } else {
        res.json({
          success: false
        });

      }
      res.end();
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
});
//return Json(false, JsonRequestBehavior.AllowGet);
router.get("/cikis-yap", function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("çıkış başarılı!");
      res.redirect("/");
    }
  })

})

router.get("/iletisim", function(req, res) {
  //DB'den iletişim bilgilerini çek!
  connection.query("Select telefon,Adres from Halısaha ", function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render("iletisim", {
        rows: rows
      });
      console.log(rows);
    }
  })

});

router.post("/iletisim", function(req, res) {

  var yeniSikayet = {
    Sikayetci_adi: req.body.isim,
    Sikayetci_soyad: req.body.soyisim,
    Sikayetci_email: req.body.email,
    Sikayetci_telefon: req.body.tel,
    Sikayetci_mesaj: req.body.mesaj
  }
  connection.query("INSERT INTO Sikayetler SET ?", yeniSikayet, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sikayet başarıyla Gönderildi!");
    }
  });

});

router.get("/hakkimizda", function(req, res) {
  res.render("hakkimizda");
});

router.get("/randevual", function(req, res) {
  if (req.session.loggedin) {
    var userEmail = req.session.username;

    res.render("randevual", {
      userEmail: userEmail
    });
  } else {
    res.redirect("/");
  }
});
router.get("/randevual-json", function(req, res) {
  var secilenGun = req.query.secilenGun;
  var halisahaSecimi = req.query.halisahaSecimi;
  console.log(secilenGun);
  connection.query("Select r_saat from RANDEVU where halisaha_secimi=? AND r_gun=?", [halisahaSecimi, secilenGun], function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json({
        data: rows
      })
    }
  });
});
router.post("/randevual", function(req, res) {

  var yeniRandevu = {
    uye_email: req.body.uye_email,
    r_gun: req.body.r_gun,
    r_saat: req.body.r_saat,
    halisaha_secimi: req.body.halisaha_secimi,
    r_servis: req.body.r_servis,
    r_video: req.body.r_video,
    r_hakem: req.body.r_hakem,
    r_odeme: req.body.r_odeme

  }
  connection.query("INSERT INTO RANDEVU SET ?", yeniRandevu, function(err, results) {
    if (err) {
      console.log(err);
      res.json({
        gelenBoolean: false
      })
    } else {
      res.json({
        gelenBoolean: true
      })
    }
  });
});


router.get("/kayitli-randevular", function(req, res) {

  var uye_email = req.session.username;
  connection.query("Select date_format(r_gun,'%d/%m/%Y') as r_gun,halisaha_secimi,r_gun as RandevuTarihi, CURDATE() as bugun from RANDEVU where uye_email=?", [uye_email], function(err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      res.render("kayitli-randevular", {
        rows: rows
      });
    }
  });
});
router.get("/randevu-guncelle", function(req, res) {
  if (req.session.loggedin) {

    res.render("randevu-guncelle", {
      uyeEmail: req.session.username
    });
  } else {
    res.redirect("/");
  }
});

router.get("/randevu-guncelle-ajax", function(req, res) {
  var secilenGun = req.query.secilenGun;
  var username = req.session.username;
  console.log(secilenGun);
  connection.query("Select r_saat,r_id from RANDEVU where halisaha_secimi=? AND uye_email=?", [halisahaSecimi, username], function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json({
        data: rows
      })
    }
  });
});

router.post("/randevu-guncelle", function(req, res) {

  var randevuID;
  // Randevu ID'sini bulmamız için select sorgusu çalıştırmamız gerekmektedir!
  var uyeEmail = req.session.username;
  var tarih = req.body.eskiRandevuTarihi;
  var eskiSaat = req.body.eskiSaat;


  connection.query("Select r_id from RANDEVU where uye_email =? and r_saat=? and r_gun=?", [uyeEmail, eskiSaat, tarih], function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      //RandevuID'si bulunan rez. update yapabiliriz.  => where r_id = RandevuID olacak!
      randevuID = rows[0].r_id;
      var halisaha_secimi = req.body.halisaha_secimi;
      var r_gun = req.body.r_gun;
      var r_saat = req.body.r_saat;
      var r_servis = req.body.r_servis;
      var r_video = req.body.r_video;
      var r_hakem = req.body.r_hakem;
      var r_odeme = req.body.r_odeme;

      connection.query("UPDATE RANDEVU SET r_gun=?,r_saat=?,halisaha_secimi=?,r_servis=?,r_video=?,r_hakem=?,r_odeme=? where r_id='" + randevuID + "'", [r_gun, r_saat, halisaha_secimi, r_servis, r_video, r_hakem, r_odeme], function(err, rows, field) {
        if (err) {
          console.log(err);
          res.json({
            data: false
          })
        } else {
          //Update Başarılı olduğunda! Ajax'a yolluyoruz ve success mesajı basıyoruz!
          res.json({
            data: true
          })

        }
      });
    }
  })
});


// router.get("/randevu-guncelle-ajax", function(req, res) {
//   var uyeEmail = req.session.username;
//   var tarih = req.query.tarih;
//   var halisaha = req.query.halisaha;
//   var data = {
//     uyeEmail: uyeEmail,
//     tarih: tarih,
//     halisaha: halisaha
//   }
//   res.json({
//     data: data
//   })
// });

// router.post("/randevu-guncelle", function(req, res) {
//   var uyeEmail = req.session.username;
//   var tarih = req.query.tarih;
//   var halisaha = req.query.halisaha;
//   //-------------------
//   var r_gun = req.body.r_gun;
//   var r_saat = req.body.r_saat;
//   var halisaha_secimi = req.body.halisaha_secimi;
//   var r_servis = req.body.r_servis;
//   var r_video = req.body.r_video;
//   var r_hakem = req.body.r_hakem;
//   var r_odeme = req.body.r_odeme;
//   console.log(tarih);
//   console.log(halisaha);
//


router.get("/randevu-iptal", function(req, res) {

  var userEmail = req.session.username;

  connection.query("Select date_format(r_gun,'%d/%m/%Y') as r_gun,halisaha_secimi,CURDATE() as bugun,r_gun as RandevuTarihi,r_saat from RANDEVU where uye_email=?", [userEmail], function(err, rows, field) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.render("randevu-iptal", {
        rows: rows
      });
    }
  });
});

router.post("/randevu-iptal", function(req, res) {
  var uye_email = req.session.username;
  var r_gun = req.body.r_gun;
  var halisaha_secimi = req.body.halisaha_secimi;
  var r_saat = req.body.r_saat;

  connection.query("Delete from RANDEVU where r_gun=? and halisaha_secimi =? \
  and uye_email=? and r_saat=?", [r_gun, halisaha_secimi, uye_email, r_saat], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.json({
        sonuc: false
      })
    } else {
      res.json({
        sonuc: true
      })
    }
  });



});
router.get("/halisaha-doluluk", function(req, res) {
  res.render("halisaha-doluluk");
});
router.get("/acik-saha-json", function(req, res) {
  var dolulukTakvim = req.query.dolulukTakvim;
  var halisahaSecimi = req.query.halisahaSecimi;
  //select * from RANDEVU where halisaha_secimi = 'ACIK' and r_gun = '2019-12-27'
  connection.query("select * from RANDEVU where halisaha_secimi=? and r_gun=?", [halisahaSecimi, dolulukTakvim], function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
      res.json({
        data: rows
      })
    }
  });
});
router.get("/kapali-saha", function(req, res) {
  res.render("kapali-saha");
});
router.get("/isitmali-saha", function(req, res) {
  res.render("isitmali-saha");
});

router.get("/galeri", function(req, res) {
  connection.query("Select * from halisaha_galeri", function(err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.render("galeri", {
        rows: rows
      })
    }
  })

})

router.get("/google-kayit", function(req, res) {
  res.render("google-kayit");
})
router.get("/face-kayit", function(req, res) {
  res.render("face-kayit");
})
router.get("/2fa-giris", function(req, res) {
  res.render("2fa-giris");
})
router.get("/halisaha-degerlendirme", function(req, res) {
  if (req.session.loggedin) {
    res.render("halisaha-degerlendirme");
  } else {
    res.redirect("/");
  }
})
router.get("/profil-guncelle", function(req, res) {
  if (req.session.loggedin) {
    res.render("profil-guncelle");
  } else {
    res.redirect("/");
  }
})

router.post("/profil-guncelle", function(req, res) {
  var yeniIsim = req.body.isim;
  var yeniSoyisim = req.body.soyisim;
  var yeniNick = req.body.nick;
  var yeniSifre = req.body.yeni_sifre;
  connection.query("UPDATE UYE SET uye_ad=?,uye_soyad=?,uye_nick=?,uye_sifre=? WHERE uye_email=?", [yeniIsim, yeniSoyisim, yeniNick, yeniSifre, req.session.username], function(err, results, fields) {
    if (err) {
      console.log(err)
    } else {
      console.log("Güncelleme Başarılı!");
      res.redirect("/");
    }
  })

});

router.get("/sosyalmedya", function(req, res) {
  //Reklam basacağımız yer!

  connection.query("Select reklam_filename from halisaha_reklam ", function(err, rows) {
    if (!err) {
      console.log(rows);
      res.render("sosyalmedya", {
        rows: rows
      });
    }
  });

})

module.exports = router;