// pages/editOrder/editOrder.js
const http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   order:[],//传递过来的商品参数
   orderList:[],//请求的商品list
   goodsprice:0,//商品总价
   orderprice:0,//订单总价
   sendfee:0,//运费
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = options.order;
     this.setData({
       order:order
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
     http.request({
     apiName:"order/writeorder",
     method:"put",
     data:this.data.order,
     isShowProgress:true,
     success:(res)=>{
       console.log(res);
      this.setData({
        orderList:res.list,
        goodsprice:res.goodsprice,
        orderprice:res.orderprice,
        sendfee:res.sendfee
      });
     },
     fail:err=>{
       console.log(err)
    }
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
  goodsContent:function(e){
    console.log(1);
    wx.navigateTo({
      url: '../goods/goods?goodsId='+e.currentTarget.dataset.id,
    })
  },
})