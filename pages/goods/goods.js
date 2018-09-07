// pages/goods/goods.js
const http=require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:["https://img.alicdn.com/imgextra/i4/3369912041/TB2AsNWtkCWBuNjy0FaXXXUlXXa_!!3369912041.jpg_430x430q90.jpg",
    "https://img.alicdn.com/imgextra/i1/3369912041/TB2CZb.kLiSBuNkSnhJXXbDcpXa_!!3369912041.jpg_430x430q90.jpg"],
    swipercurrent : 0,
    googdsPrice:149.00,
    sellAccount:1613,
    goodsInstro:"印度神油 用了一个打十",
         productCountryIcon:"https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=aa49690173c6a7efb973a020cdca8369/6a600c338744ebf85714a8e1dcf9d72a6159a783.jpg",
  productCountry:"澳大利亚",
  taxRate:"11.12%",//税率
  brandIcon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535111868147&di=955bc85bc8bee8bd3e29ee7eec7de9b4&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv1%2F68%2Fd%2F84.jpg",
  brandName:"addidas",
  brandGoodsAccount:15,
  commentPersonAccount:4,
  commentInfoList:[{
    "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535111868147&di=955bc85bc8bee8bd3e29ee7eec7de9b4&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv1%2F68%2Fd%2F84.jpg",
    "nickName":"张三",
    "content":"hello world"
  },
    {
      "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535111868147&di=955bc85bc8bee8bd3e29ee7eec7de9b4&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv1%2F68%2Fd%2F84.jpg",
      "nickName":"李四",
      "content": "hello world2"
    }
  ],
  goodDetails:null,//用于存放请求回的商品详情数据
  showPop: false,
  animationData: {},  
  num:1,
  goodsId:""
  },


  swiperChange: function (e) {
    this.setData({
      swipercurrent:e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodsId=options.goodsId;
    this.setData({
      goodsId:goodsId
    })
    http.request({
      apiName: 'goods/details',
      method: 'post',
      data:{
        'id':goodsId
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res);
        this.setData({
          goodsDetails: res,
        })
      },
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
   /**
   * 购物车增加
   */
  deleNum:function(){
      this.setData({
        num:this.data.num-1
      })
  },
  addNum:function(){
    this.setData({
      num:this.data.num+1
    })
  },
  okCat:function(){
    http.request({
      apiName: 'order/addshoppingcar',
      method: 'put',
      data:{
        'goodsId':this.data.goodsId,
        'num':this.data.num
      },
      isShowProgress: true,
      success: (res) => {
        wx.showToast({
          title: res,
          icon: 'success',
          duration: 2000
        })
        this.hideModal();
      },
    })
  },
  /**
   * 显示购买弹出层
   */
  showModal(){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
    });  
    this.animation = animation;
    animation.translateY(285).step();    
    this.setData({
        animationData: this.animation.export(),
        showPop:true
  
    });
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        
      })
    }.bind(this), 200)
  },
    /**
   * 隐藏购买弹出框
   */
  hideModal(){
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });  
    this.animation = animation;
    this.animation.translateY(285).step();  
    this.setData({
      animationData: this.animation.export(),
  });
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showPop: false
    })
  }.bind(this), 500)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });  
    this.animation = animation;
    this.animation.translateY(0).step();  
    this.setData({
      animationData: this.animation.export(),
      showPop:false
  });
   setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showPop: false
    })
  }.bind(this), 500)

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
  //渲染商品详情
 

})