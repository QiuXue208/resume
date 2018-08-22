!function(){
    //这个模块操作了一个元素，即swiper-container
    var view = View('#mySlides')
    //去view里面找swiper-container
    var controller = {
        view:null,
        swiper:null,
        init:function(view){
            this.view = view
            this.initSwiper()
        },
        initSwiper:function(){
            this.view = new Swiper(this.view.querySelector('.swiper-container'), {
                // Optional parameters
                loop: true,
            
                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },
            
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    }
    controller.init(view)
}.call()
