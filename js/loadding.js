!function () {
    //执行完所有语句之后，至少有半秒显示loading再移除active
    setTimeout(function () {
        siteWelcome.classList.remove('active')
    }, 500)
}.call()
