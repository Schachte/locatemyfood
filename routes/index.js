// Yelp Search API Docs - see http://www.yelp.com/developers/documentation/v2/search_api

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


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET Hello World page. */
router.get('/api/:tagId', function(req, res){
	var businesses = [];
	yelp.search({location: "tempe", term: req.params.tagId, category_filter: "food"}, function(error, data) {
	  	var test = JSON.stringify(data); //Changes yelps response to JSON Objects with double quotes
	  	test = JSON.parse(test); //JSON.parse can now parse correctly after stringify is used.
	  	for(var i = 0; i < 10; i++){
          var tempObject = test['businesses'][i];
          tempObject.name_information = test['businesses'][i]['name'];
          tempObject.imgur = test['businesses'][i]['rating_img_url'];
          tempObject.phone = test['businesses'][i]['display_phone'];
			   businesses.push(tempObject);
		  };

		  console.log(test['businesses'][0]);

      res.render('helloworld', {title: 'API', businesses: businesses});

	}); //End Yelp Search
}); //End Router.get

module.exports = router;
