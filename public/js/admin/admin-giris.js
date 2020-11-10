$(document).ready(function() {

  $("#admin-form-giris").submit(function() {

    var adminEmail = $("#admin-email").val();
    var adminSifre = $("#admin-sifre").val();

    var data = {
      adminEmail: adminEmail,
      adminSifre: adminSifre
    }

    $.ajax({
      url: "/admin-giris",
      type: "post",
      data: data,
      success: function(sonuc) {
        if (sonuc.data) { //true gelirse üye başarıyla giriş yapmış olsun!
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Admin Giriş Başarılı!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.href = "/adminDashboard";
            }
          });
        } else { //res.json = false gelirse giriş başarılı olmasın ve tekrar reload etsin!
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Admin Giriş Başarısız!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.reload(true);
            }
          });
        }

      }
    });
    return false;
  });

});