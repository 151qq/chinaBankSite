<template>
    <section class="gate-git-box">
        <div class="gate-bg-img"
            v-if="numBoxBottom !== ''"
            :style="{
                'bottom': numBoxBottom,
                'margin-top': personX
            }">
            <div class="gate-num-box"></div>
            <img src="/static/images/gate-an-bg.jpg">
        </div>
        
        <div class="gate-birdes-box">
            <img src="/static/images/gate-birdes.png">
        </div>
        <div class="gate-person-box" v-if="personDefault !== ''" :style="{bottom: personDefault}">
            <img src="/static/images/gate-person.png">
        </div>

        <div class="gate-font-box" v-if="gateNum !== ''">
            第{{gateNum + 1}}关
        </div>
    </section>
</template>
<script>
import $ from 'Jquery'

export default {
    props: ['gateNumNow', 'gateNumNext'],
    data () {
        return {
            numBoxBottom: '',
            gateHeight: '',
            personDefault: '',
            personX: '',
            gateNum: ''
        }
    },
    mounted () {
        var num = this.gateNumNow ? this.gateNumNow : 0
        var winWidth = $('body').width()
        var defaultHeight = Math.round(winWidth / 750 * 410)
        this.gateHeight = Math.round(winWidth / 750 * 250)
        this.numBoxBottom = this.gateHeight * num + 'px'
        this.personDefault = defaultHeight + this.gateHeight * num + 'px'
        if (num % 2 == 0) {
            this.personX = '-100px'
        } else {
            this.personX = '40px'
        }
        this.gateNum = num

        setTimeout(() => {
            var numNext = this.gateNumNext ? this.gateNumNext : 0
            this.numBoxBottom = this.gateHeight * numNext * -1 + 'px'
            if (num % 2 == 0) {
                this.personX = '-100px'
            } else {
                this.personX = '40px'
            }
            this.gateNum = numNext
        }, 1000)

        console.log(this.numBoxBottom)
    }
}
</script>
<style lang="scss">
.gate-git-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 101;

    .gate-bg-img {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all 1s ease-in-out;

        .gate-num-box {
            display: block;
            width: 100%;
            height: 6000px;
            background: url(/static/images/gate-num.jpg) repeat-y left bottom;
            background-size: 100% auto;
        }

        img {
            display: block;
            width: 100%;
            height: auto;
        }
    }

    

    .gate-birdes-box {
        width: 100%;
        position: absolute;
        left: 20px;
        top: 20px;
        animation:lightDark 1s infinite alternate;

        img {
            display: block;
            width: 140px;
        }
    }

    .gate-person-box {
        width: 60px;
        height: 44px;
        position: absolute;
        left: 50%;

        img {
            display: block;
            width: 60px;
        }
    }

    .gate-font-box {
        position: absolute;
        width: 100%;
        height: 30px;
        left: 0;
        top: 30%;
        font-size: 26px;
        line-height: 30px;
        color: #000000;
        text-align: center;
    }
}

@keyframes lightDark
{
    from {
        opacity: 1;
    }
    to {
        opacity: 0.5;
    }
}
</style>