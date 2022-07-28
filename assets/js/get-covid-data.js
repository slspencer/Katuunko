//==================================
// Script to get covid data from CovidActNow API
// and display in the browser
//==================================

//----------------------------------
// API keys
const keyCovid = "349b5d4f748e4aa2bc08f7a7d16f32a3"; 

//----------------------------------
// input variables

// covid input variables
let searchCovidButton = document.querySelector("#search-covid-api");
let clearCovidButton = document.querySelector("#clear-search");
let selectStates = document.getElementById('state'); // we'll put a dropdown menu in element 'state'
selectStates.options.length = 0;  // set the dropdown menu length to 0

// trips input variables
let saveTripsButton = document.querySelector("#save-trips");
let showTripsButton = document.querySelector("#show-trips");
let clearTripsButton = document.querySelector("#clear-trips");
var tripsContainer = document.querySelector("#my-trips");
var tripList = document.createElement('ul'); // create the tripList once, add cities in saveTripsButton listener


//----------------------------------
// covid data variables
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
// covid functions go here

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
} // getSelectedState

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

} // end createStatesDropDownMenu

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
        
        // we'll write the returned covid data to this container
        let covidCity = document.getElementById('city-search');
        let covidState = myState;
        let covidContainer = document.getElementById('display-covid-data');
        
        // create the unordered list
        var covidDataList = document.createElement('ul');    // create the list
        covidDataList.setAttribute('id', 'covid-data-list'); // give the list an id

        // add covidCity value to the top of the list
        var cityHeader = document.createElement('li');
        cityHeader.innerHTML = covidCity.value;
        covidDataList.appendChild(cityHeader); // add item to the covid data list

        console.log("li = ", li);        

        for (i = 0; i <= covidArray.length - 1; i++) {
            // add each item to the list

            var li = document.createElement('li');

            li.innerHTML = covidArray[i];
            covidDataList.appendChild(li); // add item to the covid data list

            console.log("li = ", li);
        }

        console.log("covid city =", covidCity);
        console.log("covid city value =", covidCity.value);        
        console.log("covid state =", covidState);
        console.log("covid display list =", covidDataList);

        // display the covid data list in the DOM
        covidContainer.appendChild(covidDataList);

    })

} // end getCovidData

function clearCovidData() {
    // when Clear Search Button is clicked, clear covid data from the DOM, not from local storage
    let covidContainer = document.getElementById('display-covid-data');
    covidContainer.innerHTML = "";
} // end clearCovidData

//----------------------------------
// Kayak functions go here
function createKayakWidget() {
    KAYAK.embed({
        container: document.getElementById("kayakSearchWidgetContainer"),
        hostname: "www.kayak.com",
        autoPosition: true,
        defaultProduct: "hotels",
        enabledProducts: ["hotels", "flights"],
        startDate: "2018-10-02",
        endDate: "2018-10-28",
        origin: "New York, NY",
        destination: "Boston, MA",
        ssl: true,
        affiliateId: "acme_corp",
        isInternalLoad: false,
        lc: "en",
        cc: "us",
        mc: "EUR"
    });
}

//----------------------------------
// event listeners go here

// do these things when the DOM content has loaded
document.addEventListener('DOMContentLoaded', function() {
   createStatesDropDownMenu(); // create the drop down menu
   createKayakWidget(); // create the Kayak widget
}, false);

// lookup covid data when the Search button is clicked
searchCovidButton.addEventListener("click", function () {
    getCovidData(); // on click run function getCovidData()
})

// clear covid data when the Clear Search button is clicked
clearCovidButton.addEventListener("click", function () {
    clearCovidData(); // on click run function getCovidData()
})

// datepicker 
$( function() {
    $( "#datepicker" ).datepicker();
} );


//-----------------------------------------
// local storage event listeners go here

saveTripsButton.addEventListener("click", function(event) {
    // save city name to local storage when 'Save Search' button is clicked
    event.preventDefault();

    var cityInput = document.querySelector("#city-search").value;
    console.log('cityInput save to localStorage = ', cityInput);
    localStorage.setItem("cityInput", JSON.stringify (cityInput));

    displayTrips(); 

}); // end saveTripsButton

showTripsButton.addEventListener("click", function(event) {
    // show data from local storage
    event.preventDefault();
    displayTrips(); // show trips from local storage
}); // end showTripsButton

clearTripsButton.addEventListener("click", function(event) {
    // clear data from local storage
    event.preventDefault();
    localStorage.clear(); // clear local storage doesn't seem to work

    // clear items from local storage
    for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i); // index from storage
        var city = localStorage.getItem(key);
        localStorage.removeItem(city);

    }

    window.localStorage.clear(); // try it again, can't hurt

    // clear data from the DOM
    tripsContainer.innerHTML = ""; // clear trip-container in the DOM

}); // end clearTripsButton


function displayTrips() {
    // function to show cities from localStorage

    // get the city names into a list
    for (var i = 0; i < localStorage.length; i++) {

        tripsContainer.innerHTML = "";

        var key = localStorage.key(i); // index from storage
        var city = localStorage.getItem(key).replace(/['"]+/g, ''); // city from storage, remove any quotation marks
        var cityItem = document.createElement('li'); // create an empty list item

        console.log('local storage city =', city);

        cityItem.innerHTML = city;
        tripList.appendChild(cityItem); // add item to the city list

        console.log('city = ', cityItem);

    }

    // write the list to the DOM
    tripsContainer.appendChild(tripList);


}
