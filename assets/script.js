let keyCovid = "349b5d4f748e4aa2bc08f7a7d16f32a3";
let keyYelp = "UMaUHyuWvjH1IKm-CgxmwdG92WrPULR3PJg4EVKBTR5UYhvQmdSjr4XBtUx2l6aVOp4skgB9KkKBDDEi6R4OgcWUl38hsH3nYrlBku6MmjIFvY4nfKEZqYpdmHzcYnYx";
let fetchButton = document.getElementById("fetch-button");
let searchCity = ("#city-search");
let attractionList = ["restaurants","bars","nightlife","shopping","gyms","massage","dry cleaning","hair salons","towing","delivery"];
let myTtrips= document.getElementById("my-trips");

let metroArea = {
     "Abilene, TX": 10180,
     "Akron, OH":10420,
     "Albany-Schenectady-Troy, NY":10580 ,
     "Albuquerque, NM":10740,
     "Allentown-Bethlehem-Easton, PA-NJ":10900,
     "Amarillo, TX":11100 ,
     "Ann Arbor, MI":11460 ,
     "Appleton, WI":11540 ,
     "Asheville, NC":11700 ,
     "Athens-Clarke County, GA":12020 ,
     "Atlanta-Sandy Springs-Roswell, GA":12060 ,
     "Atlantic City-Hammonton, NJ":12100 ,
     "Auburn-Opelika, AL":12220 ,
     "Augusta-Richmond County, GA-SC":12260 ,
     "Austin-Round Rock, TX":12420 ,
     "Bakersfield, CA":12540 ,
     "Baltimore-Columbia-Towson, MD":12580 ,
     "Bangor, ME":12620,
     "Barnstable, MA":12700 ,
     "Baton Rouge, LA":12940 ,
     "Battle Creek, MI":12980 ,
     "Beaumont-Port Arthur, TX":13140 ,
     "Bend-Redmond, OR":13460 ,
     "Billings, MT":13740 ,
     "Binghamton, NY":13780 ,
     "Birmingham-Hoover, AL":13820 ,
     "Blacksburg—Christiansburg-Radford, VA":13980 ,
     "Bloomington, IL":14010 ,
     "Bloomington, IN":14020 ,
     "Boise City, ID":14260 ,
     "Boston-Cambridge-Newton, MA-NH":14460 ,
     "Boulder, CO":14500 ,
     "Bowling Green, KY":14540 ,
     "Bridgeport-Stamford-Norwalk, CT":14860 ,
     "Brownsville-Harlingen, TX":15180,
     "Buffalo-Cheektowaga-Niagara Falls, NY":15380 ,
     "Burlington, NC":15500,
     "Burlington-South Burlington, VT":15540 ,
     "California-Lexington Park, MD":15680,
     "Canton-Massillon, OH":15940,
     "Cape Coral-Fort Myers, FL":15980,
     "Carbondale-Marion, IL":16060,
     "Cedar Rapids, IA":16300,
     "Chambersburg-Waynesboro, PA":16540,
     "Champaign-Urbana, IL":16580,
     "Charleston, WV":16620,
     "Charleston-North Charleston, SC":16700,
     "Charlotte-Concord-Gastonia, NC-SC":16740,
     "Charlottesville, VA":16820,
     "Chattanooga, TN-GA":16860,
     "Chicago-Naperville-Elgin, IL-IN-WI":16980,
     "Chico, CA":17020,
     "Cincinnati, OH-KY-IN":17140,
     "Clarksville, TN-KY":17300,
     "Cleveland, TN":17420,
     "Cleveland-Elyria, OH":17460,
     "Coeur d’Alene, ID":17660 ,
     "College Station-Bryan, TX":17780,
     "Colorado Springs, CO":17820,
     "Columbia, SC":17900 ,
     "Columbus, GA-AL":17980,
     "Columbus, OH":18140,
     "Corpus Christi, TX":18580 ,
     "Dallas-Fort Worth-Arlington, TX":19100,
     "Daphne-Fairhope-Foley, AL":19300,
     "Davenport-Moline-Rock Island, IA-IL":19340,
     "Dayton, OH":19380,
     "Deltona-Daytona Beach-Ormond Beach, FL":19660,
     "Denver-Aurora-Lakewood, CO":19740,
     "Des Moines-West Des Moines, IA":19780,
     "Detroit-Warren-Dearborn, MI":19820,
     "Dover, DE":20100,
     "Durham-Chapel Hill, NC":20500,
     "East Stroudsburg, PA":20700,
     "Elkhart-Goshen, IN":21140,
     "El Paso, TX":21340,
     "Erie, PA":21500,
     "Eugene, OR": 21660,
     "Evansville, IN-KY": 21780,
     "Fargo, ND-MN": 22020,
     "Farmington, NM":22140,
     "Fayetteville, NC":22180,
     "Fayetteville-Springdale-Rogers, AR-MO":22220,
     "Flint, MI":22420,
     "Florence, SC":22500,
     "Florence-Muscle Shoals, AL":22520,
     "Fort Collins, CO":22660,
     "Fort Smith, AR-OK":22900,
     "Fort Wayne, IN":23060,
     "Fresno, CA":23420,
     "Gainesville, FL":23540,
     "Gainesville, GA":23580,
    "Glen Falls, NY": 24020,
     "Goldsboro, NC":24140,
     "Grand Rapids-Wyoming, MI":24340,
     "Greeley, CO":24540,
     "Green Bay, WI":24580,
     "Greensboro-High Point, NC":24660,
     "Greenville, NC":24780,
     "Greenville-Anderson-Mauldin, SC":24860,
     "Hagerstown-Martinsburg, MD-WV":25180,
     "Hanford-Corcoran, CA":25260,
     "Harrisburg-Carlisle, PA":25420,
     "Hartford-West Hartford-East Hartford, CT":25540,
     "Hickory-Morganton-Lenoir, NC":25860,
     "Hilton Head Island-Bluffton-Beaufort, SC":25940,
     "Houston-Baytown-Sugar Land, TX":26420,
     "Huntington-Ashland, WV-KY-OH":26580,
     "Huntsville, AL":26620,
     "Idaho Falls, ID":26820,
    "Indianapolis, IN":26900,
    "Iowa City, IA":26980,
     "Jackson, MI":27100,
     "Jackson, MS":27140,
     "Jacksonville, FL":27260,
     "Jacksonville, NC":27340,
     "Janesville-Beloit, WI":27500,
    "Johnson City, TN": 27740,
     "Johnstown, PA":27780,
     "Kahului-Wailuku-Lahaina, HI":27980,
    "Kalamazoo-Portage, MI": 28020,
     "Kansas City, MO-KS":28140,
     "Kennewick-Richland, WA":28420,
     "Killeen-Temple-Fort Hood, TX":28660,
     "Kingsport-Bristol, TN-VA":28700,
     "Knoxville, TN":28940,
     "Lafayette, LA":29180,
     "Lafayette-West Lafayette, IN":29200,
     "Lake Charles, LA" :29340,
     "Lakeland-Winter Haven, FL":29460,
     "Lancaster, PA":29540,
     "Lansing-East Lansing, MI":29620,
    "Laredo, TX": 29700,
     "Las Cruces, NM":29740,
     "Las Vegas-Paradise, NV":29820,
     "Lewiston-Auburn, ME":30340,
     "Lexington-Fayette, KY":30460,
     "Little Rock-North Little Rock, AR":30780,
     "Longview, TX":30980,
     "Los Angeles-Long Beach-Anaheim, CA":31080,
     "Louisville, KY-IN":31140,
     "Lubbock, TX":31180,
     "Macon, GA":31420,
     "Madison, WI":31540,
     "Manchester-Nashua, NH":31700,
     "McAllen-Edinburg-Mission, TX":32580,
     "Medford, OR":32780,
     "Memphis, TN-MS-AR":32820,
     "Miami-Fort Lauderdale-West Palm Beach, FL":33100,
     "Milwaukee-Waukesha-West Allis, WI":33340,
     "Minneapolis-St Paul-Bloomington, MN-WI":33460,
     "Mobile, AL":33660,
     "Modesto, CA":33700,
     "Monroe, LA":33740,
     "Monroe, MI":33780,
     "Montgomery, AL":33860,
     "Morgantown, WV":34060,
     "Mount Vernon-Anacortes, WA":34580,
     "Muskegon-Norton Shores, MI":34740,
     "Myrtle Beach-Conway-North Myrtle Beach, SC-NC":34820,
     "Naples-Immokalee-Marco Island, FL":34940,
     "Nashville-Davidson-Murfreesboro, TN":34980,
     "New Haven-Milford, CT":35300,
     "New Orleans-Metairie, LA":35380,
     "New York-Newark- Jersey City, NY-NJ-PA":35620,
     "Niles-Benton Harbor, MI":35660,
     "North Port-Sarasota-Bradenton, FL":35840,
     "Norwich-New London, CT":35980,
     "Ocala, FL":36100,
     "Odessa, TX":36220,
     "Ogden-Clearfield, UT":36260,
     "Oklahoma City, OK":36420,
     "Omaha-Council Bluffs, NE-IA":36540,
     "Orlando, FL":36740,
     "Oshkosh-Neenah, WI":36780,
     "Oxnard-Thousand Oaks-Ventura, CA":37100,
     "Palm Bay-Melbourne-Titusville, FL":37340,
     "Panama City, FL":37460,
     "Pensacola-Ferry Pass-Brent, FL":37860,
    "Peoria, IL":37900 ,
     "Philadelphia-Camden-Wilmington, PA-NJ-DE":37980,
     "Phoenix-Mesa-Scottsdale, AZ":38060,
     "Pine Bluff, AR":38220,
     "Pittsburgh, PA":38300,
     "Portland-South Portland, ME":38860,
     "Portland-Vancouver-Hillsboro, OR-WA":38900,
     "Port St. Lucie-Fort Pierce, FL":38940,
     "Prescott, AZ":39140,
     "Providence-Warwick, RI-MA":39300,
     "Provo-Orem, UT":39340,
     "Racine, WI":39540,
     "Raleigh, NC":39580,
     "Reading, PA":39740,
     "Redding, CA":39820,
     "Richmond, VA":40060,
     "Riverside-San Bernardino-Ontario, CA":40140,
     "Roanoke, VA":40220,
     "Rochester, NY":40380,
     "Rockford, IL":40420,
     "Sacramento--Arden-Arcade–Roseville, CA":40900,
     "Saginaw, MI":40980,
     "St. George, UT":41100,
    "St. Louis, MO-IL":41180,
     "Salem, OR":41420,
     "Salinas, CA":41500,
     "Salisbury, MD":41540,
     "Salt Lake City, UT":41620,
     "San Antonio, TX":41700,
     "San Diego-Carlsbad-San Marcos, CA":41740,
    "San Francisco-Oakland-Fremont, CA":41860,
     "San Jose-Sunnyvale-Santa Clara, CA":41940,
     "San Luis Obispo-Paso Robles, CA":42020,
     "Santa Cruz-Watsonville, CA":42100,
     "Santa Fe, NM":42140,
     "Santa Maria-Santa Barbara, CA":42200,
     "Santa Rosa-Petaluma, CA":42220,
     "Savannah, GA":42340,
     "Scranton--Wilkes-Barre, PA":42540,
     "Seattle-Tacoma-Bellevue, WA":42660,
     "Sherman-Dennison, TX":43300,
     "Shreveport-Bossier City, LA":43340,
     "Sioux Falls, SD":43620,
     "South Bend-Mishawaka, IN-MI":43780,
     "Spartanburg, SC":43900,
     "Spokane-Spokane Valley, WA":44060,
     "Springfield, IL":44100,
     "Springfield, MA":44140,
    "Springfield, MO":44180,
     "Stockton-Lodi, CA":44700,
    "Syracuse, NY":45060,
     "Tallahassee, FL":45220,
     "Tampa-St. Petersburg-Clearwater, FL":45300,
     "Terre Haute, IN":45460,
     "Toledo, OH":45780,
     "Topeka, KS":45820,
     "Trenton, NJ":45940,
     "Tucson, AZ":46060,
     "Tulsa, OK":46140,
     "Tyler, TX":46340,
     "Urban Honolulu, HI":46520,
     "Utica-Rome, NY":46540,
     "Vallejo-Fairfield, CA":46700,
     "Vineland-Bridgeton, NJ":47220,
     "Virginia Beach-Norfolk-Newport News, VA-NC":47260,
     "Visalia-Porterville, CA":47300,
     "Waco, TX":47380,
     "Warner Robins, GA":47580,
     "Washington-Arlington-Alexandria, DC-VA-MD-WV":47900,
     "Waterloo-Cedar Falls, IA":47940,
     "Watertown-Fort Drum, NY":48060,
     "Wausau, WI":48140,
     "Wichita, KS":48620,
     "Wichita Falls, TX":48660,
     "Williamsport, PA":48700,
     "Winchester, VA-WV":49020,
    "Winston-Salem, NC":49180,
     "Worcester, MA-CT":49340,
     "York-Hanover, PA":49620,
     "Youngstown-Warren-Boardman, OH-PA":49660,
     "Yuma, AZ":49740
}

