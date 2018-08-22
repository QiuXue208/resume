!function () {
  var model = {
    // 获取数据
    init: function () {
      //初始化AV对象
      var APP_ID = '9RS8GxXyjkbG36m5pXEhKDKd-gzGzoHsz';
      var APP_KEY = 'WAhabxrxoXfidBe8Q2SbDUb3';
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function (name, content) {
      //创建Message表
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('section.message')

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        }
      )
    },
    
    //将用户提交的内容写到leanCloud上的数据库中
    bindEvents: function () {
      this.form.addEventListener('submit', (e)=> {
        //阻止默认事件，防止提交刷新
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      //将name和content保存到Message表中
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name} : ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
      })
    }
  }

  controller.init(view, model)

}.call()







/*var APP_ID = '9RS8GxXyjkbG36m5pXEhKDKd-gzGzoHsz';
var APP_KEY = 'WAhabxrxoXfidBe8Q2SbDUb3';
AV.init({ appId: APP_ID, appKey: APP_KEY })


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
  })*/
