var map;
var markers = [];
var marker;
// Create a new blank array for all the listing markers.
var markers = [];
var touristPlaces=[
      {title:'Araku Valley',location:{lat:18.321882,lng:82.880485},images:["araku.jpg"],id: "nav0",
    visible: ko.observable(true),boolTest: true},
      {title:'Srisailam Dam',location:{lat:16.086552,lng:78.896074},images:["srisailam.jpg"],id: "nav1",
    visible: ko.observable(true),boolTest: true},
      {title:'Venkateswara Temple, Tirumala',location:{lat:13.683710,lng:79.347739},images:["tirumala.jpg"],id: "nav2",
    visible: ko.observable(true),boolTest: true},
      {title:'Lepakshi',location:{lat:13.804047,lng:77.604922},images:["lepakshi.jpg"],id: "nav3",
    visible: ko.observable(true),boolTest: true},
      {title:'Raghavendra Tirtha',location:{lat:15.942776,lng:77.422312},images:["mantralayam.jpg"],id: "nav4",
    visible: ko.observable(true),boolTest: true},
      {title:'Papi Hills',location:{lat:17.505600,lng:81.388438},images:["papihills.jpg"],id: "nav5",
    visible: ko.observable(true),boolTest: true},
      {title:'Srikalahasti',location:{lat:13.749612,lng:79.698944},images:["srikalahasti.jpg"],id: "nav6",
    visible: ko.observable(true),boolTest: true},
      {title:'Kanaka Durga Temple',location:{lat:16.515693,lng:80.606046},images:["durga_temple.jpg"],id: "nav7",
    visible: ko.observable(true),boolTest: true}
      ];


//Initialize the map and its contents
function initialize() {
      var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(15.158026, 78.931400),
    };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setMarkers(touristPlaces);
      setAllMap();
    //Reset map on click handler and
    //when window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(6);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(7);
            map.setCenter(mapOptions.center);
        }
    }
    //Reset map on click handler and
    //when window resize conditionals are met    
    $("#reset").click(function() {
        resetMap();
    });
   $(window).resize(function() {
        resetMap();
    });
  }

//Determines if markers should be visible
//This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < touristPlaces.length; i++) {
    if(touristPlaces[i].boolTest === true) {
    touristPlaces[i].holdMarker.setMap(map);
    } else {
    touristPlaces[i].holdMarker.setMap(null);
    }
  }
}
//Sets the markers on the map within the initialize function
//Sets the infoWindows to each individual marker
//The markers are inidividually set using a for loop
function setMarkers(touristPlaces) {
  // To Add Info Window For Each Marker
       var largeInfowindow = new google.maps.InfoWindow();
       // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('FF0000');
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF24');

       var bounds = new google.maps.LatLngBounds();       
       for (var i = 0; i < touristPlaces.length; i++) {        
        touristPlaces[i].holdMarker = new google.maps.Marker({
        position :touristPlaces[i].location,
        lat : touristPlaces[i].location.lat,
        lng : touristPlaces[i].location.lng,
        title :touristPlaces[i].title,
        image : touristPlaces[i].images[0],
        animation : google.maps.Animation.DROP,
        icon: defaultIcon,
        id : i
        });
        markers.push(touristPlaces[i].holdMarker);
        touristPlaces[i].holdMarker.setMap(map);
        //Extend the boundaries of the map for each marker
        bounds.extend(touristPlaces[i].holdMarker.position);
        // To Add Click Event Functionality to the marker
        touristPlaces[i].holdMarker.addListener('click',function(){
        populateInfoWindow(this,largeInfowindow);        
      });                  
      // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        touristPlaces[i].holdMarker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });
        touristPlaces[i].holdMarker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });

      var searchNav = $('#nav' + i);
      searchNav.click((function(marker, i) {
        return function() {
          largeInfowindow.setContent(populateInfoWindow(marker,largeInfowindow));
          largeInfowindow.open(map,marker);
          map.setZoom(16);
          map.setCenter(marker.getPosition());
          touristPlaces[i].picBoolTest = true;
        };
      })(touristPlaces[i].holdMarker, i));
      google.maps.event.addListener(touristPlaces[i].holdMarker, 'click', toggleBounce);
    };
    // Extend the boundaries of the map for each marker
      map.fitBounds(bounds);
}

//To Bounce the marker
function toggleBounce() {
  if (this.getAnimation() != null) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
  }
}

