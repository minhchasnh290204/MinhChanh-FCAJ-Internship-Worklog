/**
 * Fix visited-link checkmarks when relativeURLs is enabled.
 * learn.js stores body data-url (relative) but menu data-nav-id uses RelPermalink (absolute).
 */
(function ($) {
  function getCurrentNavId() {
    var $active = $("#sidebar li.active[data-nav-id]");
    if ($active.length) {
      return $active.first().attr("data-nav-id");
    }
    return null;
  }

  function markVisitedPages() {
    var navId = getCurrentNavId();
    var pageUrl = $("body").data("url");

    if (navId) {
      if (pageUrl && pageUrl !== navId) {
        sessionStorage.removeItem(String(pageUrl));
      }
      sessionStorage.setItem(navId, 1);
    }

    Object.keys(sessionStorage).forEach(function (key) {
      if (sessionStorage.getItem(key) == 1 && key.charAt(0) !== "/") {
        sessionStorage.removeItem(key);
      }
    });

    $("[data-nav-id]").removeClass("visited");
    Object.keys(sessionStorage).forEach(function (url) {
      if (sessionStorage.getItem(url) == 1) {
        $('[data-nav-id="' + url + '"]').addClass("visited");
      }
    });
  }

  $(window).on("load", markVisitedPages);
})(jQuery);
