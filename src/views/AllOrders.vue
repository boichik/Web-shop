<template>
    <div class="card card-main">
        <Loader v-if="loading"/>
        <div v-else @scroll="ScrollOrders" class="card-container">
            <div v-for="(order, index) in Orders" :key="index" class="card-item card-order">
                <div class="card-item__index">
                    <p>{{index+1}}</p>
                </div>
                <div class="card-item__date">
                    <p>{{order.date_order | date('date')}}</p>
                </div>
                <div class="card-item__payment">
                    <p>{{order.payment}}</p>
                </div>
                <div class="card-item__total">
                    <p>${{order.total}}</p>
                </div>
                <div @click="OrderShow(order.id)" class="btn-edit">
                    <p>SHOW</p>
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    name:'AllOrders',
    metaInfo:{
        title: 'Admin | All Orders'
    },
    data:()=>({
        Orders:[],
        LastKey:null,
        FirstKey:null,
        loading:true,
        countLoad:5
    }),
    created(){
        this.StartAllOrders();
    },
    beforeDestroy(){
        this.$store.commit('RemoveOrders')
    },
    methods:{
        async StartAllOrders(){
            try{
                this.LastKey = await this.$store.dispatch('GetLastOrderKey')
                this.FirstKey = await this.$store.dispatch('GetFirstOrderKey')
                await this.$store.dispatch('fetchOrders', {LastKey:this.LastKey, countLoad:this.countLoad})
                this.Orders = this.$store.getters.GetOrders
                this.loading = false
                this.LastKey = this.Orders[this.Orders.length-1].id
                this.countLoad+=5
            }
            catch(e){

            }
        },
        async ScrollOrders(e){
            if(e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight - 50){
                
                // let check = this.Orders.find(item=> item.id === this.FirstKey)
                // console.log(check)
              
                    await this.$store.dispatch('fetchOrders', {LastKey:this.LastKey, countLoad:this.countLoad})
                    this.Orders =  this.$store.getters.GetOrders
                    this.LastKey = this.Orders[this.Orders.length-1].id
                    this.countLoad+=5
                
            }
        },
        OrderShow(id){
            this.$router.push(`/a/orders/${id}`)
        }
    }
    
}
</script>