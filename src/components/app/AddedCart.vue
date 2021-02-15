<template>
    <div class="pop">
        <i class="fal fa-check"></i>
    </div>
</template>
<script>
export default {
    name:'AddedCart'
}
</script>
<style lang="scss" scoped>
    .pop{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.582);
        z-index: 10;
        display: none;
        align-items: center;
        justify-content: center;
        animation: pop 0.75s linear;
        i{
            font-size: 100px;
            color:white;
        }
    }
    @keyframes pop {
        0%{display: flex;}
        1%{
            transform: scale(0.1,0.1)
        }
        25%{
            transform: scale(0.6,0.6)
        }
        50%{
            transform: scale(1,1)
        }
        99%{
            transform: scale(0.1,0.1)
        }
        100%{display: none;}
    }
</style>