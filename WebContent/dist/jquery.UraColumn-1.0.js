/*!
 * uraColumn v1.0
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Copyright 2016 syany
 * Dual licensed under the MIT or GPL Version 3 licenses.
 * Date: 2016-03-05
 */
;(function($) {
  $.fn.extend({
    /**
     * this object make 'n Column Layout' with wrap DIV, and append dummy column
     */
    uraColumn: function(options) {
      var cfg = $.extend(true, {
        version: '1.0',
        append: {
          object: null,
          location: 'after',
          float: 'left',
          width: null,
          padding: null,
          margin: null,
          text: null,
          idName: null,
          className: 'uraColumn-inner'
        },
        outer: {
          idName: null,
          className: 'uraColumn-outer'
        },
        self: {
          float: 'left'
        }
      }, options);

      var selfWidth = null;
      var wrapperOuterWidth = null;

      function getOuterWidth($src) {
        var width = null;
        $src.each(function(){
          width += $(this).outerWidth(true);
        });
        return width;
      }
      function getWrapperOuterWidth($appender) {
        var width = wrapperOuterWidth;
        if (!width) {
          width = getOuterWidth($appender);
          wrapperOuterWidth = width;
        }
        if (console.debug) {
          console.debug('this appender[' + ($appender.prop('id') || $appender.prop('class')) + '] width: '+ width);
        }
        return width;
      }

      function getSelfWidth($self) {
        var width = selfWidth;
        if (!width) {
          width = getOuterWidth($self);
          selfWidth = width;
        }
        if (console.debug) {
          console.debug('this target[' + ($self.prop('id') || $self.prop('class')) + '] width: '+ width);
        }
        return width;
      }

      function wrapOuter($self) {
        $self
          .wrap($(document.createElement('div'))
            .attr('id', cfg.outer.idName)
            .addClass(cfg.outer.className)
            .css('width', getSelfWidth($self))
            .css('position', 'relative')
            .css('padding', 0)
            .css('margin', 0)
            .css('overflow', 'hidden')
            .css('zoom', 1)
//            .css('border-width', 1)
//            .css('border-style', 'dotted')
//            .css('border-color', 'red')
            .data('uraColumn', 'parent')
          );
      }

      function newColumnDiv() {
        return $(document.createElement('div'))
          .attr('id', cfg.append.idName)
          .addClass(cfg.append.className)
          .css('width', cfg.append.width)
          .css('padding', cfg.append.padding)
          .css('margin', cfg.append.margin)
          .css('float', cfg.append.float)
          .text(cfg.append.text)
          .data('uraColumn', '1');
      }

      function appendColumn($self, $appender) {
        var $parent = $self.parent('div');
        var isParent = $parent.data('uraColumn') === 'parent';
        if (cfg.append.location === 'before') {
          $self.before($appender);
        } else if (isParent && cfg.append.location === 'first') {
          $parent.prepend($appender);
        } else if (isParent && cfg.append.location === 'last') {
          $parent.append($appender);
        } else {
          $self.after($appender);
        }
      }

      function setFloatStyle($self) {
        var oldFloat = $self.data('uraColumn-Float');
        if (!oldFloat) {
          $self.data('uraColumn-Float', 'none');
        } else {
          $self.data('uraColumn-Float', $self.css('float') || 'none');
        }
        $self.css('float', cfg.self.float);
      }

      function init($self) {

        var $parent = $self.parent('div');
        if ($parent.data('uraColumn') !== 'parent') {
          // new outer if no parent
          wrapOuter($self);
          $parent = $self.parent('div');
        }

        var $appender = $(cfg.append.object || newColumnDiv());

        // add column to outer
        appendColumn($self, $appender);
        // TODO remove column to this outer
        // calculate appenders width
        $parent.css('width', getOuterWidth($parent.children()));

        // set float style.
        setFloatStyle($self);
        if (cfg.append.object) {
          setFloatStyle($appender);
        }
      }

      return this.each(function() {
        init($(this));
      });
    }
  });
})(jQuery);