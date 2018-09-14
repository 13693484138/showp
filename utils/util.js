// const http = require("http");
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 小数过滤器
const math = n =>{
  return n = n.toFixed(2);
}
// const tanOrder=data=>{
//    http.request({
//      apiName:"order/writeorder",
//      method:"put",
//      data:data,
//      isShowProgress:true,
//      success:function(res){
//        console.log(res);
//      },
//      fail:err=>{
//        console.log(err)
//     }
//    })
// }
module.exports = {
  math: math,
  // tanOrder:tanOrder
}
