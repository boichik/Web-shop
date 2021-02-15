<template>
    <div class="top">
        <div class="menu">
            <div class="menu-navbar" :class="{active: isMenu}">
                <div @click="isMenu = false" class="menu-btn-close">
                    <i class="fas fa-times"></i>
                </div>
                <router-link 
                    v-for="(link, index) in links" 
                    :key="index" 
                    class="link" 
                    :to="link.url">
                    <a href="" @click="isMenu=false" >{{link.name}}</a>
                </router-link>
                <router-link v-if="isAuth === true" class="link" to="/a">Admin Panel</router-link>
                <div class="menu-bottom">
                    <a href="#!">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#!">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#!">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            <div @click="isMenu = true" class="menu-btn-open">
                <i class="fas fa-bars"></i>
            </div>
        </div>
        <div class="logo">
            <p class="logo-text unselectable">Shoes shopping</p>
        </div>
        <div @click="$router.push('/cart')" class="shop-card">
            <p class="cart-title">Cart</p>
            <i class="fas fa-shopping-bag"></i>
             <Notification v-if="isNotification" :count="cartItems.length"/>
        </div>
    </div> 
</template>
<script>
import firebase from 'firebase/app'

export default {
    name:'Top',
    data:()=>({
        isMenu : false,
        isSearch: false,
        links:[],
        isAuth:false,
        cartItems:[],
        isNotification:false
    }),
    async created(){
        this.$store.dispatch('CheckStatus').then(()=>{
            this.isAuth =  this.$store.getters.getIsLogins
        })
        this.links =[
            {url:'/', name:'Shop'},
            {url:'/about', name:'About'},
            {url:'/help', name:'Help'},
        ]
        this.cartItems = this.$store.getters.getItems
    },
    mounted(){
        setTimeout(()=>{
            if(this.cartItems.length !=0){
                this.isNotification = true
                setTimeout(()=>{
                    this.isNotification = false
                },10000)
            } 
        },5000)
    },
    methods:{
        
        SendTest(){
            console.log('SEND...')
            this.$http.post('http://localhost:3000/api/register').then(res=> console.log(res))
        }
    }
}
</script>