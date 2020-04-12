const url3= 'https://covid19-brazil-api.now.sh/api/report/v1';

tabela()
chart_regional(grafico8,'container6')

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
    console.log(estados[0])
    var div=document.getElementById("tabela")
    var a=``
    for(c in estados){
          a+=`<tr>
          <td>${estados[c]["state"]}</td>
          <td>${estados[c]["cases"]}</td>
          <td>${estados[c]["deaths"]}</td>
          <td>${estados[c]["suspects"]}</td>
          </tr><br>`        
    }
    div.innerHTML=a  
})};

function chart_regional(grafico,seletor){getJSON(url3, function (response) {
    let json = JSON.parse(response);
    let arr = Object.keys(json).map(key => [key, json[key]]) 
    let estados= arr[0][1]
    let nordeste=[estados[12]['cases']+estados[24]['cases']+estados[2]['cases']+estados[13]['cases']+estados[6]['cases']+estados[19]['cases']+estados[23]['cases']+estados[22]['cases']+estados[9]['cases']]
    let norte=[estados[3]['cases']+estados[25]['cases']+estados[20]['cases']+estados[21]['cases']+estados[16]['cases']+estados[15]['cases']+estados[26]['cases']]
    let centro_oeste=[estados[17]['cases']+estados[18]['cases']+estados[14]['cases']+estados[10]['cases']]
    let suldeste=[estados[0]['cases']+estados[1]['cases']+estados[4]['cases']+estados[11]['cases']]
    let sul=[estados[7]['cases']+estados[8]['cases']+estados[5]['cases']]

    return grafico(norte,nordeste,centro_oeste,suldeste,sul,'container6')
    
})}

function grafico8(norte,nordeste,centro_oeste,suldeste,sul,seletor){
    Highcharts.chart(seletor, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'SITUAÇÃO REGIONAL'
        },
        tooltip: {
            pointFormat: `{series.name}: {point.y:.1f}<br>
                        <b>{point.percentage:.1f}%</b> `
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%'
                    
                },
                showInLegend: true
            }
        },     
        series: [{
            name: 'Contaminados',
            colorByPoint: true,
            data: [{
                name: `Suldeste  ${suldeste[0]}`,
                y: suldeste[0],
                color:"#3CB371",
                sliced: true,
                selected: true
            },{ 
                name: `Norte  ${norte[0]}`,
                y: norte[0],
                color:"#C71585"
            }, {
                name: `Nordeste  ${nordeste[0]}`,
                y: nordeste[0],
                color:"#FF4500"
            }, {
                name: `Centro-Oeste  ${centro_oeste[0]}`,
                y: centro_oeste[0],
                color:"#6A5ACD"
            }, {
                name: `Sul  ${sul[0]}`,
                y: sul[0],
                color:"#FFFF00"
            },]
            }]
    });
    Highcharts.chart()  
}





