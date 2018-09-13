// pages/cart/cart.js
const http=require('../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    catList:[],
    count:0,
    checkList:[],
    selectedAllStatus:false,
    editing:false, //是否正在进行商品编辑
    activityId1:'',//活动1 id
    activityTopic1:"",//活动1的主题
    activityGoodsList1:[],//活动1下的商品列表
    activityId2: '',//活动2 id
    activityTopic2: "",//活动2的主题
    activityGoodsList2: [],//活动2下的商品列表
    activityId3: '',//活动3 id
    activityTopic3: "",//活动3的主题
    activityGoodsList3: [],//活动3下的商品列表
    activityId4: '',//活动4 id
    activityTopic4: "",//活动4的主题
    activityGoodsList4: [],//活动4下的商品列表
    activityId5: '',//活动5 id
    activityTopic5: "",//活动5的主题
    activityGoodsList5: [],//活动5下的商品列表
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
  //活动1的列表点击跳详情
  goodDeatails(e){
    console.log(e.currentTarget.id)
    let goodsId = e.currentTarget.id;
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + goodsId,
    })
  },
    /**
   * 增加数量
   */
  deleNum:function(e){
    let up = "catList["+e.currentTarget.dataset.index+"].num";
    console.log(e.currentTarget.dataset.goodsid);
    let num = parseInt(this.data.catList[e.currentTarget.dataset.index].num)-1;
    if(num){
      http.request({
        apiName: 'order/updateshoppingcarlist',
        method: 'put',
        data:{
          'goodsId':e.currentTarget.dataset.goodsid,
          'num':num
        },
        isShowProgress: true,
        success: (res) => {
          console.log(res);
          if(this.data.catList[e.currentTarget.dataset.index].checked){
            this.setData({
              [up]:num,
              count:this.data.count-parseInt(this.data.catList[e.currentTarget.dataset.index].salePrice)
            })}
            else{
              this.setData({
                [up]:parseInt(this.data.catList[e.currentTarget.dataset.index].num)-1,
              })
        }
      }})   
    }
    else{
      wx.showModal(
        {
          "title":"提示",
          "content":"确认要从购物车中删除此商品",
          success:(res)=>{
            if(res.confirm){
             http.request({
               apiName: 'order/deleteshoppingcarlist',
               method: 'delete',
               data:{"goodsId":[e.currentTarget.dataset.goodsid]},
               isShowProgress: true,
               success: (res) => {
                  var newCatListIndex=this.data.catList.findIndex(res=>{
                    res.goodsId==e.currentTarget.dataset.goodsid
                  });
                  this.setData({
                    catList:this.data.catList.splice(newCatListIndex,1)
                  });
                 if(this.data.catList[e.currentTarget.dataset.index].checked){
                   this.setData({
                     [up]:num,
                     count:this.data.count-parseInt(this.data.catList[e.currentTarget.dataset.index].salePrice)
                   })}
                   else{
                     this.setData({
                       [up]:parseInt(this.data.catList[e.currentTarget.dataset.index].num)-1,
                     })
               }
             }}) 
            }
            else if(res.cancel){
               return;
            }
         }
        }
      )
       
    }
   
},
  /**
   * 删除数量
   */
addNum:function(e){
  let up = "catList["+e.currentTarget.dataset.index+"].num";
  console.log(e.currentTarget.dataset.goodsid);
  let num = parseInt(this.data.catList[e.currentTarget.dataset.index].num)+1
  http.request({
    apiName: 'order/updateshoppingcarlist',
    method: 'put',
    data:{
      'goodsId':e.currentTarget.dataset.goodsid,
      'num':num
    },
    isShowProgress: true,
    success: (res) => {
      console.log(res);
      if(this.data.catList[e.currentTarget.dataset.index].checked){
        this.setData({
          [up]:num,
          count:this.data.count+parseInt(this.data.catList[e.currentTarget.dataset.index].salePrice)
        })}
        else{
          this.setData({
            [up]:num,
          })
    }
  }})   
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    this.showCat()
    this.getTopic();
  },
  // 购物车列表接口渲染
  showCat(){
    http.request({
      apiName: 'order/shoppingcarlist',
      method: 'post',
      data:{
        'currentPage':1,
        'pageSize':10
      },
      isShowProgress: true,
      success: (res) => {
        console.log(res);
       this.setData({
         catList:res.list,
         count:0,
         selectedAllStatus:false
       })
      },
    })
  },//动列表和该活动下的产品列表
  getTopic(){  
    http.request({
      apiName: 'activity/indexActivityList',
      method: 'post',
      isShowProgress: true,
      data:{
        "activitySize":1,
        "goodsSize":4
      },
      success: (res) => {
        console.log(res)
        this.setData({
          //活动1
          activityId1: res[0].id,
          activityTopic1:res[0].title,
          activityGoodsList1:res[0].goodInfos,
          //活动2
          activityId2: res[1].id,
          activityTopic2: res[1].title,
          activityGoodsList2: res[1].goodInfos,
          //活动3
          activityId3: res[2].id,
          activityTopic3: res[2].title,
          activityGoodsList3: res[2].goodInfos,
          //活动4
          activityId4: res[3].id,
          activityTopic4: res[3].title,
          activityGoodsList4: res[3].goodInfos,
          //活动5
          activityId5: res[4].id,
          activityTopic5: res[4].title,
          activityGoodsList5: res[4].goodInfos,
        }) 
      },
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  editing:function(){
    this.data.editing = this.data.editing?false:true;
    this.setData({
      editing:this.data.editing
    })
  },
  // 填写订单
  editOrder:function(){
  if(this.data.count>0){
    let newCatList=this.data.catList;
    let order=[];
    newCatList.forEach(item => {
      let aa=item.goodsId;
      let bb=item.num;
      let myjson={};
       myjson[aa] =bb;
      order.push(myjson);
    });
    order=JSON.stringify(order);
    console.log(order);
    wx.navigateTo({ url: '../editOrder/editOrder?order='+order });
  }
  else{
    wx.showToast({
      "title":"请选择商品",
      "icon":"loading"
    })
  }
  },
  // 单选按钮
  checkboxChange:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var catList = this.data.catList;
    var checked = this.data.catList[index].checked;
    if(!checked){
      this.setData({
        count:this.data.catList[index].num*this.data.catList[index].salePrice+this.data.count
      });
    }
    else{
      this.setData({
        count:this.data.count-this.data.catList[index].num*this.data.catList[index].salePrice
      });
    }
    catList[index].checked=!checked;
    var r =catList.filter((item)=>{
    return item.checked
    });
    if(r.length==catList.length){
      this.setData({
        selectedAllStatus:true
      })
    }
    else{
      this.setData({
        selectedAllStatus:false
      })
    }
    this.setData({
      catList: catList
    });
  },
  // 全选按钮
  allCheckbox:function(e){
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    this.setData({
      selectedAllStatus:selectedAllStatus
    })
    var catList = this.data.catList;
    if(selectedAllStatus){
    for (var i = 0; i < catList.length; i++) {
      catList[i].checked = selectedAllStatus;
      var num = parseInt(this.data.catList[i].num); 
      var salePrice=parseFloat(this.data.catList[i].salePrice); 
      this.setData({
        count:this.data.count+num*salePrice,
        catList:catList
  })
      }}
  else{
    for (var i = 0; i < catList.length; i++) {
      catList[i].checked = selectedAllStatus;
      var num = parseInt(this.data.catList[i].num); 
      var salePrice=parseFloat(this.data.catList[i].salePrice); 
      this.setData({
        count:0,
        catList:catList
  })
      }
  }
}}
)