<template>
    <section class="timeout-box">
        <div class="font-box">
            <img src="/static/images/timeout-icon.png">
            <span>
                游戏太火啦，稍后再来吧～
            </span>
        </div>
    </section>
</template>
<style lang="scss">
.timeout-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .font-box {
        position: absolute;
        width: 100%;
        top: 20%;
        left: 0;

        img {
            display: block;
            width: 120px;
            margin: 0 auto 20px;
        }

        span {
            display: block;
            text-align: center;
            font-size: 16px;
            color: #999999;
        }
    }
}
</style>