window.onload=function () {
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 水平切换选项

        loop: true, // 循环模式选项
        autoplay:true,
        effect : 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 0,
            modifier: 2,
            slideShadows : true
        },
        autoplay:{
            delay: 2500,
            disableOnInteraction: false,
        },

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true,

        },
    })
}