<template>
    <section>
        <router-view v-if="isTemplate && isGate"></router-view>
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
            isGate: false
        }
    },
    mounted () {
        util.getGameUser(() => {
            if (this.isEnterprise) {
                return false
            }

            // 判断用户类型todo
            this.getTemplate()
            this.getGates()
            this.getGameInfo()

            jsSdk.init()
        })
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser'
        }),
        isEnterprise () {
            var types = ['enterprise_channel_open', 'enterprise_user_open']
            // return types.indexOf(this.gameuser.openType) > -1
            return false
        }
    },
    methods: {
        ...mapActions([
            'setGateList',
            'setGameInfo',
            'setGameTemplate'
        ]),
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

                    if (this.$route.name == 'game-help') {
                       link = location.origin + '/questionGame/gameHelp?' + queryList.join('&')
                    }

                    var _self = this

                    var shareData = {
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: this.gameUser.memberWechatImg,
                        success (data) {
                            this.$message({
                                message: '恭喜你，分享成功！',
                                type: 'success'
                            })
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
        }
    }
}
</script>