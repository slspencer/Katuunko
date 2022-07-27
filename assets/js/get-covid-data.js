//==================================
// Script to get covid data from CovidActNow API
// and display in the browser
//==================================

//----------------------------------
// API keys
const keyCovid = "349b5d4f748e4aa2bc08f7a7d16f32a3"; 

//----------------------------------
// input variables
let getCovidButton = document.querySelector("#get-covid-button");
let saveCovidButton = document.querySelector("#save-search");

let selectStates = document.getElementById('state'); // we'll put a dropdown menu in element 'state'
selectStates.options.length = 0;  // set the dropdown menu length to 0

//----------------------------------
// data variables
let transmissionLevel = "unknown";
let communityLevel = "unknown";
let weeklyNewCasesPer100K = "unknown";
let vaccinationsCompletedRatio = "unknown";

// state dropdown data in an array 
var usStates = [
    { abbreviation: 'AL'},
    { abbreviation: 'AK'},
    { abbreviation: 'AS'},
    { abbreviation: 'AZ'},
    { abbreviation: 'AR'},
    { abbreviation: 'CA'},
    { abbreviation: 'CO'},
    { abbreviation: 'CT'},
    { abbreviation: 'DE'},
    { abbreviation: 'DC'},
    { abbreviation: 'FM'},
    { abbreviation: 'FL'},
    { abbreviation: 'GA'},
    { abbreviation: 'GU'},
    { abbreviation: 'HI'},
    { abbreviation: 'ID'},
    { abbreviation: 'IL'},
    { abbreviation: 'IN'},
    { abbreviation: 'IA'},
    { abbreviation: 'KS'},
    { abbreviation: 'KY'},
    { abbreviation: 'LA'},
    { abbreviation: 'ME'},
    { abbreviation: 'MH'},
    { abbreviation: 'MD'},
    { abbreviation: 'MA'},
    { abbreviation: 'MI'},
    { abbreviation: 'MN'},
    { abbreviation: 'MS'},
    { abbreviation: 'MO'},
    { abbreviation: 'MT'},
    { abbreviation: 'NE'},
    { abbreviation: 'NV'},
    { abbreviation: 'NH'},
    { abbreviation: 'NJ'},
    { abbreviation: 'NM'},
    { abbreviation: 'NY'},
    { abbreviation: 'NC'},
    { abbreviation: 'ND'},
    { abbreviation: 'MP'},
    { abbreviation: 'OH'},
    { abbreviation: 'OK'},
    { abbreviation: 'OR'},
    { abbreviation: 'PW'},
    { abbreviation: 'PA'},
    { abbreviation: 'PR'},
    { abbreviation: 'RI'},
    { abbreviation: 'SC'},
    { abbreviation: 'SD'},
    { abbreviation: 'TN'},
    { abbreviation: 'TX'},
    { abbreviation: 'UT'},
    { abbreviation: 'VT'},
    { abbreviation: 'VI'},
    { abbreviation: 'VA'},
    { abbreviation: 'WA'},
    { abbreviation: 'WV'},
    { abbreviation: 'WI'},
    { abbreviation: 'WY' }
];

//----------------------------------
// functions 

// from https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/
function getSelectedState(){

    console.log('getSelectedState');

    var e = document.getElementById("state");

    console.log("e = ", e);
    console.log("e.selectedIndex =", e.selectedIndex);
    console.log("e.options[e.selectedIndex] =", e.options[e.selectedIndex]);
    console.log("e.options[e.selectedIndex].value = ", e.options[e.selectedIndex].value);

    var result = e.options[e.selectedIndex].value;

    console.log("result = ", result);
    
    return result;
}
// end myong.com

function createStatesDropDownMenu() {
    // get state data
    console.log("createStatesDropDownMenu");

    // populate the dropdown list
    for ( var i = 0; i < usStates.length; i++) {
        var opt1 = usStates[i].abbreviation;
        var option = document.createElement("OPTION");
        option.text = opt1; // show this text in the drop down list
        option.value = opt1; // use this value when returning user selection
        selectStates.options.add(option); // add this state's text & value to the selectStates drop down list
    }

    console.log(usStates[0].abbreviation);

}



