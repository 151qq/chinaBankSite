<template>
    <section class="game-submit-box" v-if="showData.show">
        <div class="black-bg" @click.self="showData.show = false"></div>
        <div class="submit-body">
            <img class="heart-box" src="../../assets/images/heart-big.png">

            <div class="input-title">赠送积分</div>

            <div class="num-input marginB20">
                <span class="num-btn"
                        @click="commentData.point = Math.max(0, commentData.point - 10)">
                    <img src="../../assets/images/reduce-icon.png">
                </span>
                <div class="input-box">
                    <input type="number"
                            min="0"
                            :max="pointData.playerGamePoint"
                            v-model="commentData.point">
                    <span>/{{pointData.playerGamePoint}}</span>
                </div>
                <span class="num-btn"
                        @click="commentData.point = Math.min(pointData.playerGamePoint, commentData.point + 10)">
                    <img src="../../assets/images/plus-icon.png">
                </span>
            </div>
            
            <!-- <div class="game-area">
                <textarea placeholder="有什么想说的"
                        rows="3"
                        v-model="commentData.commentContent"></textarea>
            </div> -->
            

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
    props: ['showData', 'commentFloor', 'pointData'],
    data () {
        return {
            commentData: {
                point: 10,
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
            gameUser: 'getGameUser'
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
            var commentInfo = {
                appId: this.$route.query.appid,
                enterpriseCode: this.$route.query.enterpriseCode,
                commentType: '1',
                commentFloor: this.commentFloor,
                commentContent: '赠送了您' + this.commentData.point + '积分',
                memberCode: this.gameUser.customerCode,
                templateCode: this.$route.query.templateCode,
                attachments: this.commentData.attachments,
                pageCode: this.$route.query.gameSessionCode
            }

            var customerInteractionLog = {
                enterpriseCode: this.$route.query.enterpriseCode,
                customerCode: this.gameUser.customerCode,
                customerType: this.gameUser.customerType,
                interactionType: 'memberCheerForFriendInGame',
                interactionDesc: '客户为好友游戏助威',
                interactionPrimeObject: this.$route.query.gameCode,
                interactionSubObject: this.$route.query.gameGateCode,
                interactionOtherObject: this.$route.query.gameSessionCode
            }

            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                gamePlayerCode: this.gameUser.customerCode,
                gameCode: this.$route.query.gameCode,
                giftPoints: this.commentData.point,
                playerCheerCode: this.$route.query.playerCheerCode,
                gameSeesionCode: this.$route.query.gameSeesionCode,
                gameGateCode: this.$route.query.gameGateCode,
                commentInfo: commentInfo,
                customerInteractionLog: customerInteractionLog
            }


            util.request({
                method: 'post',
                interface: 'cheerHelp',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$emit('hasSubmit')
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