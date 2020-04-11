const url2 = 'https://covid19-brazil-api.now.sh/api/report/v1/countries';

data_show()
chart('container5',grafico1,mod1);
//chart('container6',grafico2,mod1);

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

function chart(seletor,grafico,modificador_dado=null){getJSON(url2, function (response) {
    var json = JSON.parse(response);
    var arr = Object.keys(json).map(key => [key, json[key]])
    return grafico(modificador_dado(arr),seletor) 
})};


function date_update(x){
    var atualizacao=[x['updated_at']]  
    var atualizacao= atualizacao[0]

    let dia=atualizacao.substr(0,10)
    dia=dia.split("-")
    
    var hora=atualizacao.substr(11,8)
    hora=hora.split(":")

    if(parseInt(hora[0])<3){
        hora[0]=24-(3-hora[0])
        dia[2]=dia[2]-1
    }else{
        hora=[hora[0]-3,hora[1]]          
    }

    hora=`${hora[0]}:${hora[1]}` 
    dia=`${dia[2]}/${dia[1]}/${dia[0]}`
    document.getElementById("atualização").innerHTML = `Ultima Atualização: ${hora}  ${dia}`
}

function data_show(){getJSON(url2, function (response) {
    let json = JSON.parse(response);
    let arr = Object.keys(json).map(key => [key, json[key]])
    let brasil = arr[0][1][39];
    let letalidade=brasil['deaths']/(brasil['confirmed']/100)

    date_update(brasil);

    document.getElementById("resume_infectados").innerHTML =`<h2>${brasil['confirmed']}</h2><br><h4>Casos Confirmados</h4>`
    document.getElementById("resume_recuperados").innerHTML = `<h2>${brasil['recovered']}</h2><br><h4>Casos Recuperados</h4>`
    document.getElementById("resume_mortos").innerHTML = `<h2>${brasil['deaths']}</h2><br><h4>Óbitos</h4>`
    document.getElementById("resume_letalidade").innerHTML = `<h2>${letalidade.toFixed(2)}%</h2><br><h4>Letalidade</h4>`   
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
            categories: ['Brasil','China','Itália', 'EUA'],
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
    Highcharts.chart()  
}

