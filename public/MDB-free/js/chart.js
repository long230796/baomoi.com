//line

// lấy idinput và idChart đưa vào trycatch
for (var i = 1; i < 13; i ++) {
	var idValueSession = "sessionMonth"+JSON.stringify(i)
	var idChartSession = "chartSessionMonth"+JSON.stringify(i)

	var idValueNews = "newsMonth"+JSON.stringify(i)
	var idChartNews = "chartNewsMonth"+JSON.stringify(i)

	var idValueTheloaidaxem = "theloaidaxemMonth"+JSON.stringify(i)
	var idChartTheloaidaxem = "chartTheloaidaxemMonth"+JSON.stringify(i)

	var idValueAllcomment = "allcommentMonth"+JSON.stringify(i)
	var idChartAllComment = "chartAllcommentMonth"+JSON.stringify(i)

	tryCatch(idValueSession, idChartSession)
	tryCatch(idValueNews, idChartNews)
	tryCatch(idValueTheloaidaxem, idChartTheloaidaxem)
	tryCatch(idValueAllcomment, idChartAllComment)
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

	// nếu biểu đồ tryền vào có chữ session
	if (canvasId.indexOf("Session") !== -1) {
		var ctxL = document.getElementById(canvasId).getContext('2d');
		// luu gia tri vao mang
		var labels = []
		var data = []
		for (count of counts) {
			for (obj in count) {
				labels.push(obj)
				data.push(count[obj])
			}
		}

		var myLineChart = new Chart(ctxL, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
				
					{
						label: "Biểu đồ thống kê lượng người vào website",
						data: data,
						backgroundColor: [
							'rgba(0, 137, 132, .2)',
						],
						borderColor: [
							'rgba(0, 10, 130, .7)',
						],
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				legend: {
			      labels: {
			        padding: 20,
			        boxWidth: 40,
			        fontSize: 20
			      }
			    },
				
			}
		});
	}


	// nếu biểu đồ truyền vào có chữ news
	if (canvasId.indexOf("News") !== -1) {
		var ctxL = document.getElementById(canvasId).getContext('2d');
		// luu gia tri vao mang
		var labels = []
		var data = []
		for (count of counts) {
			for (obj in count) {
				labels.push(obj)
				data.push(count[obj])
			}
		}

		var myLineChart = new Chart(ctxL, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
				
					{
						label: "Biểu đồ thống kê bài viết theo tháng",
						data: data,
						backgroundColor:  [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
				legend: {
			      labels: {
			        padding: 20,
			        boxWidth: 40,
			        fontSize: 20
			      }
			    },
				
			}

		});
	}


	// nếu biểu đồ có chữ thể loại đã xem
	if (canvasId.indexOf("Theloaidaxem") !== -1) {
		var ctxP = document.getElementById(canvasId).getContext('2d');
		// luu gia tri vao mang
		var labels = ["xahoi", "thegioi", "vanhoa", "kinhte", "giaoduc", "thethao", "giaitri", "phapluat"]
		var data = []

		
		data[0] = filterCategory(counts, "xahoi").length	
		data[1] = filterCategory(counts, "thegioi").length	
		data[2] = filterCategory(counts, "vanhoa").length	
		data[3] = filterCategory(counts, "kinhte").length	
		data[4] = filterCategory(counts, "giaoduc").length	
		data[5] = filterCategory(counts, "thethao").length	
		data[6] = filterCategory(counts, "giaitri").length	
		data[7] = filterCategory(counts, "phapluat").length	
		
		//lọc dữ liệu theo từng thể loại
		function filterCategory(array, theloai) {
			return array.filter(function (item) {
				return item == theloai
			})
		}

		var myPieChart = new Chart(ctxP, {
		  plugins: [ChartDataLabels],
		  type: 'pie',
		  data: {
		    labels: labels,
		    datasets: [{
		      data: data,
		      backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ab47bc", "#009688", "#6d4c41"],
		      hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#ba68c8", "#26a69a", "#795548"]
		    }]
		  },
		  options: {
		    responsive: true,
		    legend: {
		      position: 'right',
		      labels: {
		        padding: 20,
		        boxWidth: 40,
		        fontSize: 20
		      }
		    },
		    plugins: {
		      datalabels: {
		        formatter: (value, ctx) => {
		          let sum = 0;
		          let dataArr = ctx.chart.data.datasets[0].data;
		          dataArr.map(data => {
		            sum += data;
		          });
		          let percentage = (value * 100 / sum).toFixed(2) + "%";
		          return percentage;
		        },
		        color: 'white',
		        labels: {
		          title: {
		            font: {
		              size: '16'
		            }
		          }
		        }
		      }
		    }
		  }
		});
	}


	if (canvasId.indexOf("Allcomment") !== -1) {
		var labels = []
		var data = []
		countComment = {}
		for (count in counts) {
			// dem cac ptu trung nhau cua mang
			for (arr of counts[count]) {
				countComment[arr.date] = (countComment[arr.date] || 0) + 1
			}
		}
		for (key in countComment) {
			labels.push(key)
			data.push(countComment[key])
		}
		console.log(labels, data)
		

		var ctxL = document.getElementById(canvasId).getContext('2d');
		var myLineChart = new Chart(ctxL, {
		    type: 'line',
		    data: {
		        labels: labels,
		        datasets: [{
		                label: "Lược bình luận theo ngày",
		                data: data,
		                backgroundColor: [
		                    'rgba(105, 0, 132, .2)',
		                ],
		                borderColor: [
		                    'rgba(200, 99, 132, .7)',
		                ],
		                borderWidth: 2
		            }
		            // {
		            //     label: "My Second dataset",
		            //     data: [28, 48, 40, 19, 86, 27, 90],
		            //     backgroundColor: [
		            //         'rgba(0, 137, 132, .2)',
		            //     ],
		            //     borderColor: [
		            //         'rgba(0, 10, 130, .7)',
		            //     ],
		            //     borderWidth: 2
		            // }
		        ]
		    },
		    options: {
		        responsive: true,
		        legend: {
			      labels: {
			        padding: 20,
			        boxWidth: 40,
			        fontSize: 20
			      }
			    },
		    }

		});
	}
}

