<template>
    <section>
        <router-view v-if="isTemplate && isGate && isEvent"></router-view>
        <div v-if="isEnterprise" class="null-page">您不能参与游戏！</div>
    </section>
</template>
<script>
import util from '../../utils/tools'
import jsSdk from '../../utils/jsSdk'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            isEvent: false,
            isTemplate: false,
            isGate: false
        }
    },
    mounted () {
        util.getGameUser(() => {
            if (this.isEnterprise && this.$route.query.name != 'game-share') {
                return false
            }

            this.getGameData()
            this.getTemplate()
            this.getGates()
            this.getGameInfo()
        })
    },
    computed: {
        ...mapGetters({
            gameUser: 'getGameUser',
            gameData: 'getGameData'
        }),
        isEnterprise () {
            var types = ['enterprise_channel_open', 'enterprise_user_open']
            return this.gameUser.openType && types.indexOf(this.gameUser.openType) > -1
        }
    },
    methods: {
        ...mapActions([
            'setGateList',
            'setGameInfo',
            'setGameTemplate',
            'setGameData'
        ]),
        getGameData () {
            util.request({
                method: 'get',
                interface: 'eventInfoGet',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGameData(res.result.result)
                    this.isEvent = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getTemplate () {
            util.request({
                method: 'get',
                interface: 'enterpriseDetails',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGameTemplate(res.result.result)
                    this.isTemplate = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getGates () {
            util.request({
                method: 'get',
                interface: 'getGameGateListByCode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGateList(res.result.result)
                    this.isGate = true
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getGameInfo () {
            util.request({
                method: 'get',
                interface: 'getGameInfoByCode',
                data: {
                    enterpriseCode: this.$route.query.enterpriseCode,
                    eventCode: this.$route.query.eventCode,
                    gameCode: this.$route.query.gameCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.setGameInfo(res.result.result[0])
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>