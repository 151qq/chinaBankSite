<template>
    <section class="game-comment-box">
        <section class="comment-b" v-for="(item, index) in commentList">
            <div class="avatar-box">
                <img v-if="item.mobileCustomerInfo.customerWechatImg" :src="item.mobileCustomerInfo.customerWechatImg">
            </div>
            <div class="content-box">
                <div class="title-box">
                    <span class="title">{{item.memberInfo.memberName}}</span>

                    <div class="btn-box"
                        @click="deleteComment(item)"
                        v-if="(userInfo.customCode && item.customCode == userInfo.customCode)">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
                <div class="des-box"
                     v-if="item.status == '1' && item.commentContent">
                    {{item.commentContent}}
                </div>

                <div class="des-box"
                     v-if="item.status == '0'">该内容已被删除！！！</div>

                <div class="imgs-box" 
                     v-if="item.status == '1' && item.attachments && item.attachments.length">
                    <img-list :img-list="item.attachments"></img-list>
                </div>
            </div>
        </section>

        <div class="game-null-box" v-if="!commentList.length">
            暂无对话！
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import imgList from '../common/imgList.vue'
import {getDateDiff} from '../../assets/common/utils.js'
import { mapGetters } from 'vuex'

export default {
    props: ['commentUrl', 'commentList', 'codeName'],
    data () {
        return {
            isPage: false,
            isGood: [],
            isBad: [],
            commentsLen: ''
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        showSubmit (type, item) {
            if ((item && item.status != '1')) {
                return false
            }

            var pathUrl = {
                name: this.commentUrl,
                query: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    commentType: type,
                    commentFloor: this.commentList.length + 1
                }
            }

            if (this.$route.query.playerCheerCode) {
                pathUrl.playerCheerCode = this.$route.query.playerCheerCode
            }

            if (item && item.commentFloor) {
                pathUrl.query.commentTitle = item.commentFloor
            }

            this.$router.push(pathUrl)
        },
        deleteComment (item) {
            if (item.status != '1') {
                return
            }
            
            util.request({
                method: 'post',
                interface: 'deleteComment',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    commentCode: item.commentCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getComments()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    filters: {
        getDateDiff
    },
    components: {
        imgList
    }
}
</script>
<style lang="scss">
.game-comment-box {
    margin-top: 20px;

    .game-null-box {
        text-align: center;
        color: #999999;
    }

    .comment-b {
        margin-bottom: 20px;
        display: flex;

        .avatar-box {
            width: 36px;
            height: 36px;
            background: url(/static/images/head-icon.png) center no-repeat;
            background-size: 100%;
            margin-right: 10px;
            overflow: hidden;
            border-radius: 50%;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .content-box {
            flex: 1;
            padding: 10px;
            background: #ffffff;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 2px 2px 10px -4px #999999;


            .title-box {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .title {
                    flex: 1;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 20px;
                    color: #2B2B41;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    word-wrap: break-word;
                    word-break: break-all;
                }

                .btn-box {
                    width: 30px;
                    text-align: right;
                    font-size: 14px;
                    color: #FA746E ;
                }
            }

            .des-box {
                font-size: 16px;
                line-height: 20px;
                color: #7E7E90;
                margin-top: 7px;
            }

            .imgs-box {
                margin-top: 7px;
            }
        }
    }
}
</style>