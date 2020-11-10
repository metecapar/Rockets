$(document).ready(function() {
  //Randevu Günü bugünden geçmiş günlere alamazsın!!!
  var today = new Date().toISOString().split('T')[0];
  $("#eskiRandevuTarihi")[0].setAttribute('min', today);
  var today = new Date().toISOString().split('T')[0];
  $("#randevuGunu")[0].setAttribute('min', today);

  //Eski Gun ve saat
  $("#randevuGunu").on('change', function() {
    var halisahaSecimi2;
    //HalisahaSecimi
    var halisahaRadioButton = $("input[name='halisahaSecimi']:checked").val();
    if (halisahaRadioButton === 'ACIK') {
      halisahaSecimi2 = "ACIK";
    } else if (halisahaRadioButton === 'KAPALI') {
      halisahaSecimi2 = "KAPALI";
    } else {
      halisahaSecimi2 = "ISITMALI";
    }

    var secilenGun = $("#randevuGunu").val();
    var data = {
      secilenGun: secilenGun,
      halisahaSecimi: halisahaSecimi2
    }
    $.ajax({
      url: "/randevual-json",
      //  url: "randevu-guncelle-ajax",
      async: false,
      data: data,
      type: "get",
      success: function(sonuc) {

        $("option[name='saat']").prop('disabled', false);
        for (var i = 0; i < sonuc.data.length; i++) {
          //option taglerinde value'sı bizim db'den olan saati bul ve disable yap!!
          var test = $("option[name='saat']");
          $.each(test, function(index, items) {
            if (sonuc.data[i].r_saat === parseInt(items.value)) {
              console.log(sonuc.data[i].r_saat)
              $(this).prop('disabled', true);
            }
          })
        }
      }
    })
  })

  $("#randevu-guncelle").submit(function() {
    var eskiRandevu = $("#eskiRandevuTarihi").val();
    var eskiSaat = $("option[name='saat2']:checked").val();
    var randevuGunu = $("#randevuGunu").val();
    var randevuSaati = $("option[name='saat']:checked").val();
    var halisahaSecimi;
    var servisSecenegi;
    var videoSecenegi;
    var hakemSecenegi;
    var odemeSecenegi;

    //HalisahaSecimi
    var halisahaRadioButton = $("input[name='halisahaSecimi']:checked").val();
    if (halisahaRadioButton === 'ACIK') {
      halisahaSecimi = "ACIK";
    } else if (halisahaRadioButton === 'KAPALI') {
      halisahaSecimi = "KAPALI";
    } else {
      halisahaSecimi = "ISITMALI";
    }

    //Servis radio button için!
    var servisRadioButton = $("input[name='servisSecenegi']:checked").val();
    if (servisRadioButton === 'EVET') {
      servisSecenegi = "EVET";
    } else {
      servisSecenegi = "HAYIR";
    }

    //Video radio button için!
    var videoRadioButton = $("input[name='videoSecenegi']:checked").val();
    if (videoRadioButton === 'EVET') {
      videoSecenegi = "EVET";
    } else {
      videoSecenegi = "HAYIR";
    }

    //Hakem radio button için!
    var hakemRadioButton = $("input[name='hakemSecenegi']:checked").val();
    if (hakemRadioButton === 'EVET') {
      hakemSecenegi = "EVET";
    } else {
      hakemSecenegi = "HAYIR";
    }

    //Odeme seceneği radio button için!
    var odemeRadioButton = $("input[name='OdemeSecenegi']:checked").val();
    if (odemeRadioButton === 'HALISAHADA KREDİ KARTI') {
      odemeSecenegi = 'HALISAHADA KREDİ KARTI';
    } else {
      odemeSecenegi = 'NAKİT';
    }
    /*
    alert(eskiRandevu)
    alert(eskiSaat)
    alert(randevuGunu)
    alert(randevuSaati)
    alert(servisSecenegi)
    alert(videoSecenegi)
    alert(hakemSecenegi)
    alert(odemeSecenegi)
*/
    var randevuGuncelle = {
      eskiRandevuTarihi: eskiRandevu,
      eskiSaat: eskiSaat,
      r_gun: randevuGunu,
      r_saat: randevuSaati,
      halisaha_secimi: halisahaSecimi,
      r_servis: servisSecenegi,
      r_video: videoSecenegi,
      r_hakem: hakemSecenegi,
      r_odeme: odemeSecenegi,
    }
    //back - ende yollayacağımız bölüm!
    $.ajax({
      url: "/randevu-guncelle",
      async: false,
      data: randevuGuncelle,
      type: "post",
      success: function(sonuc) {
        if (sonuc.data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Randevu Güncellendi',
            showConfirmButton: false,
            timer: 1500
          }).then(function(result) {
            if (true) {
              window.location.href = "/kayitli-randevular";
            }
          });
        } else {
          Swal.fire({
            title: 'Güncelleme Başarısız!',
            text: 'Her şeyi doğru yaptığından emin misin?',
            icon: 'question',
            confirmButtonText: 'Tekrar Dene'
          }).then(function() {
            window.location.reload(true);
          })
        }
      }
    })
    return false;
  })


});