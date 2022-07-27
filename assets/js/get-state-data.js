//==================================
// Script to get county data using the city name and the YAddress API
// https://www.yaddress.net/WebApi
//==================================

//----------------------------------
// input variables
let getCountyButton = document.querySelector("#get-covid-button");

//----------------------------------
// data variables

//-----------------------------------
// YAddress API data
// HTTP Method: GET
// HTTP Headers: "Accept: application/json" (default)
// sample request:
//  http://www.yaddress.net/api/address?
//      AddressLine1=506+Fourth+Avenue+Unit+1&
//      AddressLine2=Asbury+Prk+NJ&
//      UserKey=XXXXX       // Free version doesn't require UserKey, first 1000 transactions are free
// sample response:
//  {
//        "ErrorCode": 0,
//        "ErrorMessage": "",
//        "AddressLine1": "506 4TH AVE APT 1",
//        "AddressLine2": "ASBURY PARK, NJ 07712-6086",
//        "Number": "506",
//        "PreDir": "",
//        "Street": "4TH",
//        "Suffix": "AVE",
//        "PostDir": "",
//        "Sec": "APT",
//        "SecNumber": "1",
//        "City": "ASBURY PARK",
//        "State": "NJ",
//        "Zip": "07712",
//        "Zip4": "6086",
//        "County": "MONMOUTH",
//        "StateFP": "34",
//        "CountyFP": "025",
//        "CensusTract": "8070.03",
//        "CensusBlock": "1015",
//        "Latitude": 40.223571,
//        "Longitude": -74.005973,
//        "GeoPrecision": 5,
//        "TimeZoneOffset": -5,
//        "DstObserved": true,
//        "SalesTaxRate": 6.6250
//        "SalesTaxJurisdiction": "State of NJ"
//  }

//----------------------------------
// functions go here

function tryThis() {
    $.ajax({
        url: "http://www.yaddress.net/api/address?AddressLine1=&AddressLine2=Yuma%2C%20AZ&UserKey=B90CDDCA-E3CC-47D3-A961-121BEF634771",
        data: {
            AddressLine1: "",
            AddressLine2: "YUMA%2C%20AZ",
            UserKey: "B90CDDCA-E3CC-47D3-A961-121BEF634771"
        },
        headers: {
            "X-Requester": "YAddressHomePage",
            "Pragma": "no-cache"
        },
        success: function (data) {
            // Check for errors
            if (data.ErrorCode == 1 &&
                data.ErrorMessage.includes("Missing UserKey")) {
                // Show Login pane
                $("#LoginPane").collapse('show');
                $("#UserKeyControl").collapse('show');
                $("#GeocodingResultsPane").collapse('hide');
                return;
            } else {
                console.log(data);
            }
        }
    })
}


// Get Yelp Data, the yelp API is weird & needs an Authorization header, so we have to use an ajax call not a fetch
function getCounty() {

    console.log("getCounty");

    let nameCity = (document.getElementById("city-search")).value;

    console.log("nameCity =", nameCity);

    let yaddressAPIKey = "";
    //let yaddressBaseURL = "https://www.yaddress.net/api/address?";
    //let addressLine1 = "AddressLine1=''";
    //let addressLine2 = "&AddressLine2=" + nameCity; 
    //let addressLine2 = "&YUMA%2C%20AZ";
    //let userKey = "&UserKey=";
    //let yaddressURL = yaddressBaseURL + addressLine1 + addressLine2 + userKey;
    let userKey = "B90CDDCA-E3CC-47D3-A961-121BEF634771";
    let yaddressURL = "http://www.yaddress.net/api/address?AddressLine1=&AddressLine2=Yuma%2C%20AZ&UserKey=B90CDDCA-E3CC-47D3-A961-121BEF634771";
    //console.log("yaddressBaseURL = ", yaddressBaseURL);
    //console.log("addressLine1 = ", addressLine1);
    //console.log("addressLine2 = ", addressLine2);
    console.log("yaddressURL = ", yaddressURL);

    const myRequest = new Request(yaddressURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        mode: 'cors',
        cache: 'default',
    });
    
    fetch(myRequest) 
        .then(function(response) { 
            // handle the response object
            console.log("1. Received the county data");
            return response.json(); // return the data in .json format
        })
        .then(function(data) {  // do something with the jsonified response 
            //-----------------------------------------------------
            // display the returned data
            console.log("2. Process the response");
            console.log(data);   // write the entire object  to the console
        })
        .catch(err => {
            // Failure
            console.log(err);
        })

}

//----------------------------------
// event listeners go here
//getCountyButton.addEventListener("click", getCounty() );
getCountyButton.addEventListener("click", tryThis() );

//================================
// main program

// end main
// ===============================


