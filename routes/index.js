var express = require('express');
var router = express.Router();
var keys = require('../keys.js')

//Importing Secret API Keys
var yelp = require("yelp").createClient({
  consumer_key: keys.consumerKey(), 
  consumer_secret: keys.consumerSecret(),
  token: keys.token(),
  token_secret: keys.tokenSecret(),
});

//Accepting Search Parameters through terminal
//Example bash command - /home$ node app.js Tempe sandwiches - will search for sandwiches in Tempe (currently the category is locked to "food");
var location = process.argv[2]; //First Argument
var term = process.argv[3]; //Second Argument


// Yelp Search API Docs - see http://www.yelp.com/developers/documentation/v2/search_api

// The search function accepts a dictionary of values as parameters. The only required one is location. 

/* For future use, available key names include:
    term - string - Search term, if not included the search returns everything
    limit - int - Number of businesses to return
    offset - int - Offset the list of returned business results by this amount
    sort - 0: Best Matched (default), 1: Distance, 2: Highest Rated
    category_filter - string - Category filter for search results. Can combine categories by delimiting with 
                      commas i.e. "bars, french" will return things hat have either tag. 
                      List of Supported Categories - https://www.yelp.com/developers/documentation/v2/all_category_list
    radius_filter - int - Search Radius in Meters. Note - 1609 meters are in a mile (for calculations). 8046 meters for 5 miles.
    deals_filter - boolean - Whether or not to search exlusively for businesses with deals.
*/



/*GET Hello World page. */
router.get('/helloworld', function(req, res){
	var businesses = [];
	yelp.search({location: "tempe", term: "sandwiches", category_filter: "food"}, function(error, data) {
	  	var test = JSON.stringify(data); //Changes yelps response to JSON Objects with double quotes
	  	test = JSON.parse(test); //JSON.parse can now parse correctly after stringify is used.
	  	for(var i = 0; i < 4; i++){
          var tempObject = test['businesses'][i];
          tempObject.name = test['businesses'][i]['name'];
          tempObject.phone = test['businesses'][i]['display_phone'];
			   businesses.push(tempObject);
		  };

		  console.log(test['businesses'][0]);

		  // first = test['businesses'][0]['name'];
      res.render('helloworld', {title: 'Hello, World', businesses: businesses});

	}); //End Yelp Search
}); //End Router.get

module.exports = router;
