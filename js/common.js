jQuery(document).ready(function() {
	/* Check Touch Devise */
	if ('ontouchstart' in document.documentElement) {
		$('body').addClass('touch');
	}
	else {
		$('body').addClass('no-touch');
	}
	
	/* Init Slider */
	$('.slide-items').slick({
		dots: false,
		infinite: true,
		variableWidth: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: $('.slide-arr-left'),
		nextArrow: $('.slide-arr-right'),
		focusOnSelect: false
	});
	
	/* Init Gallery */
	$('.thumb-link').magnificPopup({
		type:'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true
		}
	});
	
	
	/* video */
	/*var container = $('#video-unit');
	if (container.length) {
		container.height($(window).height());
		$(window).on('resize', function(){
			container.height($(window).height());
		});
		
		$('.toggle-video').click(function() {
			var video = $('#video-player').get(0);
			if (video.paused) {
				video.play();
			}
			else {
				video.pause();
			}
		});
	}*/
	
	/* parallax */
	//parallax()
	//$(window).on('scroll',parallax)
	
	
	initLng();
	setBodyFontSize();
	
	
	/* Mobile Tabs */
	$('.mobile-menu-btn').mobileTabs({
		media: 980,
		parent: '.mobile-toggle',
		overlay: '#body-overlay',
		parentAnimate: 'fadeInDown'
	});
	
	/* Mobile Menu */
	$('.menu-link, .submenu-link').toggleMenuItems({media: 980});
	
	/* Mobile Search */
	$('#side-search').mobileSearch({media: 980});
	
	/* Tracker */
	/*$('.tracker').tracker({
		media: -980
	});*/
	
	/* Toggler */
	$('.additional-unit .toggler').toggler({ animate: 'slide' });
	$('.rightbar-controls .toggler').toggler({ animateClasses: ['fadeInRight', 'fadeOutRight'] });
	
	/* Toggle Video */
	$('.toggle-video').toggleVideo({hideAfterPlay: true});
	
	/* Selectmenu */
	$('.custom-select')
		.selectmenu({
			change: function() {
				$('.ui-state-focus').removeClass('ui-state-focus');
			}
		})
		.selectmenu('menuWidget');
	
	$('.color-select').each(function(index, el) {
		$(el).selectmenu()
		.selectmenu('menuWidget')
		.addClass('ui-selectmenu-color');
	});
		
		
	/* Filter */
	$('#rightbar .checkbox-label').filterButton({
		block: '.filter-action',
		alignTo: '.fake-checkbox'
	});
	
	/* Compare */
	$('.checkbox-label').filterButton({
		block: '.compare-action',
		toggle: true,
		mirror: true,
		alignTo: '.fake-checkbox',
		compare: '.page-unit'
	});
	
	/* Search page */
	$('.list-inputs .text-field').filterButton({
		block: '.search-action',
		mirror: true,
		parent: '.parent'
	});
	$('.search-table tr:not(":first")').searchButton({
		btn: '.submit-btn',
		parent: '.search-table'
	});
	
	
	$('.search-table').each(function(index, el) {
		var $el = $(el),
			$headers = $('.list-title .cell'),
			$items = $el.find('.list-title + .table-item .cell');
			
		$items.each( function(index, el) {
			var $el = $(el),
				w = $el.width();
			$el.width(w);
			$headers.eq(index).width(w);
		});
	});
	
	/* Popup */
	$('.show-popup').magnificPopup({
		type : 'inline',
		closeBtnInside: true,
		closeMarkup: '<button type="button" class="icon icon-close mfp-close"></button>',
		callbacks: {
			open: function() {
				if (this.ev.length == 1) {
					var data = $(this.ev[0]).attr('data-map');
					
					if (!!data) {
						initializeMap(data);
					}
				}
			}
		}
	}, 0);
});


