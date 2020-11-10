$(document).ready(function() {
  $('#uye-giris-form').submit(function() {
    var email = $("#Email").val();
    var sifre = $("#Sifre").val();
    var uye = {
      email: email,
      sifre: sifre,
    }
    $.ajax({
      url: "uye-giris",
      async: false,
      data: uye,
      type: "post",
      success: function(sonuc) {
        if (sonuc.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Giriş Başarılı!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.href = "/";
            }
          });
        } else {
          Swal.fire({

            title: 'Maalesef!',
            text: 'Email veya Şifre hatalı..',
            icon: 'error',
            confirmButtonText: 'Tekrar Dene'
          }).then(function() {
            window.location.reload(true);
          })
        }
      }
    })
    return false;
  });
});