// pages/regionList/regionList.js
const http = require("../../utils/http.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    currentPage: 1,
    pageSize: 8,
    total:0,
    genduo:false,
    goodsList: [] //用来渲染该页面的产品数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id != null) {
      this.setData({
        id: options.id
      })
    } else {
      console.log('没有参数')
    }
    this.requestData();

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
    this.requestData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageSize: this.data.pageSize + 8
    })
    if(this.data.genduo){
      return;
    }
    else{
      console.log("111111111111111111111");
      this.loderMore();
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 自定义方法
   */

  //请求活动商品列表
  requestData() {
    console.log("==========================");
    console.log(this.data.id)
    http.request({
      apiName: 'activity/activityShoppingList',
      method: 'post',
      data: {
        'id': this.data.id,
        'currentPage': this.data.currentPage,
        'pageSize': this.data.pageSize
      },
      isShowProgress: true,
      success: (res) => {
        this.setData({
          goodsList: res.records,
          total:res.total
        })
      }
    })
  },
  //跳转商品详情页面
  forward(e) {
    let whichGoodsId = e.currentTarget.id; //所点击商品id
    // console.log(whichGoodsId)
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + whichGoodsId,
    })
  },
  //加载更多
  loderMore () {
    if (this.data.pageSize - 8 < this.data.total) {
      this.requsetZqList();
    }
    else {
      this.setData({
        genduo: true
      })
    }
  },

})