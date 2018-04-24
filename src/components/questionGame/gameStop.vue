<template>
    <section class="gmBigBox">
        <div class="person-message-box" :style="stopPersonBgStyle">
            <div class="person-box">
                <div class="attar-box">
                    <img :src="gameUser.memberWechatImg">
                </div>
                <div :style="personStyle">
                    {{gameUser.memberWechatNickname}}<br>
                    <!-- XXX大师<br> -->
                    第27名（120890）<br>
                </div>
            </div>
            <div :style="stopFontStyle">
                {{gameTemplate.stopSuccessText}}|{{gameTemplate.stopFailText}}
            </div>
        </div>

        <section class="gmBodyArea">
            <div class="money-box">
                您新增积分N分/<span>总积分{{}}</span>
                <p>分享战绩可以获得更多积分</p>
            </div>

            <a class="honor-box">
                <span class="money-num">¥ 20</span>
                <span class="btn-font">
                    <img src="../../assets/images/ticket-icon.png">
                    领取奖励
                </span>
            </a>
        </section>
        <section class="bottom-btn-box">
            <router-link :style="gmStopBtn"
                            :to="{
                                name: 'game-play',
                                query: {
                                    enterpriseCode: $route.query.enterpriseCode,
                                    eventCode: $route.query.eventCode,
                                    gameCode: $route.query.gameCode,
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
                {{gameTemplate.stopBtnOneFont}}
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
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            gameData: {}
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
            gameInfo: 'getGameInfo'
        })
    },
    mounted () {
        this.getGameData()
        this.getPointData()
    },
    methods: {
        getGameData () {
            util.request({
                method: 'post',
                interface: 'passDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    gameGateCode: this.$route.query.gameGateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameData = res.result.result
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
                    this.pointData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>
<style lang="scss">
</style>