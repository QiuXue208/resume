
!function () {
    let liTags = document.querySelectorAll('nav.menu > ul >li')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (v) {
            let li = v.currentTarget  //被监听的元素
            li.classList.add('active')
        }

        liTags[i].onmouseleave = function (v) {
            let li = v.currentTarget  //被监听的元素
            li.classList.remove('active')
        }
    }
}.call()
