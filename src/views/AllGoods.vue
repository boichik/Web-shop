<template>
    <div class="card card-main">
        <Loader v-if="loading"/>
        <div v-else class="card-container">
            <div v-for="(good, index) in Goods" :key="index" class="card-item">
                <div class="card-item__photo">
                    <img :src="good.images[0].link" alt="">
                </div>
                <div class="card-item__price">
                    <p>{{good.article}}</p>
                </div>
                <div class="card-item__name">
                    <p class="title">{{good.product_name}}</p>
                    <p class="description">{{good.small_text}}</p>
                </div>
                <div class="card-item__price">
                    <p>${{good.price}}</p>
                </div>
                <div @click="$router.push(`/a/goods/${good.id}`)" class="btn-edit">
                    <p>Edit</p>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
export default {
    name:'AllGoods',
    metaInfo:{
        title: 'Admin | All Goods'
    },
    data:()=>({
        Goods:[],
        loading:true
    }),
    async created(){
        //await this.$store.dispatch('fetchAllGood')
        if(!this.$store.getters.getGoods.lenght) await this.$store.dispatch('fetchAllGood')
        this.Goods = this.$store.getters.getGoods
        this.loading=false
    }
}
</script>