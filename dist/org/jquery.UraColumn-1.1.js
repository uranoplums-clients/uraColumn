/*!
 * uraColumn v1.1
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
;(function($, window) {
  $.fn.extend({
    /**
     * this object make 'n Column Layout' with wrap DIV, and append dummy column
     */
    uraColumn: function(options) {
      var cfg = $.extend(true, {
        version: '1.1',
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
        remove: {
          selector: null,
          location: 'after',
          to: null
        },
        outer: {
          idName: null,
          className: 'uraColumn-outer'
        },
        resize: {
          sync: true,
          beforeFunc: function($self, $parent){},
          afterFunc: function($self, $parent){}
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
        return width;
      }

      function getSelfWidth($self) {
        var width = selfWidth;
        if (!width) {
          width = getOuterWidth($self);
          selfWidth = width;
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
            .css('border-width', 0)
            .css('border-style', 'none')
//            .css('border-width', 1)
//            .css('border-style', 'dotted')
//            .css('border-color', 'red')
            .data('ura-uraColumn', 'parent')
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
          .data('ura-uraColumn', '1');
      }

      function appendColumn($self, $parent, $appender) {
        var isParent = $parent.data('ura-uraColumn') === 'parent';
        if (cfg.append.location === 'before') {
          $self.before($appender);
        } else if (isParent && cfg.append.location === 'first') {
          $parent.prepend($appender);
        } else if (isParent && cfg.append.location === 'last') {
          $parent.append($appender);
        } else {
          $self.after($appender);
        }
        if ($appender.data('ura-preDisplayStyle')) {
          $appender.css('display', $appender.data('ura-preDisplayStyle'));
        }
      }

      function removeToColumn($self, $parent, $appender) {
        if (cfg.remove.location === 'before') {
          $self.before($appender);
        } else if (cfg.remove.location === 'first') {
          $parent.prepend($appender);
        } else if (cfg.remove.location === 'last') {
          $parent.append($appender);
        } else {
          $self.after($appender);
        }
        if ($appender.data('ura-preDisplayStyle')) {
          $appender.css('display', $appender.data('ura-preDisplayStyle'));
        }
        if ($appender.data('ura-preFloatStyle')) {
          $appender.css('float', $appender.data('ura-preFloatStyle'));
        } else {
          $appender.css('float', 'none');
        }
      }

      function removeColumn($self, $parent) {
        if (!cfg.remove.selector)
          return;

        var $target = $parent.find(cfg.remove.selector);
        if (cfg.remove.to) {
          var $removeTo = $(cfg.remove.to);
          removeToColumn($removeTo, $removeTo.parent(), $target);
        } else {
          if (!$target.data('ura-preDisplayStyle')) {
            $target.data('ura-preDisplayStyle', $target.css('display'));
          }
          $target.css('display', 'none');
        }
      }

      function setFloatStyle($self, srcKey) {
        var oldFloat = $self.data('ura-preFloatStyle');
        if (!oldFloat) {
          $self.data('ura-preFloatStyle', $self.css('float') || 'none');
        }
        $self.css('float', cfg[srcKey].float);
      }

      function resizeColumn($parent) {
        // calculate appenders width
        var parentWidth = getOuterWidth($parent.children());
//        var parentParentWidth = getOuterWidth($parent.parent());
        var parentParentWidth = $parent.parent().width();
        $parent.css('width', Math.min(parentParentWidth, parentWidth));
      }

      function attachEvents($self, $parent) {
        if (cfg.resize.sync)
          $(window).on('resize', function(){
            cfg.resize.beforeFunc($self, $parent);
            resizeColumn($parent);
            cfg.resize.afterFunc($self, $parent);
          });
      }

      function init($self) {

        var $parent = $self.parent('div');
        if ($parent.data('ura-uraColumn') !== 'parent') {
          // new outer if no parent
          wrapOuter($self);
          $parent = $self.parent('div');
        }

        if (!cfg.remove.selector) {
          var $appender = $(cfg.append.object || newColumnDiv());
          // add column to outer
          appendColumn($self, $parent, $appender);
        } else {
          // remove column to this outer
          removeColumn($self, $parent);
        }

        resizeColumn($parent);

        // set float style.
        setFloatStyle($self, 'self');
        if (cfg.append.object) {
          setFloatStyle($appender, 'append');
        }

        attachEvents($self, $parent);
      }

      return this.each(function() {
        init($(this));
      });
    }
  });
})(jQuery, window);
