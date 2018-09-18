// pages/addressDetail/addressDetail.js
const http=require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],//用户的地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.order);
    http.request({
      apiName: 'order/addresslist',
      method: 'get',
      isShowProgress: true,
      success: res => {
        this.setData({
          addressList:res,
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
   * 自定义函数
   */
  newAddress(){
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },
  editAddress(e){
    let addressId = e.currentTarget.id;//所要编辑的地址id
    wx.navigateTo({
      url: '../editAddress/editAddress?addressId='+addressId,
    })
  }
})