function getCovidData() {

    console.log("Search button clicked");

    var myState = getSelectedState();

    console.log("myState = ", myState);

    var requestCovidUrl =  "https://api.covidactnow.org/v2/state/" + myState + ".json?apiKey=349b5d4f748e4aa2bc08f7a7d16f32a3";

    console.log('requestCovidUrl = ', requestCovidUrl);

    // request covid data from API
    fetch(requestCovidUrl) 
    .then(function(response) { 
        // handle the response object
        console.log("1. Received the covid api response data");
        return response.json(); // return the data in .json format
    })
    .then(function(data){  // do something with the jsonified response 
        //-----------------------------------------------------
        // display the returned data
        console.log("2. Process the response");
        console.log(data);   // write the entire object  to the console
        console.log("data.communityLevels.canCommunityLevel = ", data.communityLevels.canCommunityLevel); // 0, 1, 2 for 0 High, 1 Medium, 2 Low "RCalculated using the number of new cases per 100K people in the past 7 days combined with the percent of staffed inpatient beds occupied by COVID-19 patients using a 7-day average"
        console.log("data.cdcTransmissionLevel = ", data.cdcTransmissionLevel); //0 Low, 1 Moderate, 2 Substantial, 3 High, 4 Unknown "Calculated using the number of new cases per 100K persons in thepast 7 days combined with the percentage of positive NAATs test during the past 7 days"
        console.log("data.metrics.weeklyNewCasesPer100k = ", data.metrics.weeklyNewCasesPer100k); // example: 545.9
        console.log("data.metrics.vaccinationsCompletedRatio =", data.metrics.vaccinationsCompletedRatio); //example: .718 

        //----------------------------------------------------
        console.log("3. Convert covid risk levels to descriptive strings")        
        // Convert community level number to descriptive string

        switch(data.communityLevels.canCommunityLevel) {
            case 0: {
                communityLevel = "Low"
                } break;
            case 1: {
                communityLevel = "Medium"
                }    break;
            case 2: {
                communityLevel = "High"
                }    break;              
            default:
            }

        // Convert cdc Transmission level to descriptive string
        switch(data.cdcTransmissionLevel) {
            case 0: {
                transmissionLevel = "Low";
                }   break;
            case 1: {
                transmissionLevel = "Moderate";
                }   break;
            case 2: {
                transmissionLevel = "Substantial";
                }   break;
            case 3: {
                transmissionLevel = "High";
                }   break;
            case 4: {
                transmissionLevel = "Unknown";
                }    break;                                         
            default:
            }         

            // convert weeklyNewCasesPer100k to string
            weeklyNewCasesPer100K = (data.metrics.weeklyNewCasesPer100k).toFixed(1);

            // convert vaccinationsCompletedRatio to string percent
            vaccinationsCompletedRatio = (data.metrics.vaccinationsCompletedRatio*100).toFixed(1) + "%";

            // check work
            console.log("communityLevel =",communityLevel);            
            console.log("transmissionLevel =", transmissionLevel);
            console.log("weeklyNewCasesPer100K =", weeklyNewCasesPer100K);
            console.log("vaccinationsCompletedRatio =", vaccinationsCompletedRatio);

    })
    .then(function(data){ 
        console.log("4. Display the covid data");

        // display the covid data in the document
        const covidArray = [
            ["CDC Community Level Risk: " + communityLevel],
            ["Transmission Level: " + transmissionLevel],
            ["Weekly new cases per 100K persons: "  + weeklyNewCasesPer100K],
            ["Percent Vaccinated: " + vaccinationsCompletedRatio],
        ]
        
        // we'll write the data to this container
        let covidCity = document.getElementById('city-search');
        let covidState = myState;
        let covidContainer = document.getElementById('display-covid-data');
        
        // create the unordered list
        var covidDataList = document.createElement('ul');    // create the list
        covidDataList.setAttribute('id', 'covid-data-list'); // give the list an id

        for (i = 0; i <= covidArray.length - 1; i++) {
            // add each item to the list

            var li = document.createElement('li');

            li.innerHTML = covidArray[i];
            covidDataList.appendChild(li); // add item to the covid data list

            console.log("li = ", li);
        }

        covidCity = document.getElementById("city-search"); 
        console.log("covid city =", covidCity);
        console.log("covid state =", covidState);
        console.log("covid display list =", covidDataList);

        // display the covid data list in the DOM
        covidContainer.appendChild(covidDataList);

    })

} // end getCovidData

//----------------------------------
// event listeners go here

// do these things when the DOM content has loaded
document.addEventListener('DOMContentLoaded', function() {
   createStatesDropDownMenu(); // create the drop down menu
}, false);

getCovidButton.addEventListener("click", function () {
    getCovidData(); // on click run function getCovidData()
})

$( function() {
    $( "#datepicker" ).datepicker();
} );


// function renderLastSaved() {
//     var email = localStorage.getItem("");
//     var password = localStorage.getItem("password");

//     if (!email || !password) {
//       return;
//     }

//     userEmailSpan.textContent = email;
//     userPasswordSpan.textContent = password;
//   }



// function renderCityList() {
//     var cityList = localStorage.getItem("cityName");

// if (!cityList) {
//     return;
// }
//  tripDisplay.textContent = cityList;
// }


var tripDisplay = document.querySelector("#my-trips");

saveCovidButton.addEventListener("click", function(event) {
    event.preventDefault();

    var cityInput = document.querySelector("#city-search").value;
//   var cityList = {
//    cityInput,
//   }
    
    // if (cityInput === "") {
    //   console.log("cannot be blank");
    // } else {
    //   console.log("success")

    localStorage.setItem("cityInput", JSON.stringify (cityInput));
    renderCityList();
});

function renderCityList() {
    var searchedList = JSON.parse(localStorage.getItem("cityInput"));

if (searchedList !==null) {
    tripDisplay.textContent = searchedList
    }
}
