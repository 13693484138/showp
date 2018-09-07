// pages/cart/cart.js
const http=require('../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    editing:false, //是否正在进行商品编辑
    activityId1:'',//活动1 id
    activityTopic1:"",//活动1的主题
    activityGoodsList1:[],//活动1下的商品列表
    activityId2: '',//活动2 id
    activityTopic2: "",//活动2的主题
    activityGoodsList2: [],//活动2下的商品列表
    activityId3: '',//活动3 id
    activityTopic3: "",//活动3的主题
    activityGoodsList3: [],//活动3下的商品列表
    activityId4: '',//活动4 id
    activityTopic4: "",//活动4的主题
    activityGoodsList4: [],//活动4下的商品列表
    activityId5: '',//活动5 id
    activityTopic5: "",//活动5的主题
    activityGoodsList5: [],//活动5下的商品列表
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
  //活动1的列表点击跳详情
  goodDeatails(e){
    console.log(e.currentTarget.id)
    let goodsId = e.currentTarget.id
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + goodsId,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http.request({
      apiName: 'order/shoppingcarlist',
      method: 'post',
      data:{
        'currentPage':1,
        'pageSize':10
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res);
      },
    })
    this.getTopic();
  },
  //请求活动列表和该活动下的产品列表
  getTopic(){
    http.request({
      apiName: 'activity/indexActivityList',
      method: 'post',
      isShowProgress: true,
      data:{
        activitySize:5,
        goodsSize:4
      },
      success: (res) => {
        console.log(res)
        this.setData({
          //活动1
          activityId1: res[0].id,
          activityTopic1:res[0].title,
          activityGoodsList1:res[0].goodInfos,
          //活动2
          activityId2: res[1].id,
          activityTopic2: res[1].title,
          activityGoodsList2: res[1].goodInfos,
          //活动3
          activityId3: res[2].id,
          activityTopic3: res[2].title,
          activityGoodsList3: res[2].goodInfos,
          //活动4
          activityId4: res[3].id,
          activityTopic4: res[3].title,
          activityGoodsList4: res[3].goodInfos,
          //活动5
          activityId5: res[4].id,
          activityTopic5: res[4].title,
          activityGoodsList5: res[4].goodInfos,
        }) 
      },
    })
  
  
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  editing:function(){
    this.data.editing = this.data.editing?false:true;
    this.setData({
      editing:this.data.editing
    })
  },
  editOrder:function(){
    wx.navigateTo({ url: '../editOrder/editOrder' });
  }
})