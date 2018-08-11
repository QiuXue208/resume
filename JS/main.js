//执行完所有语句之后，至少有一秒显示loading再移除active
setTimeout(function () {
    siteWelcome.classList.remove('active')
}, 1000)

//给topNavBar添加新的样式
window.onscroll = function () {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    //找到离窗口顶部最近的元素
    let minIndex = 0
    let specialTags = document.querySelectorAll('[data-x]')//选择具有data-x标记的元素
    for (let i = 1; i < specialTags.length; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
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

//点击topNavBar时，使对应区块缓慢跳转到指定位置
let aTags = document.querySelectorAll('nav.menu > ul > li > a')
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (v) {
        v.preventDefault()//阻止默认动作，即阻止a标签的跳转
        let a = v.currentTarget //获取当前被监听的元素
        let href = a.getAttribute('href') //获取到a标签的href值
        let element = document.querySelector(href)//根据href的值获取到对应的元素
        let top = element.offsetTop//获取对应元素左上角相对

        let currentTop = window.scrollY //获取到距离文档顶部的距离
        let targetTop = top - 60
        let s = targetTop - currentTop//要移动的距离
        let t = Math.abs((s / 100) * 300) //移动所用时间，每100px动300ms
        if (t > 500) { t = 500 }
        //平缓滑动,使用tweenjs
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);
        var coords = { y: currentTop };
        var tween = new TWEEN.Tween(coords)
            .to({ y: targetTop }, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                window.scrollTo(0, coords.y)
            })
            .start();
    }
}

