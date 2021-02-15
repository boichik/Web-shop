<template>
    <div v-touch:swipe.top="SwipeTop" v-touch:swipe.bottom="SwipeBottom">
        <Loader v-if="loading"/>
        <AddedCart v-if="added"/>
        <div v-if="!loading">
            <div class="sidebar">
                <div class="top-arrow " @click="ScrollUp">
                    <p class="count unselectable">{{currentItem | text('sidebar')}}</p>
                    <span class="icon icon-up"></span>
                </div>
                <div class="bottom-arrow" @click="ScrollDown">
                    <p class="count unselectable">{{allItem | text('sidebar')}}</p>
                    <span class="icon icon-down"></span>
                </div>
            </div>
            <div ref="display" @mousewheel="Scrolling"   id="center" class="center">
                <div v-for="(good, index) in Goods" :key="index" :id="`i-${index}`" class="item">
                    <div class="item-background">
                        <div class="name">{{good.background_text.toUpperCase()}}</div>
                        <div v-for="(images, idx) in good.images" :key="idx" class="images" :id="`img-${index}-${idx}`" @click="NextImage(index, idx)" :class="{active : idx===0}">
                            <img :src="images.link" alt="">
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="title">
                            <p class="company-name">{{good.company_name.toUpperCase()}}</p>
                            <p class="product-name">{{good.product_name.toUpperCase()}}</p>
                        </div>
                        <div class="text-bottom">
                            <p class="price">US$ {{good.price}}</p>
                            <p class="description">{{good.small_text.toUpperCase()}}</p>
                        </div>
                        <div class="text-right">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div @click="AddtoCard" class="btn-shop-now">
                    <p>SHOP NOW</p>
                    <i class="fas fa-long-arrow-alt-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import animateScrollTo from 'animated-scroll-to';
export default {
    name: 'Main',
    metaInfo:{
        title: 'Shoes shopping'
    },
    data:()=>({
        added:false,
        loading:true,
        Goods:[],
        display:null,
        items:[],
        currentItem: 0,
        allItem:'',
        ItemNow:'',
        Colors:['blue-light','green','yellow','orange','red','purpul','pink'],
        colorNow:0,
        mainContainer:null,
        option:{},
    }),
    async created(){
        if(!this.$store.getters.getGoods.length) await this.$store.dispatch('fetchAllGood')
        this.StartMain()      
    },
    watch:{
        loading: function (new_val, old_val){
            this.SetDisplay()
        }
    },
    mounted(){        
        document.addEventListener('resize', (e)=>{
            this.updateItemforScrolling()
        })
    },
    methods:{
        SwipeTop(){
           this.ScrollDown()
        },
        SwipeBottom(){
            this.ScrollUp()
        },
        SetDisplay(){
            
            setTimeout(()=>{
                this.display = this.$refs.display
                this.updateItemforScrolling()
                this.option={
                    elementToScroll: this.display
                }
            },300)
           
            this.mainContainer = document.getElementById('main-block')
        },
        StartMain(){      
            this.Goods = this.$store.getters.getGoods  
            this.allItem = this.Goods.length-1
            this.loading = false
        },
        AddtoCard(){
           this.$store.dispatch('addCart', this.Goods[this.currentItem])
           this.added=true;
           setTimeout(()=>{
               this.added=false
           },750)
        }, 
        NextImage(item_idx, img_idx){

            var img_lenght = this.Goods[item_idx].images.length-1
            var img_old = document.getElementById(`img-${item_idx}-${img_idx}`)
            if(img_old.classList.contains('active')){
                img_old.classList.remove('active')
                var img_new_idx = img_idx+1
            }else{
                var img_new_idx = 0
            }
            if(img_new_idx > img_lenght){
                img_new_idx=0
            }
            var img = document.getElementById(`img-${item_idx}-${img_new_idx}`)
            if(img != null || img != 'undefined'){
                img.classList.add('active')
            }

        },
        SetColor(){
            this.mainContainer.classList.remove(this.Colors[this.colorNow])
            this.colorNow++

            if(this.colorNow > this.Colors.length-1){
                this.colorNow=0
            }
            this.mainContainer.classList.add(this.Colors[this.colorNow])           
        },
        CheckScroll(){
            if( this.currentItem > (this.items.length - 1) 
            || this.currentItem < 0 ) {
                this.currentItem = 0;
            }
        },
        Scrolling(e){
            if( e.wheelDelta >= 0 ) {
                this.currentItem--
            }else{
                this.currentItem++
                this.SetColor()
            }
            if(e.wheelDelta >=0 && this.currentItem >0){
                this.SetColor()
            }

            this.CheckScroll()
            animateScrollTo(this.items[this.currentItem], this.option);
            //this.display.scrollTo(0,this.items[this.currentItem])
            //this.display.animate([],{duration:600,scrollTop: this.items[this.currentItem]})
            this.updateItemforScrolling();
        },
        ScrollDown(){
            this.currentItem++
            this.CheckScroll()

            this.SetColor()
            animateScrollTo(this.items[this.currentItem], this.option);
            this.updateItemforScrolling();

        },
        ScrollUp(){
            this.currentItem--
            this.CheckScroll()

            animateScrollTo(this.items[this.currentItem], this.option);
            this.updateItemforScrolling();
            if(this.currentItem !=0){
                this.SetColor()
            }

        },
        updateItemforScrolling(){
            this.items=[]
            for(var i=0;i<this.Goods.length;i++){
                var elem = document.getElementById(`i-${i}`)
                this.items.push(elem.offsetTop)
            }
        }
    },
}
</script>