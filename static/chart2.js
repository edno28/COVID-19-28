const url2 = 'https://covid19-brazil-api.now.sh/api/report/v1/countries';

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

function data_show(){getJSON(url2, function (response) {
    let json = JSON.parse(response);
    let arr = Object.keys(json).map(key => [key, json[key]])
    let brasil = arr[0][1][39];
    let letalidade=brasil['deaths']/(brasil['confirmed']/100)

    var atualizacao=[brasil['updated_at']]  
    var atualizacao= atualizacao[0]
    var dia=atualizacao.substr(0,10)
    var hora=atualizacao.substr(11,8)
    hora=hora.split(":")
    hora=[hora[1],hora[0]-4]
    hora=`${hora[1]}:${hora[0]}`

    console.log(hora)

    document.getElementById("resume_infectados").innerHTML =`<h1>${brasil['confirmed']}</h1><br><h4>Casos Confirmados</h4>`
    document.getElementById("resume_recuperados").innerHTML = `<h1>${brasil['recovered']}</h1><br><h4>Casos Recuperados</h4>`
    document.getElementById("resume_mortos").innerHTML = `<h1>${brasil['deaths']}</h1><br><h4>Óbitos</h4>`
    document.getElementById("resume_letalidade").innerHTML = `<h1>${letalidade.toFixed(2)}%</h1><br><h4>Letalidade</h4>`
    document.getElementById("atualização").innerHTML = `Ultima Atualização: ${hora}  ${dia}`
    
})};
data_show()

chart('container5',grafico1,mod1);
chart('container6',grafico2,mod1);


function chart(seletor,grafico,modificador_dado=null){getJSON(url2, function (response) {
    var json = JSON.parse(response);
    var arr = Object.keys(json).map(key => [key, json[key]])
    return grafico(modificador_dado(arr),seletor) 
})};

function mod1(data){
    const ch1na = data[0][1][3];
    const eua = data[0][1][17];
    const brasil = data[0][1][39];
    const italia = data[0][1][10];
    new_data=[];
    var confirmados = [ brasil['confirmed'],ch1na['confirmed'],italia['confirmed'],eua['confirmed']]
    var mortos = [ brasil['deaths'],ch1na['deaths'],italia['deaths'],eua['deaths']]
    var curados = [ brasil['recovered'],ch1na['recovered'],italia['recovered'],eua['recovered']]
    new_data.push(confirmados, mortos, curados);   
    return new_data
}

function grafico1(data,seletor){
    Highcharts.chart(seletor, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Situação de Países Foco'
        },
        subtitle: { 
            text: 'Fonte: WHO'
        },
        xAxis: {
            categories: ['Braisl','Ch1na','Itália', 'EUA'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pessoas',
                align: 'h1gh'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
        },
        series: [{
            name: 'Confirmados',
            data: data[0],
            color:"#FF0000"
        }, {
            name: 'Tratados',
            data: data[2],
            color:"#3CB371"
        }, {
            name: 'Mortos',
            data: data[1],
            color:"#000000"
        },]
    });
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}

function grafico2(data,seletor){
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
                    enabled: false,
                    
                },
                showInLegend: true
            }
        },     
        series: [{
            name: 'Contaminados',
            colorByPoint: true,
            data: [{
                name: 'Suldeste 9487',
                y: 9487,
                color:"#3CB371",
                sliced: true,
                selected: true
            },{ 
                name: 'Norte 1222',
                y: 1222,
                color:"#C71585"
            }, {
                name: 'Nordeste  2825',
                y: 2825,
                color:"#FF4500"
            }, {
                name: 'Centro-Oeste  842',
                y: 842,
                color:"#6A5ACD"
            }, {
                name: 'Sul  1551',
                y: 1428,
                color:"#FFFF00"
            },]
            }]
    });
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}



