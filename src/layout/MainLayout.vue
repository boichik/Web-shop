<template>
    <div>
        <Top/>
        <div>
            <router-view/>
        </div>
        <Left/>
    </div>
</template>
<script>
import Top from '@/components/app/Top'
import Left from '@/components/app/Left'
export default {
    name: 'MainLayout',
    created(){
    },
    components:{
        Top,Left
    }
}
</script>