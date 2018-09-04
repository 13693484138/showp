// pages/regionList/regionList.js
const http=require("../../utils/http.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]//用来渲染该页面的产品数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)//url传来的id
      http.request({
        apiName: 'activity/activityShoppingList',
        method: 'post',
        data: { 'id': options.id, 'currentPage': 1, 'pageSize': 10 },
        isShowProgress: true,
        success: (res) => {
          this.setData({
            goodsList: res.records,
          })
        }
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
  /**
   * 自定义方法
   */


  //跳转商品详情页面
  forward(e){
    let whichGoodsId = e.currentTarget.id;//所点击商品id
    // console.log(whichGoodsId)
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + whichGoodsId,
    })
  }

})
