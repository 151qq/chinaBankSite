<template>
    <section class="gmBigBox">
            <div class="person-message-box" :style="stopPersonBgStyle">
                <div class="person-box">
                    <div class="attar-box">
                        <img :src="gameUser.memberWechatImg">
                    </div>
                    <div :style="personStyle">
                        {{gameUser.memberWechatNickname}}<br>
                        {{gameData.isPass == '1' ? gateInfo.gatePassNickname : gateInfo.gateFailNickname}}<br>
                        第{{pointData.ranking}}名（{{pointData.totalranking}}）<br>
                    </div>
                </div>
                <div :style="stopFontStyle">
                    {{gameData.isPass == '1' ? gameTemplate.stopSuccessText : gameTemplate.stopFailText}}
                </div>
            </div>

            <section class="gmBodyArea">
                <div class="money-box">
                    您新增积分{{gameData.RewardPoint ? gameData.RewardPoint : 0}}分/<span>总积分{{pointData.playerGamePoint}}</span>
                    <p>分享战绩可以获得更多积分</p>
                </div>

                <a class="honor-box" v-if="gameData.GameGateRewardCash != ''">
                    <span class="money-num">¥ {{gameData.GameGateRewardCash}}</span>
                    <span class="btn-font">
                        <img src="../../assets/images/ticket-icon.png">
                        领取奖励
                    </span>
                </a>

                <a class="honor-box"
                    @click="gotoCoupon"
                    v-if="gameData.GameGateRewardCoupon && gameData.GameGateRewardCoupon.couponCode">
                    <span class="money-num">券</span>
                    <span class="btn-font">
                        <img src="../../assets/images/ticket-icon.png">
                        领取奖励
                    </span>
                </a>
            </section>
            <section class="bottom-btn-box" v-if="isLoad">
                <router-link :style="gmStopBtn"
                                v-if="gateList[gateList.length - 1].gameGateCode != pointData.playerCurrentGate"
                                :to="{
                                    name: 'game-play',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        eventCode: $route.query.eventCode,
                                        gameCode: $route.query.gameCode,
                                        agentId: $route.query.agentId,
                                        appid: $route.query.appid,
                                        S: $route.query.S,
                                        sShareTo: $route.query.sShareTo,
                                        C: $route.query.C,
                                        cShareTo: $route.query.cShareTo,
                                        T: $route.query.T,
                                        tShareTo: $route.query.tShareTo,
                                        spreadType: $route.query.spreadType
                                    }
                                }">
                    {{gameData.isPass == '1' ? gameTemplate.stopBtnOneFont : '再来一次'}}
                </router-link>
                <router-link :style="gmStopBtn"
                                :to="{
                                    name: 'game-share',
                                    query: {
                                        enterpriseCode: $route.query.enterpriseCode,
                                        eventCode: $route.query.eventCode,
                                        gameCode: $route.query.gameCode,
                                        gameSessionCode: $route.query.gameSessionCode,
                                        gameType: $route.query.gameType,
                                        agentId: $route.query.agentId,
                                        appid: $route.query.appid,
                                        S: $route.query.S,
                                        sShareTo: $route.query.sShareTo,
                                        C: $route.query.C,
                                        cShareTo: $route.query.cShareTo,
                                        T: $route.query.T,
                                        tShareTo: $route.query.tShareTo,
                                        spreadType: $route.query.spreadType
                                    }
                                }">
                    {{gameTemplate.stopBtnTwoFont}}
                </router-link>
            </section>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isLoad: false,
            gameData: {},
            gateInfo: {}
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate: util.formatDate
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameTemplate: 'getGameTemplate',
            gateList: 'getGateList',
            gameInfo: 'getGameInfo',
            pointData: 'getPointData'
        })
    },
    mounted () {
        this.getGameData()

        // 当前关卡
        for (var i = 0; i < this.gateList.length; i++) {
            if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                this.gateInfo = this.gateList[i]
                break
            }
        }
    },
    methods: {
        ...mapActions([
            'setPointData'
        ]),
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
        getGameData () {
            util.request({
                method: 'post',
                interface: 'passDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    gameGateCode: this.$route.query.gameGateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameData = res.result.result
                    this.isLoad = true
                    this.getPointData()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
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

                    if (this.gateList[this.gateList.length - 1].gameGateCode == this.pointData.playerCurrentGate) {
                        // 全部通关
                        var logData = {
                            interactionType: 'memberWinGame',
                            interactionDesc: '客户成功通过游戏所有关卡',
                            primeObject: this.$route.query.eventCode,
                            subObject: this.$route.query.gameCode,
                            otherObject: this.$route.query.gameGateCode
                        }
                        this.setLog(logData)
                        return false
                    }

                    if (this.gameData.isPass == '1') {
                        // 通过一关
                        var logData = {
                            interactionType: 'memberPassGameGate',
                            interactionDesc: '客户成功通过游戏一关',
                            primeObject: this.$route.query.eventCode,
                            subObject: this.$route.query.gameCode,
                            otherObject: this.$route.query.gameGateCode
                        }
                        this.setLog(logData)
                        return false
                    }

                    if (this.gameData.isPass == '0') {
                        // 没通过
                        var logData = {
                            interactionType: 'memberFailPassGameGate',
                            interactionDesc: '客户没有通过游戏关卡',
                            primeObject: this.$route.query.eventCode,
                            subObject: this.$route.query.gameCode,
                            otherObject: this.$route.query.gameGateCode
                        }
                        this.setLog(logData)
                        return false
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoCoupon () {
            if (this.gameUser.customerType == '1') {
                this.getCoupon()
            } else {
                util.getUser(() => {
                    this.getCoupon()
                }, 'snsapi_userinfo')
            }
        },
        getCoupon () {
            window.wx.addCard({
                cardList: [{
                    cardId: this.gameData.GameGateRewardCoupon.couponWechatId,
                    cardExt: this.gameData.GameGateRewardCoupon.couponDescription
                }],
                success: function (res) {
                    console.log(res)
                }
            })
        }
    }
}
</script>
<style lang="scss">
</style>