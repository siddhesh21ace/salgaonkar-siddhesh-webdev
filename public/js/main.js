!function () {

    $('[data-toggle="tooltip"]').tooltip();

    var theater = theaterJS();
    var $body = $("body");
    theater
        .addActor('role', {speed: 0.8, accuracy: 0.8})
        .addScene('role:CS Grad Student', 400)
        .addScene('role:Software Developer', 400)
        .addScene('role:Tech Enthusiast', 400)
        .addScene('role:Fast Learner', 400)
        .addScene('role:Cricket Lover', 400)
        .addScene('role:Pokémon Fanboy', 400)
        .addScene(theater.replay.bind(theater));

    "use strict";
    $(document).on("click", "a.page-scroll", function (e) {
        var l = $(this);
        $("html, body").stop().animate({
            scrollTop: $(l.attr("href")).offset().top - 100
        }, 1250, "easeInOutExpo");
        e.preventDefault()
    });
    $body.scrollspy({
        target: ".navbar-custom",
        offset: 180
    });
    $(".navbar-collapse ul li a").click(function () {
        $(".navbar-toggle:visible").click()
    });

    $(".devicon, .devicon-small").hover(function () {
        $(this).toggleClass("colored");
    });

    window.sr = ScrollReveal({
        reset: true,
        mobile: true,
        easing: 'ease-in-out'
    });

    sr.reveal('.skills-section .top-skills .item', {duration: 1000, rotate: {z: 10}}, 50);
    sr.reveal('.portfolio-section .item', {duration: 1000}, 100);

}();
