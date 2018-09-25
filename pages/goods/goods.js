// pages/goods/goods.js
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '', //请求图片的ip地址
    isGoods: 0,
    imgUrls: ["https://img.alicdn.com/imgextra/i4/3369912041/TB2AsNWtkCWBuNjy0FaXXXUlXXa_!!3369912041.jpg_430x430q90.jpg",
      "https://img.alicdn.com/imgextra/i1/3369912041/TB2CZb.kLiSBuNkSnhJXXbDcpXa_!!3369912041.jpg_430x430q90.jpg"
    ],
    swipercurrent: 0,
    googdsPrice: 149.00,
    sellAccount: 1613,
    taxRate: "11.12%", //税率
    brandGoodsAccount: 15,
    commentPersonAccount: 4,
    commentInfoList: [{
        "avatar": "http://img3.imgtn.bdimg.com/it/u=2664250731,1155809784&fm=26&gp=0.jpg",
        "nickName": "小叮当",
        "content": "物美价廉,必须好评"
      },
      {
        "avatar": "http://img5.duitang.com/uploads/item/201408/17/20140817235719_c5AnH.jpg",
        "nickName": "godV",
        "content": "必须好评,很满意的一次购物"
      }
    ],
    goodDetails: null, //用于存放请求回的商品详情数据
    showPop: false,
    animationData: {},
    num: 1,
    goodsId: ""
  },


  swiperChange: function(e) {
    this.setData({
      swipercurrent: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const imgPath = http.config.imgpathUrl; //取图片的路径需要id拼接
    this.setData({
      imgSrc: imgPath
    })
    //获取所点击的goodId进行查询该商品详情
    let goodsId = options.goodsId;
    this.setData({
      goodsId: goodsId
    })
    http.request({
      apiName: 'goods/details',
      method: 'post',
      data: {
        'id': goodsId
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res);
        this.setData({
          goodsDetails: res,
          imgUrls: res.imgs
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 购物车增加
   */
  deleNum: function() {
    this.setData({
      num: this.data.num - 1
    })
  },
  addNum: function() {
    this.setData({
      num: this.data.num + 1
    })
  },
  okCat: function() {
    if (this.data.isGoods > 0) {
      let aa = this.data.goodsId;
      let order = [];
      let bb = this.data.num + "";
      let myjson = {};
      myjson[aa] = bb;
      order.push(myjson);
      order = JSON.stringify(order);
      console.log(order);
      wx.navigateTo({
        url: '../editOrder/editOrder?order=' + order
      });
    } else {
      http.request({
        apiName: 'order/addshoppingcar',
        method: 'put',
        data: {
          'goodsId': this.data.goodsId,
          'num': this.data.num
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
    }

  },
  /**
   * 显示购买弹出层
   */
  showModal(e) {
    this.setData({
      isGoods: e.currentTarget.dataset.id
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
    });
    this.animation = animation;
    animation.translateY(285).step();
    this.setData({
      animationData: this.animation.export(),
      showPop: true

    });
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),

      })
    }.bind(this), 200)
  },
  /**
   * 隐藏购买弹出框
   */
  hideModal() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });
    this.animation = animation;
    this.animation.translateY(285).step();
    this.setData({
      animationData: this.animation.export(),
    });
    setTimeout(function() {
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
  onShow: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    });
    this.animation = animation;
    this.animation.translateY(0).step();
    this.setData({
      animationData: this.animation.export(),
      showPop: false
    });
    setTimeout(function() {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function() {

  },
  catShow: function() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  onShareAppMessage: function () {
    let that =this;
    return {
      title: this.data.goodsDetails.nickName, // 转发后 所显示的title
      path: '/pages/goods/goods', // 相对的路径
      success: (res)=>{    // 成功后要做的事情
        console.log(res.shareTickets[0])
        // console.log
       
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (res)=> { 
            that.setData({
              isShow:true
            }) 
            console.log(that.setData.isShow)
           },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }

  },
  /**
   * 自定义方法
   */
  //查看品牌专区
  brandArea() {
    wx.navigateBack({

    })
  }


})