function parallax() {
	var wH = $(window).height()-50 + $(window).scrollTop(),
		elPos = $('.calc-info').offset().top,
		elPos2 = $('.payment-info').offset().top;

	if (wH > elPos) {
		//console.log(parseInt($('.calc-info').css('background-position')))
		//$('.calc-info').css('background-position', '0 ' + -(wH - elPos)/2 + 'px')
		//$('.calc-info').css('background-position-y', parseInt($('.calc-info').css('background-position-y')) - 1)
		/*$('.calc-info').css({
			transform: 'translate(0%, ' + st/20 + '%)'
		})*/
		if ($('.calc-info').innerHeight() < 343) {
			///$('.calc-info').css('height', $('.calc-info').innerHeight() + 5)
		}
	}
	if (wH) {
		
	}
	if (wH > elPos2) {
		//$('.payment-info').css('background-position', '0 ' + -(wH - elPos2)/3 + 'px')
	}
}

function initLng() {
	var $lng = $('.lng-unit');
	$('.close-btn').click(function(e){
		e.preventDefault();
		$lng.hide();
	});
	$('.lng-toggle-link').click(function(e){
		e.preventDefault();
		$lng.toggle();
	});
	$('body').click(function(e) {
		var $el = $(e.target);
		if (!$el.hasClass('lng-toggle-link') && !$el.closest('.lng-unit').length) {
			$lng.hide();
		}
	});
}

function setBodyFontSize() {
	var $body = $('body'),
		size = parseInt($body.css('font-size')),
		$links = $('#font-switcher .switch-link'),
		sizes = [
			17, // >= 1400
			15, // < 1400
			''  // < 900
		];
	
	var setActive = function(e) {
		var ls = localStorage.getItem('bodySize');
		
		if (window.innerWidth < 900) {
			$body.css('font-size', sizes[2]);
			return;
		}
		else if (e && e.type == 'resize') {
			if (window.innerWidth >= 1400) {
				size = sizes[0];
			}
			else if (window.innerWidth < 1400) {
				size = sizes[1];
			}
		}
		
		if (e) {
			$body.css({
				'-webkit-transition': 'font-size .5s ease-out',
				'-moz-transition': 'font-size .5s ease-out',
				'-o-transition': 'font-size .5s ease-out',
				'transition': 'font-size .5s ease-out'
			});
		}
		
		if (ls == null) {
			$links.eq(1).addClass('disable');
		}
		else {
			ls = parseInt(ls);
			$body.css('font-size', size + ls + 'px');
			$links.removeClass('disable');
			if (ls == 0) {
				$links.eq(1).addClass('disable');
			}
			else if (ls >= 2) {
				$links.eq(2).addClass('disable');
			}
			else if (ls <= -2) {
				$links.eq(0).addClass('disable');
			}
		}
	};
	
	setActive();
	
	$links.bind('click', function(e){
		e.preventDefault();
		
		if ($(e.currentTarget).hasClass('disable')) {
			return false;
		}
		
		var rel = $(e.currentTarget).attr('rel'),
			ls = parseInt(localStorage.getItem('bodySize') || 0);
		if (rel == '+') {
			localStorage.setItem('bodySize', ++ls);
		}
		else if (rel == '-') {
			localStorage.setItem('bodySize', --ls);
		}
		else {
			localStorage.setItem('bodySize', 0);
		}
		setActive(e);
	});
	
	$(window).on('resize', setActive);
}

