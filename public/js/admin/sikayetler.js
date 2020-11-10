$(document).ready(function() {
  $("span[id='button']").on('click', function() {
    var button = $(this).attr('value');
    var data = {
      veri: button
    }
    $.ajax({
      url: "sikayet-oneri",
      type: "post",
      data: data,
      success: function(sonuc) {
        if (sonuc.data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Silme İşlemi Başarılı!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.href = "/adminDashboard";
            }
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Silme işlemi hatalı!',
            showConfirmButton: false,
            timer: 1300
          }).then(function(result) {
            if (true) {
              window.location.href = "/adminDashboard";
            }
          });
        }
      }
    })
  })
});