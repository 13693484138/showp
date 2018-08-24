// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editing:false //是否正在进行商品编辑
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
  }
 

})