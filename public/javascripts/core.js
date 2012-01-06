//Reusable functions
var Alphagov = {
  cookie_domain: function() {
    var host_parts = document.location.host.split(':')[0].split('.').slice(-3);
    return '.' + host_parts.join('.');
  },
  read_cookie: function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },
  delete_cookie: function(name) {
    if (document.cookie && document.cookie != '') {
      var date = new Date();
      date.setTime(date.getTime()-(24*60*60*1000)); // 1 day ago
      document.cookie = name + "=; expires=" + date.toGMTString() + "; domain=" + Alphagov.cookie_domain() + "; path=/";
    }
  },
  write_cookie: function(name, value) {
    var date = new Date();
    date.setTime(date.getTime()+(30*24*60*60*1000)); // 30 days in the future
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + date.toGMTString() + "; domain=" +  Alphagov.cookie_domain() + "; path=/";
  },
}

function recordOutboundLink(e) {
  _gat._getTrackerByName()._trackEvent(this.href, 'Outbound Links');
  setTimeout('document.location = "' + this.href + '"', 100);
  return false;
}

// //General page setup
// jQuery(document).ready(function() {

//   $('a').click(recordOutboundLink);

//   //Setup annotator links 
//   $('a.annotation').each(function(index) {
//     $(this).linkAnnotator();
//   });

//   //feedback
//   $('#send_feedback').click(function () {
//     $('#feedback-router').show();
//     return false;
//   });

//   $('a.close').click(function () {
//     $(this).closest('.popover-mask').hide();
//   });

// });

$(document).ready(function() {
  $("body").addClass("js-enabled");
  
  if(window.location.hash) {
    contentNudge(window.location.hash);
  } 

  $("nav").delegate('a', 'click', function(){
    var hash;
    var href = $(this).attr('href');
    if(href.charAt(0) === '#'){
      hash = href; 
    } 
    else if(href.indexOf("#") > 0){
      hash = "#" + href.split("#")[1];
    }
    $("html, body").animate({scrollTop: $(hash).offset().top - $("#global-header").height()},10);
  });
  

  
  function contentNudge(hash){
    if($(hash).length == 1){
      if($(hash).css("top") == "auto" || "0"){
        $(window).scrollTop( $(hash).offset().top - $("#global-header").height()  );
      }
    }
  }
  
  
});


