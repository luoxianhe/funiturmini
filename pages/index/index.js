// index.js
// 获取应用实例
const app = getApp()
//let home = require('../../static/furnite_home.js');
Page({
  data: {
    banner:[],
    menu:[],
    furnite:[],
    cardList:[],
    navActive:0,
    swiperCardList:[],
    homeAdv:[],
  },

  bindtapclick(e){
    let url = e.currentTarget.dataset.url;//获取当前
    console.log(url)
    wx.navigateTo({
     url: '/pages/bindLink/bindLink?url='+url
    })    
  },
  bindtapad(){
    wx.navigateTo({
      url: '/pages/sendMessage/sendMessage'
     })    
  },
  binddetail(e){
    var id= e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/categoryDetail/categoryDetail?furniteId='+id,
     })   
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.getData();
  },
  getData(){
let home='';
let that=this;
wx.showLoading({
  title: '加载中...',
})
    wx.request({
      url: 'https://hzgjj.sophy.vip/api/home', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        wx.hideLoading();
        if(res.data.code==200){
          let homebox =res.data.data;
          console.log(homebox)
          that.setData({
            banner:homebox.banner,
            menu:homebox.menu,
            furnite:homebox.furnite,
            homeAdv:homebox.homeAdv,
          })
        }
      }
    })
  },
  diagnosis(t){
   this.setData({
    navActive:e.currentTarget.dataset.index
  })

  },
  kindList(){
    wx.switchTab({
      url:'../kindList/kindList'
  })
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function(e) {    
    wx.stopPullDownRefresh();
  }
})
