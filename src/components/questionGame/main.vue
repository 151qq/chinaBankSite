<template>
    <section>
        <router-view v-if="isTemplate && isGate && isPoint"></router-view>
        <div v-if="isEnterprise" class="null-page">您不能参与游戏！</div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isTemplate: false,
            isGate: false,
            isPoint: false
        }
    },
    mounted () {
        util.getGameUser(() => {
            if (this.isEnterprise) {
                return false
            }

            this.getTemplate()
            this.getGates()
            this.getGameInfo()
            this.getPointData()

            jsSdk.init()
        })
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameInfo: 'getGameInfo'
        }),
        isEnterprise () {
            var types = ['enterprise_channel_open', 'enterprise_user_open']
            return this.gameUser.openType && types.indexOf(this.gameUser.openType) > -1
        }
    },
    methods: {
        ...mapActions([
            'setGateList',
            'setGameInfo',
            'setGameTemplate',
            'setPointData'
        ]),
        getPointData () {
            util.request({
                method: 'post',
                interface: 'personalPoints',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gamePlayerCode: this.gameUser.customerCode,
                    gameCode: this.$route.query.gameCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setPointData(res.result.result)
                    this.isPoint = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTemplate () {
            util.request({
                method: 'get',
                interface: 'enterpriseDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGameTemplate(res.result.result)
                    this.isTemplate = true

                    var queryData = {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        eventCode: this.$route.query.eventCode,
                        gameCode: this.$route.query.gameCode,
                        gameSessionCode: this.$route.query.gameSessionCode,
                        agentId: this.$route.query.agentId,
                        appid: this.$route.query.appid,
                        S: this.$route.query.S,
                        C: this.$route.query.C,
                        spreadType: this.$route.query.spreadType,
                        T: this.gameUser.T,
                        sShareTo: this.$route.query.sShareTo,
                        cShareTo: this.$route.query.cShareTo
                    }

                    var queryList = []
                    for (var k in queryData) {
                        queryList.push(k + '=' + queryData[k])
                    }

                    var location = window.location

                    var link = location.origin + '/questionGame/gameShare?' + queryList.join('&')
                    var title = '您的好友已上线！'
                    var desc = '答题答到嘴软，数钱数到手抽'

                    var _self = this

                    var shareData = {
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: _self.gameUser.memberWechatImg,
                        success (data) {
                            _self.$message({
                                message: '恭喜你，分享成功！',
                                type: 'success'
                            })
                            _self.addPoint()
                        },
                        cancel (data) {}
                    }

                    jsSdk.setShare(shareData, true)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getGates () {
            util.request({
                method: 'get',
                interface: 'getGameGateListByCode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGateList(res.result.result)
                    this.isGate = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getGameInfo () {
            util.request({
                method: 'get',
                interface: 'getGameInfoByCode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGameInfo(res.result.result[0])
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        addPoint () {
            util.request({
                method: 'get',
                interface: 'addPoint',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    gamePoint: this.gameInfo.gameSharePoint,
                    gameGateCode: this.$route.query.gameGateCode,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    playerType: '2',
                    pointChangeDesc: '分享增加积分'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getPointData
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>