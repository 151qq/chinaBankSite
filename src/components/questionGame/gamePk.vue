<template>
    <section class="gmBigBox">
            <div class="person-pk-box" :style="pkPersonBgStyle">
                <div class="person-box">
                    <div class="attar-box">
                        <img src="/static/images/B1.jpg">
                    </div>
                    <div class="title-box">
                        昵称
                    </div>
                    <div class="message-box">
                        15分
                    </div>
                </div>
                <div class="money-box">
                    押分10
                </div>
                <div class="person-box">
                    <div class="attar-box">
                        <img src="/static/images/B1.jpg">
                    </div>
                    <div class="title-box">
                        昵称
                    </div>
                </div>
            </div>

            <section class="gmBodyArea">
                <div class="comment-game-box">
                    <comment :comment-url="'article-comment'" :comment-list="commentList"></comment>
                </div>
            </section>
            <section class="bottom-btn-box">
                <router-link :style="gmPkBtn"
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
                    {{base.pkBtnOneFont}}
                </router-link>

                <span :style="gmPkBtn" @click="goToTalk">
                    {{base.pkBtnTwoFont}}
                </span>
            </section>

            <pk-submit :show-data="showData" @hasSubmit="getComments"></pk-submit>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import comment from './comment'
import pkSubmit from './pkSubmit'
import templateMixin from '../../assets/common/gameTemplateMix'
import { mapGetters } from 'vuex'

export default {
    props: ['base'],
    data () {
        return {
            commentList: [],
            showData: {
                show: false
            }
        }
    },
    mixins: [templateMixin],
    filters: {
        formatDate: util.formatDate
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    mounted () {
        util.getUser(() => {
            // this.getPointData()
            // this.getComments()
            jsSdk.init()
        }, 'snsapi_base')
    },
    methods: {
        // todo pk信息
        getGameData () {
            util.request({
                method: 'get',
                interface: 'html5PageGet',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.gameData = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        // todo 个人用户游戏相关
        getPointData () {
            util.request({
                method: 'get',
                interface: 'personalPoints',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    gamePlayerCode: this.userInfo.customCode,
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
                    pageCode: this.$route.query.pageCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.commentList = res.result.result
                    this.isPage = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        goToTalk () {
            this.showData.show = true
        }
    },
    components: {
        comment,
        pkSubmit
    }
}
</script>
<style lang="scss">
</style>