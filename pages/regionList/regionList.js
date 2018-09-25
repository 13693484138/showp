// pages/regionList/regionList.js
const http = require("../../utils/http.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner:'',
    imgSrc:'',
    id: '',
    pageIndex: 1,
    pageSize: 8,
    pages: 0,
    genduo:false,
    goodsList: [], //用来渲染该页面的产品数据
    goodsNull:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const imgPath = http.config.imgpathUrl;//取图片的路径需要id拼接
    this.setData({
      imgSrc: imgPath
    })
    //存放此id作为ajax请求参数
    if (options.id) {
      this.setData({
        id: options.id
      })
    } else {
      console.log("没有id")
      return;
    }
    //存放此图片作为该页面的banner
    if(options.swiperImg){
      this.setData({
        banner: options.swiperImg
      })
      console.log("有图")
    }else{
      console.log("美图")
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
    this.setData({
      goodsList: []
    })
    this.requestData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    if(this.data.genduo){
      return;
    }
    else{
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
    http.request({
      apiName: 'activity/activityShoppingList',
      method: 'post',
      data: {
        'id': this.data.id,
        'currentPage': this.data.pageIndex,
        'pageSize': this.data.pageSize
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res)
        if(res.pages){
          this.setData({
            goodsList: this.data.goodsList.concat(res.records),
            pages: res.pages
          })
        }
        else{
         this.setData({
          goodsNull:true
         })
        }
       
      },
      fail:err=>{
        console.log(err)
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
    if (this.data.pageIndex - 1 < this.data.pages) {
      this.requestData();
    }
    else {
      this.setData({
        genduo: true
      })
    }
  },

})