// pages/addressDetail/addressDetail.js
const http=require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],//用户的地址列表
    order:'',//传过来的order列表
    chooseAddressId:'',//所选择的收货地址id
    /*表单信息 */
    name: '',
    phone: '',
    province:'',
    city:'',
    district:'',
    cardNo: '',//身份证账号
    address: '',
    isDefault: '',
    facephoto: '',//身份证正面图片id
    backphoto: '',//身份证反面图片id
    /*展示身份证正反图片路径 */
    showZheng:'',
    showFan:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.order);
    http.request({
      apiName: 'order/addresslist',
      method: 'get',
      isShowProgress: true,
      success: res => {
        this.setData({
          addressList:res,
        })
      }
    })
    //将传递过来的订单保存住
    if(options.order){
      this.setData({
        order: options.order
      })
    }
    //请求地址列表
    this.requestAddList()
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
      apiName: 'order/addresslist',
      method: 'get',
      isShowProgress: true,
      success: res => {
        // console.log(res)
        this.setData({
          addressList: res,
        })
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
  /**
   * 自定义函数
   */
  requestAddList(){
    http.request({
      apiName: 'order/addresslist',
      method: 'get',
      isShowProgress: true,
      success: res => {
        // console.log(res)
        this.setData({
          addressList: res,
        })
      }
    })
  },
  newAddress(){
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },
  //编辑地址跳转
  editAddress(e){
    let addressId = e.currentTarget.id;//所要编辑的地址id
    wx.navigateTo({
      url: '../editAddress/editAddress?addressId='+addressId,
    })
  },
  //下单时选择收货地址
  chooseAddress(e){
    let id = e.currentTarget.id;//当前点击的是哪个地址id
    this.setData({
      chooseAddressId:id
    })
    console.log(this.data.order)
    if(this.data.order){
      console.log("有订单参数")
      this.queryAddress(id)
    }else{
      console.log("没有传递订单")
    }
  },
  //查询地址详情 并 取回身份证图片id
  queryAddress(params) {
    http.request({
      apiName: 'order/addressdetail',
      method: 'post',
      data: {
        id: params
      },
      isShowProgress: true,
      success: res => {
        console.log(res);
        this.setData({
          name: res.name,
          phone: res.phone,
          cardNo: res.cardNo,
          address: res.address,
          region: [res.province, res.city, res.district],
          isDefault: res.isDefault,
          facephoto: res.facePhoto,
          showZheng: this.data.imgSrc + res.facePhoto,
          backphoto: res.backPhoto,
          showFan: this.data.imgSrc + res.backPhoto
        })
        //修改isDeauflt为true
        http.request({
          apiName: 'order/insertaddress',
          method: 'put',
          data: {
            name: this.data.name,
            phone: this.data.phone,
            cardNo: this.data.cardNo,
            address: this.data.address,
            province: this.data.province,
            city: this.data.city,
            district:this.data.district,
            isDefault: true,
            facephoto: this.data.facePhoto,
            backphoto: this.data.backPhoto,
            id: this.data.chooseAddressId
            
          },
          isShowProgress: true,
          success: res => {
            console.log(res);
            console.log("保存成功")
            wx.navigateBack({
              
            })
          },
          fail: err => {
            console.log(err)
          }
        })
      },

    })

  },
})