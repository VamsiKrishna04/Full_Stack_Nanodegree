
function loadData() {

    var $body = $('body');    
    var $wikiElem = $('#wikipedia-links');    
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $streetName = $('#street').val();
    var $cityName = $('#city').val();
    var $greeting = $('.greeting')
    var location = $streetName+","+$cityName

    $greeting.text("So You want to Live At "+$streetName+"?");
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //Remove Previous Image Node
    $('.bgimg').remove()

    // load streetview

    // YOUR CODE GOES HERE!
    // Street View Image request is an HTTP URL
    var img_url = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+location
    var backgroundImage = '<img class="bgimg" src="'+img_url+'">'    
    $body.append(backgroundImage);

    //Requesting Server via NYT API using location
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "0bca8900278b4293a2632feb23e4b169",
      'q': ""+$cityName,
      'sort': "newest"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      //console.log(result);
      var articles = result["response"]["docs"]      
      var i;
      var length = ["length"];
      for(i=0;i<5;i++){
        var url = articles[i]["web_url"];
        var heading = articles[i]["headline"]["main"];
        var snippet = articles[i]["snippet"];        
        $("#nytimes-articles").append('<li class="article">'+'<a href="'+url+'" target="_blank">'+heading+'</a>'+'<p>'+snippet+'</p>'+'</li>');
      }
    }).fail(function(err) {
      $("#nytimes-articles").text('New York Times Articles Could Not Be Loaded');
    });

    // Wiki Media Apis:
    //https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&titles=Albert%20Einstein(To get Titles)
    //https://en.wikipedia.org/wiki/Albert_Einstein(Append title at end)

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Failed to get Wikipedia Resources');
        },8000);

    var wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+$cityName+'&limit=5&callback=wikiCallback';
    $.ajax({
      url: wiki_url,
      dataType: "jsonp",
      success:function(response){
      //console.log(response);
      var articleList = response[3];
      var articleName = response[1];
      for(var i=0;i<articleList["length"];i++){
        $wikiElem.append('<li><a href="'+articleList[i]+'" target="_blank"><p>'+articleName[i]+'</p></a></li>');
       }
       clearTimeout(wikiRequestTimeout);
      }
    })

    return false;
};

$('#form-container').submit(loadData);
