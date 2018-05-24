const platform = "/e2-site-api/";

export default{

    interfaces: {
        getServiceWechatUserInfo: platform + 'getServiceWechatUserInfo.json',
        getSignature: platform + 'getSignature.json',
        getCouponSignature: platform + 'getCouponSignature.json',
        saveMemberInfo: platform + 'member/saveMemberInfo.json',
        sentSms: platform + 'customer/sentSms.json',
        checkCustome: platform + 'customer/checkCustomer.json',

        saveEnterpriseUserInfo: platform + 'site/user/saveEnterpriseUserInfo.json',
        corpWechatRedirectUrl: platform + 'corpWechatRedirectUrl.json',
        getSiteWechatUserInfo: platform + 'getSiteWechatUserInfo.json',
        /**
        * 推荐文章 get
        * key 搜索时使用，返回搜索相关数据
        */
        html5PageGet: platform + 'html5PageGet.json',
        listPageArea: platform + 'listPageArea.json',

        getTemplates: platform + 'templateListPage.json',

        groupStores: platform + 'eventScenarioCouponStore/groupStores.json',

        commentList: platform + 'comment/commentList.json',
        publishComment: platform + 'comment/publishComment.json',
        replyComment: platform + 'comment/replyComment.json',
        deleteComment: platform + 'comment/deleteComment.json',
        countCommentGoodJob: platform + 'comment/countCommentGoodJob.json',
        countCommentBadJob: platform + 'comment/countCommentBadJob.json',

        getExtendPages: platform + 'htmlPageExtend/getExtendPages.json',

        eventInfoGet: platform + 'event/eventInfoGet.json',
        eventpagemapList: platform + 'eventpagemap/list.json',
        subjectAndOption: platform + 'subject/subjectAndOption.json',
        gameRecordCreate: platform + 'gamepkrecord/create.json',
        icbcCheckCustomer: platform + 'customer/icbcCheckCustomer.json',
        InsertGameSubjectRecord: platform + 'gameSubjectRecord/InsertGameSubjectRecord.json',
        passDetails: platform + 'gameSubjectRecord/passDetails.json',

        addPoint: platform + 'gameplay/addPoint.json',
        cheerDetail: platform + 'gameplayercheer/details.json',
        gameComments: platform + 'gameplayercheer/commentList.json',
        enterpriseDetails: platform + 'gamesubjecttemplate/enterpriseDetails.json',
        getGameInfoByCode: platform + 'game/getGameInfoByCode.json',
        getGameGateListByCode: platform + 'gamegate/getGameGateListByCode.json',

        personalPoints: platform + 'gameplayercheer/personalPoints.json',
        creatCheer: platform + 'gameplayercheer/create.json',
        cheerHelp: platform + 'gameplayercheer/cheer.json',
        gameCheat: platform + 'gameSubjectRecord/cheat.json',
        getGameSessionCode: platform + 'game/getGameSessionCode.json',
        generateQRcode: platform + 'generateQRcode.json',
        organizeOrderSave: platform + 'organizeOrderInfo/insertOrUpdate.json',
        gamelottery: platform + 'gamelottery/lottery.json',
        playerscore: platform + 'count/playerscore.json',
        playerPrize: platform + 'product/playerPrize.json',

        /**
        * 推广 get
        */
        getChannelInfo: platform + 'organizePromoterInfo/selectOrganizePromoterInfo.json',
        updateChannel: platform + 'organizePromoterInfo/manageOrganizePromoterInfo.json',

        /**
        * 预约 get
        */
        selectAll: platform + 'E2site/reserve/selectAll.json',
        confrimReserve: platform + 'E2site/reserve/confrimReserve.json',

        /**
        * 地推 get
        */
        getPartyCouponGroup: platform + 'E2site/partyInfo/getPartyCouponGroup.json',

        customerSpreadLog: platform + 'log/customerSpreadLog.json',
        customerGeneralLog: platform + 'log/customerGeneralLog.json',
        customerLog: platform + 'log/customerLog.json'
    }
}
