Template.KillerAdBannerRight.rendered = function() {
  $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
    var ads, adsbygoogle;
    ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6892043911817762" data-ad-slot="1930836739" data-ad-format="auto"></ins>';
    $('#KillerAdBannerRight').html(ads);
    return (adsbygoogle = window.adsbygoogle || []).push({});
  });
  console.log("right rendered");
};
