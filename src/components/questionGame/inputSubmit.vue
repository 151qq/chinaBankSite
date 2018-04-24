<template>
    <section class="game-submit-box" v-if="showData.show">
        <div class="black-bg" @click.self="hiddenDialog"></div>
        <div class="submit-body">
            <img class="heart-box" src="../../assets/images/heart-big.png">

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
    props: ['showData', 'commentFloor'],
    data () {
        return {
            commentData: {
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
        hiddenDialog () {
            if (this.noClose) {
                return false
            }
            
            this.showData.show = false
        },
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
                commentType: '1',
                commentFloor: this.commentFloor,
                memberCode: this.gameUser.customerCode,
                commentContent: this.commentData.commentContent,
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