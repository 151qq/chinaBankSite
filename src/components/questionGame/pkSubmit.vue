<template>
    <section class="game-submit-box" v-if="showData.show">
        <div class="black-bg" @click.self="showData.show = false"></div>
        <div class="submit-body">
            <img class="heart-box" src="../../assets/images/heart-big.png">

            <div class="input-title">押分</div>

            <div class="num-input">
                <span class="num-btn"
                        @click="commentData.point = Math.max(0, commentData.point - 10)">
                    <img src="../../assets/images/reduce-icon.png">
                </span>
                <div class="input-box">
                    <input type="number"
                            min="0"
                            :max="pointData.points"
                            v-model="commentData.point">
                    <span>/{{pointData.points}}</span>
                </div>
                <span class="num-btn"
                        @click="commentData.point = Math.min(pointData.points, commentData.point + 10)">
                    <img src="../../assets/images/plus-icon.png">
                </span>
            </div>
            
            <div class="game-area">
                <textarea placeholder="有什么想说的"
                        rows="3"
                        v-model="commentData.commentContent"></textarea>
            </div>
            

            <div class="weui-uploader game-imgs">
                <div class="weui-uploader__bd">
                     <ul class="weui-uploader__files" id="uploaderFiles">
                        <li class="weui-uploader__file"
                            v-for="(item, index) in commentData.localIds"
                            @click="showBigImg(index)">
                                <img :src="item">
                        </li>
                        <li @click="chooseImage"
                            v-if="commentData.localIds.length < 9"
                            class="weui-uploader__input-box"></li>
                    </ul>
                </div>
            </div>
            
            <div class="game-btn-area">
                <a @click="submitFn">提交</a>
            </div>
        </div>
        <delete-img :index="nowIndex"
                    :img-path="nowPath"
                    :is-show-img="isShowImg"
                    @deleteImg="deleteImg"></delete-img>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import deleteImg from '../common/deleteImg.vue'
import { mapGetters } from 'vuex'

export default {
    props: ['showData'],
    data () {
        return {
            pointData: {
                points: 2000
            },
            commentData: {
                point: 500,
                commentContent: '',
                attachments: [],
                localIds: []
            },
            nowIndex: '',
            nowPath: '',
            isShowImg: {
                value: false
            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        chooseImage () {
            jsSdk.chooseImage((localId ,serverId) => {
                this.commentData.localIds.push(localId)
                this.commentData.attachments.push(serverId)
            })
        },
        submitFn () {
            var formData = {
                appId: this.$route.query.appid,
                enterpriseCode: this.$route.query.enterpriseCode,
                commentType: this.$route.query.commentType,
                commentFloor: this.$route.query.commentFloor,
                memberCode: this.userInfo.memberInfo.memberCode,
                commentContent: this.commentData.commentContent,
                templateCode: this.$route.query.templateCode,
                attachments: this.commentData.attachments
            }

            if (this.$route.query.playerCheerCode) {
                formData.pageCode = this.$route.query.playerCheerCode
            }

            util.request({
                method: 'post',
                interface: 'publishComment',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    if (this.$route.query.playerCheerCode) {
                        var pathData = {
                            name: 'game-help',
                            query: {
                                enterpriseCode: this.$route.query.enterpriseCode,
                                eventCode: this.$route.query.eventCode,
                                gameCode: this.$route.query.gameCode,
                                playerCheerCode: this.$route.query.playerCheerCode,
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

                        this.$router.replace(pathData)
                    } else {
                        this.$emit('hasSubmit')
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        showBigImg (index) {
            this.nowIndex = index
            this.nowPath = this.commentData.localIds[index]
            this.isShowImg.value = true
        },
        deleteImg (index) {
            this.commentData.attachments.splice(index, 1)
            this.commentData.localIds.splice(index, 1)
        }
    },
    components: {
        deleteImg
    }
}
</script>