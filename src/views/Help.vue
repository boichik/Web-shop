<template>
    <div class="help">
        <div class="blocks">
            <div class="block green">
                <i class="fas fa-shopping-cart"></i>
                <p class="block-text">How to order?</p>
                <div class="block-info">
                    <p class="block-info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div class="block red">
                <i class="fas fa-tags"></i>
                <p class="block-text">What is "Shoes shopping"?</p>
                <div class="block-info">
                    <p class="block-info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div class="block black">
                <i class="fas fa-shipping-fast"></i>
                <p class="block-text">Shipping</p>
                <div class="block-info">
                    <p class="block-info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div class="block purple">
                <i class="fas fa-money-bill-wave"></i>
                <p class="block-text">Pay</p>
                <div class="block-info">
                    <p class="block-info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div class="block orange">
                <i class="fas fa-undo-alt"></i>
                <p class="block-text">Refund</p>
                <div class="block-info">
                    <p class="block-info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Help',
    metaInfo:{
        title: 'Shoes shopping | Help'
    },
}
</script>
<style lang="scss" scoped>
    .help{
        width: 80%;
        height: 50vh;
        margin: 0 auto;
        .blocks{
            display: flex;
            flex-direction: row;
            height: 100%;
            justify-content: space-evenly;
            .block{
                width: 150px;
                height: 100%;
                position: relative;
                overflow: hidden;
                display: flex;
                i{
                    position: absolute;
                    z-index: 2;
                    left: 0;
                    right: 0;
                    text-align: center;
                    top: 20px;
                    font-size: 20px;
                    color:white
                }
                &-text{
                    text-align: center;
                    align-self: center;
                    width: fit-content;
                    margin: auto;
                    color:white;
                    font-size: 16px;
                }
                &-info{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    left: -100%;
                    background: white;
                    transition: 0.2s linear;
                    display: flex;
                    &-text{
                        color:black;
                        align-self: center;
                        width: fit-content;
                        text-align: center;
                        margin: auto;
                    }

                }
                &:hover, &:focus{
                    i{color:black}
                    .block-info{
                        left:0;
                        transition: 0.2s linear;
                    }
                }
            }
        }
    }
    .red{background: rgb(207, 52, 52);}
    .orange{background: rgb(190, 68, 23);}
    .purple{background: rgb(199, 49, 199);}
    .blue{background: rgb(53, 53, 158)}
    .black{background: rgb(48, 46, 46)}
    .green{background: rgb(48, 165, 48)}
     @media(max-width:765px) and (orientation: landscape){
        .help{
            .blocks{
                .block{
                    i{
                        top: 10px;
                        font-size: 14px;
                    }
                    &:hover, &:focus{
                        i{z-index: 0;}
                    }
                }
            }
        }
    }
    @media (max-width: 768px){
            .blocks{
                display: grid !important;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 10px;
                .block{
                width: 150px;
                height: 150px;
                    &-info{
                        &-text{
                                overflow: hidden;
                                text-overflow: ellipsis; 
                        }
                    }
                }
            }
       
    }
    @media(max-width:600px){
        .help{
            .blocks{
                margin-top: 20px;
                grid-template-columns: 1fr 1fr;
                .block{
                    i{font-size: 15px;}
                    width: 125px;
                    height: 125px;
                    &-text{font-size: 14px;}
                    &-info{&-text{font-size: 14px;}}
                }
            }
        }
    }
    @media(max-width:375px){
        .help .blocks{grid-template-columns: 45% 45%;}
        .help .blocks .block{
            width: 100%;
            i{font-size: 8px;}
            &-text{font-size: 8px;}
            &-info{&-text{font-size: 8px;}}  
        }
    }
</style>