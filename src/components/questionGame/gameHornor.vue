<template>
    <section class="hornor-list-box" :style="gmPlayBox">
        <div class="hornor-item"
                v-if="isLoad"
                @click="gotoGift(item)"
                v-for="(item, index) in hornorData">
            <div class="img-box">
                <img :src="item.productCover">
            </div>
            <div class="font-box">
                {{item.productCname}}
            </div>
            <div class="btn-box">
                <span class="has-get" v-if="item.gameGift != 'win'">已领取</span>
                <span class="no-get" v-else>领取</span>
            </div>
        </div>

        <div class="no-item" v-if="!hornorData.length && isLoad">
            没有您的奖品
        </div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            isLoad: false,
            hornorData: {}
        }
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameData: 'getGameData',
            gameInfo: 'getGameInfo',
            gameTemplate: 'getGameTemplate'
        }),
        gmPlayBox () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.gameAnimateGif + ')'
            }

            return styleData
        }
    },
    mounted () {
        jsSdk.init(this.setShare)
        this.getHornors()
    },
    methods: {
        setShare () {
            var queryData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                eventCode: this.$route.query.eventCode,
                gameCode: this.$route.query.gameCode,
                gameSessionCode: this.$route.query.gameSessionCode,
                appid: this.$route.query.appid,
                S: this.$route.query.S,
                C: this.$route.query.C,
                spreadType: this.$route.query.spreadType,
                T: this.gameUser.t,
                sShareTo: this.$route.query.sShareTo,
                cShareTo: this.$route.query.cShareTo
            }

            var queryList = []
            for (var k in queryData) {
                queryList.push(k + '=' + queryData[k])
            }

            var location = window.location

            var link = location.origin + '/questionGame/gameShare?' + queryList.join('&') + '&playerCode=' + this.gameUser.customerCode
            var title = this.gameData.eventPlanTitle.replace(/<.*?>/g, '')
            var desc = '我在玩答题冲大奖，根本停不下来，你也来试试吧～'

            var _self = this

            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: _self.gameData.eventPlanCover,
                success (data) {
                    _self.$message({
                        message: '恭喜你，分享成功！',
                        type: 'success'
                    })
                    _self.addPoint()
                },
                cancel (data) {}
            }

            jsSdk.setShare(shareData, true)
        },
        addPoint () {
            util.request({
                method: 'get',
                interface: 'addPoint',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode,
                    gamePoint: this.gameInfo.gameSharePoint,
                    gameGateCode: this.$route.query.gameGateCode,
                    gameSessionCode: this.$route.query.gameSessionCode,
                    playerType: '2',
                    pointChangeDesc: 'memberGetPointForSharingGame'
                }
            }).then(res => {
                if (res.result.success == '0') {
                    this.$message.error(res.result.message)
                }
            })
        },
        getHornors () {
            util.request({
                method: 'post',
                interface: 'playerPrize',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    gameCode: this.$route.query.gameCode,
                    playerCode: this.gameUser.customerCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.hornorData = res.result.result
                    this.isLoad = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        gotoGift (item) {
            if (item.gameGift != 'win') {
                return false
            }

            var location = window.location
            var nextPage = location.origin + '/orderCreate' + location.search + '&gameGateCode=' + item.gameGateCode + '&gameSessionCode=' + item.gameSessionCode + '&playerCode=' + this.gameUser.customerCode

            window.sessionStorage.setItem('giftCodes', item.productCode)

            if (this.gameUser.customerType === '1') {
                this.$router.push(util.formDataUrl(nextPage))
            } else {
                util.getUser(() => {
                    this.$router.push(util.formDataUrl(nextPage))
                }, 'snsapi_userinfo', window.encodeURIComponent(nextPage))
            }
        }
    }
}
</script>
<style lang="scss">
.hornor-list-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: auto;

    .no-item {
        font-size: 16px;
        color: #999999;
        line-height: 300px;
        text-align: center;
    }

    .hornor-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        padding: 0 20px;
        border-bottom: 1px solid #EAEAEA;
        background: #ffffff;

        .img-box {
            width: 60px;
            height: 60px;
            margin-right: 10px;

            img {
                display: block;
                width: 100%;
                position: relative;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .font-box {
            flex: 1;
            color: #2B2B41;
            font-size: 16px;
        }

        .btn-box {
            width: 80px;
            height: 26px;
            margin-left: 10px;

            span {
                display: block;
                width: 80px;
                height: 26px;
                font-size: 12px;
                line-height: 26px;
                text-align: center;
                border-radius: 13px;
            }

            .has-get {
                color: #7E7E90;
                background: #E9E9F2;
            }
            
            .no-get {
                color: #ffffff;
                background: #2B2B41;
            }
        }
    }
}
</style>