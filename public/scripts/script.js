function displayForm(elem){
  for(let x of document.querySelectorAll('form')){
    x.style.visibility='hidden'
  }
  document.getElementById(elem).style.visibility='visible';
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById('query_result').innerHTML = this.responseText;    
    }
  };
  xhttp.open("GET", "/find_patient", true);
  xhttp.setRequestHeader("Content-Type", "application/json")
  xhttp.send();
}


/*var mainContainer=document.getElementById('query_result')
var tabl='<table>'+
'<tr><th>Surname</th><th>Firstname</th><th>Town</th><th>SSC</th></tr>'

for(var patient of result){
    tabl=tabl+"<tr>"+
    "<td>"+patient.Surname+"</td>"+
    "<td>"+patient.Firstname+"</td>"+
    "<td>"+patient.Town+"</td>"+
    "<td>"+patient.SSC+"</td>"+
    "</tr>"}
tabl=tabl+'</table>'
mainContainer.innerHTML(tabl)*/