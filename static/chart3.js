const url3= 'https://covid19-brazil-api.now.sh/api/report/v1';

function getJSON (url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function (){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200|304){
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    return xmlHttp.response
}
function tabela(){getJSON(url3, function (response) {
    let json = JSON.parse(response);
    let arr = Object.keys(json).map(key => [key, json[key]]) 
    let estados= arr[0][1]
    var div=document.getElementById("tabela")
    var a=[]
    var d=``
    console.log(estados[1])
    for(c in estados){
          a.push(`<tr>
          <td>${estados[c]["state"]}</td>
          <td> ${estados[c]["cases"]}</td>
          <td> ${estados[c]["deaths"]}</td>
          <td> ${estados[c]["refuses"]}</td>
          </tr><br>`)       
    }
    for(c in estados){
        d+=a[c]
    }
    div.innerHTML=d  
})};

tabela()