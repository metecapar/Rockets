$("#kayit-ol-button").click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Kayıt Başarılı!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/";
    }
  });
});


$("#admin-giris-button").click(function() {
  alert("Admin Giriş Başarılı!");
});
$("#admin-iletisim-güncelle-button").click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'İletişim Bilgileri Güncellendi!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/adminDashboard";
    }
  });
});
$("#admin-sifre-degistir").click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Sifre Güncellendi!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/adminDashboard";
    }
  });
});
$("#admin-duyuru-button").click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Duyuru Eklendi!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/adminDashboard";
    }
  });
});
$("#admin-image-add-button").click(function() {
  alert("Yeni Fotoğraflar Eklendi!");
});

$("#btn-sikayet").click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Mesajınız iletildi!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/";
    }
  });
});

$('#sikayet-form').click(function() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Giriş Başarılı!',
    showConfirmButton: false,
    timer: 1300
  }).then(function(result) {
    if (true) {
      window.location.href = "/adminDashboard";
    }
  });
});