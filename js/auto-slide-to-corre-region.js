



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

