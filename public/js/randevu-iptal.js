$(document).ready(function() {

  $("a[name='iptal-et']").on('click', function() {

    var saat = $(this).attr('contextmenu');
    var tarih = $(this).attr('id');
    var halisaha = $(this).attr('value');

    data = {
      r_gun: tarih,
      halisaha_secimi: halisaha,
      r_saat: saat
    }

    alert(saat);
    alert(tarih);
    alert(halisaha);

    $.ajax({
      url: "randevu-iptal",
      type: "post",
      data: data,
      success: function(sonuc) {
        //sonuc:true'dan geliyor
        if (sonuc.sonuc) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rezervasyon Silindi!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.reload(true);
            }
          });
        } else {
          Swal.fire({
            title: 'Maalesef!',
            text: 'Rezervasyon Silinemedi!',
            icon: 'error',
            confirmButtonText: 'Tekrar Dene'
          }).then(function() {
            window.location.reload(true);
          })
        }
      }
    })
  });
});