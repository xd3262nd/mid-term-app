var chart = document.getElementById('resultChart').getContext('2d');


function generateYear() {
    var start_year = new Date().getFullYear();
    var choices = "";

    for(var i=start_year-1; i>start_year-20; i--){
        choices +='<option value="' + i + '">' + i + '</option>';
    }

    document.getElementById('inputYear01').innerHTML = choices;

    

   

}



function generateMonth(){
    // var start_month = January

    var choices = "";


    var month = new Array();

    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    // console.log(month[0])

    for (var i = 0 ; i<month.length; i++){
        var num = i+1;
        if (num<10){
            choices += '<option value="0' + num + '">' + month[i] + '</option>';
            // console.log(choices)
        }else{
            choices += '<option value="' + num + '">' + month[i] + '</option>';
            // console.log(choices)
        }
        
        
    }

    document.getElementById('inputMonth01').innerHTML = choices
}

generateYear()
generateMonth()


var yearA = document.getElementById('inputYear01')
var monthA = document.getElementById('inputMonth01')

var year01;

yearA.addEventListener('change', (e)=>{
    // TODO Should I try to create a new function for this?

    var el = document.getElementById('inputYear01');
    year01 = el.options[el.selectedIndex].value

    console.log(year01)
    // alert(year01)
    // console.log(year01) return the value of the selected year
})

monthA.addEventListener('change', (e)=>{

    var el = document.getElementById('inputMonth01');
    var month01 = el.options[el.selectedIndex].value
    // above this will be the user input for the selected Month they want to search for 
    // TODO need to figure out how to pass it over to the API function to search for it. 
    // console.log(month01)
})



function generate(dataList) {
    var newChart = new Chart(chart, {

        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#FF5733"],
                yAxisID: "y-axis-1",
                data: dataList
            }, {
                label: 'Dataset 2',
                backgroundColor: ['#8a8474'],
                yAxisID: "y-axis-2",
                data: dataList

            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Chart.js Bar Chart - Multi Axis"
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
            }
        }



    })
}