Template.KillerAdBannerLeft.rendered = function() {
  $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
    var ads, adsbygoogle;
    ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6892043911817762" data-ad-slot="1431309130" data-ad-format="auto"></ins>';
    $('#KillerAdBannerLeft').html(ads);
    return (adsbygoogle = window.adsbygoogle || []).push({});
  });
  console.log("left rendered");
};
