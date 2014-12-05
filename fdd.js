jQuery.fn.extend({
	dropDownFancy : function(opts) {
		'use strict';
		var _this			= this;
		this.$dropdown		= jQuery(this);
		this.optionsArgs	= opts;
		this.showImages		= opts.showImages || false;

		this.selectedValue	= this.$dropdown.val();
		this.$dropdownOptions = $('option', this.$dropdown);

		this.cssClasses		= {
			mainClass		: 'fancy-dropdown',
			holderClass		: 'container-fancy',
			maskSelectedText: 'selected-text',
			maskIconDropDown: 'selected-arrow',
			maskImage		: 'selected-image',
			optionsList		: 'list-options',
			itemOfList		: 'option'

		};

		this.$fancyWrapper	= $('<div class="'+_this.cssClasses.mainClass + '"></div>');
		this.$maskSelectedText = undefined;
		this.$maskSelectedImg  = undefined;
		this.$maskDropDownIcon = undefined;


		this.init =  function() {
			_this.$dropdown.hide();
			_this.build();
			_this.initialEvents();
			_this.listPositionUpdate();
		};

		this.listPositionUpdate = function () {
			$('.list-options', _this.$fancyWrapper).css({
				'width':_this.$fancyWrapper.width(),
				'top':	_this.$fancyWrapper.position().top + parseInt(_this.$fancyWrapper.css('height'), 10),
				'left':	_this.$fancyWrapper.position().left
			});
		};

		this.initialEvents = function() {
			var $options = $('.option', _this.$fancyWrapper);

			$options.each(function(index, item) {
				$(item).on('click', function(evt) {
					evt.preventDefault();

					if (index !== 0) {
						$(item).closest('.' + _this.cssClasses.holderClass).addClass('selected');
					} else {
						$(item).closest('.' + _this.cssClasses.holderClass).removeClass('selected');
					}

					_this.$maskSelectedText.html($(item).text());
					_this.$maskSelectedImg.attr('src', 'assets/img/' + $(item).data('icon') );
					_this.$dropdown.val($(item).text()).trigger('change');
					_this.removeError();
				});
			});

			_this.$fancyWrapper.on('click', function(evt) {
				evt.preventDefault();
				_this.listPositionUpdate();

				var $container = $('.' + _this.cssClasses.holderClass, this);

				if ($container.hasClass('active')) {
					$container.removeClass('active');
				} else {
					$container.addClass('active');
				}
			});

			$(this).on('mouseleave', function() {
				var $container = $('.' + _this.cssClasses.holderClass, this);
				$container.removeClass('active');
			});
		};

		this.addError = function() {
			var $container = $('.' + _this.cssClasses.holderClass, _this.$fancyWrapper);
				$container.addClass('error');
		};

		this.removeError = function() {
			var $container = $('.' + _this.cssClasses.holderClass, _this.$fancyWrapper);
			$container.removeClass('error');
		};

		this.build =  function () {
			var $mask = '',
				optionsList = [],

				createOption = function ($item) {
					var $option = '<li class="' + _this.cssClasses.itemOfList + '" data-icon="';

					$option += $item.data('icon') + '">';
					$option += $item.val() + '</li>';

					return $option;
				},
				createSelectedItemMask = function ($item) {
					var $selectedItemMask;

					$selectedItemMask = '<div class="' + _this.cssClasses.holderClass + '">';
					if (_this.optionsArgs.showImages === true) {
						$selectedItemMask += '<img src="assets/img/';
						$selectedItemMask += $item.data('icon') + '" class="' + _this.cssClasses.maskImage + '"/>';
					}
					$selectedItemMask += '<span class="' + _this.cssClasses.maskSelectedText + '">' + $item.val() + '</span>';
					$selectedItemMask += '<span class="' + _this.cssClasses.maskIconDropDown + '"></span>';
					$selectedItemMask += '</div>';

					return $selectedItemMask;
				},

				collectSelectors = function() {
					_this.$maskSelectedText = $('.' + _this.cssClasses.maskSelectedText, _this.$fancyWrapper);
					_this.$maskSelectedImg  = $('.' + _this.cssClasses.maskImage, _this.$fancyWrapper);
					_this.$maskDropDownIcon = $('.' + _this.cssClasses.maskIconDropDown, _this.$fancyWrapper);
				};

			_this.$dropdownOptions.each(function (index, item) {
				if ($(item).val() === _this.selectedValue) {
					$mask = createSelectedItemMask($(item));
				}
				optionsList.push(createOption($(item)));
			});

			optionsList.unshift('<ul class="' + _this.cssClasses.optionsList + '">');
			optionsList.push('</ul>');

			_this.$fancyWrapper.html($mask);
			_this.$fancyWrapper.insertAfter(_this.$dropdown);
			$('.' + _this.cssClasses.holderClass ,_this.$fancyWrapper).append(optionsList.join(''));

			collectSelectors();
			return this;
		};

		this.init();
		return this;
	}
});