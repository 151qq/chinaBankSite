<template>
    <div class="img-list-box">
        <section class="wx-img-list weui-grids">
            <div class="weui-grid"
                @click="showBigImg(index)"
                v-for="(item, index) in imgList">
                <img :src="item">
            </div>
        </section>
        <router-link v-if="morePath"
            class="weui-cell weui-cell_access weui-cell_link"
            :to="morePath">
            <div class="weui-cell__bd">查看更多</div>
            <div class="weui-cell__ft"></div>
        </router-link>

        <show-big-img :big-imgs="imgList" :is-show-img="isShowImg" :index="index"></show-big-img>
    </div>  
    
</template>
<script>
import showBigImg from './showBigImg.vue'
// import jsSdk from '../../utils/jsSdk'

export default {
    props: ['imgList', 'morePath'],
    data () {
        return {
            index: '',
            isShowImg: {
                value: false
            }
        }
    },
    methods: {
        showBigImg (index) {
            // jsSdk.previewImage(this.imgList[index], this.imgList)
            this.isShowImg.value = true
            this.index = index
        }
    },
    components: {
        showBigImg
    }
}
</script>
<style lang="scss">
.img-list-box {
    .wx-img-list {
        margin-bottom: 0 !important;

        .weui-grid {
            padding: 0;
        }
    }

    .weui-cell {
        padding: 10px 15px;

        &:before {
            border: none;
        }
    }

    .weui-grid {
        width: 50px;
        height: 50px;
        background: #e5e5e5;
        margin: 0 3px 3px 0;
        overflow: hidden;

        img {
            display: block;
            width: 100%;
            height: auto;
            position: relative;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .weui-grids:before {
        border: none;
    }

    .weui-grids:after {
        border:none;
    }

    .margin-box {
        float: left;
        width: 0.5%;
        height: 1px;
    }
}
</style>