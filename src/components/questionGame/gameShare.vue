<template>
    <section class="gmBigBox">
        <div class="person-message-box" :style="sharePersonBgStyle">
            <div class="person-box">
                <div class="attar-box">
                    <img :src="gameUser.memberWechatImg">
                </div>
                <div :style="sharePersonStyle">
                    {{gameUser.memberWechatNickname}}<br>
                    <!-- XXX大师<br> -->
                    第27名（120890）<br>
                </div>
            </div>
            <div :style="shareFontStyle">
                {{gameTemplate.shareThanksText}}
            </div>
        </div>

        <section class="gmBodyArea">
            <div class="comment-game-box">
                <comment :comment-url="'article-comment'" :comment-list="commentList"></comment>
            </div>
        </section>
        <section class="bottom-btn-box">
            <router-link :style="gmShareBtn"
                            :to="{
                                name: 'game-start',
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
                {{gameTemplate.shareBtnFont}}
            </router-link>
        </section>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import comment from './comment'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            gameData: {},
            commentList: []
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
    },
    methods: {
        getPointData () {
            util.request({
                method: 'get',
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
        getComments () {
            util.request({
                method: 'get',
                interface: 'commentList',
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
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="scss">
</style>