let home = require('../../static/furnite_home.js');
Component({
  behaviors: [],
  // 属性定义（详情参见下文）
  properties: {
    furniteData: Array // 简化的定义方式
  },

  data: {
    winHeight: "", //窗口高度
    currentTab: "0", //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    currentSwitch: 0,
    furnite: [],
    categoty: '',
    furniteconlist: [],
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
    
    },
    ready: function () {},
    moved: function () {
      this._init();
    },
    detached: function () {
      
    },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {
   
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      let furnite = home.dataList.furnite;
      let imageboxcon = [];
      let that = this;
      let num = 0;
      furnite.filter((e, index) => {
        let indexflag = [];
        if (index == 0) {
          that.setData({
            categoty: e.categoty,
          })
        }
        e.furnites.filter((item, index2) => {
          num++;
          indexflag.push(num)
          e.indexflag = indexflag;
          item.categoty = e.categoty;
          imageboxcon.push(item)
        })

      })

      this.setData({
        furnite: furnite,
        furniteconlist: imageboxcon
      })


    },
    hide: function () {},
    resize: function () {},
  },

  methods: {
    _init(){
      console.log('bbbbb')
      console.log(this.properties.furniteData)
     },
    // 滚动切换标签样式
    switchTab: function (e) {
      this.setData({
        categoty: e.detail.currentItemId,
      })
      this.checkCor();
    },
 //判断当前滚动超过一屏时，设置tab标题滚动条。
 checkCor: function() {
  //if (this.data.currentTab > 4) {
    // this.setData({
    //   scrollLeft: 300
    // })
  // } else {
  //   this.setData({
  //     scrollLeft: 0
  //   })
  // }
},
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
      var cur = e.target.dataset.current[0];
      if (this.data.currentTaB == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur
        })
      }
    },
  }

})