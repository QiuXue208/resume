
//初始化AV对象
var APP_ID = '9RS8GxXyjkbG36m5pXEhKDKd-gzGzoHsz';
var APP_KEY = 'WAhabxrxoXfidBe8Q2SbDUb3';
AV.init({ appId: APP_ID, appKey: APP_KEY })


//将用户提交的内容写到leanCloud上的数据库中
postMessageForm.addEventListener('submit', function (e) {
  e.preventDefault()//阻止默认事件，防止提交刷新
  let content = postMessageForm.querySelector('input[name=content]').value
  let name = postMessageForm.querySelector('input[name=name]').value
  //创建Message表
  var Message = AV.Object.extend('Message')
  var message = new Message()
  //将name和content保存到Message表中
  message.save({
    'name': name,
    'content': content
    //如果保存成功就将这些内容添加到ol列表中，并清空输入框，以实现无刷新更新
  }).then(function (object) {
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}` + ` : ` + `${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    postMessageForm.querySelector('input[name=content]').value = ''
    postMessageForm.querySelector('input[name=name]').value = ''
  })
})


//将放到数据库中的东西展现出来
//从Message数据库中查找
var query = new AV.Query('Message')
query.find().then(
  (messages) => {
    //messages的attributes中存储了用户输入的内容
    let array = messages.map((item) => item.attributes)
    array.forEach((item) => {
      let li = document.createElement('li')
      li.innerText = `${item.name}` + ` : ` + `${item.content}`
      let messageList = document.querySelector('#messageList')
      messageList.appendChild(li)
    })
  })
