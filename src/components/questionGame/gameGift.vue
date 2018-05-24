<template>
    <section class="gmShare">
        <div class="share-box">
            <div class="share-title">
                <img :src="gameData.eventPlanCover">
            </div>
            <div class="person-box">
                <div class="attar-box">
                    <img class="bg-attar" src="/static/images/attar-out.png">
                    <img class="attar" :src="scoreData.customerWechatImg">
                </div>
                <div class="person">
                    <div class="name-box">{{scoreData.customerWechatNickname}}</div>
                    <div class="user-num">
                        恭喜您获奖<br>
                        我们将在5工作日内安排发货
                    </div>
                </div>

                <div class="ewm-box">
                    <img class="ewm-icon" src="/static/images/ewm-icon.jpg">
                    <img src="/static/images/figer-icon.png">
                    <div class="ewm-mess">
                        长按二维码关注，回复“答题”参与游戏
                    </div>
                    <div class="ewm-mess">
                        点击右上角<span>···</span>邀请好友一起玩
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isLoad: false,
            gameData: {},
            scoreData: {},
            gameInfo: {},
            qRcode: ''
        }
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser'
        })
    },
    mounted () {
        jsSdk.init(this.setShare)
        this.getGameData()
        this.getScores()
        this.getGameInfo()
    },
    methods: {
        getGameData () {
            util.request({
                method: 'get',
                interface: 'eventInfoGet',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameData = res.result.result
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
                    this.gameInfo = res.result.result[0]
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        setShare () {
            var queryData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                gameCode: this.$route.query.gameCode,
                gameSessionCode: this.$route.query.gameSessionCode,
                appid: this.$route.query.appid,
                S: this.$route.query.S,
                C: this.$route.query.C,
                spreadType: this.$route.query.spreadType,
                T: this.gameUser.t,
                sShareTo: this.$route.query.sShareTo,
                cShareTo: this.$route.query.cShareTo
            }

            var queryList = []
            for (var k in queryData) {
                queryList.push(k + '=' + queryData[k])
            }

            var location = window.location

            var link = location.origin + '/questionGame/gameShare?' + queryList.join('&') + '&playerCode=' + this.gameUser.customerCode
            var title = this.gameData.eventPlanTitle.replace(/<.*?>/g, '')
            var desc = '我在冲关，你也来试试吧！回复“答题”赢大奖！'

            var _self = this

            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: _self.gameData.eventPlanCover,
                success (data) {
                    _self.$message({
                        message: '恭喜你，邀请好友成功！',
                        type: 'success'
                    })
                    _self.addPoint()
                },
                cancel (data) {}
            }

            jsSdk.setShare(shareData, true)
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
                    pointChangeDesc: 'memberGetPointForSharingGame'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.goToPlay()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToPlay () {
            var pathData = {
                name: 'game-start',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    appid: this.$route.query.appid,
                    S: this.$route.query.S,
                    sShareTo: this.$route.query.sShareTo,
                    C: this.$route.query.C,
                    cShareTo: this.$route.query.cShareTo,
                    T: this.$route.query.T,
                    tShareTo: this.$route.query.tShareTo,
                    spreadType: this.$route.query.spreadType
                }
            }

            this.$router.replace(pathData)
        },
        getScores () {
            util.request({
                method: 'get',
                interface: 'playerscore',
                data: {
                    playerCode: this.gameUser.customerCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.scoreData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>