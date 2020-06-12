$(document).ready(function () {

    $(".toggler").on('click', function () {
        $(this).toggleClass('toggler--open');
        $(".header").toggleClass('open');

    });
    $(function () {
        $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
    });
    $('.products-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<div class='prev'></div>",
        nextArrow: "<div class='next'></div>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.accordion-title').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        console.log(this);


        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

    $('.testimonials-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3500,
        fade: true,
        prevArrow: "<div class='testimonials-prev'></div>",
        nextArrow: "<div class='testimonials-next'></div>",

    });
})


window.addEventListener('scroll', function () {
    yOffset = window.pageYOffset;
    let header = document.querySelector('.header')
    if (yOffset > 150) {
        header.classList.add("header-scrolled")
    } else {
        header.classList.remove("header-scrolled")
    }
});