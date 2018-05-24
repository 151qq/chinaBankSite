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
                    <div class="user-num" v-if="!!scoreData.sumTotalValue && isLoad">
                        答对{{scoreData.passSubjectNum}}条题目<br>
                        共回答{{scoreData.sumSubjectNum}}条题目
                    </div>
                    <div class="user-num" v-if="!scoreData.sumTotalValue && isLoad">
                        我在玩答题冲大奖<br>
                        根本停不下来，你也来试试吧～
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
            scoreData: {},
            qRcode: ''
        }
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameData: 'getGameData',
            gameInfo: 'getGameInfo'
        })
    },
    mounted () {
        jsSdk.init(this.setShare)
        // this.getQRcode()
        this.getScores()
    },
    methods: {
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

            if (this.$route.query.playerCode == this.gameUser.customerCode) {
                this.$router.replace(pathData)
            }
        },
        setLog (data) {
            util.request({
                method: 'post',
                interface: 'customerGeneralLog',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    customerCode: this.gameUser.customerCode,
                    customerType: this.gameUser.customerType,
                    interactionType: data.interactionType,
                    interactionDesc: data.interactionDesc,
                    interactionPrimeObject: data.primeObject,
                    interactionSubObject: data.subObject,
                    interactionOtherObject: data.otherObject
                }
            }).then(res => {})
        },
        getScores () {
            util.request({
                method: 'get',
                interface: 'playerscore',
                data: {
                    playerCode: this.$route.query.playerCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.scoreData = res.result.result
                    this.isLoad = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getQRcode () {
            util.request({
                method: 'post',
                interface: 'generateQRcode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    sceneId: 'marketing_ad_type_4',
                    sceneStr: this.gameUser.customerCode,
                    appId: this.$route.query.appid
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.qRcode = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>