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
    pageIndex:1,
    pageSize:8,
    pages:0,
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
  // requestZq() {
  //   http.request({
  //     apiName: 'activity/activityList',
  //     method: 'post',
  //     isShowProgress: true,
  //     success: (res) => {
  //       console.log(res);
  //       this.setData({
  //         activityList: res,
  //       })
  //     },
  //   })
  // },
  //请求某活动专区的具体list
  // requsetZqList() {
  //   console.log("1111111111111111111111111111111111");
  //   console.log(this.data.activityList[0].id);
  //   http.request({
  //     apiName: 'activity/activityShoppingList',
  //     method: 'post',
  //     data: {
  //       'id': this.data.activityList[0].id,
  //       'currentPage': this.data.pageIndex,
  //       'pageSize': this.data.pageSize
  //     },
  //     isShowProgress: true,
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         activityGoodsList: this.data.activityGoodsList.concat(res.records),
  //         pages:res.pages
  //       })
  //     }
  //   })
  // },
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
    new Promise((resolve,reject)=>{
      http.request({
        apiName: 'activity/activityList',
        method: 'post',
        isShowProgress: true,
        success: (res) => {
          console.log(res);
          this.setData({
            activityList: res,
          })
          resolve()
        },
      })
    })
    .then((ok)=>{
      console.log(1)
      http.request({
        apiName: 'activity/activityShoppingList',
        method: 'post',
        data: {
          'id': this.data.activityList[0].id,
          'currentPage': this.data.pageIndex,
          'pageSize': this.data.pageSize
        },
        isShowProgress: true,
        success: (res) => {
          console.log(res)
          this.setData({
            activityGoodsList: this.data.activityGoodsList.concat(res.records),
            pages: res.pages
          })
        },
        fail:err=>{
          reject(err)
        }
      })
    },(err)=>{
      console.log(2)
    })

    //this.requestZq();
    //this.requsetZqList();
    
   
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
       this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  scrollBottom:function(){
     this.setData({
       pageIndex:this.data.pageIndex+1
     })
     if(this.data.genduo){
       return;
     }else{
       this.loderMore();
     }
     
  },
  loderMore: function () {
    if (this.data.pageIndex - 1 < this.data.pages) {
      this.requsetZqList();
    }
    else {
      this.setData({
        genduo: true
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})