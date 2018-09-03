const http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:[],//一级列表
    classIndex:0,//一级分类
    classType:[],//二级分类
    classTitle:"精选分类",//分类title
    typeId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.request({
      apiName:'goods/classify',
      method:'post',
      isShowProgress:true,
      success:(res)=>{
        console.log(res);
        this.setData({
          class:res,
          typeId:res[0].id
        })
        http.request({
          apiName:'/goods/sonOfClassify',
          method:'post',
          data:{"pId":res[0].id},
          success:(res)=>{
            console.log(res);
            this.setData({
              classType:res
            })
          }
        })
      }
    });

  },
  
  classTap:function(e){
    this.setData({
      classIndex:e.currentTarget.dataset.index,
      classTitle:e.currentTarget.dataset.title,
      typeId:e.currentTarget.dataset.id
    });
  console.log(this.data.typeId);
    console.log(e.currentTarget.dataset.id);
    http.request({
      apiName:'/goods/sonOfClassify',
      method:'post',
      data:{"pId":e.currentTarget.dataset.id},
      success:(res)=>{
        console.log(res);
        this.setData({
          classType:res
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
  viewDetail:function(e){
    wx.navigateTo({ url: '../classifyDetail/classifyDetail?key='+e.currentTarget.dataset.id+'&typeId='+this.data.typeId});
  },
  enterSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})