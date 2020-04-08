const url = 'https://pomber.github.io/covid19/timeseries.json';

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

Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};

Highcharts.setOptions(Highcharts.theme);

function grafico1(data,seletor){
    Highcharts.chart(seletor, {

        title: {
            text: "CASOS ACUMULADOS BRASIL"
        },
        series: [{
            name: 'Casos',
            data: data.map(values => values[1])  
        },
        {
            type: 'area', 
            name: 'Casos',  
            data: data.map(values => values[1]),
            color:"#ffff00"  
        }],

        yAxis: {
            title: {
                text: 'Número de pessoas'
            }
        },

        xAxis: {
            
            title: {
                text: 'Data'
            },
            categories:data.map(values => values[0])
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            },
            area: {
                marker: {
                    radius: 4
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
               
            },
            series: {
                animation: {
                    duration: 1500
                },
            }
        },
    });
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}
function grafico2(data,seletor){
    Highcharts.chart(seletor, {
        title: {
            text: "NOVOS CASOS POR DIA"
        },
        series: [{
            type: 'column',
            name: 'Casos Novos',
            data: data.map(values => values[1]) 
        }
        ],

        yAxis: {
            title: {
                text: 'Novas Infecções'
            }
        },

        xAxis: {
            
            title: {
                text: 'Data'
            },
            categories:data.map(values => values[0])
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 1500
                },
            }
        },
    });
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}
function grafico3(data,seletor){
    Highcharts.chart(seletor, {
        title: {
            text: "ALTA VS MORTALIDADE"
        },
        series: [
        {
            type: 'area',
            name: 'Mortos',
            data: data.map(values => values[2]),
            color:'#B22222' 
        },
        {
            type: 'area',
            name: 'Curados',
            data: data.map(values => values[3]),
            color:'#00CED1'
        }],
        yAxis: {
            title: {
                text: 'Numero de pessoas'
            }
        },

        xAxis: {
            
            title: {
                text: 'Data'    
            },
            categories:data.map(values => values[0])
        },

        plotOptions: {
            area: {
                marker: {
                    radius: 4
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },       
            },
            series: {
                animation: {
                    duration: 1500
                },
            }
        },
    });
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}
function grafico4(data,seletor){
    Highcharts.chart(seletor, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'COMPARATIVO'
        },
        tooltip: {
            pointFormat: '{data.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Casos:',
            colorByPoint: true,
            data: [{
                name: 'Infectados',
                y: data.map(values => values[1])[data.map(values => values[1]).length-1],
                color: Highcharts.getOptions().colors[0] 
            }, {
                name: 'Mortes',
                y: data.map(values => values[2])[data.map(values => values[2]).length-1],
                sliced: true,
                selected: true
            }, {
                name: 'Curados',
                y: data.map(values => values[3])[data.map(values => values[3]).length-1],
            },]
        }]
});
    document.getElementById(seletor).innerHTML = Highcharts.chart()  
}


function chart(seletor,grafico,modificador_dado=null){getJSON(url, function (response) {
    var json = JSON.parse(response);
    var arr = Object.keys(json).map(key => [key, json[key]])
    const brasil = arr[21][1];
    var data = []
    data.push(["Data", "Infectados", "Mortes", "Curados"])
    for (i = 0; i < Object.keys(brasil).length; i++) {
        var row = [brasil[i]['date'], brasil[i]['confirmed'], brasil[i]['deaths'], brasil[i]['recovered']]
        data.push(row);
    }// --- Toda essa parte n muda, cria isso de forma q só execute uma vez

    if(modificador_dado!==null){   
        return grafico(modificador_dado(data),seletor)
    }

    return grafico(data,seletor)
   
})};

function mod1(data){
    data.splice(0,36);
    return data
}
function mod3(data){
    data.splice(0,54);
    return data
}
function mod2(data){
    let new_data=[];
    new_data.push(["Data","Casos Novos"]);
    for(i=1; i<data.length; i++){
        var row = [data[i][0],data[i][1]-data[i-1][1]]
        new_data.push(row);
    }
    let g=new_data.splice(0,47);
    return new_data
}

chart('container1',grafico1,mod1);
chart('container2',grafico2,mod2);
chart('container3',grafico3,mod3);
chart('container4',grafico4,mod1);



