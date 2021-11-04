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

  const animateLoader = () => {
    const listItems = $("li");
    listItems.each(function() {
      $(this)
        .delay(15 * Math.random() * listItems.length)
        .fadeTo("fast", 1);
    });
  };

  const removeLoader = () => {
    setTimeout(() => {
      const loader = $("ul.Loader")[0];
      $(loader).fadeTo("slow", 0, function() {
        enableScrolling();

        setTimeout(() => {
          $(loader).fadeOut();
        }, 2000);
      });
    }, 4000);
  };

  return { disableScrolling, enableScrolling, animateLoader, removeLoader };
};

export default loadingAnimator();
