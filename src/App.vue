<template>
  <div id="app">
    <main class="main">
		<div id="main-block" class="main-block blue-light">
        <component :is="layout">
          <router-view />
        </component>
		</div>
	</main>
  </div>
</template>

<script>
import MainLayout from '@/layout/MainLayout'
import AdminLayout from '@/layout/AdminLayout'
export default {
    name: 'App',
    computed:{
      layout(){
        return (this.$route.meta.layout || 'main') + '-layout'
      }
    },
    created(){
    },
    mounted(){
    },
    methods:{

    },
    components:{
      AdminLayout , MainLayout
    },
}

</script>
<style lang="scss">
@import 'assets/style.scss';
</style>
