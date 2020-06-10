// lấy idinput và idChart đưa vào trycatch
for (var i = 1; i < 13; i ++) {
    var idValueSeenNews = "allSeenNewsMonth"+JSON.stringify(i)
    var idChartSeenNews = "chartAllSeenNewsMonth"+JSON.stringify(i)

    tryCatch(idValueSeenNews, idChartSeenNews)
    
}
// nếu id = undefine thì vẫn chạy
// nếu có thì lấy giá trị, đưa vào biểu đồ
function tryCatch(idValue, idChart) {
    try {
        var value = JSON.parse((document.getElementById(idValue).value))
        chart(value, idChart)   
    } catch (error) {}
}

function chart(counts, canvasId) {


    var i = 1
    var labels = []
    for (element in counts) {  
        labels.push("bài viết " + JSON.stringify(i))
        i ++
    }

    valuesSorted = Object.values(counts).sort(function(a, b) {
      return b - a
    })
    // console.log(counts)
    // console.log(keysSorted)
    // console.log(valuesSorted)

    new Chart(document.getElementById(canvasId), {
        "type": "horizontalBar",
        "data": {
            "labels": labels,
            "datasets": [{
                "label": "Bài viết được xem nhiều nhất",
                "data": valuesSorted,
                "fill": false,
                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                ],
                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
                ],
                "borderWidth": 2
            }]
        },
        "options": {
            "scales": {
                "xAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    });

}