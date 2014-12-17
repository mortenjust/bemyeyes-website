(function() {
  var animateFeatures, applyStats, countTotStat, delay, desktopPlayer, getStats, hidePlayer, iPhonePlayer, isSafari, isiOS, isiPad, isiPhone, preparePlayer, showPlayer, startVideo, userAgent, vimeoFinished, vimeoPaused, vimeoReady, _ref, _ref1, _ref2;

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

  userAgent = navigator.userAgent;

  isiPhone = (_ref = userAgent.match(/iPhone/i) !== null) != null ? _ref : {
    "true": false
  };

  isiPad = (_ref1 = userAgent.match(/iPad/i) !== null) != null ? _ref1 : {
    "true": false
  };

  isSafari = (_ref2 = userAgent.match(/Safari/i) !== null) != null ? _ref2 : {
    "true": false
  };

  isiOS = isiPhone || isiPad;

  desktopPlayer = '<iframe id="headervid" src="//player.vimeo.com/video/113872517?api=1&amp;player_id=headervid&amp;title=0&amp;byline=0&amp;portrait=0" width="1102" height="620" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

  iPhonePlayer = '<video id="headervid" src="http://assets.robocatapps.com/bemyeyes/bemyeyes-mobile.mov" controls="controls" webkitAllowFullScreen mozallowfullscreen allowFullScreen autoplay preload></video>';

  preparePlayer = function() {
    var player;
    player = desktopPlayer;
    if (isiOS) {
      player = iPhonePlayer;
    }
    return $('.video-wrapper').html(player);
  };

  hidePlayer = function() {
    $(".video-curtain").fadeOut();
    return $(".video-wrapper").fadeOut();
  };

  showPlayer = function() {
    $(".video-curtain").fadeIn();
    return $(".video-wrapper").fadeIn();
  };

  startVideo = function() {
    var ele;
    showPlayer();
    if (!isiOS) {
      return Froogaloop($("#headervid")[0]).addEvent('ready', vimeoReady);
    } else {
      ele = document.getElementById("headervid");
      ele.addEventListener('pause', vimeoPaused);
      ele.addEventListener('ended', vimeoPaused);
      return ele.play();
    }
  };

  vimeoReady = function(pid) {
    var fp;
    if (!isiOS) {
      fp = Froogaloop(pid);
      fp.addEvent('pause', vimeoPaused);
      fp.addEvent('finish', vimeoFinished);
      return fp.api('play');
    }
  };

  vimeoPaused = function(pid) {
    return delay(100, function() {
      return hidePlayer();
    });
  };

  vimeoFinished = function(pid) {
    return delay(2000, function() {
      return hidePlayer();
    });
  };

  $(window).scroll(function() {
    var $header, $this;
    if (isiOS) {
      return;
    }
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
    getStats();
    preparePlayer();
    return $(".header").click(function(e) {
      return startVideo();
    });
  });

}).call(this);
