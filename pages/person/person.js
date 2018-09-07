// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    myOrder:'我的订单'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success:res =>{
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  showp:function(){
    wx.navigateTo({
      url: '../orderList/orderList',
      success: function(res) {
        
      },
      fail: function(res) {

      },
      complete: function(res) {

      }})
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function () {
  
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
  //关于我们
  enterAboutMe(){
    wx.navigateTo({
      url: '../aboutMe/aboutMe',
    })
  },
  //待开发
  developing(){
    wx.showToast({
      title:'正在努力开发中',
      image:'../../assets/icon/kaifazhong.png'
    })
  }
})