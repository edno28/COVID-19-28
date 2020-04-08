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
})};
