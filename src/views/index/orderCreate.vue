<template>
    <section class="registor-box">
        <div class="wx-area-img">
            <img :src="coverImg">
        </div>
        <div class="avatar-box" v-if="!!memberInfo.memberWechatImg">
            <div class="img-box">
                <img :src="memberInfo.memberWechatImg">
            </div>
            <div class="name-box">{{memberInfo.memberWechatNickname}}</div>
        </div>
        <section class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">接收人</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="order.orderReceiver" placeholder="请输入">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">接收手机</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input"
                           v-model="order.orderReceiverMobile"
                           type="tel"
                           placeholder="请输入">
                </div>
            </div>
            <!-- <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">省</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="order.orderAddrProvince" placeholder="请输入">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">市</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="order.orderAddrCity" placeholder="请输入">
                </div>
            </div> -->
            <div class="weui-cell weui-cell_access no-center">
                <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
                <div class="weui-cell__bd">
                   <textarea class="weui-textarea"
                        placeholder="请输入"
                        :rows="3"
                        v-model="order.orderAddr"></textarea>
                </div>
            </div>      
            
        </section>

        <div class="btn-height-box"></div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="saveOrder">提交</a>
        </div>
    </section>
</template>
<script>
import tools from '../../utils/tools'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            coverImg: '',
            memberInfo: {
                memberCode: '',
                memberMobile: '',
                memberName: '',
                memberWechatImg: '',
                memberWechatNickname: ''
            },
            order: {
                memberCode: '',
                orderReceiver: '',
                enterpriseCode: '',
                orderReceiverMobile: '',
                orderAddrProvince: '',
                orderAddrCity: '',
                orderAddr: '',
                orderToken: '',
                gameCode: '',
                gameGateCode: '',
                orderProducts: []
            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            gameUser: 'getGameUser'
        })
    },
    mounted () {
        this.getGameData()

        if (this.userInfo.memberInfo && this.userInfo.memberInfo.memberCode) {
            this.memberInfo = Object.assign({}, this.userInfo.memberInfo)
        } else if (this.gameUser.memberInfo && this.gameUser.memberInfo.memberCode) {
            this.memberInfo = Object.assign({}, this.gameUser.memberInfo)
        }

        this.order = {
            memberCode: this.memberInfo.memberCode,
            orderReceiver: this.memberInfo.memberName,
            enterpriseCode: this.$route.query.enterpriseCode,
            orderReceiverMobile: this.memberInfo.memberMobile,
            orderToken: this.$route.query.gameSessionCode,
            gameCode: this.$route.query.gameCode,
            gameGateCode: this.$route.query.gameGateCode,
            orderAddrProvince: '',
            orderAddrCity: '',
            orderAddr: '',
            orderProducts: []
        }
    },
    methods: {
        getGameData () {
            tools.request({
                method: 'get',
                interface: 'eventInfoGet',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.coverImg = res.result.result.eventPlanCover
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveOrder () {
            if (this.order.orderReceiver == '') {
                this.$message.error('请输入接收人')
                return
            }

            if (this.order.orderReceiverMobile == '' || !(/^1[3|4|5|8][0-9]{9}$/).test(this.order.orderReceiverMobile.trim())) {
                this.$message.error('请输入11位接收手机号')
                return
            }

            // if (this.order.orderAddrProvince == '') {
            //     this.$message.error('请输入省')
            //     return
            // }

            // if (this.order.orderAddrCity == '') {
            //     this.$message.error('请输入市')
            //     return
            // }

            if (this.order.orderAddr == '') {
                this.$message.error('请输入详细地址')
                return
            }

            this.order.orderProducts = window.sessionStorage.getItem('giftCodes')
            this.order.gameSessionCode = this.$route.query.gameSessionCode

            tools.request({
              method: 'post',
              interface: 'organizeOrderSave',
              data: this.order
            }).then(res => {
                if (res.result.success == '1') {
                    window.sessionStorage.removeItem('giftCodes')
                    var targetPage = location.origin + '/questionGame/gameGift' + location.search
                    this.$router.replace(tools.formDataUrl(targetPage))
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.registor-box {
    .avatar-box {
        position: relative;
        z-index: 10;
        height: 60px;
        overflow: hidden;
        margin-top: -40px;

        div {
            float: right;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .img-box {
            width: 60px;
            height: 60px;
            border: 1px solid #E5E5E5;
            background: #ffffff;
            margin-right: 15px;
            box-sizing: border-box;
        }

        .name-box {
            font-size: 16px;
            line-height: 40px;
            margin-right: 20px;
            color: #ffffff;
        }
    }

    .notClick {
        color: #999999;
    }
}
</style>