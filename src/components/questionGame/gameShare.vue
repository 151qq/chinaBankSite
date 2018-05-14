<template>
    <section class="gmBigBox gmShare">
        <section class="gmBodyArea">
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
                            共答了{{scoreData.sumSubjectNum}}道题<br>
                            获得{{scoreData.sumTotalValue}}积分
                        </div>
                    </div>

                    <div class="ewm-box">
                        <img :src="qRcode">
                        <img src="/static/images/figer-icon.png">
                        <span class="ewm-mess">长按二维码进入游戏</span>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            gateInfo: {},
            scoreData: {},
            qRcode: ''
        }
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameData: 'getGameData',
            gameTemplate: 'getGameTemplate',
            gateList: 'getGateList'
        })
    },
    mounted () {
        this.getQRcode()

        setTimeout(() => {
            this.getScores()
        }, 0)

        // 当前关卡
        for (var i = 0; i < this.gateList.length; i++) {
            if (this.$route.query.gameGateCode == this.gateList[i].gameGateCode) {
                this.gateInfo = this.gateList[i]
                break
            }
        }
    },
    methods: {
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