(function( $ ) {
	/* Mobile Tabs Function */
	$.fn.mobileTabs = function(options) {
		this.options = options || {};
		this._inited = false;
		this.$link = false;
		this.$container = false;
		this.$lastLink = false;
		this.$lastContainer = false;
		this.$containers = false;
		
		this.checkWidth = function() {
			if (window.innerWidth > this.options.media) {
				if (this._inited) {
					this.destroy();
				}
			}
			else {
				if (!this._inited) {
					this.init();
				}
			}
		};
		
		this.init = function() {
			this._inited = true;
			this.$items = $(this);
			this.$overlay = this.options.overlay ? $(this.options.overlay) : false;
			this.$parent = this.options.parent ? $(this.options.parent) : false;
			
			this.$items.on('click.toggleTabs', $.proxy(function(e){
				e.preventDefault();
				this.$link = $(e.currentTarget);
				this.toggler();
			}, this));
			
			this.$overlay.on('click.toggleTabs', $.proxy(function(e){
				e.preventDefault();
				this.hideItem(true);
			}, this));
		};
		
		this.toggler = function() {
			if (this.$link.hasClass('active')) {
				this.hideItem(true);
			}
			else {
				this.$container = $(this.$link.attr('data'));
				
				this.hideItem();
				this.showItem();
				
				this.$lastLink = this.$link;
				this.$lastContainer = this.$container;
			}
			return false;
		};
		
		this.hideItem = function(all) {
			if (this.$lastLink) {
				this.$lastLink.removeClass('active');
				this.$lastContainer.hide();
			}
			
			if (all) {
				if (this.$parent) {
					this.$parent.hide();
				}
				if (this.$overlay) {
					this.$overlay.hide();
				}
				this.$lastLink = false;
				this.$lastContainer = false;
			}
		};
		
		this.showItem = function() {
			this.$link.addClass('active');
			this.$container.show();
			
			if (!this.$lastLink) {
				if (this.$parent) {
					this.$parent.show();
					if (this.options.parentAnimate) {
						this.$parent.addClass('animated ' + this.options.parentAnimate);
					}
				}
				if (this.$overlay) {
					this.$overlay.show();
				}
			}
		};
		
		this.destroy = function() {
			this.$items.off('.toggleTabs');
			
			if (!this.$containers.length) {
				this.$containers = $.map(this.$items, function(n, i){
					return $(n).attr('data');
				});
				this.$containers = $(this.$containers.join());
			}
			
			this.$containers.css('display', '');
			
			if (this.$lastLink) {
				this.$lastLink.removeClass('active');
				this.$lastLink = false;
				this.$lastContainer = false;
			}
			
			if (this.$parent) {
				this.$parent.css('display', '');
				if (this.options.parentAnimate) {
					this.$parent.removeClass('animated ' + this.options.parentAnimate);
				}
			}
			if (this.$overlay) {
				this.$overlay.hide();
			}
			this._inited = false;
		};
		
		if (this.options.media) {
			this.checkWidth(); 
			$(window).on('resize', $.proxy(this.checkWidth, this));
		}
		else {
			this.init();
		}
	};
})(jQuery);

(function( $ ) {
	/* Mobile Search Function */
	$.fn.mobileSearch = function(options) {
		this.$form = $(this);
		this.options = options || {};
		this._inited = false;
		this.input = this.$form.find('[type="text"]');
		this.submit = this.$form.find('[type="submit"]');
		
		this.checkWidth = function() {
			if (window.innerWidth > this.options.media) {
				if (this._inited) {
					this.destroy();
				}
				return;
			}
			else {
				if (!this._inited) {
					this.init();
				}
				return;
			}
		};
		
		this.init = function() {
			this._inited = true;
			
			this.input.on('click.mobileSearchInput', $.proxy(function(){
				this.activate();
			}, this));
			
			this.input.on('focusout.mobileSearchInput', $.proxy(function(){
				this.deactivate();
			}, this));
		};
		
		this.activate = function() {
			this.$form.addClass('active');
		};
		
		this.deactivate = function() {
			if (this.input.val().length) {
				return;
			}
			this.$form.removeClass('active');
		};
		
		this.destroy = function() {
			this.input.off('.mobileSearchInput');
			this.css('display', '');
			this._inited = false;
		};
		
		if (this.options.media) {
			this.checkWidth();
			$(window).on('resize', $.proxy(this.checkWidth, this));
		}
		else {
			this.init();
		}
	};
})(jQuery);

