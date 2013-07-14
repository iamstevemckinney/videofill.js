;(function($) {

  $.fn.imagefill = function(options) {

    var $container = this,
        $img = $container.find('img').css({'position':'absolute'}),
        imageAspect = 1/1,
        containerH = $container.height(),
        containerW = $container.width(),
        defaults = {
          runOnce: false,
          throttle : 100  // 10fps
        },
        settings = $.extend({}, defaults, options);

    // make sure container isn't position:static
    var containerPos = $container.css('position');
    $container.css({'overflow':'hidden','position':(containerPos === 'static') ? 'relative' : containerPos});

    // wait for image to load, then fit it inside the container
    $container.imagesLoaded().done(function($img) {
      imageAspect = $img.width() / $img.height();
      fitImage($img);
      if (!settings.runOnce) {
        checkSizeChange();
      }
    });

    function fitImage() {

      containerW = $container.width();
      containerH = $container.height();
      var containerAspect = containerW/containerH;
      if (containerAspect < imageAspect) {
        // taller
        $img.css({
            width: 'auto',
            height: containerH,
            top:0,
            left:-(containerH*imageAspect-containerW)/2
          });
      } else {
        // wider
        $img.css({
            width: containerW,
            height: 'auto',
            top:-(containerW/imageAspect-containerH)/2,
            left:0
          });
      }
    }

    function checkSizeChange() {
      if (containerH !== $container.height() || containerW !== $container.width()) {
        fitImage();
      }
      setTimeout(checkSizeChange, settings.throttle);
    }

    // return for chaining
    return this;
  };

}(jQuery));