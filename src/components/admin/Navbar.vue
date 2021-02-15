<template>
    <div class="top nav">
        <div class="menu">
            <div class="menu-navbar" :class="{active: isMenu}" >
                <div @click="isMenu = false" class="menu-btn-close">
                    <i class="fas fa-times"></i>
                </div>
                <router-link 
                    v-for="(link, index) in links" 
                    :key="index" 
                    class="link"
                    :to="link.url">
                    <a href="" @click="isMenu= false" >{{link.name}}</a>
                </router-link>
                
                <a @click="Logout"  class="link">Logout</a>
            </div>
            <div @click="isMenu = true"  class="menu-btn-open">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Navbar',
    data:()=>({
        isMenu : false,
        isSearch: false,
        links:[]
    }),
    created(){
        this.links =[
            {url:'/', name:'Shop'},
            {url:'/a', name:'All Goods'},
            {url:'/a/add', name:'Add Good'},
            {url:'/a/orders', name:'Orders'},
            {url:'/a/gift', name:'Gift'}
        ]
    },
    methods:{
        async Logout(){
            try{
                await this.$store.dispatch('LogOut')
                this.$router.push('/login')
            }
            catch(e){}
        }
    }
}
</script>