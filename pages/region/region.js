// pages/region/region.js
const http = require('../../utils/http.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: ["../../assets/img/1.jpeg", "../../assets/img/2.jpeg", "../../assets/img/3.jpeg", "../../assets/img/4.jpeg"],
    activityList: [], //存放活动列表
    activityGoodsList: [], //存放具体某一活动的商品列表
  },
  jump: function(e) {
    // console.log(e.currentTarget.id)
    let whichId = e.currentTarget.id; //用于判断点击的哪一个id进行跳转，并用这个id在下个页面渲染数据
    console.log(whichId)
    wx.navigateTo({
      url: '../regionList/regionList?id=' + whichId,
      success: function(res) {

      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
  },
  //请求所有活动专区板块
  requestZq() {
    http.request({
      apiName: 'activity/activityList',
      method: 'post',
      isShowProgress: true,
      success: (res) => {
        console.log(res);
        this.setData({
          activityList: res,
        })
      },
    })
  },
  //请求某活动专区的具体list
  requsetZqList() {
    http.request({
      apiName: 'activity/activityShoppingList',
      method: 'post',
      data: {
        'id': '25dde3d3abfa11e8aae9000c29fa27b9',
        'currentPage': 1,
        'pageSize': 10
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res)
        this.setData({
          activityGoodsList: res.records,
        })
      }
    })
  },
  //跳转商品详情页面
  forward(e) {
    // console.log(e.currentTarget.id)
    let whichGoodsId=e.currentTarget.id;
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + whichGoodsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestZq();
    this.requsetZqList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})