(function() {
  var nextSlide, setCurrentSlide, updateSlider;

  setCurrentSlide = function(slider, slide) {
    var inner, newOffset, slideWidth;
    inner = $(slider).find(".inner");
    slideWidth = parseInt($(slider).data('slide-width'));
    newOffset = slide * slideWidth;
    inner.css('left', -newOffset + "px");
    return $(slider).data("current-slide", slide);
  };

  nextSlide = function() {
    return $(".slider").each(function() {
      var currentOffset, currentSlide, inner, maxOffset, slideWidth, slides;
      inner = $(this).find(".inner");
      slides = inner.children().length;
      slideWidth = $(this).data('slide-width');
      currentOffset = parseInt((inner.css('left')).replace(/[^-\d\.]/g, ''));
      currentSlide = $(this).data('current-slide');
      maxOffset = (slides - 1) * slideWidth;
      nextSlide = 0;
      if (Math.abs(currentOffset) < maxOffset) {
        nextSlide = currentSlide + 1;
      }
      return setCurrentSlide($(this), nextSlide);
    });
  };

  updateSlider = function() {
    var slider;
    slider = $(".slider");
    return slider.each(function() {
      var slideHeight, slideWidth;
      slideWidth = parseInt(($(this).css('width')).replace(/[^-\d\.]/g, ''));
      slideHeight = parseInt(($(this).css('height')).replace(/[^-\d\.]/g, ''));
      $(this).data('slide-width', slideWidth);
      $(this).data('slide-height', slideHeight);
      return setCurrentSlide(this, $(this).data("current-slide"));
    });
  };

  $(document).ready(function() {
    $(window).bind('resize', function() {
      console.log("slider");
      return updateSlider();
    });
    updateSlider();
    return setInterval(nextSlide, 4000);
  });

}).call(this);