(function( $ ) {
	/* Tracker */
	$.fn.tracker = function(options) {
		this.options = options || {};
		this._inited = false;
		this.$el = $(this);
		this.$trackers = false;
		this.$oldScroll = $(window).scrollTop();
		
		this.checkWidth = function() {
			if ((this.options.media < 0 && window.innerWidth <= -this.options.media) || (this.options.media > 0 && window.innerWidth > this.options.media)) {
				console.log('checkWidth destroy')
				if (this._inited) {
					this.destroy();
				}
			}
			else {
				
				if (!this._inited) {
					console.log('checkWidth init')
					this.init();
					
				}
				else {
					this.$trackers = this.checkHeight(); 
					if (!this.$trackers) {
						console.log('checkWidth destroy')
						this.destroy()
						
					}
					else {
						console.log('checkWidth setPosition')
						this.setPosition();
					}
					
				}
			}
		};
		
		this.init = function() {
			this.$trackers = this.checkHeight();
			
			if (this.$trackers) {
				this._inited = true;
				this.setPosition();
				$(window).on('scroll.trackerScroll', $.proxy(function(){
					this.setPosition();
				}, this));
			}
		};
		
		this.checkHeight = function() {
			if (this.$el.length > 1) {
				
			}
			else if (this.$el.length == 1 && $(window).height() < this.$el.outerHeight()) {
				this.$el.data({diff: this.$el.outerHeight() - window.innerHeight});
				return this.$el;
			}
			
			return false;
		};
		
		this.setPosition = function() {
			var ws = $(window).scrollTop(),
				hDiff = this.$trackers.data('diff');
				diff = this.$oldScroll - ws;
				
			if (ws < hDiff) {
				this.$trackers.css({
					top: -ws
				});
			}
			else {
				this.$trackers.css({
					top: -hDiff
				});
			}
			setTimeout($.proxy(function() {	
				
			}, this), 300);
			
			this.$oldScroll = ws;
		};
		
		this.destroy = function() {
			$(window).off('.trackerScroll');
			if (this.$trackers) {
				this.$trackers.css({
					top: '',
					bottom: ''
				});
			}
		};
		
		if (this.options.media) {
			this.checkWidth(); 
			$(window).on('resize', $.proxy(this.checkWidth, this));
		}
		else {
			this.init();
		}
	};
})(jQuery);

(function( $ ) {
	/* Toggler Function */
	$.fn.toggler = function(options) {
		this.$items = $(this);
		this.$activeTab = false;
		this.$activeUnit = false;
		this.$lastTab = false;
		this.$lastUnit = false;
		this.animate = options.animate || false;
		this.animateClasses = options.animateClasses || false;
		
		this.init = function() {
			this.$items.on('click', $.proxy(this.toggle, this));
		};
		
		this.toggle = function(e) {
			e.preventDefault();
			
			this.$activeTab = $(e.currentTarget);
			this.$activeUnit =$(this.$activeTab.attr('href'));
			
			if (this.$activeTab.hasClass('active')) {
				this.deactivate();
			}
			else {
				this.activate();
			}
		};
		
		this.activate = function(e) {
			if (this.$lastTab) {
				this.deactivate();
			}
			this.$lastTab = this.$activeTab.addClass('active').removeClass('inactive');
			if (this.animate) {
				if (this.animate == 'slide') {
					this.$activeUnit.slideDown();
				}
			}
			else if (this.animateClasses) {
				this.$activeUnit
					.addClass(this.animateClasses[0])
					.removeClass(this.animateClasses[1])
					.show();
			}
			else {
				this.$activeUnit.show();
			}
			this.$lastUnit = this.$activeUnit;
		};
		
		this.deactivate = function() {
			if (this.$lastTab) {
				this.$lastTab.removeClass('active').addClass('inactive');
				if (this.animate) {
					if (this.animate == 'slide') {
						this.$activeUnit.slideUp();
					}
				}
				else if (this.animateClasses) {
					this.$activeUnit
						.addClass(this.animateClasses[1])
						.removeClass(this.animateClasses[0]);
				}
				else {
					this.$activeUnit.hide();
				}
				this.$lastTab = false;
				this.$lastUnit = false;
			}
		};
		
		this.init();
	};
})(jQuery);

(function( $ ) {
	/* Toggler Function */
	$.fn.toggleVideo = function(options) {
		this.$items = $(this);
		
		this.init = function() {
			this.$items.on('click', $.proxy(this.toggle, this));
			if (options.hideAfterPlay) {
				this.$items.each($.proxy(function(index, el) {
					var $el = $(el);
					$el.parent().find('video').data('control', $el).on('click', $.proxy(this.stopVideo, this));
				}, this));
			}
		};
		
		this.stopVideo = function(e) {
			$(e.currentTarget).data('control').show();
			e.currentTarget.pause();
		};
		
		this.toggle = function(e) {
			e.preventDefault();
			
			var $el = $(e.currentTarget),
				video = $el.parent().find('video').get(0);
			
			if (video.paused) {
				video.play();
				
				if (options.hideAfterPlay) {
					$el.hide();
				}
			}
			else {
				this.stopVideo();
				video.pause();
			}
		};
		
		this.init();
	};
})(jQuery);

