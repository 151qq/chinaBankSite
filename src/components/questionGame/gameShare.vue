<template>
    <section class="gmBigBox" :style="shareBgBox">
        <section class="gmBodyArea">
            <div class="share-box">
                <div class="share-title">
                    <img :src="gameData.eventPlanCover">
                </div>
                <div class="person-box">
                    <div class="attar-box">
                        <img class="bg-attar" src="/static/images/img-out.png">
                        <img :style="shareAttarStyle" class="attar" :src="gameUser.memberWechatImg">
                    </div>
                    <div class="person">
                        <div class="name-box">{{gameUser.memberWechatNickname}}</div>
                        <div class="game-name"
                            :style="shareNameBg"
                            v-if="gameStop.isPass == '1' || gameStop.isPass == '0'">
                            {{gameStop.isPass == '1' ? gateInfo.gatePassNickname : gateInfo.gateFailNickname}}
                        </div>
                        <div class="user-num">
                            <img src="../../assets/images/ranking-icon.png">
                            <div class="num-box">{{pointData.ranking}}名</div>
                            <div>/共{{pointData.totalranking}}名</div>
                        </div>
                    </div>
                </div>

                <div class="ewm-box">
                    <img :src="qRcode">
                    <span>长按二维码进入游戏</span>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import comment from './comment'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            commentList: [],
            gateInfo: {},
            gameData: {},
            gameStop: {},
            qRcode: ''
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
        this.getPointData()
        this.getGameData()
        this.getGameStop()
        this.getQRcode()

        // 当前关卡
        for (var i = 0; i < this.gateList.length; i++) {
            if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                this.gateInfo = this.gateList[i]
                break
            }
        }

        console.log(this.gameTemplate, 'template')
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
        getQRcode () {
            util.request({
                method: 'post',
                interface: 'generateQRcode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    sceneId: 'marketing_ad_type_3',
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
                    gameSessionCode: this.$route.query.gameSessionCode,
                    gameGateCode: this.$route.query.gameGateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameStop = res.result.result
                    this.getPointData()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
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
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="scss">
</style>