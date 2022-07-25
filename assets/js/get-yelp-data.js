//==================================
// Script to get attraction data from Yelp API
// and display in the browser
//==================================

//----------------------------------
// input variables

// temporary city values until city search is completed
var keyCity    = "49740";
var nameCity = "Yuma, AZ";

let attractionType = "";
let attractionMenu = document.querySelector("#attraction-dropdown-menu");
attractionMenu.value = "start value"

//----------------------------------


//----------------------------------
// functions go here

// Get Yelp Data, the yelp API is weird & needs an Authorization header, so we have to use an ajax call not a fetch
function getYelpData(nameCity, attractionType) {
    // https://stackoverflow.com/questions/51433786/yelp-api-http-request-authorization-bearer/51461033#51461033
    // https://medium.com/@sa.mehdisafari/use-yelp-fusion-api-without-cors-errors-9af47e98ac4a 
    // ok the heroku cors-anywhere solution no longer is available,
    // next up, let's try https://github.com/NickShallee/yelp-api


    // none of the following works, b/c Yelp doesn't want developers to write javascript apps that access their data :(
    // get attractions of attractionType near cityName
    //
    // response will be like:
    //        {
    //            "category": {
    //               "alias": "hotdogs", // category alias
    //                "title": "Fast Food",  // category title
    //                "parent_aliases": [
    //                    "restaurants"
    //                ], // list of aliases of parent categories
    //                "country_whitelist": [], // countries where category is whitelisted
    //                "country_blacklist": []  // countries where category is blacklisted
    //            }
    //        }

    console.log("getYelpData");

    // Yelp API keys
    // https://stackoverflow.com/questions/52213930/yelp-api-authorization-using-javascript
    let keyYelp = "7qt4F3KUoenfnF3fj3MIePnU5umDS8-nNdR_N5RAdXW32wrmEc1sqqEKUzIdWOsxLWXvX2DorGDvh-Kly-tVuHGJgj5EHWAkovEK6sCSi9cZjn2D56u8j4TksxDfYnYx";
    let clientID = "BExuXE5-5B7DgPVFe60ulw"; 

    // get the top 5 attractions for attractionType in nameCity
    var corsURL = "https://cors-anywhere.herokuapp.com/"; // this allows us to access the Yelp API via CORS request
    var yelpURL = "https://api.yelp.com/v3/categories/search?location=" + nameCity + "&categories=" + attractionType + "&limit=5";
    var queryURL = corsURL + yelpURL;

    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${keyYelp}`
        },

        dataType: 'json',
        success: function(data){
            // Grab the results from the API JSON return
            var totalresults = data.total;
            // If our results are greater than 0, continue
            if (totalresults > 0){
                // Display a header on the page with the number of results
                $('#results').append('<h5>We discovered ' + totalresults + ' results!</h5>');
                // Itirate through the JSON array of 'businesses' which was returned by the API
                $.each(data.businesses, function(i, item) {
                    // Store each business's object in a variable
                    var id = item.id;
                    var alias = item.alias;
                    var phone = item.display_phone;
                    var image = item.image_url;
                    var name = item.name;
                    var rating = item.rating;
                    var reviewcount = item.review_count;
                    var address = item.location.address1;
                    var city = item.location.city;
                    var state = item.location.state;
                    var zipcode = item.location.zip_code;

                    // Append our result into our page
                    $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
                });
            } else {
                // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
                $('#results').append('<h5>We discovered no results!</h5>');
            }
        }
    });      
    
}       


//----------------------------------
// event listeners go here

// get attraction type from the drop down menu
// having trouble getting this value from the user selection
attractionMenu.addEventListener("click", function(event) {

    console.log("getAttractionType");

    //event.stopPropagation() stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
    event.stopPropagation();
    attractionType = attractionMenu.value;

    console.log("attractionType = ", attractionType);
    
    //classList.toggle toggles between adding and removing a class name from an element, in this case the 'is-active' class
    attractionMenu.classList.toggle('is-active');
})

//get Yelp data
getYelpData(nameCity, attractionType);

//++++++++++++++++++++++++++++++