(function( $ ) {
	/* Toggle Mobile Menu Items */
	$.fn.toggleMenuItems = function(options) {
		this.$items = $(this);
		this.options = options || {};
		this._inited = false;
		
		this.checkWidth = function() {
			if (window.innerWidth > this.options.media) {
				if (this._inited) {
					this.destroy();
				}
				return;
			}
			else {
				if (!this._inited) {
					this.init();
				}
				return;
			}
		};
		
		this.init = function() {
			this._inited = true;
			
			this.$items.on('click.toggleMenuItems', $.proxy(this.toggleItems, this));
		};
		
		this.toggleItems = function(e) {
			var $el = $(e.currentTarget),
				$submenu = $el.siblings('.submenu');
				
			if ($submenu.length) {
				e.preventDefault();
				
				$parent = $el.parent();
				$submenu.slideToggle();
				$parent.toggleClass('active');
			}
		};
		
		this.destroy = function() {
			this.$items.off('.toggleMenuItems');
		};
		
		if (this.options.media) {
			this.checkWidth();
			$(window).on('resize', $.proxy(this.checkWidth, this));
		}
		else {
			this.init();
		}
	};
})(jQuery);

(function( $ ) {
	/* Dropdown */
	$.fn.dropdown = function(options) {
		this.$items = $(this);
		this.options = options || {};
		
		this.init = function() {
			this._inited = true;
			
			this.$items.on('click.toggleMenuItems', $.proxy(this.toggleItems, this));
		};
		
		this.toggleItems = function(e) {
			var $el = $(e.currentTarget),
				$submenu = $el.siblings('.submenu');
				
			if ($submenu.length) {
				e.preventDefault();
				
				$parent = $el.parent();
				$submenu.slideToggle();
				$parent.toggleClass('active');
			}
		};
		
		this.destroy = function() {
			this.$items.off('.toggleMenuItems');
		};
		
		this.init();
	};
})(jQuery);

(function( $ ) {
	/* Filter Button */
	$.fn.filterButton = function(options) {
		
		this.init = function() {
			this.on('click', $.proxy(this.setPosition, this));
		};
		
		this.setPosition = function(e) {
			var $label = $(e.currentTarget),
				$block = $label.offsetParent().find(options.block);
			
			if ($(e.target).is('input[type="checkbox"]')) return;

			if (!!options.toggle && $(e.currentTarget).find('input').is(':checked')) {
				$block.hide();
			}
			else {
				
				if (!options.compare || !!options.compare && $label.closest(options.compare).find('input[type="checkbox"]:checked').length > 0) {
				
					$block.show();
					
					var $el = !!options.parent ? $label.closest(options.parent) : $label,
						$alignTo = !!options.alignTo ? $label.find(options.alignTo) : $el,
						parentScroll = $el.offsetParent().scrollLeft();
					
					var o = $el.position(),
						left = o.left - $block.outerWidth() - 10,
						top = o.top - $block.outerHeight()/2 + $alignTo.outerHeight()/2;
					
					if (!!options.mirror) {
						if (left < 0) {
							left = o.left + $alignTo.outerWidth() + 10;
							$block.addClass('right-pos');
						}
						else {
							$block.removeClass('right-pos');
						}
					}
					
					if (parentScroll) {
						left += parentScroll;
					}
					
					$block.css({
						left: left,
						top: top
					});
				}
			}
		};
		
		this.init();
	};
})(jQuery);

(function( $ ) {
	/* Search Button */
	$.fn.searchButton = function(options) {
		this.$btn = !!options.parent ? this.closest(options.parent).find(options.btn) : $(options.btn);
		
		this.init = function() {
			this.on('mouseenter', $.proxy(this.setPosition, this));
			this.on('mouseleave', $.proxy(this.hideBtn, this));
			this.$btn.on('mouseleave', $.proxy(this.hideBtn, this));
		};
		
		this.setPosition = function(e) {
			var $el = $(e.currentTarget),
				pos = $el.position();
			
			this.$btn.show();
			
			this.$btn.css({
				height: $el.innerHeight(),
				top: pos.top,
				right: pos.left
			});
		};
		
		this.hideBtn = function(e) {
			if ($(e.toElement).is(this.$btn)) return;
			this.$btn.hide();
		};
		
		this.init();
	};
})(jQuery);