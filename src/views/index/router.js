const routers = [
  {
    // 详情编辑
    path: '/',
    name: 'home'
  },
  {
    // 详情编辑
    path: '/enterpriseRegistor',
    name: 'enterprise-registor',
    component (resolve) {
      require(["./enterprise-registor.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 注册提示页面
    path: '/registorMessage',
    name: 'registor-message',
    component (resolve) {
      require(["./registorMessage.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 详情编辑
    path: '/registor',
    name: 'registor',
    component (resolve) {
      require(["./registor.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 详情编辑
    path: '/gameRegistor',
    name: 'game-registor',
    component (resolve) {
      require(["./game-registor.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 详情编辑
    path: '/timeoutPage',
    name: 'timeoutPage',
    component (resolve) {
      require(["./timeoutPage.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 详情编辑
    path: '/orderCreate',
    name: 'order-create',
    component (resolve) {
      require(["./orderCreate.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 地图搜索
    path: '/search-map',
    name: 'search-map',
    component (resolve) {
      require(["../../components/common/search-map.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 推广文章
    path: '/spreedArticle',
    name: 'spreedArticle',
    component (resolve) {
      require(["../../components/spreedArticle/main.vue"], resolve)
    },
    children: [
      {
        path: 'detail',
        name: 'article-detail',
        component: resolve => require(["../../components/spreedArticle/itemDetail.vue"], resolve),
        meta: {
          title: '营销精英'
        }
      },
      {
        path: 'comment',
        name: 'article-comment',
        component: resolve => require(["../../components/spreedArticle/itemComment.vue"], resolve),
        meta: {
          title: '营销精英'
        }
      }
    ]
  },
  // {
  //   // 产品分类
  //   path: '/productCenter',
  //   name: 'productCenter',
  //   component (resolve) {
  //     require(["../../components/productCenter/main.vue"], resolve)
  //   },
  //   children: [
  //     {
  //       path: 'productDetail',
  //       name: 'product-detail',
  //       component: resolve => require(["../../components/productCenter/articleDetail.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'productLog',
  //       name: 'product-log',
  //       component: resolve => require(["../../components/productCenter/articleLog.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'productComment',
  //       name: 'product-comment',
  //       component: resolve => require(["../../components/productCenter/itemComment.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'productSpec',
  //       name: 'product-spec',
  //       component: resolve => require(["../../components/productCenter/productSpec.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'productSenior',
  //       name: 'product-senior',
  //       component: resolve => require(["../../components/productCenter/productSenior.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     },
  //     {
  //       path: 'productimg',
  //       name: 'product-img',
  //       component: resolve => require(["../../components/productCenter/imgList.vue"], resolve),
  //       meta: {
  //         title:false
  //       }
  //     }
  //   ]
  // },
  // 预约详情
  {
    // 在线预约
    path: '/reserveOnline',
    name: 'reserveOnline',
    component (resolve) {
      require(["../../components/reserveOnline/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'reserve-detail',
        component: resolve => require(["../../components/reserveOnline/reserveDetail.vue"], resolve),
        meta: {
          title: '营销精英'
        }
      }
    ]
  },
  // 答题游戏
  {
    // 答题游戏
    path: '/questionGame',
    name: 'questionGame',
    component (resolve) {
      require(["../../components/questionGame/main.vue"], resolve)
    },
    children: [
      {
        path: '',
        name: 'game-start',
        component: resolve => require(["../../components/questionGame/gameStart.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gamePlay',
        name: 'game-play',
        component: resolve => require(["../../components/questionGame/gamePlay.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gameStop',
        name: 'game-stop',
        component: resolve => require(["../../components/questionGame/gameStop.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gamePk',
        name: 'game-pk',
        component: resolve => require(["../../components/questionGame/gamePk.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gameHelp',
        name: 'game-help',
        component: resolve => require(["../../components/questionGame/gameHelp.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gameShare',
        name: 'game-share',
        component: resolve => require(["../../components/questionGame/gameShare.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gameGift',
        name: 'game-gift',
        component: resolve => require(["../../components/questionGame/gameGift.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      },
      {
        path: 'gameHornor',
        name: 'game-hornor',
        component: resolve => require(["../../components/questionGame/gameHornor.vue"], resolve),
        meta: {
          title: '赢华为P20！'
        }
      }
    ]
  },
  {
    // 推广注册
    path: '/channelRegister',
    name: 'channelRegister',
    component (resolve) {
      require(["../../components/wxPromotion/editChannel.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  },
  {
    // 地推活动
    path: '/receiveGift',
    name: 'receiveGift',
    component (resolve) {
      require(["../../components/party/receiveGift.vue"], resolve)
    },
    meta: {
      title: '营销精英'
    }
  }
  // {
  //   // 地推活动
  //   path: '/groupDetail',
  //   name: 'groupDetail',
  //   component (resolve) {
  //     require(["../../components/group/groupDetail.vue"], resolve)
  //   },
  //   meta: {
  //     title: '营销精英'
  //   }
  // }
]

export default routers
