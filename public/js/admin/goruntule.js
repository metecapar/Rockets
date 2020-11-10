$(document).ready(function() {

  $("#randevuGunu").on('change', function() {
    var tarih = $(this).val();
    data = {
      r_gun: tarih
    }
    $.ajax({
      url: "/admin-goruntule",
      type: "get",
      data: data,
      success: function(sonuc) {
        for (var i = 0; i < 73; i++) { //73 tane halisaha olabilir 1 günde!
          $('#eklenen').remove();
        }

        var data = sonuc.data;
        data.forEach(function(items) {
          var newRows = "";
          $('thetable tr').not(':first').not(':last').remove();
          newRows += "<tr id='eklenen'><td>" + items.r_gun + "</td> <td>" + items.uye_email + "</td><td>" + items.r_saat + "</td><td>" +
            items.halisaha_secimi + "</td><td>" + items.r_odeme + "<td>" + items.r_video + "</td><td>" + items.r_hakem + "</td><td>" + items.r_servis + "</td></tr>"
          $("table tr:first").after(newRows);
        })
      }
    })
  });

});