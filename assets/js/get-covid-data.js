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
tripList.setAttribute("id", "trip-ul");

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
// functions go here

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
        cityHeader.innerHTML = covidCity.value + ", " + covidState; // display city & state 
        covidDataList.appendChild(cityHeader); // add covidCity to the covid header

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

} // end getCovidData()

function displayTrips() {
    // function to show cities from localStorage

    console.log("--- displayTrips() ----------");

    tripsContainer.innerHTML = ""; // clear the tripsContainer of previous data
    var myTripList = document.createElement('ul'); // create an empty unordered list

    // get the city names into a list
    for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i); // index from storage
        var city = localStorage.getItem(key).replace(/['"]+/g, ''); // city from storage, remove any quotation marks
        var cityItem = document.createElement('li'); // create an empty list item
        console.log('--- maybe add to list =', city);

        var found = 0;
        for (element in tripList.getElementsByTagName("li")) {
            var val = element.value;
            if (val === city) {
                found = 1;
                console.log("--- found ", val, " in  list =", city);
                break;
            }
        }

        // add to the tripList if it wasn't already in localStorage
        if (found === 0) {
            cityItem.innerHTML = city;
            myTripList.appendChild(cityItem); // add item to the list
            console.log('--- added to list = ', cityItem);
        }

    }

    // write the tripList to the DOM
    tripsContainer.appendChild(myTripList);
    console.log("--- new tripList =", myTripList);

} // end displayTrips()

function clearCovidData() {
    // when Clear Search Button is clicked, clear covid data from the DOM, not from local storage
    let covidContainer = document.getElementById('display-covid-data');
    covidContainer.innerHTML = "";
} // end clearCovidData()

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
} // end createKayakWidget()

//----------------------------------
// covid event listeners go here

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
    console.log("+++ saveTripsButton ++++++++++");

    console.log('+++ localStorage before adding city =', localStorage);

    var cityInput = document.querySelector("#city-search").value;
    console.log('+++ cityInput to save to localStorage = ', cityInput);

    var found = 0;

    for (var i = 0; i < localStorage.length; i++) { 
        //if city isn't already in local Storage then add it
        var key = localStorage.key(i); // index from storage
        var cityLS = localStorage.getItem(key).replace(/['"]+/g, ''); // city from storage, remove quotes
        console.log("+++ cityLS=", cityLS, "cityInput=", cityInput);

        // compare cityLS with cityInput
        if (cityLS === cityInput) {
            found = 1;
            console.log("+++ found", cityInput, "in localStorage");
            break;
        }
    } // end for

    if (found === 0) {
        // if it's not already in localStorage, add it
        key = localStorage.length + 1;
        keyText = key.toString();
        localStorage.setItem(keyText, JSON.stringify (cityInput));
        console.log('+++ localStorage after adding city =', localStorage);

        // display trips from local storage
        displayTrips(); 

    } // end if

}); // end saveTripsButton

showTripsButton.addEventListener("click", function(event) {
    // show data from local storage
    event.preventDefault();
    displayTrips(); // show trips from local storage
}); // end showTripsButton

clearTripsButton.addEventListener("click", function(event) {
    // clear data from local storage
    event.preventDefault();
    console.log("*** clearTripsButton **********");

    // remove cites from localStorage
    console.log("*** localStorage before clearing = ", localStorage);
    localStorage.clear(); // clear local storage doesn't seem to work
    // try removing them one at a time
    for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i); // index from storage
        var city = localStorage.getItem(key);
        localStorage.removeItem(city);

    }
    // try it this way
    window.localStorage.clear(); // try it again, can't hurt
    console.log("*** localStorage after clearing = ", localStorage);

    // clear data from the DOM
    tripsContainer.innerHTML = ""; // clear trip-container in the DOM
    while (tripList.firstChild) {
        tripList.removeChild(tripList.lastChild);
    } // remove all list items from tripList unordered list

}); // end clearTripsButton
