<template>
    <section class="gmBigBox">
        <div class="person-message-box" :style="helpPersonBgStyle">
            <div class="user-info-box">
                <div class="attar-box">
                    <img :src="gameUser.memberWechatImg">
                </div>
                <div class="user-content">
                    <span class="user-name">{{gameUser.memberWechatNickname}}</span>
                    <span class="user-text">总积分：{{pointData.playerGamePoint}}</span>
                </div>
                <div class="user-info">
                    <img src="../../assets/images/ranking-icon.png">
                    <div class="user-num">{{pointData.ranking}}名</div>
                    <div>/共{{pointData.totalranking}}名</div>
                </div>
            </div>
            <!-- <div class="user-data-box">
                90%
            </div> -->
        </div>

        <section class="gmBodyArea">
            <div class="comment-game-box">
            <comment :comment-url="'look-submit'" :comment-list="commentList"></comment>
        </div>
        </section>
        <section class="bottom-btn-box" v-if="cheerData.gamePlayerCode != gameUser.customerCode">
            <span :style="gmHelpBtn" @click="goToHelp">{{gameTemplate.helpBtnFont}}</span>
        </section>

        <section class="bottom-btn-box" v-if="cheerData.gamePlayerCode == gameUser.customerCode">
            <span :style="gmHelpBtn" @click="goHelp">发起助威</span>
        </section>

        <input-submit :show-data="showData"
                        @hasSubmit="submitCheer"
                        :comment-floor="commentList.length"></input-submit>

        <help-submit :show-data="showDataHelp"
                    :comment-floor="commentList.length"
                    :point-data="pointData"
                    @hasSubmit="getComments"></help-submit>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import comment from './comment'
import inputSubmit from './inputSubmit'
import helpSubmit from './helpSubmit'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            commentList: [],
            pointData: {},
            cheerData: {},
            showData: {
                show: false
            },
            showDataHelp: {
                show: false
            },
            playTimer: null
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
        this.getPointData()
        this.getComments()
        this.getCheer()

        // 答题时间进行时
        var questionData = sessionStorage.getItem('questionData')
        if (questionData && JSON.parse(questionData).questions) {
            var data = JSON.parse(questionData)
            this.questionList = data.questions
            this.questionLength = data.length
            this.nowQuestionIndex = data.index
            this.playTimer = data.defaultGateTime

            this.playTime = data.defaultGateTime
            this.playTimer = setInterval(() => {
          
                if (!this.playTime) {
                    sessionStorage.setItem('questionData', JSON.stringify({
                        questions: data.questions,
                        index: data.index,
                        defaultGateTime: this.playTime,
                        defaultAnwserTime: data.defaultAnwserTime
                    }))

                    clearInterval(this.playTimer)
                    this.playTimer = null
                    return
                }
                
                this.playTime--
            }, 1000)
        }
    },
    methods: {
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
        getCheer () {
            util.request({
                method: 'get',
                interface: 'cheerDetail',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    playerCheerCode: this.$route.query.playerCheerCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.cheerData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getComments () {
            util.request({
                method: 'get',
                interface: 'gameComments',
                data: {
                    pageCode: this.$route.query.gameSessionCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.commentList = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        submitCheer () {
            this.showData.show = false
            this.getComments()
        },
        setCheer () {
            this.showDataHelp.show = false
            this.getComments()
            this.getPointData()
        },
        goToHelp () {
            this.showDataHelp.show = true
        },
        goHelp () {
            this.showData.show = true
        }
    },
    components: {
        comment,
        inputSubmit,
        helpSubmit
    }
}
</script>
<style lang="scss">
</style>