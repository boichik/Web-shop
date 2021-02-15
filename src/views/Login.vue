<template>
    <div class="login">
        <div class="login-title">
            <p>ADMIN LOGIN</p>
        </div>
        <div class="login-container">
            <div class="input-text" :class="{invalid : error==='user_not_found'}">
                <label for="email">Email</label>
                <div class="input">
                    <i class="fal fa-user-friends"></i>
                    <input id="email" type="email" v-model="email">
                </div>
                <span class="span">User not found</span>
            </div>
            <div class="input-text" :class="{invalid : error==='wrong_password'}">
                <label for="password">Password</label>
                <div class="input">
                    <i class="fal fa-key"></i>
                    <input id="password" type="password" v-model="password">
                </div>
                <span class="span">Wrong Password</span>
            </div>
            <div @click="Login" class="btn-login">
                <p>Login</p>
                <i class="fal fa-sign-in-alt"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Login',
    metaInfo:{
        title: 'Shoes shopping | Login'
    },
    data:()=>({
        email:'',
        password:'',
        error:''
    }),
    methods:{
        async Login(){
            this.error =''
            let email = this.email 
            let password = this.password
            try{
              await this.$store.dispatch('Login', { email, password })
              this.$router.push('/a')
            }
            catch(e){}
            
        }
    }
}
</script>