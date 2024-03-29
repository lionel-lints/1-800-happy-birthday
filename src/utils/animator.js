import $ from "jquery";

const animator = () => {
  const disableScrolling = () => {
    $("html, body").css({
      overflow: "hidden",
      height: "100%"
    });
  };

  const enableScrolling = () => {
    $("html, body").css({
      overflow: "visible",
      height: "auto"
    });
  };

  const animateFadeIn = () => {
    const bg = $(".FadeInBackground")[0];
    $(bg).fadeOut("slow");
  };

  const animateLoaderFadeIn = () => {
    const bg = $(".LoaderFadeInBackground")[0];
    $(bg).fadeOut("slow");
  };

  const animateBlurb = () => {
    setTimeout(() => {
      const bg = $(".LoaderBlurbContainer")[0];
      const loader = $("ul.Loader")[0];
      $(loader).fadeOut();
      $(bg).fadeOut("slow", () => {
        animateFadeIn();
        enableScrolling();
      });
    }, 6000);
  };

  const animateBackgroundNames = () => {
    const listItems = $("ul.BackgroundNames > li");
    listItems.each(function() {
      $(this)
        .delay(40 * Math.random() * listItems.length)
        .fadeTo("slow", 1);
    });
  };

  const animateLoader = () => {
    setTimeout(() => {
      const listItems = $("ul.Loader > li");
      listItems.each(function() {
        $(this)
          .delay(40 * Math.random() * listItems.length)
          .fadeTo("slow", 1);
      });
    }, 1000);
  };

  const removeLoader = () => {
    setTimeout(() => {
      const loader = $("ul.Loader")[0];
      $(loader).fadeTo("slow", 0, () => {
        enableScrolling();

        setTimeout(() => {
          $(loader).fadeOut();
        }, 2000);
      });
    }, 4000);
  };

  return {
    disableScrolling,
    enableScrolling,
    animateLoader,
    removeLoader,
    animateBackgroundNames,
    animateBlurb,
    animateFadeIn,
    animateLoaderFadeIn
  };
};

export default animator();
