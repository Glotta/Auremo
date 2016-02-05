var mapSettings = {
	mapOptions: {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		mapTypeControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT,
		},
		///minZoom: 10,
		styles: [
			{
				'featureType': 'administrative',
				'elementType': 'labels',
				'stylers': [
					{'visibility': 'on'},
					{'lightness': '50'}
				]
			},
			{
				'featureType': 'administrative.country',
				'elementType': 'geometry.fill',
				'stylers': [
					{'color': '#ffffff'},
					{'visibility': 'on'}
				]
			},
			{
				'featureType': 'administrative.country',
				'elementType': 'geometry.stroke',
				'stylers': [{'color': '#DCE7EB'}]
			},
			{
				'featureType': 'administrative.province',
				'elementType': 'geometry.fill',
				'stylers': [
					{'visibility': 'on'},
					{'color': '#ffffff'}
				]
			},
			{
				'featureType': 'administrative.province',
				'elementType': 'geometry.stroke',
				'stylers': [{'color': '#DCE7EB'}]
			},
			{
				'featureType': 'landscape',
				'elementType': 'geometry',
				'stylers': [{'visibility': 'off'}]
			},
			{
				'featureType': 'landscape',
				'elementType': 'geometry.fill',
				'stylers':[{'color': '#ffffff'}]
			},
			{
				'featureType': 'landscape.natural',
				'elementType': 'geometry.fill',
				'stylers': [
					{'visibility': 'on'},
					{'color': '#ffffff'}
				]
			},
			{
				'featureType': 'landscape.natural',
				'elementType': 'labels',
				'stylers':[{'visibility': 'off'}]
			},
			{
				'featureType': 'poi',
				'elementType': 'all',
				'stylers': [{'visibility': 'off'}]
			},
			{
				'featureType': 'road',
				'elementType': 'all',
				'stylers': [{'visibility': 'off'}]
			},
			{
				'featureType': 'road',
				'elementType': 'labels',
				'stylers':[{'visibility': 'off'}]
			},
			{
				'featureType': 'transit',
				'elementType': 'labels.icon',
				'stylers': [{'visibility': 'off'}]},
			{
				'featureType': 'transit.line',
				'elementType': 'geometry',
				'stylers':  [{'visibility': 'off'}]
			},
			{
				'featureType': 'transit.line',
				'elementType': 'labels.text',
				'stylers':[{'visibility': 'off'}]
			},
			{
				'featureType': 'transit.station.airport',
				'elementType': 'geometry',
				'stylers': [{'visibility': 'off'}]
			},
			{
				'featureType': 'transit.station.airport',
				'elementType': 'labels',
				'stylers': [{'visibility': 'off'}]
			},
			{
				'featureType': 'water',
				'elementType': 'geometry',
				'stylers': [{'color': '#83888B'}]
			},
			{
				'featureType': 'water',
				'elementType': 'geometry.fill',
				'stylers': [
					{'visibility': 'on'},
					{'color': '#d0c8c5'}
				]
			},
			{
				'featureType': 'water',
				'elementType': 'labels',
				'stylers':[{'visibility': 'off'}]
			}
		]
	
	},

	markerImage: new google.maps.MarkerImage(
		'img/icons/marker.png',
		new google.maps.Size(36,51),
		new google.maps.Point(0,0),
		new google.maps.Point(0,33)
	),

	markerImageHover: new google.maps.MarkerImage(
		'img/icons/marker-hover.png',
		new google.maps.Size(36,51),
		new google.maps.Point(0,0),
		new google.maps.Point(0,33)
	)
};

function initializeMap(id){
	if (id == '#select-city') {
		
		/* Select City */
		
		var myLatlng = new google.maps.LatLng(48.4581468,35.0222442),
			settings = mapSettings.mapOptions;
							
		settings.center = myLatlng;
		settings.zoom = 6;
		
		var map = new google.maps.Map(document.getElementById('popup-map'), settings);

		var marker = new google.maps.Marker({
			icon: mapSettings.markerImage,
			position: myLatlng, 
			map: map,
			//animation:google.maps.Animation.BOUNCE
		});
		
		var contentString = '<div class="map-tooltip">' +
			'<div class="mt-title"><a class="internal-link" href="">Днепропетровск</a></div>' +
			'<div class="os-bold">+38 067 123-45-67</div>' +
			'<div>info@fresh-d.net</div>' +
		'</div>';
		
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		google.maps.event.addListener(marker, 'mouseover', function() {
			marker.setIcon(mapSettings.markerImageHover);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setIcon(mapSettings.markerImage);
		});
		
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
		
		/*map.addListener('center_changed', function() {
			window.setTimeout(function() {
				map.panTo(marker.getPosition());
			}, 3000);
		});*/
	}
}