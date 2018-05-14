<template></template>
<script>
import tools from '../../utils/tools'

export default {
    data () {
        return {}
    },
    mounted () {
        var code = this.$route.query.code

        if (!code) {
            this.corpWechatRedirectUrl()
        } else {
            this.getCustom()
        }
    },
    methods: {
        corpWechatRedirectUrl () {
            var appid = this.$route.query.appid
            var redirectUri = window.encodeURIComponent(window.location.href)
            var pathStr = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +'&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=000#wechat_redirect'

            window.location.replace(pathStr)
        },
        getCustom () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                appId: this.$route.query.appid,
                pageCode: this.$route.query.gameCode,
                spreadOriginCode: this.$route.query.S,
                spreadOriginShareTo: this.$route.query.sShareTo,
                spreadChannelCode: this.$route.query.C,
                spreadChannelShareTo: this.$route.query.cShareTo,
                spreadParentType: this.$route.query.spreadType,
                spreadParentCode: this.$route.query.T,
                spreadParentShareTo: this.$route.query.tShareTo,
                code: this.$route.query.code,
                scope: 'snsapi_userinfo'
            }

            tools.request({
                method: 'post',
                interface: 'icbcCheckCustomer',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    window.sessionStorage.setItem('gameUser', JSON.stringify(res.result.result))
                    window.location.replace(this.$route.query.redirectUrl)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>