//line
try {
	var valueMonth1 = JSON.parse((document.getElementById("sessionMonth1").value))
	chart(valueMonth1, "Month1")
} catch (error) {

}

try {
	var valueMonth2 = JSON.parse((document.getElementById("sessionMonth2").value))
	chart(valueMonth2, "Month2")

} catch (error) {

}

try {
	var valueMonth3 = JSON.parse((document.getElementById("sessionMonth3").value))
	chart(valueMonth3, "Month3")
	
} catch (error) {

}

try {
	var valueMonth4 = JSON.parse((document.getElementById("sessionMonth4").value))
	chart(valueMonth4, "Month4")

} catch (error) {

}

try {
	var valueMonth5 = JSON.parse((document.getElementById("sessionMonth5").value))
	chart(valueMonth5, "Month5")
	
} catch (error) {

}

try {
	var valueMonth6 = JSON.parse((document.getElementById("sessionMonth6").value))
	chart(valueMonth6, "Month6")
	
} catch (error) {

}

try {
	var valueMonth7 = JSON.parse((document.getElementById("sessionMonth7").value))
	chart(valueMonth7, "Month7")
	
} catch (error) {

}

try {
	var valueMonth8 = JSON.parse((document.getElementById("sessionMonth8").value))
	chart(valueMonth8, "Month8")
	
} catch (error) {

}

try {
	var valueMonth9 = JSON.parse((document.getElementById("sessionMonth9").value))
	chart(valueMonth9, "Month9")
	
} catch (error) {

}

try {
	var valueMonth10 = JSON.parse((document.getElementById("sessionMonth10").value))
	chart(valueMonth10, "Month10")
	
} catch (error) {

}

try {
	var valueMonth11 = JSON.parse((document.getElementById("sessionMonth11").value))
	chart(valueMonth11, "Month11")
	
} catch (error) {

}

try {
	var valueMonth12 = JSON.parse((document.getElementById("sessionMonth12").value))	
	chart(valueMonth12, "Month12")
	
} catch (error) {

}


function chart(counts, canvasId) {
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
			responsive: true
		}
	});
	// console.log(counts)
}