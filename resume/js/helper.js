var HTMLheaderName = '<h1>%data%</h1>';
var HTMLheaderRole = '<span>%data%</span>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="accent-text">%contact%</span><span>%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="accent-text">mobile</span><span>%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="accent-text">email</span><span>%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="accent-text">twitter</span><span>%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="accent-text">github</span><span>%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="accent-text">blog</span><span>%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="accent-text">location</span><span>%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li><span>%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkTop = '<div class="section clear-fix"></div>';
var HTMLworkTitle = '<h3>%data%</h3>';
var HTMLworkEmployer = '<h4 class="employer">%data%</h4>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<h4 class="location-text">%data%</h4>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<h3>%data%</h3>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<h3>%data%';
var HTMLschoolDegree = ' -- %data%</h3>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<div>Major: %data%</div>';

var HTMLonlineClasses = '<div id="online-courses"><h3>Online Classes</h3></div>';
var HTMLonlineUrl = '<a href="%data%">';
var HTMLonlineTitle = '%data%</a>';
var HTMLonlineSchoolUrl = '<h5><a href="%data%">%data%</a></h5>';
var HTMLonlineSchool = '<h3 class="online-course">%data%</h3><div class="onlineschool-courses"></div>';
var HTMLcodeSchoolCourse = '<div class="onlineschool-course"></div>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<div class="onlineschool-title"><a href="#">%data%</a>';
var HTMLonlineBadge = '<img src="%data%">';
var HTMLonlineCoursesPanLeft = '<div class="pan-left">HEYYYOO</div>';
var HTMLonlineCoursesPanRight = '<div class="pan-right">HEYYYOO</div>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

$(document).ready(function() {
    $('button').click(function() {
        var $name = $('#name');
        var iName = inName($name.text()) || function() {};
        $name.html(iName);
    });

    function inName(name) {
        name = name.split(' ');
        name[0] = name[0].charAt(0).toUpperCase() + name[0].substr(1);
        name[1] = name[1].toUpperCase();
        console.log(name.join(' '));
        return name.join(' ');
    }
});

clickLocations = [];

function logClicks(x, y) {
    clickLocations.push({
        x: x,
        y: y
    });
    console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;

function initializeMap() {
    var locations;
    var mapOptions = {
        disableDefaultUI: true,
        scrollwheel: false
    };
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    function locationFinder() {
        var locations = [];

        locations.push(bio.contacts.location);

        education.schools.forEach(function(school) {
            locations.push(school.location);
        });

        work.jobs.forEach(function(job) {
            locations.push(job.location);
        });

        return locations;
    }

    function createMapMarker(placeData) {
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });

        bounds.extend(new google.maps.LatLng(lat, lon));
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    function pinPoster(locations) {
        var service = new google.maps.places.PlacesService(map);
        locations.forEach(function(place) {
            var request = {
                query: place
            };
            service.textSearch(request, callback);
        });
    }

    window.mapBounds = new google.maps.LatLngBounds();
    locations = locationFinder();
    pinPoster(locations);
}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});
