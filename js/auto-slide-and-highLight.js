!function () {
    //添加offset类
    let specialTags = document.querySelectorAll('[data-x]')//选择具有data-x标记的元素
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }
    setTimeout(function () {
        findClosestAndRemoveOffset()
    }, 500)
    //给topNavBar添加新的样式
    window.addEventListener('scroll', function () {
        findClosestAndRemoveOffset()
    })
    function findClosestAndRemoveOffset() {
        //找到离窗口顶部最近的元素
        let minIndex = 0
        let specialTags = document.querySelectorAll('[data-x]')//选择具有data-x标记的元素
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        //minIndex 就是离窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset')
        //通过相同的id获取到a标签
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        //找到a标签的父元素
        let li = a.parentNode
        //找到li元素的兄弟姐妹元素，包括自身
        let allLi = li.parentNode.children
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].classList.remove('highLight')
        }
        li.classList.add('highLight')
    }
}.call()
