<template>
    <section>
        <section class="check-gif-box" v-if="isAnimate">
            <img src="/static/images/check-git.gif">
            <span>结果计算中......</span>
        </section>
        
        <section class="gmStopBox">
                <div class="attar-box">
                    <img :src="gameUser.memberWechatImg">
                </div>
                <div class="name-box">{{gameUser.memberWechatNickname}}</div>
                <div class="mess-box" v-if="isLoad">
                    {{gameData.isPass == '1' ? '恭喜您 成功通关' : '很遗憾 通关失败'}}
                </div>
                <div class="result-box">
                    答对{{scoreData.passSubjectNum}}条题目<br>
                    共回答{{scoreData.sumSubjectNum}}条题目
                </div>

                <section class="stop-btn-box" v-if="isLoad">
                    <a class="play-btn" @click="goToPlay">
                        {{gameData.isPass == '1' ? gameTemplate.stopBtnOneFont : '再来一次'}}
                    </a>
                    <router-link class="share-btn"
                                    :to="{
                                        name: 'game-share',
                                        query: {
                                            enterpriseCode: $route.query.enterpriseCode,
                                            eventCode: $route.query.eventCode,
                                            gameCode: $route.query.gameCode,
                                            gameSessionCode: $route.query.gameSessionCode,
                                            gameGateCode: $route.query.gameGateCode,
                                            gameType: $route.query.gameType,
                                            agentId: $route.query.agentId,
                                            appid: $route.query.appid,
                                            playerCode: gameUser.customerCode,
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

        <section class="game-hornor-box" v-if="isGetHonor">
            <div class="black-bg"></div>

            <template v-if="!isClick && gateIndex !== ''">
                <img class="bg-img" @click="getRewardMess" src="/static/images/gate-door.png">

                <span class="btn-font-hornor" @click="getRewardMess">
                    点击<br>
                    抽奖
                </span>

                <span class="hornor-mess" @click="getRewardMess">
                    抽奖前请不要离开页面哟～
                </span>
            </template>

            <template v-if="isClick && gateIndex !== ''">
                <img class="bg-img" src="/static/images/gate-door.png">

                <span class="btn-font-load">
                    抽奖中<br>
                    ...
                </span>

                <span class="load-box">
                    为避免错失中奖机会<br>
                    请您不要关闭页面<br>
                    或退出程序～
                </span>
            </template>
        </section>

        <section class="game-hornor-box" v-if="isCanGet">
            <div class="black-bg" @click.self="isCanGet = false"></div>
            <img class="bg-img" src="/static/images/hornor-bg.png">

            <div v-if="isGift" class="bg-img" @click="gotoGift">
                <img :src="gameData.GameGateGift.productCover">
                <span>{{gameData.GameGateGift.productCname}}</span>
                <p>请3分钟内领奖，否则奖品作废</p>
            </div>

            <div v-if="isCoupon" class="content-box" @click="gotoCoupon">
                <img :src="gameData.GameGateRewardCoupon.couponCover">
                <span>{{gameData.GameGateRewardCoupon.couponTitle}}</span>
                <p>请3分钟内领奖，否则奖品作废</p>
            </div>
        </section>

        <section class="game-hornor-box" v-if="isNoHornor">
            <div class="black-bg" @click.self="isNoHornor = false"></div>
            <img class="bg-img" src="/static/images/hornor-bg1.png">

            <div v-if="awardStatus === '0'" class="bg-img">
                <img src="/static/images/no-score.png">
                <span class="scroe-box">
                    很遗憾您未中奖<br>
                    再接再厉
                </span>
            </div>

            <div v-if="awardStatus === '2'" class="bg-img">
                <img src="/static/images/no-score.png">
                <span class="has-get">
                    您已经参与过抽奖！
                </span>
            </div>
        </section>


        <section class="game-hornor-box" v-if="!isCanPlay">
            <div class="black-bg" @click.self="isCanPlay = true"></div>

            <div v-if="errorType == '1'" class="error-img">
                <img src="/static/images/no-score.png">
                <span>
                    亲，游戏币不足<br>
                    邀请好友获取游戏币吧
                </span>
            </div>

            <div v-if="errorType == '2'" class="error-img">
                <img src="/static/images/all-gate.png">
                <span class="all-gate">
                    Wow～你的智商已冲破天际<br>
                    只能邀请伙伴赢大奖了～
                </span>
            </div>
        </section>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isAnimate: true,
            isLoad: false,
            gameData: {},
            gateInfo: {},
            nextPlayGate: {},
            scoreData: {},
            isClick: false,
            awardStatus: '',
            isCanGet: false,
            isCanAward: false,
            isCanPlay: true,
            errorType: '',
            pointData: {},
            isGetHonor: false,
            gateIndex: '',
            isNoHornor: false
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate: util.formatDate
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            eventData: 'getGameData',
            gameTemplate: 'getGameTemplate',
            gateList: 'getGateList',
            gameInfo: 'getGameInfo'
        }),
        isPass () {
            var isPass = false
            if (this.gameData.isPass === '1' && this.gateInfo.gatePassAwardType === '2') {
                isPass = true
            }

            if (this.gameData.isPass === '0' && this.gateInfo.gateFailAwardType === '2') {
                isPass = true
            }

            return isPass
        },
        isCash () {
            var booleanStr = false
            if (this.gameData.isPass === '1' && this.gateInfo.gatePassIncentiveType === '0') {
                booleanStr = true
            }

            if (this.gameData.isPass === '0' && this.gateInfo.gateFailIncentiveType === '0') {
                booleanStr = true
            }

            return booleanStr
        },
        isCoupon () {
            var booleanStr = false
            if (this.gameData.isPass === '1' && this.gateInfo.gatePassIncentiveType === '1') {
                booleanStr = true
            }

            if (this.gameData.isPass === '0' && this.gateInfo.gateFailIncentiveType === '1') {
                booleanStr = true
            }

            return booleanStr
        },
        isGift () {
            var booleanStr = false
            if (this.gameData.isPass === '1' && this.gateInfo.gatePassIncentiveType === '2') {
                booleanStr = true
            }

            if (this.gameData.isPass === '0' && this.gateInfo.gateFailIncentiveType === '2') {
                booleanStr = true
            }

            return booleanStr
        },
        isNull () {
            var booleanStr = false
            if (this.gameData.isPass === '1' && this.gateInfo.gatePassIncentiveType === '3') {
                booleanStr = true
            }

            if (this.gameData.isPass === '0' && this.gateInfo.gateFailIncentiveType === '3') {
                booleanStr = true
            }

            return booleanStr
        }
    },
    mounted () {
        jsSdk.init(this.setShare)
        this.getScores()
        this.getGameStop()

        // 当前关卡
        for (var i = 0; i < this.gateList.length; i++) {
            if (this.$route.query.gameGateCode == this.gateList[i].gameGateCode) {
                this.gateInfo = this.gateList[i]
                this.gateIndex = i
                break
            }
        }

        setTimeout(() => {
            this.isAnimate = false

            if (this.gameData.isPass == '1') {
                this.isGetHonor = true
            }
        }, 3000)
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
            var title = this.eventData.eventPlanTitle.replace(/<.*?>/g, '')
            var desc = '我在冲关，你也来试试吧！回复“答题”赢大奖！'

            var _self = this

            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: _self.eventData.eventPlanCover,
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
                    this.pointData = res.result.result

                    setTimeout(()=>{
                        if (this.pointData.playerCurrentGate) {
                            for (var i = 0; i < this.gateList.length; i++) {
                                if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                                    this.nextPlayGate = this.gateList[i + 1]
                                    break
                                }
                            }
                        } else {
                            this.nextPlayGate = this.gateList[0]
                        }

                        if (!this.nextPlayGate) {
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
                    }, 0)
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
                    pointChangeDesc: 'memberGetPointForSharingGame'
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getPointData()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToPlay () {
            if (!this.nextPlayGate) {
                this.errorType = '2'
                this.isCanPlay = false
                return false
            }

            if (this.pointData.playerGamePoint < this.nextPlayGate.gateConsumePoint) {
                this.errorType = '1'
                this.isCanPlay = false
                return false
            }

            var pathData = {
                name: 'game-play',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    gameGateCode: this.nextPlayGate.gameGateCode,
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

            this.$router.push(pathData)
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
        getGameStop () {
            util.request({
                method: 'post',
                interface: 'passDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    customerType: this.gameUser.customerType,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    gameGateCode: this.$route.query.gameGateCode,
                    gameSubjectCode: window.sessionStorage.getItem('gateQuestions')
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameData = res.result.result
                    this.isLoad = true
                    this.getPointData()

                    if (this.gameData.isPass == '1') {
                        if (!this.isAnimate) {
                            this.isGetHonor = true
                        }

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
        },
        getRewardMess () {
            this.isClick = true

            setTimeout(() => {
                if (this.isClick) {
                    this.isGetHonor = false
                    this.awardStatus = '0'
                    this.isNoHornor = true
                    this.isClick = false
                }
            }, 20000)

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                interactionPrimeObject: this.$route.query.eventCode,
                interactionSubObject: this.$route.query.gameCode,
                customerCode: this.gameUser.customerCode,
                customerType: this.gameUser.customerType,
                gameSessionCode: this.$route.query.gameSessionCode,
                interactionOtherObject: this.$route.query.gameGateCode
            }

            if (this.gameData.isPass == '1') {
                formData.interactionType = 'memberDrawLotteryForPass'
                formData.interactionDesc = '游戏闯关成功摇奖'
            } else {
                formData.interactionType = 'memberDrawLotteryForFail'
                formData.interactionDesc = '游戏闯关失败摇奖'
            }

            util.request({
                method: 'post',
                interface: 'gamelottery',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    if (this.isClick) {
                        this.isGetHonor = false
                        this.isClick = false
                        this.awardStatus = res.result.result
                        if (res.result.result === '1') {
                            this.isCanGet = true
                        }
                        if (res.result.result === '0' || res.result.result === '2') {
                            this.isNoHornor = true
                        }
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoCoupon () {
            if (this.gameUser.customerType === '1') {
                this.getCoupon()
            } else {
                util.getUser(() => {
                    this.getCoupon()
                }, 'snsapi_userinfo')
            }
        },
        gotoGift () {
            var location = window.location
            var nextPage = location.origin + '/orderCreate' + location.search

            window.sessionStorage.setItem('giftCodes', this.gameData.GameGateGift.productCode)

            if (this.gameUser.customerType === '1') {
                this.$router.push(util.formDataUrl(nextPage))
            } else {
                util.getUser(() => {
                    this.$router.push(util.formDataUrl(nextPage))
                }, 'snsapi_userinfo', window.encodeURIComponent(nextPage))
            }
        },
        getCoupon () {
            var timestamp = String(Math.floor(new Date().getTime() / 1000))
            var cardId = this.gameData.GameGateRewardCoupon.couponWechatId

            util.request({
                method: 'post',
                interface: 'getCouponSignature',
                data: {
                    appId: this.$route.query.appid,
                    timestamp: timestamp,
                    cardId: cardId
                }
            }).then(res => {
                if (res.result.success == '1') {
                    var cardExt = {
                        timestamp: timestamp,
                        signature: res.result.result
                    }

                    window.wx.addCard({
                        cardList: [{
                            cardId: cardId,
                            cardExt: JSON.stringify(cardExt)
                        }],
                        success: function (res) {
                            console.log(res)
                        }
                    })
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>