// pages/home/home.js
const http=require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    activityId:null,//随机一活动的id
    activityTopic:null,//随机一活动的主题
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getTopic()
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
  //请求某一活动主题以及该活动下的三种产品
  getTopic(){
      http.request({
        apiName: 'activity/activityList',
        method: 'post',
        isShowProgress: true,
        success: (res) => {
          let num = parseInt(Math.random()*res.length)//随机生成（0-活动列表.length)的一个下标
          this.setData({
            activityId: res[num].id,
            activityTopic:res[num].title,
          })
        },
      })
    http.request({
      apiName: 'activity/activityShoppingList',
      method: 'post',
      data: {
        'id': this.activityId,
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
  //查看全部的跳转
  forward(){
    wx.navigateTo({
      url: '',
    })
  }
})