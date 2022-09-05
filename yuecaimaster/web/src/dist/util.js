var check = {
  //判断对象里面所有的参数是否为空  对象的属性只能是字符串or数组
  checkEmpty(params) {
    //params为对象
    var check = false
    for (var key in params) {
      if (typeof params[key] != "object" && !params[key]) {
        {
          check = true
        }
      } else if (typeof params[key] == "object" && params[key].length == 0) {
        check = true
      } else {
        check = false
        break
      }
    }
    return check
  },

  // checkEmpty(data, arr) {
  //   //params为对象
  //   var check = false
  //   arr.forEach((val) => {
  //     if (typeof data[key] != "object" && !data[key]) {
  //       {
  //         check = true
  //       }
  //     } else if (typeof data[key] == "object" && data[key].length == 0) {
  //       check = true
  //     } else {
  //       check = false
  //       break
  //     }
  //   })
  //   return check
  // },

  //判断对象里面的参数是否有为空的  对象的属性只能是字符串or数组

  checkHasEmpty(params) {
    //params为对象
    var check = false
    for (var key in params) {
      // console.log(typeof params[key])
      if (typeof params[key] != "object" && !params[key]) {
        {
          check = true
          break
        }
      } else if (typeof params[key] == "object" && params[key] != null && params[key].length == 0) {
        check = true
        break
      } else if (params[key] == null) {
        check = true
        break
      } else {
        check = false
      }
    }
    return check
  },
}
module.exports = check
