// pages/sendMessage/sendMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "city":"",
    "mallName":"",
    "mallArea":"",
    "mallCategory":"",
    "budget":"",
    "partnerName":"",
    "partnerMobile":""
  },
  cityInput(e){
    this.setData({
      city: e.detail.value
      })
  },
  mallNameInput(e){
    this.setData({
      mallName: e.detail.value
      })
  },
  mallAreaInput(e){
    this.setData({
      mallArea: e.detail.value
      })
  },
  mallCategoryInput(e){
    this.setData({
      mallCategory: e.detail.value
      })
  },
  budgetInput(e){
    this.setData({
      budget: e.detail.value
      })
  },
  partnerNameInput(e){
    this.setData({
      partnerName: e.detail.value
      })
  },
  partnerMobileInput(e){
    this.setData({
      partnerMobile: e.detail.value
      })
  },
  gettime(){
    var date = new Date();
    var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
    var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
    var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
    var hours = date.getHours();          //小时 ,返回 Date 对象的小时 (0 ~ 23)
    var minutes = date.getMinutes();      //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
    var seconds = date.getSeconds();      //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
    //获取当前系统时间  
    var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    //修改月份格式
    if (month >= 1 && month <= 9) {
          month = "0" + month;
          }
    
    //修改日期格式
    if (day >= 0 && day <= 9) {
          day = "0" + day;
          }
    
    //修改小时格式
    if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
          }
    
    //修改分钟格式
    if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
          }
    
    //修改秒格式
    if (seconds >= 0 && seconds <= 9) {
          seconds = "0" + seconds;
          }
    
    //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
    var currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return currentFormatDate;

  },
  btnclick(){
  
    if(this.data.city==''){
      wx.showToast({
        title: '请输入所在城市',
        icon:'none'
      })
      return false;
    }else  if(this.data.mallName==''){
      wx.showToast({
        title: '请输入商品名',
        icon:'none'
      })
      return false;
    }else if(this.data.mallArea==''){
      wx.showToast({
        title: '请输入商场面积',
        icon:'none'
      })
      return false;
    }else if(this.data.mallCategory==''){
      wx.showToast({
        title: '请输入商经营品类',
        icon:'none'
      });
      return false;
    }else if(this.data.budget==''){
      wx.showToast({
        title: '请输入预算',
        icon:'none'
      })
      return false;
    }else if(this.data.partnerName==''){
      wx.showToast({
        title: '请输入您的姓名',
        icon:'none'
      })
      return false;
    }else if(this.data.partnerMobile==''){
      wx.showToast({
        title: '请输入您的手机号',
        icon:'none'
      })
      return false;
    }
      var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        var inputStr = this.data.partnerMobile;
        if (!(telStr.test(inputStr))) {
              wx.showToast({
              title: '请输入正确的机号',
              icon:'none'
            })
           return false;
        }
    wx.showLoading({
      title: '加载中...',
    })
    let data={
      "city":this.data.city,
      "mallName":this.data.mallName,
      "mallArea":this.data.mallArea,
      "mallCategory":this.data.mallCategory,
      "budget":this.data.budget,
      "partnerName":this.data.partnerName,
      "partnerMobile":this.data.partnerMobile,
      "applyTime":this.gettime()
    }

    let that=this;
        wx.request({
          url: 'https://hzgjj.sophy.vip/api/partner/add',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: data,
          success (res) {
            wx.hideLoading();
            console.log(res)
            if(res.data.success){
              wx.showToast({
                title:res.data.msg
              })
            }else{
              wx.showToast({
                title:res.data.errorMsg,
                icon:"none"
              })
            }
          }
        })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})