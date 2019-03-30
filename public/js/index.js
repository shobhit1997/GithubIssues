// jQuery('#url_form').on('submit',function(e){
// e.preventDefault();
 
// });

function submit(){
  document.getElementById('loader').style.display="flex";
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      var json=JSON.parse(this.responseText);
      document.getElementById('username').innerHTML=json.username;
      document.getElementById('userid').innerHTML=json.user_id;
      document.getElementById('url1').innerHTML=json.url;
      document.getElementById('issues_24').innerHTML=json.issues_24;
      document.getElementById('issues_7').innerHTML=json.issues_7;
      document.getElementById('issues_after_7').innerHTML=json.issues_after_7;
      document.getElementById('total_issues').innerHTML=json.total_issues;
      document.getElementById('loader').style.display="none";
      document.getElementById('table').style.display="flex";
    }
  };
  xhttp.open("POST", window.location.origin+"/api/search", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var jsonObj={
    url : jQuery("#url").val()
  };
  xhttp.send(JSON.stringify(jsonObj)); 
}
function history(){
  window.location.href='/history';
}