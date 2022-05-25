
$(function(){
  var loader = $('#loader');
  loader.hide();

  $(window).on('beforeunload',function(){
    loader.show();
  });

  $.extend({
    'alert': function(msg){
      bootbox.dialog({
        closeButton: false, 
        animate: true,
        size: 'sm', 
        message: msg, 
        onEscape: true, 
        backdrop: true, 
        centerVertical: true, 
        buttons:{
          ok:{ 
            label: 'Okay', 
            className: 'btn btn-sm btn-primary'
          }
        }
      });
    }
  });

  $.ajaxSetup({
    cache: false, 
    error: function(xhr,status,error){ 
      console.log(arguments); 
      $.alert(error || 'Something went wrong!');
    } 
  });
 
  $(function(){

    var themes = $('a[data-theme]');
    var useTheme = function(href){
      $('link#theme').attr('href', href).on('load',function(){
        loader.hide();
      });
      localStorage.setItem('theme', href); 
      themes.each(function(){
        var theme = $(this);
        theme.toggleClass('active', (href === theme.data('theme')));
      });
    };

    themes.on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var theme = $(this);
      if(theme.hasClass('active')) return;
      loader.show();
      useTheme(theme.data('theme'));
    });

    useTheme(localStorage.getItem('theme')||themes.eq(0).data('theme'));
  });

  (function($){
     var rep = {'!' : '%21','\'': '%27', '(' : '%28', ')' : '%29', '*' : '%2A', '+' : '%20' };
     $.extend({'esc_url':function(str){ str = encodeURIComponent(str);
       for(var c in rep){ if(!rep.hasOwnProperty(c))continue;str = str.replaceAll(c, rep[c]);} return str;}});
     $.extend({'unesc_url':function(inp){inp = decodeURIComponent(inp);
       for(var c in rep){if(!rep.hasOwnProperty(c))continue; inp = inp.replaceAll(rep[c],c);} return inp;}});
   })($);
});
