(function($) {
	
	var container, main, thumbs, contWidth, mainheight, thumbHeight;
	var curImageIndex = 0;
	var images = [];

	let methods = {
		init: function(in_arr) {
			images = in_arr;
			this.baseMarkup();
			this.loadThumbs();
			this.showImage();
			this.setupEvents();
		},

		setupEvents() {
			var self = this;
			$('.thumb').on('click', function() {
				curImageIndex = $(this).attr('data-index');
				self.showImage();
			});

			$('.icon').on('click', function() {
				if ($(this).attr('id') === 'icon-left') {
					if (curImageIndex > 0) {
						curImageIndex--;
					}
				} else {
					if (curImageIndex < (images.length-1)) {
						curImageIndex++;
					}
				}
				self.showImage();
			});

			$(window).on('resize', function() {
				self.refreshMarkup();
			});
		},

		baseMarkup() {
			container.append('<div style="margin-bottom: 4px; padding: 0; background-position: center; background-size: contain; background-repeat: no-repeat;" class="col-md-12" id="fantata-gallery-main"><img class="icon" id="icon-left" src="/chevron-left.svg" /><img class="icon" id="icon-right" src="/chevron-right.svg" /></div>');
			container.append('<div style="padding: 0;" class="col-md-12" id="fantata-gallery-thumbs"></div>');

			main = $('#fantata-gallery-main');
			thumbs = $('#fantata-gallery-thumbs');
			container.css('width','100%');

			main.css('padding', '25% 0');
			
			$('.icon').css('cursor', 'pointer');

			$('#icon-left').css('float', 'left');
			$('#icon-left').css('height', '40px');

			$('#icon-right').css('float', 'right');
			$('#icon-right').css('height', '40px');

			this.refreshMarkup();
		},

		refreshMarkup() {
			contWidth = container.width();
			mainHeight = contWidth * 0.6;
			thumbHeight = contWidth * 0.15;
			
			main.css('height', mainHeight);
			thumbs.css('height', thumbHeight);
		},

		loadThumbs() {

			var thW = (contWidth / 8) - 0.5;
			var thH = thW * .75;
			var x = 0;
			images.map(function(img) {
				thumbs.append('<div class="thumb" data-index="'+x+'" style="cursor: pointer; background: url('+img+'); background-size: 100%; margin: 1px; height: '+thH+'px; width: '+thW+'px; float: left;"></div>');
				x++;
			});
		},

		showImage() {
			$('#fantata-gallery-main').css('background-image', "url("+images[curImageIndex]+")");
			if (curImageIndex == 0) {
				$('#icon-left').css('display','none');
			} else {
				$('#icon-left').css('display','block');
			}

			if (curImageIndex == images.length - 1) {
				$('#icon-right').css('display','none');
			} else {
				$('#icon-right').css('display','block');
			}			
		}

	};
	
	$.fn.gallery = function(in_arr) {
		container = $(this);
		methods.init(in_arr);		
		return this;
	};
	
})(jQuery);