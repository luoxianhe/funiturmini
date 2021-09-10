var kindList = require('../../static/kind.js');
var category = require('../../static/furnite_category.js');
Page({
  //记录scroll-view滚动过程中距离顶部的高度
  distance: 0,

  /**
   * 页面的初始数据
   */
  data: {
    currentLeft: 0, //左侧选中的下标
    selectId: "", //当前显示的元素id
    scrollTop: 0, //到顶部的距离
    // 左侧及右侧内容数组
    serviceTypes: [],
    // 右侧分类的高度累加数组
    heightArr: [],
    perMonId: '202104',
    currindex: 0,
    scrollVal: 0,
    selectindex: 0,
    platformIdIndex: '',
    category: [],
    pageNum: 0,
    categoryarr:[],
    furnite:[],
    pagesize: 10,
  },

  onPullDownRefresh() {
   
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    (this.data.pageNum) ++;
    this.getData();
 },
  //选择左侧点击事件 currentLeft：控制左侧选中样式  selectId：设置右侧应显示在顶部的id
  proItemTap(e) {
    this.setData({
      currentLeft: e.currentTarget.dataset.pos,
      selectId: e.currentTarget.dataset.id,
      selectindex: e.currentTarget.dataset.index,
      furnite:[],
    });
    this.data.pageNum=0
    this.getData()
  },
  enterdetail(e){
    var id= e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/categoryDetail/categoryDetail?furniteId='+id,
     })   
  },
  //计算右侧每一个分类的高度，在数据请求成功后请求即可
  selectHeight() {
    let _this = this
    // 获得每个元素据顶部的高度，组成一个数组，通过高度与scrollTop的对比来知道目前滑动到那个区域
    let heightArr = [];
    let h = 0;
    //创建节点选择器
    const query = wx.createSelectorQuery();
    //选择id
    query.selectAll('.pro-box').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签类名为pro-box元素的数组
      res[0].forEach((item) => {
        h += item.height;
        heightArr.push(h);
      })
      _this.setData({
        "heightArr": heightArr,
        "scrollVal": heightArr[_this.data.currindex - 1],
      })
      // 算出每块区域到达的高度
      // console.log('heightArr', heightArr) //  [210, 800, 1390]
    })
  },
  onScroll(event) {
    if (this.data.heightArr.length == 0) {
      return;
    }
    let scrollTop = event.detail.scrollTop;
    let current = this.data.currentLeft;
    // console.log('滚动+可视=数组最后一个值', scrollTop, this.data.winHeight, this.data.heightArr[this.data.heightArr.length-1])
    // 发现手机上打印的heightArr数组中的每一项都有多位小数点，而开发者工具上各机型全为整数
    if (scrollTop + this.data.winHeight + 1 >= this.data.heightArr[this.data.heightArr.length - 1]) {
      this.setData({
        currentLeft: this.data.heightArr.length - 1
      })
      return
    }
    if (scrollTop >= this.distance) { //页面向上滑动
      //如果右侧当前可视区域最底部到顶部的距离 超过 当前列表选中项距顶部的高度（且没有下标越界），则更新左侧选中项
      if (current + 1 < this.data.heightArr.length && scrollTop >= this.data.heightArr[current]) {
        this.setData({
          currentLeft: current + 1
        })
      }
    } else { //页面向下滑动
      //如果右侧当前可视区域最顶部到顶部的距离 小于 当前列表选中的项距顶部的高度，则更新左侧选中项
      if (current - 1 >= 0 && scrollTop < this.data.heightArr[current - 1]) {
        this.setData({
          currentLeft: current - 1
        })
      }
    }
    //更新到顶部的距离
    this.distance = scrollTop;
  },
  // 返回携带的默认值 年份 与 数组中的id值（此id为年份）相等时，返回该id所在对象在数组中的索引
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
   let serviceTypes=kindList.kindList.results[0].catalog_modules;
    // this.setData({
    //   serviceTypes:serviceTypes
    // })
    this.selectHeight()
  },
  getData() {
    let home = '';
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://hzgjj.sophy.vip/api/furnite/list',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        categoryId: that.data.selectId,
        page: that.data.pageNum,
        pageSize: that.data.pagesize,
      },
      success(res) {
        wx.hideLoading();
        if (res.data.code == 200 ) {
          let databox = res.data.data;
          if(that.data.selectId==""){
            that.setData({
              categoryarr:databox.category
            });
          };
          console.log()
          if(databox.furnite.length>0){
           let arrfun = databox.furnite;
           arrfun.forEach(item=>{
            that.data.furnite.push(item)
           })
            console.log(that.data.furnite)
            that.setData({
              furnite:  that.data.furnite
            });
          //  console.log(that.data.furnite)
           // console.log(res.data.data.furnite)
          }
        }
      }
    })
  },
  onPullDownRefresh: function(e) {    
    wx.stopPullDownRefresh();
  }
})