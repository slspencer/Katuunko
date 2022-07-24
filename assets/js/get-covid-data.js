//==================================
// Script to get covid data from CovidActNow API
// and display in the browser
//==================================


//----------------------------------
// input variables
let getCovidButton = document.querySelector("#get-covid-button");

//----------------------------------
// data variables
let transmissionLevel = "unknown";
let communityLevel = "unknown";
let weeklyNewCasesPer100K = "unknown";
let vaccinationsCompletedRatio = "unknown";

//----------------------------------
// API keys
const keyCovid = "349b5d4f748e4aa2bc08f7a7d16f32a3";
var keyCity    = "49740";

// search string Urls
// var requestCovidUrl="https://api.covidactnow.org/v2/cbsa/" + keyCity + ".json?apiKey=" + keyCovid;
var requestCovidUrl ="https://api.covidactnow.org/v2/cbsa/49740.json?apiKey=349b5d4f748e4aa2bc08f7a7d16f32a3";

console.log("keyCovid = ", keyCovid);
console.log("keyCity = ", keyCity);
console.log("requestCovidURL = ", requestCovidUrl);

//----------------------------------
// functions go here
function getCovidData() {

    console.log("Search button clicked");

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
            ["CDC Community Level Risk: " communityLevel],
            ["Transmission Level: " transmissionLevel],
            ["Weekly new cases per 100K persons: "  weeklyNewCasesPer100K],
            ["Percent Vaccinated: " vaccinationsCompletedRatio],
        ]
        
        // we'll write the data to this container
        let covidContainer = document.getElementById('display-covid-data');
        
        // create the unordered list
        var covidDataList = document.createElement('ul');    // create the list
        covidDataList.setAttribute('id', 'covid-data-list'); // give the list an id

        for (i = 0; i <= covidArray.length - 1; i++) {
            // add each item to the list

            var li = document.createElement('li');

            li.innerHTML = covidArray[i];
            covidDataList.appendChild(li);

            console.log("li = ", li);
        }



        console.log("covid display list =", covidDataList);

        // append the list to the container
        covidContainer.appendChild(covidDataList);

    })

} // end getCovidData


//----------------------------------
// event listeners go here

getCovidButton.addEventListener("click", getCovidData() );

