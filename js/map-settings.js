var googleMaps = {
	maps: {},
	mapSettings: {
		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			mapTypeControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT,
			},
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
					'stylers': [{'color': '#e1ded7'}]
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
					'stylers': [{'color': '#e1ded7'}]
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
					'stylers': [{'color': '#000000'}]
				},
				{
					'featureType': 'water',
					'elementType': 'geometry.fill',
					'stylers': [
						{'visibility': 'on'},
						{'color': '#e1ded7'}
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
	}
};

function initializeMap(data){
	if (!!googleMaps.maps[data]) {
		//return;
	}
	var settings = googleMaps.mapSettings,
		options = settings.mapOptions;
		
	if (data == 'popup-map') {
		
		/* Select City */
		
		options.zoom = 4;
		
		var contacts = [
			{
				alias: 'dnepropetrovsk',
				city: 'Днепропетровск',
				phone: '+38 067 123-45-67',
				email: 'info@fresh-d.net',
				latLng: [48.4581468, 35.0222442]
			},
			{
				alias: 'moscow',
				city: 'Москва',
				phone: '+7 945 123-45-67',
				email: 'info@fresh-d.net',
				latLng: [55.7498598,37.3523249]
			}
		];
		
		var infowindow = new google.maps.InfoWindow;
		
		for (var i = 0; i < contacts.length; i++) {
			var latLng = new google.maps.LatLng(contacts[i].latLng[0], contacts[i].latLng[1]);
			
			if (!i) {
				options.center = latLng;
				googleMaps.maps[data] = new google.maps.Map(document.getElementById(data), options);
			}
			
			var contentString = '<div class="map-tooltip">' +
				'<div class="mt-title"><a class="internal-link" href="' + contacts[i].alias + '">' + contacts[i].city + '</a></div>' +
				'<div class="os-bold">' + contacts[i].phone + '</div>' +
				'<div><a class="internal-link" href="mailto:' + contacts[i].alias + '">' + contacts[i].email + '</a></div>' +
			'</div>';
			
			var marker = new google.maps.Marker({
				icon: settings.markerImage,
				position: latLng, 
				map: googleMaps.maps[data],
				zIndex: i + 1,
				contentString: contentString
			});
			
			google.maps.event.addListener(marker, 'mouseover', function() {
				this.setIcon(settings.markerImageHover);
			});
	
			google.maps.event.addListener(marker, 'mouseout', function() {
				this.setIcon(settings.markerImage);
			});
			
			marker.addListener('click', function() {
				var marker = this;
				infowindow.close();
				infowindow.setContent(marker.contentString);
				infowindow.open(googleMaps.maps[data], marker);
			});
		}
		
		$('#' + data).delegate('.mt-title a', 'click', function(e) {
			e.preventDefault();
			var $elToShow = $('.contacts-' + $(e.currentTarget).attr('href'));
			if (!$elToShow.hasClass('active')) {
				$elToShow
					.addClass('active')
					.siblings()
					.removeClass('active');
			}
			infowindow.close();
		});
	}
	else if ('contacts-map') {
		
		/* Contacts Map */
		
		var myLatlng = new google.maps.LatLng(48.4581468,35.0222442,51.2372979,6.71779);
		
		options.center = myLatlng;
		options.zoom = 3;
		
		googleMaps.maps[data] = new google.maps.Map(document.getElementById(data), options);

		var marker = new google.maps.Marker({
			icon: settings.markerImage,
			position: myLatlng, 
			map: googleMaps.maps[data]
		});
		
		google.maps.event.addListener(marker, 'mouseover', function() {
			marker.setIcon(settings.markerImageHover);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setIcon(settings.markerImage);
		});
		
		/*map.addListener('center_changed', function() {
			window.setTimeout(function() {
				map.panTo(marker.getPosition());
			}, 3000);
		});*/
	}
}