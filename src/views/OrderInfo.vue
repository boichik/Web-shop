<template>
    <div class="order-info">
        <Loader v-if="loading"/>
        <div v-else class="order-info-container">
            <div class="info">
                <div class="info-title">
                    <p>Order Info</p>
                </div>
                <div class="info-top">
                    <div class="order-number">№{{id}}</div>
                    <div class="date">{{Order.date_order | date('date')}}</div>
                </div>
                <div class="info-center">
                    <div class="goods">
                        <p>Goods:</p>
                        <ul>
                            <li v-for="o in Order.goods" :key="o.id">(article: {{o.article}}, count:{{o.count}}, size:{{o.select_size}})</li>
                        </ul>
                    </div>
                    <div class="info-full-name">
                        <p>Full Name:</p>
                        <p>{{Order.bio}}</p>
                    </div>
                    <div class="info-email">
                        <p>Email:</p>
                        <p>{{Order.email}}</p>
                    </div>
                    <div class="info-phone">
                        <p>Phone:</p>
                        <p>{{Order.phone}}</p>
                    </div>
                    <div class="info-full-address">
                        <p>Address:</p>
                        <p>{{Order.address}}</p>
                    </div>
                    <div class="info-payment">
                        <p>Payment:</p>
                        <p>{{Order.payment}}</p>
                    </div>
                </div>
                <div class="info-bottom">
                    <div>
                        <p class="cost-shipping">Shipping: ${{Order.shipping}}</p>
                        <p class="tax">Tax: ${{Order.tax}}</p>
                    </div>
                    <div>
                        <p class="cost-goods">Goods: ${{Order.goods_price}}</p>
                        <p class="promo-code">Gift: ${{Order.gift}}</p>
                    </div>
                </div>
                <div class="info-total">
                    <p>Total ${{Order.total}}</p>
                </div>
            </div>
            <div @click="$router.go(-1)" class="btn-return">Return</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'OrderInfo',
    metaInfo:{
        title: 'Admin | Order Info'
    },
    data:()=>({
        Order:{},
        id:'',
        loading:true
    }),
    created(){
        this.id = this.$route.params.id
        this.StartOrderInfo(this.id)
    },
    methods:{
        async StartOrderInfo(value){
            this.Order = await this.$store.dispatch('fetchOrder', value)
            this.loading=false
        }
    }
}
</script>