Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNav:true,
    showHome:true,
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    if(options.url){
      this.setData({
        url:options.url
      })
    }
 
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
    // if(wx.getStorageSync('token') && this.data.backurl){
    //   var userInfo = wx.getStorageSync('userInfo');
    //   var openid = userInfo.openid?userInfo.openid:'';
    //      this.setData({
    //       url:this.data.backurl+'&token='+wx.getStorageSync('token')+'&openid='+openid+'&fromWxMiniLogin=1'
    //       //  token:'&token='+wx.getStorageSync('token')
    //      })
    // }
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
})