<template>
    <div class="about">
        <div class="about-container">
            <div class="title">SHOES SHOPPING</div>
            <p class="text">Lorem, ipsum dolor.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, enim.
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ipsum omnis cumque excepturi similique odio.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, consequuntur.
            </p>
            <p class="text">Lorem, ipsum dolor.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, enim.
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ipsum omnis cumque excepturi similique odio.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, consequuntur.Lorem, ipsum dolor.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, enim.
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ipsum omnis cumque excepturi similique odio.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, consequuntur.
            </p>
            <div @click="PushLogin" class="bottom-text">Subscribe in social network</div>
        </div>
    </div>
</template>
<script>
import CardBlockMixin from '../mixins/card_block.mixin'

export default {
    name:'About',
    metaInfo:{
        title: 'Shoes shopping | About'
    },
    mixins:[CardBlockMixin],

    methods:{
        PushLogin(){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
    .about{
        width: 80%;
        margin: 0 auto;
        .title{
            text-align: center;
            color: white;
            font-size: 20px;
        }
        .text{margin-bottom: 30px;}
        .bottom-text{
            cursor: pointer;
            text-align: end;
            font-size: 20px;
            color:white
        }
    }
    @media (max-width: 480px){
        .about{
            .title{
                font-size: 16px;
            }
            .text{
                font-size: 12px;
                margin-bottom: 10px;
            }
            .bottom-text{font-size: 16px;}
        }
    }
</style>