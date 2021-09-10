// pages/categoryDetail/categoryDetail.js
let detailData = require('../../static/furnite_category_detail.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    dataBox:'',
    furniteId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      furniteId:options.furniteId
    });
    console.log(this.data.furniteId)
    this.getData();

  
  },
  getData(){
    let home='';
    wx.showLoading({
      title: '加载中...',
    })
    let that=this;
        wx.request({
          url: 'https://hzgjj.sophy.vip/api/furnite/furniteDetail',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            furniteId: that.data.furniteId,
          },
          success (res) {
            wx.hideLoading()
            if(res.data.code==200){
              that.setData({
                dataBox:res.data.data,
                banner:res.data.data.imgs,
                qualityImgs:res.data.data.qualityImgs,
              });
              wx.setNavigationBarTitle({
                title: res.data.data.name,
              })
            }
          }
        })
      },

//点击事件  
clickImg: function(e){
  var urls = e.target.dataset.img;
  wx.previewImage({
    current: urls[0], // 当前显示图片的http链接  
    urls: this.data.banner // 需要预览的图片http链接列表  
  })
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
  
  onPullDownRefresh: function(e) {    
    wx.stopPullDownRefresh();
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