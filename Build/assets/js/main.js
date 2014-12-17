(function() {
  var animateFeatures, applyStats, countTotStat, delay, getStats;

  getStats = function() {
    var url, xhr;
    url = "http://devapi.bemyeyes.org/stats/community?callback=?";
    xhr = $.getJSON(url, function() {
      return console.log("Got api response");
    });
    xhr.done(function(json) {
      console.log(json);
      console.log(json.no_helped);
      return applyStats(json.blind, json.helpers, json.no_helped);
    });
    return xhr.fail(function() {
      return console.log("failed to get api stats");
    });
  };

  applyStats = function(blind, helpers, helped) {
    var offset;
    offset = 400;
    countTotStat("stats_helpers", helpers);
    return delay(offset, function() {
      countTotStat("stats_blind", blind);
      return delay(offset, function() {
        return countTotStat("stats_helped", helped);
      });
    });
  };

  countTotStat = function(elem, stat) {
    var anim;
    anim = new countUp(elem, 0, stat, 0, 2.0);
    return anim.start();
  };

  delay = function(ms, func) {
    return setTimeout(func, ms);
  };

  animateFeatures = function() {
    return $(".features .feature").each(function() {
      var $obj, offset, scrolled, windowHeight, windowOffset;
      $obj = $(this);
      if ($obj.hasClass('animated')) {
        return;
      }
      windowHeight = $(window).height();
      windowOffset = $(window).scrollTop();
      offset = $obj.offset().top;
      if (offset < (windowOffset + windowHeight)) {
        scrolled = Math.round(((windowOffset + windowHeight - offset) / windowHeight) * 100);
        if (scrolled > 10) {
          $obj.addClass('animated');
          $obj.transition({
            scale: 1.2
          }, 400);
          return $obj.transition({
            scale: 1.0
          }, 200);
        }
      }
    });
  };

  $(window).scroll(function() {
    var $header, $this;
    $this = $(this);
    $header = $(".menu-container");
    if ($this.scrollTop() > 1) {
      $header.addClass("sticky");
    } else {
      $header.removeClass("sticky");
    }
    return animateFeatures();
  });

  $(document).ready(function() {
    return getStats();
  });

}).call(this);