//To populate info Window
function populateInfoWindow(marker, infowindow){
  // Check to make sure the info window is not already openend on this marker.
  if(infowindow.marker != marker){
    infowindow.marker = marker;
    wikiArticle(marker.title);
    currentTemperature(marker.lat,marker.lng);
    marker.contentString= '<div><a target="_blank" id="wiki-article" href="">'+marker.title+
    '</a>&nbsp;&nbsp;&nbsp; <b>Current Temperature: <span class="temp"></span></b> </div> <br>' +
     '<img class="info-image" src="Images/'+marker.image+'">';
    infowindow.setContent(marker.contentString);
    infowindow.open(map,marker);
      // Make sure that marker property is cleared if the info window is closed
    infowindow.addListener('closeclick',function(){      
      infowindow.setMarker = null;
      });
      return marker.contentString;
    }
  };


// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

// To get wiki Article of Marker Title 
function wikiArticle(location){
  var wikiRequestTimeout = setTimeout(function(){
        alert("Failed to get Wikipedia Resources");
        },6000);
  var wiki_url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+location+
  '&limit=5&callback=wikiCallback&key=AIzaSyD__I-fc0xXg3VnCK5Pu7uBqUNY_zQG8X4';
  $.ajax({
    url: wiki_url,
    dataType: "jsonp",
    success:function(response){
      var articleList = response[3];
       $("#wiki-article").attr("href",articleList[0]);
      clearTimeout(wikiRequestTimeout);
    }
    })
  }

// To get Current Temperature using DarkSearch Api
function currentTemperature (lat,lng){  
  var current_temp = "";
  var secretKey = "2a8ad86741e4686531e403d321ed6a1f";
  var init_url = 'https://api.darksky.net/forecast/';
  var darkskyAPI= init_url+secretKey+'/'+lat+','+lng+
      '?exclude=minutely,hourly,daily,alerts,flags&units=si'  
  $.ajax(darkskyAPI, {
    dataType: 'jsonp'
  })
    .done(function(data) {
      current_temp = data.currently.temperature;
      $('.temp').text(current_temp+"°C");
    })
    .fail(function(data) {
      current_temp = "Not Available";
      $('.temp').text(current_temp);
  });
}

//Query through the different locations from nav bar with knockout.js
//only display markers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};


viewModel.touristPlaces = ko.dependentObservable(function() {
  var self = this;
  var search = self.query().toLowerCase();
  return ko.utils.arrayFilter(touristPlaces, function(touristPlace) {
  if (touristPlace.title.toLowerCase().indexOf(search) >= 0) {
          touristPlace.boolTest = true;
          return touristPlace.visible(true);
      } else {
          touristPlace.boolTest = false;
          setAllMap();
          return touristPlace.visible(false);
      }
  });
}, viewModel);

ko.applyBindings(viewModel);

//show $ hide markers in sync with nav
$("#input").keyup(function() {
setAllMap();
});


//Hide and Show entire Nav/Search Bar on click
// Hide/Show Bound to the arrow button
//Nav is repsonsive to smaller screen sizes
var isNavVisible = true;
function noNav() {
    $("#search-nav").animate({
    height: 0,
    }, 500);
    setTimeout(function() {   
      $("#search-nav").hide();
      }, 500);
    $("#arrow").attr("src", "Images/down-arrow.gif");
    isNavVisible = false;
}

function yesNav() {
  $("#search-nav").show();
  var scrollerHeight = $("#scroller").height() + 55;
  if($(window).height() < 600) {
     $("#search-nav").animate({
      height: scrollerHeight - 100,
      }, 500, function() {
        $(this).css('height','auto').css("max-height", 439);
        });
        } else {
        $("#search-nav").animate({
            height: scrollerHeight,
        }, 500, function() {
            $(this).css('height','auto').css("max-height", 549);
          });
        }
        $("#arrow").attr("src", "Images/up-arrow.gif");
        isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
      noNav();
    } else {
      yesNav();
    }
}

$("#arrow").click(hideNav);

//Hide Nav if screen width is resized to < 850 or height < 595
//Show Nav if screen is resized to >= 850 or height is >= 595
    //Function is run when window is resized
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            noNav();
        } else if($(window).height() < 595 && isNavVisible === true) {
            noNav();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 595) {
                yesNav();
            }
        } else if($(window).height() >= 595 && isNavVisible === false) {
            if($(window).width() > 850) {
                yesNav();
            }
        }
});
