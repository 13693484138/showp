// pages/classifyDetail/classifyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // translate:'10px',//滚动条的偏移量
    tabMenu:[
      {
        text:'全部',
        oueterWidth:'0px',
        innerWidth:'0px'
      },
      {
        text:'待付款',
        oueterWidth:'0px',
        innerWidth:'0px'
      }, {
        text:'待发货',
        oueterWidth:'0px',
        innerWidth:'0px'
      }, {
        text:'已发货',
        oueterWidth:'0px',
        innerWidth:'0px'
      }
    ],
    listMenu:[
      {
        text:"线上订单",
      }
      ,
      {
        text:"门店消费",
      }

    ],
    listTap:0,
    tabMenuIndex:0,//默认选中项
    lineWidth:0,//滚动条的宽度
    listTitle:[
      {
        name:'默认',
        sort:false//是否允许排序
      },
      {
        name:'销量',
        sort:false//是否允许排序
      },
      {
        name:'收藏',
        sort:false//是否允许排序
      },
      {
        name:'价格',
        sort:true,//是否允许排序
        sortRule:'asc'//不允许排序时可以不写
      },
      {
        name:'品牌',
        sort:false//是否允许排序
      },
    ],
    listTitleIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let flag = false;    
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
  
  },
  menuTap:function(e){
    const index = e.currentTarget.dataset.index;
    const outerWidth = this.data.tabMenu[index].oueterWidth;
    const innerWidth = this.data.tabMenu[index].innerWidth;
   this.data.translate=  e.currentTarget.offsetLeft;
   this.setData({
     translate:this.data.translate+'px',
     tabMenuIndex:index
   })
  },
  listTap:function(e){
    console.log(e);
     this.setData({
       listTap:e.currentTarget.dataset.index
     })
  },
  titleMenuTap:function(e){
    const index = e.currentTarget.dataset.index;
    const menuItem = this.data.listTitle[index];
    if(index!=this.data.listTitleIndex){
      this.data.listTitleIndex = index;
      this.setData({
        listTitleIndex:this.data.listTitleIndex
      })
    }else{
      if(menuItem.sort){
        this.data.listTitle[index].sortRule = menuItem.sortRule=='asc'?'desc':'asc';
        this.setData({
          listTitle:this.data.listTitle
        })
      }
    }
  }
})