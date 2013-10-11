;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'Stopcrack';
var PLUGIN_NAME = 'stopcrack';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		listSelector: '.stopcrack-list',
		itemSelector: '.stopcrack-item',
		colClassName: 'stopcrack-col'
	}, options);
};

(function (fn) {
	/**
	 * fn.init
	 */
	fn.init = function () {
		this._prepareElms();
		this._eventify();
		this.refresh();
	};

	/**
	 * fn._prepareElms
	 */
	fn._prepareElms = function () {
		var listSelector = this.options.listSelector;
		var itemSelector = this.options.itemSelector;
		this.$list = this.$el.find(listSelector);
		this.$item = this.$el.find(itemSelector);
		return this;
	};

	/**
	 * fn._renderCols
	 */
	fn._renderCols = function () {
		var colClassName = this.options.colClassName;
		var i;
		for (i = 0; i < this.colLength; i += 1) {
			this.cols[i] = $('<div class="' + colClassName + '">');
			this.cols[i].append(this.$list.clone().html(''));
			this.$el.append(this.cols[i]);
		}
		return this;
	};

	/**
	 * fn._minCol
	 */
	fn._minCol = function () {
		var i;
		var $min = this.cols[0];
		var min = $min.height();
		var h = null;
		for (i = 1; i < this.colLength; i += 1) {
			h = this.cols[i].height();
			if (min > h) {
				min = h;
				$min = this.cols[i];
			}
		}
		return $min;
	};

	/**
	 * fn._render
	 */
	fn._render = function () {
		var _this = this;
		var listSelector = this.options.listSelector;

		var sortitems  = [];
		var sortitems2 = [];

		this.$item.each(function () {
			var $this = $(this);
			var num = $this.attr('data-stopcrack-num');
			if (isNaN(num) || num === '') {
				sortitems2.push($this);
			} else {
				sortitems[num] = $this;
			}
		});

		$(sortitems).each(function (i) {
			var n = (i + _this.colLength) % _this.colLength;
			_this.cols[n].find(listSelector).append($(this).clone());
		});

		$(sortitems2).each(function () {
			_this._minCol().find(listSelector).append($(this).clone());
		});
		this.$list.hide();
	};

	/**
	 * fn._eventify
	 */
	fn._eventify = function () {
		var _this = this;
		$(window).on('resize', function () {
			if (_this.width !== _this.$el.width()) {
				_this.refresh();
			}
		});
	};

	/**
	 * fn.refresh
	 */
	fn.refresh = function () {
		var colSelector = '.' + this.options.colClassName;
		if (this.$el.is(':visible')) {
			this.$el.find(colSelector).remove();
			this.$list.show();
			this.width = this.$el.width();
			this.colLength = Math.floor(this.$list.width() / this.$item.outerWidth(true));
			this.cols = [];
			this._renderCols();
			this._render();
		}
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		} else {
			$.data(this, PLUGIN_NAME).refresh();
		}
	});
};

// set global
window[MODULE_NAME] = Module;

})(jQuery, this);
