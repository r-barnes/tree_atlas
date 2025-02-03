var reltext = {};
reltext[0] = "Current Distribution Only";
reltext[1] = "Low";
reltext[2] = "Medium";
reltext[3] = "High";

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

  $('.jumpMenu').change(function () {
    if ($(this).val() != '') {
      $(this).parent().attr('action', $(this).val()); // 
      $(this).parent().attr('target', '_blank'); // new window
      $(this).parent().submit(); // Go!
    }
  });

$("#combinedSelect").on("change", function (e) {
  var proxyThis = $(".usa-combo-box__select");
  var vURL = "/nrs/atlas/bird/";
  var sel = $(proxyThis).val();
  var spptxt = $(proxyThis).find(':selected').text();
  var taxa = $(proxyThis).find(':selected').data('taxa');
  var rel = $(proxyThis).find(':selected').data('rel');
  var sppHTML = spptxt.replace(" - ", " (<em>") + "</em>)";
  if (taxa == "tree") {
    vURL = "/nrs/atlas/tree/";
  }
  if (sel) {
    $("#selectOut").html("<p class=\"font-heading-md\"><strong>" + capitalize(taxa) + ":</strong> <a href=\"" + vURL + sel + "\" title=\"Visit the " + sppHTML + " page\" target=\"_parent\" id=\"fwdLink\">" + sppHTML + "</a></hp><p><strong>Model Reliability:</strong> " + reltext[rel] + " <img src=\"/nrs/atlas/local-resources/images/" + rel + ".gif\" alt=\"" + reltext[rel] + "\" /></p>").focus();
  } else {
    $("#selectOut").html("&nbsp;");
  }
});
