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
        </section>
        <div class="logo-box"></div>

        <section class="game-hornor-box" v-if="!isCanPlay">
            <div class="black-bg" @click.self="isCanPlay = true"></div>
            <img class="bg-img" src="/static/images/hornor-bg1.png">

            <div v-if="isScore" class="bg-img">
                <img src="/static/images/no-score.png">
                <span class="scroe-box">
                    积分不足<br>
                    请分享增加积分
                </span>
            </div>

            <div v-if="!isScore" class="bg-img">
                <img src="/static/images/no-score.png">
                <span class="scroe-box">
                    很遗憾<br>
                    您已通关
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
            gameInfo: 'getGameInfo',
            pointData: 'getPointData'
        })
    },
    mounted () {
        var logData = {
            interactionType: 'memberOpenGame',
            interactionDesc: '客户打开游戏',
            primeObject: this.$route.query.eventCode,
            subObject: this.$route.query.gameCode
        }
        this.setLog(logData)

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
        goToPk () {
            var pathData = {
                name: 'game-play',
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    agentId: this.$route.query.agentId,
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
        // goCheer () {
        //     if (!this.gateInfo) {
        //         this.$message({
        //             type: 'warning',
        //             message: '恭喜您，已通关！'
        //         })
        //     }

        //     var formData = {
        //         enterpriseCode: this.$route.query.enterpriseCode,
        //         eventCode: this.$route.query.eventCode,
        //         gameCode: this.$route.query.gameCode,
        //         gamePlayerCode: this.gameUser.customerCode,
        //         gamePlayerType: '2',
        //         gameGateCode: this.gateInfo.gameGateCode,
        //         subjectCode: this.nowQuestion.Subject.subjectCode,
        //         customerInteractionLog: {
        //             enterpriseCode: this.$route.query.enterpriseCode,
        //             customerCode: this.gameUser.customerCode,
        //             customerType: this.gameUser.customerType,
        //             interactionType: 'memberTalkInGame',
        //             interactionDesc: '客户发起助威',
        //             interactionPrimeObject: this.$route.query.gameCode,
        //             interactionSubObject: this.gateInfo.gameGateCode
        //         }
        //     }

        //     util.request({
        //         method: 'post',
        //         interface: 'creatCheer',
        //         data: formData
        //     }).then(res => {
        //         if (res.result.success == '1') {
        //             var pathData = {
        //                 name: 'game-help',
        //                 query: {
        //                     enterpriseCode: this.$route.query.enterpriseCode,
        //                     eventCode: this.$route.query.eventCode,
        //                     gameCode: this.$route.query.gameCode,
        //                     gameGateCode: this.gateInfo.gameGateCode,
        //                     gameSessionCode: this.$route.query.gameSessionCode,
        //                     playerCheerCode: res.result.result,
        //                     agentId: this.$route.query.agentId,
        //                     appid: this.$route.query.appid,
        //                     S: this.$route.query.S,
        //                     sShareTo: this.$route.query.sShareTo,
        //                     C: this.$route.query.C,
        //                     cShareTo: this.$route.query.cShareTo,
        //                     T: this.$route.query.T,
        //                     tShareTo: this.$route.query.tShareTo,
        //                     spreadType: this.$route.query.spreadType
        //                 }
        //             }

        //             this.$router.push(pathData)
        //         } else {
        //             this.$message.error(res.result.message)
        //         }
        //     })
        // }
    }
}
</script>