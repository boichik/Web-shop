<template>
    <div class="notification">
        <p>You have {{count}} item in cart</p>
    </div>
</template>
<script>
export default {
    name:'Notification',
    props:{
        count:{required:true}
    }
}
</script>

<style lang="scss" scoped>
    @keyframes anim {
        0%{opacity: 0.1;}
        25%{opacity: 1}
    }
    .notification{
        position: absolute;
        z-index: 5;
        width: 150px;
        right: 20px;
        top: 70px;
        height: 50px;
        background: #cc0e38;
        display: flex;
        animation: anim 10s linear;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        p{
            color:white;
            font-weight: 100;
            font-style: italic;
            font-size: 18px;
        }

        &::after, &::before {
            content: '';
            position: absolute;
            background: #cc0e38;
            right: 9px;
            top: -5px;
            width: 20px; 
            height: 20px;
            z-index: -1;
            transform: rotate(45deg); 
            -webkit-transform: rotate(45deg);
        }
    }
</style>