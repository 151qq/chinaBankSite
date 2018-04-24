<template>
    <section class="gmBigBox" :style="gmBgBox">
        <div class="ar-title" :style="gmTitle">
            {{gameData.eventPlanTitle}}
        </div>
        <div class="game-desc-box">游戏说明</div>
        <section class="ar-text-body" :style="gmContent">
            {{gameData.eventPlanDesc}}
        </section>
        <section class="start-btn-box">
            <span :style="gmStartBtnOne" @click="goToPk">
                {{gameTemplate.startBtnOneFont}}
            </span>
            <span :style="gmStartBtnTwo" @click="goToPlay">
                {{gameTemplate.startBtnTwoFont}}
            </span>
        </section>
        <div class="logo-box"></div>
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
            gameData: {
                eventPlanTitle: '',
                eventPlanDesc: ''
            },
            pointData: {}
        }
    },
    mixins: [templateMixin],
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

        var logData = {
            interactionType: 'memberOpenGame',
            interactionDesc: '客户打开游戏',
            primeObject: this.$route.query.gameCode
        }
        this.setLog(logData)
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
        goToPk () {
            util.request({
                method: 'get',
                interface: 'getGameSessionCode',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    var pathData = {
                        name: 'game-play',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            eventCode: this.$route.query.eventCode,
                            gameCode: this.$route.query.gameCode,
                            agentId: this.$route.query.agentId,
                            gameSessionCode: res.result.result,
                            appid: this.$route.query.appid,
                            S: this.$route.query.S,
                            sShareTo: this.$route.query.sShareTo,
                            C: this.$route.query.C,
                            cShareTo: this.$route.query.cShareTo,
                            T: this.$route.query.T,
                            tShareTo: this.$route.query.tShareTo,
                            spreadType: this.$route.query.spreadType,
                            gameType: 'pk'
                        }
                    }

                    this.$router.push(pathData)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToPlay () {
            var index = 0
            if (this.pointData.playerCurrentGate) {
                for (var i = 0; i < this.gateList.length; i++) {
                    if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                        index = i
                        break
                    }
                }
            }

            if (this.pointData < this.gateList[index].gateConsumePoint) {
                this.$message({
                    type: 'warning',
                    message: '您的积分不足，请补充！'
                })

                return false
            }

            util.request({
                method: 'get',
                interface: 'getGameSessionCode',
                data: {}
            }).then(res => {
                if (res.result.success == '1') {
                    var pathData = {
                        name: 'game-play',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            eventCode: this.$route.query.eventCode,
                            gameCode: this.$route.query.gameCode,
                            agentId: this.$route.query.agentId,
                            gameSessionCode: res.result.result,
                            appid: this.$route.query.appid,
                            S: this.$route.query.S,
                            sShareTo: this.$route.query.sShareTo,
                            C: this.$route.query.C,
                            cShareTo: this.$route.query.cShareTo,
                            T: this.$route.query.T,
                            tShareTo: this.$route.query.tShareTo,
                            spreadType: this.$route.query.spreadType,
                            gameType: 'happy'
                        }
                    }

                    this.$router.push(pathData)
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