// csbaObj = { "Metro area": 1234 }
// csbaArr = []
// csbaKeys = Object.keys(csbaObj)
// Use csbaKeys to loop through all metro areas
//   - for each iteration, push object of this shape -> { label: x, value: y }, into csbaArr


//  let keys = Object.keys(metroArea);
//  console.log (keys);

//  let vals = Object.values(metroArea);
//  console.log (vals);

//  for ( i = 0; i < vals.length; i++) {
//     console.log (i, [vals[i]]);
//      }
//  for ( i = 0; i < keys.length; i++) {
// console.log (i, [keys[i]]);
//  }

//  var arr = [];

//  for (i = 0; i < keys.length; i++) {
//      arr.push ({
//         label:keys[i],value: metroArea [keys[i]]
//     });
//  }



//  $(function() {
//     var arr = [

//     ];
//     searchCity.autocomplete({
//       source: arr
//     });
//     });

function getApi(){
 var requestUrl="https://api.covidactnow.org/v2/cbsa/49740.json?apiKey="+key;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)

        $(".card-content").addClass("casesRow"); 
        $(".card-content").addClass("vaccinationsRow");
    
    })

    }
    fetchButton.addEventListener("click", getApi);

    let dropdownBtn = document.querySelector('#dropDown');
let menuContent = document.querySelector('#dropdown-menu');
dropdownBtn.addEventListener("click",()=>{
   if(menuContent.style.display===""){
      menuContent.style.display="block";
   } else {
      menuContent.style.display="";
   }
})
 