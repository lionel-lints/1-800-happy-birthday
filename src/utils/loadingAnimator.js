import $ from "jquery";

const loadingAnimator = () => {
  const disableScrolling = () => {
    $("html, body").css({
      overflow: "hidden",
      height: "100%"
    });
  };

  const enableScrolling = () => {
    $("html, body").css({
      overflow: "auto",
      height: "auto"
    });
  };

  const animateBlurb = () => {
    setTimeout(() => {
      const blurb = $(".Blurb")[0];
      const bg = $(".BlurbLoaderBackground")[0];
      const loader = $("ul.Loader")[0];
      $(blurb).fadeOut("slow", () => {
        enableScrolling();
        $(bg).fadeOut("slow");
        $(loader).hide();
      });
    }, 8000);
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
    animateBlurb
  };
};

export default loadingAnimator();
