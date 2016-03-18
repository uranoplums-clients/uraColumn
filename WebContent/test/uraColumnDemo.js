/*!
 * uraColumnDemo.js
 *
 * This sample file is public domain.
 */
;(function($, window, undefined) {
  $(function() {
    $('#leftTarget2').on('click', function(){
        $('#target').uraColumn({
          append: {
            location: 'before',
            object: $('#target2')
          }
        });
      });
    $('#rightTarget2').on('click', function(){
      $('#target').uraColumn({
        append: {
          //location: 'after',
          object: $('#target2')
        }
      });
    });
    var idx = 1;
    $('#appendNew').on('click', function(){
        idx++;
        if (idx > 5) {
          idx = 2;
        }
      $('#target').uraColumn({
        append: {
          location: 'last',
          width: 50,
          height: 38,
          className: 'demoTarget' + idx,
          text: 'Add'
        }
      });
    });
    var idx2 = 1;
    $('#firstNew').on('click', function(){
        idx2++;
        if (idx2 > 5) {
          idx2 = 2;
        }
      $('#target').uraColumn({
        append: {
          location: 'first',
          width: 50,
          height: 38,
          className: 'demoTarget' + idx2,
          text: 'Add'
        }
      });
    });
    $('#removeToDummy').on('click', function(){
      $('#target').uraColumn({
        remove: {
          selector: '#target2'
          ,to: '#target3'
          ,location: 'last'
        }
      });
    });
  });
})(jQuery, window);