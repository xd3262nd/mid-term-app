var stateIDList = 'https://api.eia.gov/category/?api_key=563a38170142e2aa6fea13b9725fa259&category_id=1'

var selectedStateA;
var energyLink = 'https://api.eia.gov/series/?api_key=563a38170142e2aa6fea13b9725fa259&series_id='

// var url ='https://api.wheretheiss.at/v1/satellites/25544'



var stateA = document.querySelector('#state1')
var stateB = document.querySelector('#state2')

var buttonEl = document.querySelector("#Generate")

var dataSetA = [];


buttonEl.addEventListener("click", () => {

    // ! https://www.eia.gov/opendata/qb.php?category=1&sdid=ELEC.GEN.ALL-AL-99.A

    var inputA = stateA.value.toLowerCase()

    var monthYearA = yearA.options[yearA.selectedIndex].value + monthA.options[monthA.selectedIndex].value
    console.log(monthYearA)
    

    var letters = /^[A-Z a-z]+$/;

    if (!inputA) {
        stateA.value = ''
        alert('Please enter your input')
    } else if (!inputA.match(letters)) {

        stateA.value = ''
        alert('Please enter letter only!')
    } else {


        retrieveID(inputA, monthYearA)


    }

})





function retrieveID(input, monthYearA) {
    fetch(stateIDList)
        .then(res => res.json())
        .then(stateData => {

            stateData.category.childseries.forEach(function(element, index) {
                //console.log(element.name) get all the name of the list
                var dataNameList = element.name.toLowerCase()

                if (dataNameList.includes(input) && dataNameList.includes('monthly')) {

                    let stateID = element.series_id //id to get the specific data for the state


                    if (stateID.match('.M')) {
                        retrieveData(stateID, monthYearA)

                    }

                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function retrieveData(id, myA) {
    fetch(energyLink + id)
        .then(resultA => resultA.json())
        .then(dataA => {

            // console.log(dataA)
            // console.log(dataA.series[0].data) //produce array of all the data 
            //data in the form of this
            //0: (2) ["201912", 571.24533]
            // 1: (2) ["201911", 527.86132]
            dataA.series[0].data.forEach(function(el, index) {


                // if(el[o])

                // ! How can I keep on adding based on the validation?
                if (el[0] <= "201906" && el[0] >= "201901" ) {

                    dataSetA.push(el[1])
                    console.log(dataSetA) //this is the dataset of the value 
                    // el[0] will be the user input of the year and month in it 

                    generate(dataSetA)

                }

                // console.log(el[0]) //print out all the date in the form of this --> 201912....
                // console.log(el[1]) //print out the value 
                // console.log(index) // index for the selected data
            })


        })
        .catch(err => {
            console.log(err)
        })
        


}