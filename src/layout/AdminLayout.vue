<template>
    <div>
        <Navbar/>
        <router-view/>
    </div>
</template>
<script>
import Navbar from "@/components/admin/Navbar"
export default {
    name:'AdminLayout',
    components:{
        Navbar
    }
}
</script>