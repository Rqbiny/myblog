/*
 * jQuery.autopager v1.0.0
 *
 * Copyright (c) lagos
 * Dual licensed under the MIT and GPL licenses.
 */
(function($) {
	var window = this, options = {},
		content, currentUrl, nextUrl,
		active = false,
		defaults = {
			autoLoad: true,
			page: 1,
			content: '.content',
			link: 'a[rel=next]',
			insertBefore: null,
			appendTo: null,
			start: function() {},
			load: function() {},
			disabled: false
		};

	$.autopager = function(_options) {
		var autopager = this.autopager;

		if (typeof _options === 'string' && $.isFunction(autopager[_options])) {
			var args = Array.prototype.slice.call(arguments, 1),
				value = autopager[_options].apply(autopager, args);

			return value === autopager || value === undefined ? this : value;
		}

		_options = $.extend({}, defaults, _options);
		autopager.option(_options);

		content = $(_options.content).filter(':last');
		if (content.length) {
			if (!_options.insertBefore && !_options.appendTo) {
				var insertBefore = content.next();
				if (insertBefore.length) {
					set('insertBefore', insertBefore);
				} else {
					set('appendTo', content.parent());
				}
			}
		}

		setUrl();

		return this;
	};

	$.extend($.autopager, {
		option: function(key, value) {
			var _options = key;

			if (typeof key === "string") {
				if (value === undefined) {
					return options[key];
				}
				_options = {};
				_options[key] = value;
			}

			$.each(_options, function(key, value) {
				set(key, value);
			});
			return this;
		},

		enable: function() {
			set('disabled', false);
			return this;
		},

		disable: function() {
			set('disabled', true);
			return this;
		},

		destroy: function() {
			this.autoLoad(false);
			options = {};
			content = currentUrl = nextUrl = undefined;
			return this;
		},

		autoLoad: function(value) {
			return this.option('autoLoad', value);
		},

		load: function() {
			if (active || !nextUrl || options.disabled) {
				return;
			}

			active = true;
			options.start(currentHash(), nextHash());
			$.get(nextUrl, insertContent);
			return this;
		}

	});

	function set(key, value) {
		switch (key) {
			case 'autoLoad':
				if (value && !options.autoLoad) {
					$(window).scroll(loadOnScroll);
				} else if (!value && options.autoLoad) {
					$(window).unbind('scroll', loadOnScroll);
				}
				break;
			case 'insertBefore':
				if (value) {
					options.appendTo = null;
				}
				break
			case 'appendTo':
				if (value) {
					options.insertBefore = null;
				}
				break
		}
		options[key] = value;
	}

	function setUrl(context) {
		currentUrl = nextUrl || window.location.href;
		nextUrl = $(options.link, context).attr('href');
	}

	function loadOnScroll() {
		if (content.offset().top + content.height() < $(document).scrollTop() + $(window).height()) {
			$.autopager.load();
		}
	}

	function insertContent(res) {
		var _options = options,
			nextPage = $('<div/>').append(res.replace(/<script(.|\s)*?\/script>/g, "")),
			nextContent = nextPage.find(_options.content);

		set('page', _options.page + 1);
		setUrl(nextPage);
		if (nextContent.length) {
			if (_options.insertBefore) {
				nextContent.insertBefore(_options.insertBefore);
			} else {
				nextContent.appendTo(_options.appendTo);
			}
			_options.load.call(nextContent.get(), currentHash(), nextHash());
			content = nextContent.filter(':last');
		}
		active = false;
	}

	function currentHash() {
		return {
			page: options.page,
			url: currentUrl
		};
	}

	function nextHash() {
		return {
			page: options.page + 1,
			url: nextUrl
		};
	}
})(jQuery);
;
// $Id:

(function ($) {
var gd_infinite_scroll_was_initialised = false;
Drupal.behaviors.gd_infinite_scroll = {
  attach:function() {
    // Make sure that autopager plugin is loaded
    if($.autopager) {
      if(!gd_infinite_scroll_was_initialised) {
        gd_infinite_scroll_was_initialised = true;
        var gd_settings = Drupal.settings.gd_infinite_scroll;
        if (typeof gd_settings == 'object') {
          for (var key in gd_settings) {
            this.init_gd_infinite_scroll(gd_settings[key]);
          }
        }
      }
    }
    else {
      alert(Drupal.t('Autopager jquery plugin in not loaded.'));
    }
  },
  init_gd_infinite_scroll: function(settings) {
      var content_selector  = settings.content_selector;
      var items_selector    = settings.content_selector + ' ' + settings.items_selector;
      var pager_selector    = settings.pager_selector;
      var next_selector     = settings.next_selector;
      var img_location      = settings.content_selector;
      var img_path          = settings.img_path;
      var load_more         = settings.load_more;
      var load_more_markup  = settings.load_more_markup;
      var img               = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';

      if (!$(content_selector)[0]) {
          return;
      }

      var autoloading = true;
      var load_more_button = $('<a></a>');
      if (load_more) {
          autoloading = false;
          load_more_button = $(load_more_markup);
      }
      $(pager_selector).hide();
      var handle = $.autopager({
        autoLoad: autoloading,
        appendTo: content_selector,
        content: items_selector,
        link: next_selector,
        page: 0,
        start: function() {
          $(img_location).after(img);
        },
        load: function(current, next) {
          $(content_selector).next('div.spinner').remove();
          load_more_button.text('加载更多...');
          Drupal.attachBehaviors(this);
          if (load_more && !next.url) {
            load_more_button.hide();
          }
          $('.mix').css('display', 'inline-block');
          var mixState = $('.thumbnails').mixItUp('getState');
          $('.thumbnails').mixItUp('multiMix', {sort: mixState.activeSort, filter: mixState.activeFilter});
          $('.result .current').text($('.item').length);
        }
      });

      if (!load_more && $(items_selector)[0]) {
          // Trigger autoload if content height is less than doc height already
          var prev_content_height = $(content_selector).height();
          do {
            var last = $(items_selector).filter(':last');
            if(last.offset().top + last.height() < $(document).scrollTop() + $(window).height()) {
              last = $(items_selector).filter(':last');
              handle.autopager('load');
            }
            else {
              break;
            }
          }
          while ($(content_selector).height() > prev_content_height);
      }
      else if ($(next_selector)[0]){
          load_more_button.appendTo($(img_location).parent())
          .click(function(e) {
              // do load
              handle.autopager('load');
              e.preventDefault();
              $('.spinner').remove();
              $(this).html(img);
          });
      }
  }
}

})(jQuery);
;
