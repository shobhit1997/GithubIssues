$(document).ready(function(e){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      data.map(function(item){
        $("#table_body").append('<tr><td>'+item.username+'</td><td>'+item.user_id+'</td><td>'+item.url+'</td><td>'+item.total_issues+'</td><td>'+item.issues_24+'</td><td>'+item.issues_7+'</td><td>'+item.issues_after_7+'</td></tr>');
      })
      document.getElementById('loader').style.display="none";
      document.getElementById('table_body').style.display="flex";
    }
  };
  xhttp.open("GET", window.location.origin+"/api/history", true);
  xhttp.send();
});