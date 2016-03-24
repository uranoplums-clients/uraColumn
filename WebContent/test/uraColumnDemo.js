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
//          ,to: '#target3'
//          ,location: 'last'
        }
      });
    });

    var s2Idx1 = 2;
    $('#s2First').on('click', function(){
      if (s2Idx1 > 5)
        s2Idx1 = 2;

      $('#target10').uraColumn({
        append: {
          location: 'first',
          width: 80,
          className: 'demoTarget' + (s2Idx1++) + ' s2New',
          text: 'First'
        }
      });
    });
    var s2Idx2 = 2;
    $('#s2Before').on('click', function(){
      if (s2Idx2 > 5)
        s2Idx2 = 2;

      $('#target10').uraColumn({
        append: {
          location: 'before',
          width: 80,
          className: 'demoTarget' + (s2Idx2++) + ' s2New',
          text: 'Before'
        }
      });
    });
    var s2Idx3 = 2;
    $('#s2After').on('click', function(){
      if (s2Idx3 > 5)
        s2Idx3 = 2;

      $('#target10').uraColumn({
        append: {
          location: 'after',
          width: 80,
          className: 'demoTarget' + (s2Idx3++) + ' s2New',
          text: 'After'
        }
      });
    });

    var s2Idx4 = 2;
    $('#s2Last').on('click', function(){
      if (s2Idx4 > 5)
        s2Idx4 = 2;
      $('#target10').uraColumn({
        append: {
          location: 'last',
          width: 80,
          className: 'demoTarget' + (s2Idx4++) + ' s2New',
          text: 'Last'
        }
      });
    });

    $('#s2Reset').on('click', function(){
      $('#target10').uraColumn({
        remove: {
          selector: 'div.s2New'
        }
      });
    });

    $('#s3First').on('click', function(){
      $('#target20').uraColumn({
        append: {
          location: 'first',
          object: $('#target24')
        }
      });
    });
    $('#s3Before').on('click', function(){
      $('#target20').uraColumn({
        append: {
          location: 'before',
          object: $('#target24')
        }
      });
    });
    $('#s3After').on('click', function(){
      $('#target20').uraColumn({
        append: {
          location: 'after',
          object: $('#target24')
        }
      });
    });
    $('#s3Last').on('click', function(){
      $('#target20').uraColumn({
        append: {
          location: 'last',
          object: $('#target24')
        }
      });
    });
    $('#s3Reset').on('click', function(){
      $('#target20').uraColumn({
        remove: {
          selector: '#target24',
          location: 'after',
          to: $('#target23')
        }
      });
    });

    $('#target20').uraColumn({
      append: {
        location: 'before',
        object: $('#target21')
      }
    });
    $('#target20').uraColumn({
      append: {
        location: 'after',
        object: $('#target22')
      }
    });


    $('#s4Before').on('click',
      function(){
      $('div.s4Target').uraColumn({
        append: {
          location: 'before',
          object: $('div.s4mover')
        }
      });
    });

    $('#s4After').on('click',
      function(){
      $('div.s4Target').uraColumn({
        append: {
          location: 'after',
          width: 80,
          className: 'demoTarget3' +
            ' s4New',
          text: 'Before'
        }
      });
    });

    $('#s4ResetAppend').on('click',
      function(){
      $('div.s4Target').uraColumn({
        remove: {
          selector: 'div.s4mover',
          location: 'after',
          to: $('#target43')
        }
      });
    });

    $('#s4ResetAdd').on('click',
      function(){
      $('div.s4Target').uraColumn({
        remove: {
          selector: 'div.s4New',
          location: 'after'
        }
      });
    });


    $('#s2Code').uraColumn({
      append: {
        location: 'after',
        object: $('div.codeClasses')
      }
    });

    $('#s3Code').uraColumn({
      append: {
        location: 'after',
        object: $('div.codeClasses2')
      }
    });
    $('#s4Code').uraColumn({
      append: {
        location: 'after',
        object: $('div.codeClasses4')
      }
    });
    $('div.s4Target').uraColumn({
      append: {
        location: 'after',
        width: 80,
        className: 'demoTarget3' +
          ' s4New',
        text: 'Before'
      }
    });
    $('div.s4Target').uraColumn({
      remove: {
        selector: 'div.s4New',
        location: 'after'
      }
    });
  });
})(jQuery, window);