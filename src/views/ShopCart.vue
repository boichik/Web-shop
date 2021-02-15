<template>
    <div>
        <Order :key='OrderRender' :class="{active: isOrder}" :goods="Items" :gift="gift" @closeOrder="isOrder=false" @finish="finishOrder"/>
        <div class="card">
            <div class="card-container">
                <div v-if="!Items.length" class="main-title">Cart is empty</div>
                <div v-for="(item, index) in Items" :key="index" class="card-item">
                    <div class="card-item__photo">
                        <img :src="item.images[0].link" :alt="item.product_name">
                    </div>
                    <div class="card-item__name">
                        <p class="title">{{item.product_name}}</p>
                        <p class="description">{{item.small_text}}</p>
                    </div>
                    <div class="card-item__size-selector">
                        <p class="title">Chose your size</p>
                        <select @change="SelectSize($event, index)"  class="select">
                            <option v-for="(size, idx) in item.size" :key="idx" :value="size">{{size}}</option>
                        </select>
                    </div>
                    <div class="card-item__count-buy">
                        <div class="set-count">
                            <div @click="RomoveCount(index)" class="minus">
                                <i class="fal fa-minus"></i>
                            </div>
                            <p class="number">{{item.count}}</p>
                            <div @click="AddCount(index)" class="plus">
                                <i class="fal fa-plus"></i>
                            </div>
                        </div>
                        <p class="price"><i class="far fa-times"></i> ${{item.price}}</p>
                    </div>
                    <div @click="RemoveItem(index)" class="card-item__delete">
                        <i class="far fa-times"></i>
                    </div>
                </div>
            </div>
            <div class="card-info">
                <div class="promo" :class="{valid : gift !=null, invalid : invalid != null}">
                    <p class="promo-title">GIFT CARD/PROMO CODE</p>
                    <div class="input-promo">
                        <input type="text" placeholder="E34553" v-model="gift_code" :disabled="gift">
                        <div @click="SetGift" class="btn-apply"><i class="far fa-check"></i></div>
                    </div>
                    <span class="span-invalid">{{invalid}}</span>
                    <span v-if="gift != null" class="span-valid">Discount {{gift.discount}} {{gift.type === 'number' ? '$' : '%'}}</span>
                </div>
                <div @click="Items.lenght ? isOrder = true : isOrder = false" class="btn-order">
                    <p>GO TO ORDER</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Order from '@/components/app/Order'
export default {
    name:'ShopCart',
    metaInfo:{
        title: 'Shoes shopping | Cart'
    },
    data:()=>({
        isOrder:false,
        Items:[], 
        size:'',
        gift_code:'',
        gift:null,
        invalid:'',
        OrderRender:0
    }),
    created(){
        this.Items = this.$store.getters.getItems
        if(this.Items){
            this.Items.forEach(item=>{
                item.select_size = item.size[0]
            })
        }
    },
    components:{
        Order
    },
    methods:{
        finishOrder(){
            this.isOrder = false
            this.Items = this.$store.getters.getItems
            if(this.Items){
                this.Items.forEach(item=>{
                    item.select_size = item.size[0]
                })
            }
        },
        SetGift(){
            if(!this.gift_code) this.invalid='Please enter gift code'
            try{
                this.$store.dispatch('GetGift', this.gift_code).then(res=>{
                    if(res != null){
                        let info = Object.keys(res).map(key=> ({...res[key]}))
                        this.gift = info[0]
                        this.invalid =''
                    }else{
                        this.invalid='This code is not aviable'
                    }
                })
            }
            catch(e){}
        },
        SelectSize(e, idx){
            this.OrderRender++ 

            console.log(e.target.value)
            console.log(idx)
            this.Items[idx].select_size = e.target.value
        },
        RemoveItem(value){
            this.$store.dispatch('removeCartItem', this.Items[value])
            this.Items = this.$store.getters.getItems
        },
        AddCount(idx){
            this.Items[idx].count++
        },
        RomoveCount(idx){
            if(this.Items[idx].count >1){
                this.Items[idx].count--
            }else{
                if(this.Items[Idx].count <=1){
                    this.Items[Idx].count =1
                }
            }
        }
    }
}
</script>