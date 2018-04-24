<template>
    <section class="gmBigBox">
        <section class="game-big-body" :style="gmBgBox">
            <div class="clock-box"
                    v-if="isAnwserTimer">
                    {{anwserTime | formatDate}}
            </div>
            <div class="clock-box"
                    v-else="isGateTimer || !isAnwserTimer">
                    {{gateTime | formatDate}}
            </div>
            <section class="gmBodyArea gmPlay">
                <div class="question-box"
                    v-if="nowQuestion.Subject">
                    <div class="question-title"
                        :style="questionTitle">
                        {{nowQuestion.Subject.subjectContent}}
                    </div>
                    <div v-if="nowQuestion.Subject.attachment.length"
                        class="question-imgs-box"
                        :style="questionImg">

                        <img :style="questionImgStyle"
                            v-for="(img, index) in nowQuestion.Subject.attachment"
                            :src="img.attachmentSourceCode">
                    </div>
                    <div class="no-margin"
                        v-if="nowQuestion.Subject.articleList">
                        <router-link class="weui-media-box weui-media-box_appmsg"
                                    :style="questionAttachmentStyle"
                                    v-for="(item, index) in nowQuestion.Subject.articleList"
                                    :to="{
                                            name: 'article-detail',
                                            query: {
                                                enterpriseCode: $route.query.enterpriseCode,
                                                agentId: $route.query.agentId,
                                                pageCode: item.pageCode,
                                                templateCode: item.templateCode,
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
                            <div class="weui-media-box__hd">
                                <img class="weui-media-box__thumb" :src="item.pageCover">
                            </div>
                            <div class="weui-media-box__bd">
                                <h4 class="weui-media-box__title"
                                    :style="attachmentFontStyle">
                                    {{item.pageTitle}}
                                </h4>
                            </div>
                        </router-link>
                    </div>
                </div>
                <section class="anwser-big-box">
                    <div class="anwser-box"
                        :class="anwser.optionCssType == '2' ? 'anwser-box-half' : ''"
                        :style="anwserStyle"
                        v-for="(anwser, index) in nowQuestion.Option">

                        <div class="select-box"
                                :style="selectBtnLineHeight">
                            <template v-if="anwser.subjectChooseType == '1'">
                                <img v-if="correctAnwser.indexOf(anwser.subjectCode) > -1"
                                    src="../../assets/images/game-radio-now.png">
                                <img v-else src="../../assets/images/game-radio-icon.png">
                            </template>

                            <template v-if="anwser.subjectChooseType == '0'">
                                <img v-if="correctAnwser.indexOf(anwser.subjectCode) > -1"
                                    src="../../assets/images/game-check-now.png">
                                <img v-else src="../../assets/images/game-check-icon.png">
                            </template>
                        </div>
                        
                        <section v-if="anwser.optionCssType != '2'">
                            <div class="question-title"
                                @click="setAnwser(anwser)"
                                :style="anwserTitle">
                                {{anwser.subjectContent}}
                            </div>
                            <div class="question-imgs-box"
                                    @click="setAnwser(anwser)"
                                    v-if="anwser.attachment.length"
                                    :style="questionImg">
                                <img :style="questionImgStyle"
                                        v-for="(img, index) in anwser.attachment"
                                        :src="img.attachmentSourceCode">
                            </div>
                            <div class="no-margin"
                                v-if="anwser.articleList">
                                <router-link class="weui-media-box weui-media-box_appmsg"
                                            :style="questionAttachmentStyle"
                                            v-for="(item, index) in anwser.articleList"
                                            :to="{
                                                    name: 'article-detail',
                                                    query: {
                                                        enterpriseCode: $route.query.enterpriseCode,
                                                        pageCode: item.pageCode,
                                                        templateCode: item.templateCode,
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
                                    <div class="weui-media-box__hd">
                                        <img class="weui-media-box__thumb" :src="item.pageCover">
                                    </div>
                                    <div class="weui-media-box__bd">
                                        <h4 class="weui-media-box__title"
                                            :style="attachmentFontStyle">
                                            {{item.pageTitle}}
                                        </h4>
                                    </div>
                                </router-link>
                            </div>
                        </section>

                        <section class="anwser-option-box"
                                @click="setAnwser(anwser)"
                                v-else>
                            <div class="title-bg"></div>
                            <div class="question-title">
                                {{anwser.subjectContent}}
                            </div>
                            <img class="img-anwser" :src="anwser.attachment[0].attachmentSourceCode">
                        </section>
                    </div>
                </section>
            </section>
        </section>
        <section class="play-btn-box">
            
            <template v-if="$route.query.gameType == 'happy' && this.gateInfo.gateCheatNumber > this.pointData.currentCheatNumber && this.gateInfo.cheatConsumePoint < this.pointData.playerGamePoint">
                <div class="play-btn" @click="goCheat">
                    <img src="../../assets/images/cheat-icon.png">
                    {{gameTemplate.playBtnOneFont}}
                </div>
                <span>|</span>
            </template>
            <div class="play-btn" @click="goCheer">
                <img src="../../assets/images/cheer-icon.png">
                {{gameTemplate.playBtnTwoFont}}
            </div>
            <span>|</span>
            <div class="play-btn" @click="setAnwserRecord">
                <img src="../../assets/images/next-icon.png">
                {{gameTemplate.playBtnThreeFont}}
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
            pointData: {
                playerCode: '',
                playerCurrentGate: '',
                playerGamePoint: '',
                currentCheatNumber: ''
            },
            gateInfo: {},
            questionList:  [],
            isGateTimer: true,
            defaultGateTime: '',
            gateTime: 60,
            gateTimer: null,
            isAnwserTimer: false,
            delayTime: 3000,
            delayTimer: null,
            defaultAnwserTime: 15,
            anwserTimer: null,
            anwserTime: 15,
            nowGateIndex: 0,
            questionLength: 0,
            nowQuestionIndex: 0,
            nowQuestion: {},
            correctAnwser: []
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate (value) {
            var sec = value % 60
            var min = Math.floor(value / 60)
            min = min < 10 ? '0' + min : min
            sec = sec < 10 ? '0' + sec : sec

            return min + ' : ' + sec
        }
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
        // 获取题目列表
        var questionData = sessionStorage.getItem('questionData')
        if (questionData && JSON.parse(questionData).questions) {
            var data = JSON.parse(questionData)
            this.questionList = data.questions
            this.questionLength = data.questions.length
            this.nowQuestionIndex = data.index
            this.defaultGateTime = data.defaultGateTime

            this.setQuestion()
        } else {
            this.getQuestions()
        }

        this.getPointData()

        var logData = {
            interactionType: 'memberPlayGame',
            interactionDesc: '客户玩游戏',
            primeObject: this.$route.query.gameCode,
            subObject: this.gateInfo.gameGateCode,
            otherObject: this.$route.query.gameSessionCode
        }
        this.setLog(logData)
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

                    // 设置当前关卡的序号
                    if (this.$route.query.gameType == 'happy') {
                        if (this.pointData.playerCurrentGate) {
                            // 上一次玩到的关卡
                            for (var i = 0; i < this.gateList.length; i++) {
                                if (this.pointData.playerCurrentGate == this.gateList[i].gameGateCode) {
                                    this.nowGateIndex = i + 1
                                    break
                                }
                            }
                        } else {
                            // 第一次玩
                            this.nowGateIndex = 0
                        }

                        this.gateInfo = this.gateList[this.nowGateIndex]

                        if (!this.defaultGateTime) {
                            this.defaultGateTime = this.gateInfo.gateTimeLimit
                        }
                    } else if (this.$route.query.gameType == 'pk') {
                        this.gateTime = this.gameInfo.gamePkTime
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getQuestions () {
            util.request({
                method: 'post',
                interface: 'subjectAndOption',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    gameGateCode: this.gateInfo.gameGateCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.questionList = res.result.result
                    this.questionLength = res.result.result.length

                    // 设置题目
                    this.setQuestion()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        setQuestion () {
            if (this.nowQuestionIndex >= this.questionLength) {
                var pathName = 'game-stop'
                if (this.$route.query.gameType == 'pk') {
                    pathName = 'game-pk'
                }

                var pathData = {
                    name: pathName,
                    query: {
                        enterpriseCode: this.$route.query.enterpriseCode,
                        eventCode: this.$route.query.eventCode,
                        gameCode: this.$route.query.gameCode,
                        gameSessionCode: this.$route.query.gameSessionCode,
                        gameGateCode: this.gateInfo.gameGateCode,
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

                // 挑战参数
                if (this.$route.query.gameType == 'pk' && this.$route.query.pkPlay == '1') {
                    pathData.query.pkPlay = '1'
                }

                this.$router.replace(pathData)
            } else {
                this.nowQuestion = this.questionList[this.nowQuestionIndex]

                // 通关时间倒计时
                // if (!this.gateTimer && this.isGateTimer) {
                //     this.gateTime = this.defaultGateTime
                //     this.gateTimer = setInterval(() => {
                //   
                //         if (!this.gateTime) {
                //             this.delayTimer = setTimeout(() => {
                //                 this.nowQuestionIndex = this.questionLength
                //                 this.setQuestion()
                //             }, this.delayTime)
                //             clearInterval(this.gateTimer)
                //             this.gateTimer = null
                //         }
                //         
                //         this.gateTime--
                //     }, 1000)
                // }

                // 答题计时器
                if (!this.anwserTimer && this.isAnwserTimer) {
                    this.anwserTime = this.defaultAnwserTime
                    this.anwserTimer = setInterval(() => {
                        this.anwserTime--
                        if (!this.anwserTime) {
                            this.delayTimer = setTimeout(() => {
                                this.nowQuestionIndex++
                                this.setQuestion()

                                clearTimeout(this.delayTimer)
                                this.delayTimer = null
                            }, this.delayTime)

                            clearInterval(this.anwserTimer)
                            this.anwserTimer = null
                        }
                    }, 1000)
                }
            }
        },
        setAnwser (anwser) {
            if (anwser.subjectChooseType == '1') {
                // 单选
                this.correctAnwser = [anwser.subjectCode]
            } else {
                // 多选
                var index = this.correctAnwser.indexOf(anwser.subjectCode)

                if (index < 0) {
                    this.correctAnwser.push(anwser.subjectCode)
                } else {
                    this.correctAnwser.splice(index, 1)
                }
            }
        },
        setAnwserRecord () {
            if (this.anwserTimer && this.isAnwserTimer) {
                clearInterval(this.anwserTimer)
            }

            if (this.delayTimer && this.isAnwserTimer) {
                clearTimeout(this.delayTimer)
            }

            util.request({
                method: 'post',
                interface: 'InsertGameSubjectRecord',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    playerType: '2',
                    gameGateCode: this.gateInfo.gameGateCode,
                    subjectCode: this.nowQuestion.Subject.subjectCode,
                    subjectResult: this.correctAnwser.join(',')
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.nowQuestionIndex++
                    this.setQuestion()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goCheat () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                gameCode: this.$route.query.gameCode,
                playerCode: this.gameUser.customerCode,
                gameGateCode: this.gateInfo.gameGateCode,
                subjectCode: this.nowQuestion.Subject.subjectCode,
                customerInteractionLog: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    customerCode: this.gameUser.customerCode,
                    customerType: this.gameUser.customerType,
                    interactionType: 'memberCheatInGame',
                    interactionDesc: '作弊成功,用户扣减' + this.gateInfo.cheatConsumePoint + '分!',
                    interactionPrimeObject: this.$route.query.gameCode,
                    interactionSubObject: this.gateInfo.gameGateCode,
                    interactionOtherObject: this.nowQuestion.Subject.subjectCode
                }
            }

            util.request({
                method: 'post',
                interface: 'gameCheat',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.getPointData()
                    this.correctAnwser = res.result.result.split(',')
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goCheer () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                gameCode: this.$route.query.gameCode,
                gamePlayerCode: this.gameUser.customerCode,
                gamePlayerType: '2',
                gameGateCode: this.gateInfo.gameGateCode,
                subjectCode: this.nowQuestion.Subject.subjectCode,
                customerInteractionLog: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    customerCode: this.gameUser.customerCode,
                    customerType: this.gameUser.customerType,
                    interactionType: 'memberTalkInGame',
                    interactionDesc: '客户发起助威',
                    interactionPrimeObject: this.$route.query.gameCode,
                    interactionSubObject: this.gateInfo.gameGateCode,
                    interactionOtherObject: this.$route.query.gameSessionCode
                }
            }

            util.request({
                method: 'post',
                interface: 'creatCheer',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.correctAnwser = res.result.result

                    // 保存题目
                    sessionStorage.setItem('questionData', JSON.stringify({
                        questions: this.questionList,
                        index: this.nowQuestionIndex,
                        defaultGateTime: this.gateTime,
                        defaultAnwserTime: this.anwserTime
                    }))

                    var pathData = {
                        name: 'game-help',
                        query: {
                            enterpriseCode: this.$route.query.enterpriseCode,
                            eventCode: this.$route.query.eventCode,
                            gameCode: this.$route.query.gameCode,
                            gameSessionCode: this.$route.query.gameSessionCode,
                            playerCheerCode: res.result.result,
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