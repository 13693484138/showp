// pages/classifyDetail/classifyDetail.js
const http = require('../../utils/http');
Page({
  /**
  页面的初始数据
   */
  data: {
    key:"",
    showList:[],
    class:[],
    genduo:false,
    setTop:100,
    typeId:"",
    translate:'10px',//滚动条的偏移量
    tabMenu:[],
    tabMenuIndex:0,//默认选中项
    lineWidth:0,//滚动条的宽度
    pageIndex:1,
    pageSize:10,
    listTitle:[
      {
        name:'默认',
        sort:false//是否允许排序
      },
      {
        name:'销量',
        sort:false//是否允许排序
      },
      {
        name:'收藏',
        sort:false//是否允许排序
      },
      {
        name:'价格',
        sort:true,//是否允许排序
        sortRule:'asc',//不允许排序时可以不写
        order:'salePrice',
        spa:'0'
      },
      {
        name:'品牌',
        sort:false,//是否允许排序
        order:'brand'
      },
    ],
    listTitleIndex:0
  },
  onPullDownRefresh: function(){
    this.loderMore();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      key:option.key,
      typeId:option.typeId
    });
    http.request({
      apiName:'/goods/goodsListByClassify',
      method:'post',
      data:{"currentPage":1,"pageSize":10,"classifyId":option.key},
      isShowProgress:true,
      success:(res)=>{
        console.log(res);
        this.setData({
          showList:res.records
        })
      }
    })
    http.request({
      apiName:'goods/sonOfClassify',
      method:'post',
      data:{"pId":this.data.typeId,"firstClassifyId":this.data.key},
      success:(res)=>{
        let arry2=[];
        //重组数组
        console.log(res.findIndex(fruit => fruit.id === this.data.key));

    
         res.map(((item,index)=>{
          arry2.push(Object.assign({},item,{"oueterWidth":"0px","innerWidth":"0px"}));
         }));
         //向数组开头添加数据
         arry2.unshift({"title":"全部","oueterWidth":"0px","innerWidth":"0px"});
         this.setData({
          tabMenu:arry2
        })
        this.setData({
          tabMenuIndex:arry2.findIndex(fruit => fruit.id === this.data.key),
          }) //初始下标
      }})
    const _this = this;
    let flag = false;
    const query = wx.createSelectorQuery();
    query.selectAll(".scroll-item").boundingClientRect(function(rects){
      rects.forEach((item,index) => {
        _this.data.tabMenu[index].oueterWidth = item.width;
      });
      query.selectAll(".scroll-item-text").boundingClientRect(function(recs){
        recs.forEach((itemText,idx) => {
          _this.data.tabMenu[idx].innerWidth = itemText.width;
        });
        flag = true;  
      }).exec();
    }).exec();
    let timer = setInterval(function(){
      if(flag){
        _this.setData({
          translate:(_this.data.tabMenu[0].oueterWidth+_this.data.tabMenu[0].oueterWidth*2-_this.data.tabMenu[0].innerWidth)/2+'px',
          lineWidth:_this.data.tabMenu[1].innerWidth+'px'
        })
        clearInterval(timer);
        timer=null;
      }
    },400)
  },
  scrollBottom:function(){
    this.setData({
      pageSize:this.data.pageSize+10
    })
    this.loderMore();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  loderMore:function(){
    if(!this.data.key){
      http.request({
        apiName:'/goods/goodsListByFirstClassify',
        method:'post',
        data:{"currentPage":1,"pageSize":10,"classifyId":this.data.typeId},
        isShowProgress:true,
        success:(res)=>{
          this.setData({
            showList:res.records
          })
        }
      })
    }
    else if(this.data.showList.length%10==0){
    http.request({
      apiName:'/goods/goodsListByClassify',
      method:'post',
      data:{"currentPage":this.data.pageIndex,"pageSize":this.data.pageSize,"classifyId":this.data.key},
      isShowProgress:true,
      success:(res)=>{
        console.log(res);
        this.setData({
          showList:res.records
        })
      }
    })
  }
  else if(this.data.showList.length==0||this.data.showList.length%10!=0){
     this.setData({
       genduo:true
     })
  }
  else{
    wx.showToast({
      title: '未知错误',
      icon: 'none',
      duration: 2000
    })
  }
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
  scrollTop:function(){
    this.setData({
      setTop:0
    })
    // wx.createSelectorQuery().select(".goods-scroll-view").scrollOffset(function(res){
    //  // 节点的竖直滚动位置
    // }).exec()
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
  menuTap:function(e){
    this.setData({
      key:e.currentTarget.dataset.id,
      pageSize:10
    })
     this.loderMore();
    const index = e.currentTarget.dataset.index;
    const outerWidth = this.data.tabMenu[index].oueterWidth;
    const innerWidth = this.data.tabMenu[index].innerWidth;
   this.data.translate=  e.currentTarget.offsetLeft;
   this.setData({
     translate:this.data.translate+(outerWidth-innerWidth)/2+'px',
     lineWidth:innerWidth+'px',
     tabMenuIndex:index
   })
  },
  titleMenuTap:function(e){
    http.request({
      apiName:'/goods/goodsListByClassify',
      method:'post',
      data:{"currentPage":1,"pageSize":10,"classifyId":this.data.key,"order":e.currentTarget.dataset.order},
      isShowProgress:true,
      success:(res)=>{
        console.log(res);
        this.setData({
          showList:res.records,
          pageSize:10
        })
      }
    })
    const index = e.currentTarget.dataset.index;
    const menuItem = this.data.listTitle[index];
    if(index!=this.data.listTitleIndex){
      this.data.listTitleIndex = index;
      this.setData({
        listTitleIndex:this.data.listTitleIndex
      })
    }else{
      if(menuItem.sort){
        this.data.listTitle[index].sortRule = menuItem.sortRule=='asc'?'desc':'asc';
        this.setData({
          listTitle:this.data.listTitle
        })
      }
    }
  }
})