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
   imgpathUrl:"",
   remark:"",//商家留言
   name:"",//姓名
   phone:"",//电话
   Address:"",//地址
   cardNo:"",//身份证号码
   addressid:"",//地址id
   backphoto:""//身份证图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = options.order;
    console.log(order)
     this.setData({
       order:order,
       imgpathUrl:http.config.imgpathUrl
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
        sendfee:res.sendfee,
        name:res.name,
        phone:res.phone,
        Address:res.Address,
        cardNo:res.cardNo,
        backphoto:res.backphoto,
        facephoto:res.facephoto
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
  mobileInputEvent:function(e){
    this.setData({
      remark:e.detail.value
    })
  },
  goodsContent:function(e){
    wx.navigateTo({
      url: '../goods/goods?goodsId='+e.currentTarget.dataset.id,
    })
  },
  okOrder:function(){
    let map={};
    let list=[];
    let order=this.data.orderList;
    order.forEach(item => {
      list.push({
        "goodsid":item.goodsid,
        "num":item.num,
        "price":item.salePrice
      })
    });
    map={
      "addressid":this.data.Address,
      "goodsprice":this.data.goodsprice,
      "orderprice":this.data.orderprice,
      "remark":this.data.remark,
      "list":list
    };
    map=JSON.stringify(map);
    console.log(map);
    http.request({
      apiName:"order/submitorder",
      method:"put",
      data:map,
      isShowProgress:true,
      success:(res)=>{
       console.log(res);
       wx.requestPayment(
        {
        'timeStamp':res.timeStamp,
        'nonceStr':res.nonceStr,
        'package': res.package,
        'signType':res.signType,
        'paySign': res.paySign,
        'success':function(res){console.log(res);},
        'fail':function(res){console.log(res);},
        'complete':function(res){console.log(res);}
        })
      },
      fail:err=>{
        console.log(err)
     }
    })
  },
  address:function(){
    wx.navigateTo({ url: '../addressDetail/addressDetail?order='+this.data.order});
  }
})
