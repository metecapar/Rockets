$(document).ready(function() {
  $("Mytable").remove();
  //Randevu Günü bugünden geçmiş günlere alamazsın!!!
  var today = new Date().toISOString().split('T')[0];
  $("#dolulukTakvim")[0].setAttribute('min', today);

  $('.halisaha-doluluk').on('submit', function() {

    var dolulukTakvim = $("#dolulukTakvim").val();
    var halisahaSecimi;

    //HalisahaSecimi
    var halisahaRadioButton = $("input[name='halisahaSecimi']:checked").val();
    if (halisahaRadioButton === 'ACIK') {
      halisahaSecimi = "ACIK";
    } else if (halisahaRadioButton === 'KAPALI') {
      halisahaSecimi = "KAPALI";
    } else {
      halisahaSecimi = "ISITMALI";
    }


    var data = {
      dolulukTakvim: dolulukTakvim,
      halisahaSecimi: halisahaSecimi
    }
    $.ajax({
      url: "/acik-saha-json",
      type: "get",
      data: data,
      success: function(sonuc) {
        //table sürekli eklememesi için hepsini başta siliyorum..
        for (var i = 0; i < 24; i++) { //24 saat var en fazla 24 saatlik randevu oluşturuldu için.
          $('#eklenen').remove();
        }
        var data = sonuc.data; // [obj,obj,obj...];
        data.forEach(function(items) {
          var newRows = "";
          $('thetable tr').not(':first').not(':last').remove();
          newRows += "<tr id='eklenen'><td>" + items.uye_email + "</td><td>" + items.r_saat + "</td></tr>"
          $("table tr:first").after(newRows);
        })
        $("#Mytable").css({
          visibility: ''
        });
      }
    });
    return false;
  });
});