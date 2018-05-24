<template>
    <section class="gmBigBox" :style="gmBgBox">
        <div class="ar-title" v-html="gameData.eventPlanTitle"></div>
        <div class="game-desc-box" v-if="gameData.eventPlanTitle">游戏说明</div>
        <section class="ar-text-body"
                :style="gmContent"
                v-html="gameData.eventPlanDesc">
        </section>
        <section class="start-btn-box" v-if="gameData.eventPlanTitle">
            <span :style="gmStartBtnTwo" @click="goToPlay">
                {{gameTemplate.startBtnTwoFont}}
            </span>

            <router-link class="nav-btn"
                            :style="gmStartBtnTwo"
                            :to="{
                                name: 'game-hornor',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    eventCode: $route.query.eventCode,
                                    gameCode: $route.query.gameCode,
                                    appid: $route.query.appid,
                                    S: $route.query.S,
                                    C: $route.query.C,
                                    spreadType: $route.query.spreadType,
                                    T: this.gameUser.t,
                                    sShareTo: $route.query.sShareTo,
                                    cShareTo: $route.query.cShareTo
                                }
                            }">
                我的奖品
            </router-link>
        </section>
        <div class="logo-box"></div>

        <section class="game-hornor-box" v-if="!isCanPlay">
            <div class="black-bg" @click.self="isCanPlay = true"></div>

            <div v-if="isScore" class="error-img">
                <img src="/static/images/no-score.png">
                <span>
                    亲，游戏币不足<br>
                    邀请好友获取游戏币吧
                </span>
            </div>

            <div v-if="!isScore" class="error-img">
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
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            gateInfo: {},
            pointData: {},
            listData: [],
            isCanPlay: true,
            isScore: true
        }
    },
    mixins: [templateMixin],
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameData: 'getGameData',
            gameTemplate: 'getGameTemplate',
            gateList: 'getGateList',
            gameInfo: 'getGameInfo'
        })
    },
    mounted () {
        jsSdk.init(this.setShare)
        this.getPointData()
        this.setStartLog()
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

                    // 当前关卡
                    if (this.pointData.playerCurrentGate) {
                        for (var i = 0; i < this.gateList.length; i++) {
                            if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                                this.gateInfo = this.gateList[i + 1]
                                break
                            }
                        }
                    } else {
                        this.gateInfo = this.gateList[0]
                    }
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
        setStartLog () {
            var logData = {
                interactionType: 'memberOpenGame',
                interactionDesc: '客户打开游戏',
                primeObject: this.$route.query.eventCode,
                subObject: this.$route.query.gameCode
            }
            this.setLog(logData)
        },
        goToPlay () {
            if (!this.gateInfo) {
                this.isScore = false
                this.isCanPlay = false
                return false
            }
            
            if (this.pointData.playerGamePoint < this.gateInfo.gateConsumePoint) {
                this.isScore = true
                this.isCanPlay = false

                return false
            }

            var pathData = {
                name: 'game-play',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    gameGateCode: this.gateInfo.gameGateCode,
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
        }
    }
}
</script>