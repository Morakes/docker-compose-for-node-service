define({ "api": [
  {
    "type": "get",
    "url": "/web/chef/getShowChef",
    "title": "获取首页推荐厨师",
    "group": "厨师管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "GetWebChefGetshowchef"
  },
  {
    "type": "get",
    "url": "/web/chef/getStatistics",
    "title": "获取统计数据",
    "group": "厨师管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "GetWebChefGetstatistics"
  },
  {
    "type": "post",
    "url": "/web/chef/addChef",
    "title": "添加厨师",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "job",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "restaurant",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "intro",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefAddchef"
  },
  {
    "type": "post",
    "url": "/web/chef/delChef",
    "title": "删除厨师",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefDelchef"
  },
  {
    "type": "post",
    "url": "/web/chef/getChef",
    "title": "获取所有厨师",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefGetchef"
  },
  {
    "type": "post",
    "url": "/web/chef/getDetail",
    "title": "厨师详情",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefGetdetail"
  },
  {
    "type": "post",
    "url": "/web/chef/removeDisplay",
    "title": "移除首页推荐",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/chef/setDisplay",
    "title": "设置首页推荐",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefSetdisplay"
  },
  {
    "type": "post",
    "url": "/web/chef/updChef",
    "title": "更新厨师",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "job",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "restaurant",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "label",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "intro",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chief.js",
    "groupTitle": "厨师管理",
    "name": "PostWebChefUpdchef"
  },
  {
    "type": "post",
    "url": "/web/specialty/delScenic",
    "title": "删除厨师",
    "group": "厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "厨师管理",
    "name": "PostWebSpecialtyDelscenic"
  },
  {
    "type": "get",
    "url": "/web/chefMenu",
    "title": "获取菜谱",
    "group": "厨师菜谱",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "chefId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chiefMenu.js",
    "groupTitle": "厨师菜谱",
    "name": "GetWebChefmenu"
  },
  {
    "type": "post",
    "url": "/web/chefMenu/addMenu",
    "title": "添加菜谱",
    "group": "厨师菜谱",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chiefMenu.js",
    "groupTitle": "厨师菜谱",
    "name": "PostWebChefmenuAddmenu"
  },
  {
    "type": "post",
    "url": "/web/chefMenu/delMenu",
    "title": "删除菜谱",
    "group": "厨师菜谱",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chiefMenu.js",
    "groupTitle": "厨师菜谱",
    "name": "PostWebChefmenuDelmenu"
  },
  {
    "type": "post",
    "url": "/web/chefMenu/getMenuDetails",
    "title": "菜谱详情",
    "group": "厨师菜谱",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/chiefMenu.js",
    "groupTitle": "厨师菜谱",
    "name": "PostWebChefmenuGetmenudetails"
  },
  {
    "type": "post",
    "url": "/applets/scenic/getDetails",
    "title": "名胜详情",
    "group": "名小程序--胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/scenic/index.js",
    "groupTitle": "名小程序--胜管理",
    "name": "PostAppletsScenicGetdetails"
  },
  {
    "type": "get",
    "url": "/web/specialty/getStatistics",
    "title": "获取统计数据",
    "group": "名特管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "名特管理",
    "name": "GetWebSpecialtyGetstatistics"
  },
  {
    "type": "get",
    "url": "/web/scenic/getShowScenic",
    "title": "获取首页推荐景点",
    "group": "名胜管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "GetWebScenicGetshowscenic"
  },
  {
    "type": "get",
    "url": "/web/scenic/getStatistics",
    "title": "获取统计数据",
    "group": "名胜管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "GetWebScenicGetstatistics"
  },
  {
    "type": "post",
    "url": "/web/scenic/addScenic",
    "title": "添加名胜",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imgList",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "intro",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "longitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "openDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "specificAddress",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tel",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ticketInfo",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicAddscenic"
  },
  {
    "type": "post",
    "url": "/web/scenic/delScenic",
    "title": "删除名胜",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicDelscenic"
  },
  {
    "type": "post",
    "url": "/web/scenic/getScenic",
    "title": "获取所有景点",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicGetscenic"
  },
  {
    "type": "post",
    "url": "/web/scenic/removeDisplay",
    "title": "移除首页推荐",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/scenic/scenicDetail",
    "title": "名胜详情",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicScenicdetail"
  },
  {
    "type": "post",
    "url": "/web/scenic/setDisplay",
    "title": "设置首页推荐",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicSetdisplay"
  },
  {
    "type": "post",
    "url": "/web/scenic/updScenic",
    "title": "修改名胜",
    "group": "名胜管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imgList",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "intro",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "longitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "openDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "specificAddress",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tel",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ticketInfo",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/scenic.js",
    "groupTitle": "名胜管理",
    "name": "PostWebScenicUpdscenic"
  },
  {
    "type": "get",
    "url": "/oil/example",
    "title": "获取订单",
    "group": "后台订单",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/example.js",
    "groupTitle": "后台订单",
    "name": "GetOilExample"
  },
  {
    "type": "get",
    "url": "/applets/town/townList",
    "title": "获取城镇",
    "group": "城镇列表",
    "version": "0.0.0",
    "filename": "server/controller/app/town.js",
    "groupTitle": "城镇列表",
    "name": "GetAppletsTownTownlist"
  },
  {
    "type": "get",
    "url": "/web/town/townList",
    "title": "获取城镇",
    "group": "城镇列表",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/town.js",
    "groupTitle": "城镇列表",
    "name": "GetWebTownTownlist"
  },
  {
    "type": "get",
    "url": "/web/apply/getStatistics",
    "title": "获取统计数据",
    "group": "审核管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/merchant/apply.js",
    "groupTitle": "审核管理",
    "name": "GetWebApplyGetstatistics"
  },
  {
    "type": "post",
    "url": "/web/apply/applyDetail",
    "title": "审核详情",
    "group": "审核管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/merchant/apply.js",
    "groupTitle": "审核管理",
    "name": "PostWebApplyApplydetail"
  },
  {
    "type": "post",
    "url": "/web/apply/applyList",
    "title": "获取未审核列表",
    "group": "审核管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/merchant/apply.js",
    "groupTitle": "审核管理",
    "name": "PostWebApplyApplylist"
  },
  {
    "type": "post",
    "url": "/web/apply/recordsList",
    "title": "获取已审核列表",
    "group": "审核管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/merchant/apply.js",
    "groupTitle": "审核管理",
    "name": "PostWebApplyRecordslist"
  },
  {
    "type": "post",
    "url": "/web/chef/getDetail",
    "title": "厨师详情",
    "group": "小程序--厨师管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/chef/index.js",
    "groupTitle": "小程序--厨师管理",
    "name": "PostWebChefGetdetail"
  },
  {
    "type": "get",
    "url": "/applets/specialty/getShow",
    "title": "获取首页推荐特产",
    "group": "小程序--特产管理",
    "version": "0.0.0",
    "filename": "server/controller/app/specialty/index.js",
    "groupTitle": "小程序--特产管理",
    "name": "GetAppletsSpecialtyGetshow"
  },
  {
    "type": "post",
    "url": "/applets/scenic/getDetails",
    "title": "特产详情",
    "group": "小程序--特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/specialty/index.js",
    "groupTitle": "小程序--特产管理",
    "name": "PostAppletsScenicGetdetails"
  },
  {
    "type": "post",
    "url": "/applets/cook/addCook",
    "title": "添加厨师",
    "group": "小程序--餐厅厨师",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/cook/index.js",
    "groupTitle": "小程序--餐厅厨师",
    "name": "PostAppletsCookAddcook"
  },
  {
    "type": "post",
    "url": "/applets/cook/delCook",
    "title": "删除厨师",
    "group": "小程序--餐厅厨师",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/cook/index.js",
    "groupTitle": "小程序--餐厅厨师",
    "name": "PostAppletsCookDelcook"
  },
  {
    "type": "post",
    "url": "/applets/cook/getCookDetails",
    "title": "厨师详情",
    "group": "小程序--餐厅厨师",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/cook/index.js",
    "groupTitle": "小程序--餐厅厨师",
    "name": "PostAppletsCookGetcookdetails"
  },
  {
    "type": "post",
    "url": "/applets/cook/getCookList",
    "title": "添加厨师",
    "group": "小程序--餐厅厨师",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "restId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/cook/index.js",
    "groupTitle": "小程序--餐厅厨师",
    "name": "PostAppletsCookGetcooklist"
  },
  {
    "type": "post",
    "url": "/applets/cook/updCook",
    "title": "更新厨师",
    "group": "小程序--餐厅厨师",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/cook/index.js",
    "groupTitle": "小程序--餐厅厨师",
    "name": "PostAppletsCookUpdcook"
  },
  {
    "type": "get",
    "url": "/applets/rest/chefList",
    "title": "获取所有厨师",
    "group": "小程序--餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/app/chef/index.js",
    "groupTitle": "小程序--餐厅管理",
    "name": "GetAppletsRestCheflist"
  },
  {
    "type": "get",
    "url": "/applets/rest/getChef",
    "title": "获取首页推荐厨师",
    "group": "小程序--餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/app/chef/index.js",
    "groupTitle": "小程序--餐厅管理",
    "name": "GetAppletsRestGetchef"
  },
  {
    "type": "get",
    "url": "/applets/rest/restList",
    "title": "获取餐厅列表",
    "group": "小程序--餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/app/rest/index.js",
    "groupTitle": "小程序--餐厅管理",
    "name": "GetAppletsRestRestlist"
  },
  {
    "type": "get",
    "url": "/applets/rest/showRest",
    "title": "获取首页推荐餐厅",
    "group": "小程序--餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/app/rest/index.js",
    "groupTitle": "小程序--餐厅管理",
    "name": "GetAppletsRestShowrest"
  },
  {
    "type": "get",
    "url": "/applets/dishes/addDishes",
    "title": "添加菜谱",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "GetAppletsDishesAdddishes"
  },
  {
    "type": "get",
    "url": "/applets/dishes/getDishesList",
    "title": "获取菜谱",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "GetAppletsDishesGetdisheslist"
  },
  {
    "type": "get",
    "url": "/applets/dishes/getNotShow",
    "title": "获取未推荐菜谱",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "GetAppletsDishesGetnotshow"
  },
  {
    "type": "get",
    "url": "/applets/dishes/getShowList",
    "title": "获取推荐菜谱",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "GetAppletsDishesGetshowlist"
  },
  {
    "type": "get",
    "url": "/applets/dishes/updDishes",
    "title": "更新菜谱",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "restId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "GetAppletsDishesUpddishes"
  },
  {
    "type": "post",
    "url": "/web/dishes/removeDisplay",
    "title": "移除推荐",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "PostWebDishesRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/dishes/setDisplay",
    "title": "设置推荐",
    "group": "小程序--餐厅菜品管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/dishes/index.js",
    "groupTitle": "小程序--餐厅菜品管理",
    "name": "PostWebDishesSetdisplay"
  },
  {
    "type": "get",
    "url": "/web/scenic/getShowList",
    "title": "获取首页推荐景点",
    "group": "小程序-名胜管理",
    "version": "0.0.0",
    "filename": "server/controller/app/scenic/index.js",
    "groupTitle": "小程序-名胜管理",
    "name": "GetWebScenicGetshowlist"
  },
  {
    "type": "get",
    "url": "/applets/merch/merchDetail",
    "title": "获取用户身份",
    "group": "小程序商户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "userId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/merch/index.js",
    "groupTitle": "小程序商户",
    "name": "GetAppletsMerchMerchdetail"
  },
  {
    "type": "get",
    "url": "/applets/season/getShow",
    "title": "获取首页推荐",
    "group": "小程序时令管理",
    "version": "0.0.0",
    "filename": "server/controller/app/season/index.js",
    "groupTitle": "小程序时令管理",
    "name": "GetAppletsSeasonGetshow"
  },
  {
    "type": "/applets/auth",
    "url": "/",
    "title": "小程序登录",
    "group": "小程序登录",
    "version": "0.0.0",
    "filename": "server/controller/app/login.js",
    "groupTitle": "小程序登录",
    "name": "/applets/auth"
  },
  {
    "type": "get",
    "url": "/applets/carousel/getShowCarousel",
    "title": "获取展示中轮播图",
    "group": "小程序轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/app/carousel/index.js",
    "groupTitle": "小程序轮播图",
    "name": "GetAppletsCarouselGetshowcarousel"
  },
  {
    "type": "get",
    "url": "/web/statistics/getMonthMerchant",
    "title": "获取本月商户数",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGetmonthmerchant"
  },
  {
    "type": "get",
    "url": "/web/statistics/getMonthUser",
    "title": "获取本月新增用户",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGetmonthuser"
  },
  {
    "type": "get",
    "url": "/web/statistics/getRestRank",
    "title": "获取餐厅排名",
    "group": "数据统计管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGetrestrank"
  },
  {
    "type": "get",
    "url": "/web/statistics/getTodayMerchant",
    "title": "获取今日商户数",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGettodaymerchant"
  },
  {
    "type": "get",
    "url": "/web/statistics/getTodayUser",
    "title": "获取本日新增用户",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGettodayuser"
  },
  {
    "type": "get",
    "url": "/web/statistics/getYearMerchant",
    "title": "获取本年商户数",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGetyearmerchant"
  },
  {
    "type": "get",
    "url": "/web/statistics/getYearUser",
    "title": "获取本年新增用户",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsGetyearuser"
  },
  {
    "type": "get",
    "url": "/web/statistics/theTop",
    "title": "获取顶部数据",
    "group": "数据统计管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/admin/statistic.js",
    "groupTitle": "数据统计管理",
    "name": "GetWebStatisticsThetop"
  },
  {
    "type": "post",
    "url": "/web/file/uploadFile",
    "title": "web文件上传",
    "group": "文件上传",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Mutiply",
            "optional": false,
            "field": "file",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/upload.js",
    "groupTitle": "文件上传",
    "name": "PostWebFileUploadfile"
  },
  {
    "type": "get",
    "url": "/web/season/getShowseason",
    "title": "获取首页推荐",
    "group": "时令管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "GetWebSeasonGetshowseason"
  },
  {
    "type": "get",
    "url": "/web/season/getStatistics",
    "title": "获取统计数据",
    "group": "时令管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "GetWebSeasonGetstatistics"
  },
  {
    "type": "post",
    "url": "/web/season/addition",
    "title": "添加时令",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "ingredients",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "junkLink",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonAddition"
  },
  {
    "type": "post",
    "url": "/web/season/delseason",
    "title": "删除时令",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonDelseason"
  },
  {
    "type": "post",
    "url": "/web/season/getseason",
    "title": "获取所有时令",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonGetseason"
  },
  {
    "type": "post",
    "url": "/web/season/removeDisplay",
    "title": "移除首页推荐",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/season/seasonDetail",
    "title": "时令详情",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonSeasondetail"
  },
  {
    "type": "post",
    "url": "/web/season/setDisplay",
    "title": "设置首页推荐",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonSetdisplay"
  },
  {
    "type": "post",
    "url": "/web/season/updseason",
    "title": "修改时令",
    "group": "时令管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "ingredients",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "junkLink",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/season.js",
    "groupTitle": "时令管理",
    "name": "PostWebSeasonUpdseason"
  },
  {
    "type": "get",
    "url": "/web/specialty/getShow",
    "title": "获取首页推荐特产",
    "group": "特产管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "GetWebSpecialtyGetshow"
  },
  {
    "type": "post",
    "url": "/web/scenic/getDetail",
    "title": "特产详情",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebScenicGetdetail"
  },
  {
    "type": "post",
    "url": "/web/specialty/addSpecialty",
    "title": "添加特产",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "topImg",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "originalPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "discountPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "junkLink",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtyAddspecialty"
  },
  {
    "type": "post",
    "url": "/web/specialty/delScenic",
    "title": "删除名胜",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtyDelscenic"
  },
  {
    "type": "post",
    "url": "/web/specialty/getSpecialty",
    "title": "获取所有特产",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtyGetspecialty"
  },
  {
    "type": "post",
    "url": "/web/specialty/removeDisplay",
    "title": "移除首页推荐",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtyRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/specialty/setDisplay",
    "title": "设置首页推荐",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtySetdisplay"
  },
  {
    "type": "post",
    "url": "/web/specialty/updSpecialty",
    "title": "更新特产",
    "group": "特产管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "topImg",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "townId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "originalPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "folat",
            "optional": false,
            "field": "discountPrice",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "junkLink",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/specialty.js",
    "groupTitle": "特产管理",
    "name": "PostWebSpecialtyUpdspecialty"
  },
  {
    "type": "get",
    "url": "/oauth/token",
    "title": "获取token",
    "group": "登录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/token.js",
    "groupTitle": "登录",
    "name": "GetOauthToken"
  },
  {
    "type": "get",
    "url": "/web/currentUser",
    "title": "获取登录信息",
    "group": "登录",
    "version": "0.0.0",
    "filename": "server/controller/admin/login.js",
    "groupTitle": "登录",
    "name": "GetWebCurrentuser"
  },
  {
    "type": "post",
    "url": "/web/sys/user/userList",
    "title": "获取管理员",
    "group": "管理员",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/administrator.js",
    "groupTitle": "管理员",
    "name": "PostWebSysUserUserlist"
  },
  {
    "type": "post",
    "url": "/web/sys/role/getRole",
    "title": "获取角色",
    "group": "角色列表",
    "version": "0.0.0",
    "filename": "server/controller/admin/role.js",
    "groupTitle": "角色列表",
    "name": "PostWebSysRoleGetrole"
  },
  {
    "type": "get",
    "url": "/web/carousel/getCarousel",
    "title": "获取轮播",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "GetWebCarouselGetcarousel"
  },
  {
    "type": "get",
    "url": "/web/carousel/getShowCarousel",
    "title": "获取展示中轮播图",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "GetWebCarouselGetshowcarousel"
  },
  {
    "type": "post",
    "url": "/web/carousel/addCarousel",
    "title": "添加轮播",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imgUrl",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remark",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "PostWebCarouselAddcarousel"
  },
  {
    "type": "post",
    "url": "/web/carousel/delCarousel",
    "title": "删除轮播",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "PostWebCarouselDelcarousel"
  },
  {
    "type": "post",
    "url": "/web/carousel/removeDisplay",
    "title": "移除展示",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "PostWebCarouselRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/carousel/setDisplay",
    "title": "设为展示",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "PostWebCarouselSetdisplay"
  },
  {
    "type": "put",
    "url": "/web/carousel/updCarousel",
    "title": "更新轮播",
    "group": "轮播图",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imgUrl",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "remark",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/carousel/index.js",
    "groupTitle": "轮播图",
    "name": "PutWebCarouselUpdcarousel"
  },
  {
    "type": "get",
    "url": "/web/rest/getStatistics",
    "title": "获取统计数据",
    "group": "餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "GetWebRestGetstatistics"
  },
  {
    "type": "get",
    "url": "/web/rest/restInfo",
    "title": "获取餐厅基本信息",
    "group": "餐厅管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "GetWebRestRestinfo"
  },
  {
    "type": "get",
    "url": "/web/rest/showList",
    "title": "获取首页推荐餐厅",
    "group": "餐厅管理",
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "GetWebRestShowlist"
  },
  {
    "type": "post",
    "url": "/web/rest/getRestList",
    "title": "获取所有餐厅",
    "group": "餐厅管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "entity",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "PostWebRestGetrestlist"
  },
  {
    "type": "post",
    "url": "/web/rest/removeDisplay",
    "title": "移除首页推荐",
    "group": "餐厅管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "PostWebRestRemovedisplay"
  },
  {
    "type": "post",
    "url": "/web/rest/setDisplay",
    "title": "设置首页推荐",
    "group": "餐厅管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "PostWebRestSetdisplay"
  },
  {
    "type": "post",
    "url": "/web/rest/updRest",
    "title": "更新餐厅",
    "group": "餐厅管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/controller/admin/module/restaurant.js",
    "groupTitle": "餐厅管理",
    "name": "PostWebRestUpdrest"
  }
] });
