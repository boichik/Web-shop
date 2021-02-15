<template>
    <div class="edit">
        <div class="photo">
            <div class="photo-container">
                <div v-if="!ImagesBase64.length" class="photo-text">
                    <p>Add Images</p>
                    <span v-if="!validation.image">Please select image</span>
                </div>
                <div v-else>
                    <div class="image" v-for="(image, index) in ImagesBase64" :key="index">
                        <div @click="deleteImg(index)" class="btn-delete"><i class="fal fa-times"></i></div>
                        <img :src="image" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="edit-form" >
            <div class="title">Edit</div>
            <div class="edit-form-texts">
                <div class="text-top">
                    <div class="input-text" :class="{invalid : !validation.company_name}">
                        <label for="company-name">Company name</label>
                        <div class="input">
                            <input id="company-name" type="text" placeholder="Nike" v-model="good.company_name">
                        </div>
                        <span class="span">Please enter correct company name</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.product_name}">
                        <label for="product-name">Product name</label>
                        <div class="input">
                            <input id="product-name" type="text" placeholder="AirForce" v-model="good.product_name">
                        </div>
                        <span class="span">Please enter correct product name</span>
                    </div>
                </div>
                <div class="text-center" >
                    <div class="input-text" :class="{invalid : !validation.price}">
                        <label for="price">Price $</label>
                        <div class="input">
                            <input id="price" type="number" min="1" placeholder="12" v-model="good.price">
                        </div>
                        <span class="span">Please enter price</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.small_text}">
                        <label for="small-text">Small Text</label>
                        <div class="input">
                            <input id="small-text" type="text" placeholder="About good" v-model="good.small_text">
                        </div>
                        <span class="span">Please enter correct small text</span>
                    </div>
                </div>
                <div class="text-bottom">
                    <div class="input-text" :class="{invalid : !validation.background_text}">
                        <label for="bg-title">Background Title</label>
                        <div class="input">
                            <input id="bg-title" type="text" placeholder="NIKE" v-model="good.background_text">
                        </div>
                        <span class="span">Please enter correct background title</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.article}">
                        <label for="article">Article</label>
                        <div class="input">
                            <input id="article" type="text" placeholder="53224" v-model="good.article">
                        </div>
                        <span class="span">Please enter correct article</span>
                    </div>
                </div>
                <div class="text-size" :class="{invalid : !validation.size}">
                    <p class="size-title">Choose size</p>
                    <div class="size-check">
                        <div v-for="(check,index) in checkValue" :key="index" class="checkbox">
                            <label >{{check.val}}</label>
                            <input v-model="good.size" type="checkbox" :name="index" :value="check.val">
                        </div>
                    </div>
                    <span>Please choose size</span>
                </div>
            </div>
            <div class="buttons">
                
                <div class="input-file">
                    <input type="file" id="file" class="file" multiple @change="SetImg" > 
                    <label for="file" class="btn-file">
                        <span class="fileName">Upload File</span>
                    </label>
                </div>
                <div @click="SaveGood" class="btn-save" >
                    <p>Save</p>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
import CardBlockMixin from '../mixins/card_block.mixin'
export default {
    name:'AddGood',
    metaInfo:{
        title: 'Admin | Add Good'
    },
    data:()=>({
        
        good:{
            company_name:'',
            product_name:'',
            price:1,
            small_text:'',
            background_text:'',
            article: '',
            size:[]
        },
        ImagesBase64:[],
        ImagesBlob:[],
        checkValue:[
            {val:3},
            {val:3.5},
            {val:4},
            {val:4.5},
            {val:5},
            {val:5.5},
            {val:6},
            {val:6.5},
            {val:7},
            {val:7.5},
            {val:8},
            {val:8.5},
            {val:9},
            {val:9.5},
            {val:10},
            {val:10.5},
            {val:11},
        ],
        validation:{
            company_name:true,
            product_name:true,
            price:true,
            small_text:true,
            background_text:true,
            article:true,
            size:true,
            image:true
        },
    }),
    mixins:[CardBlockMixin],
    methods:{
        deleteImg(i){
            if(i===0){
                this.ImagesBlob = this.ImagesBase64 = []
            }
            else{
                this.ImagesBlob.splice(i,i)
                this.ImagesBase64.splice(i,i)
            }
        },
        SetImg(e){
            var images = e.target.files
            for(var i=0; i<images.length; i++){
                    let reader = new FileReader()
                        if(images[i] !='undefined'){
                            reader.readAsDataURL(images[i]);
                            reader.onloadend = e =>{
                                this.ImagesBase64.push(e.target.result)
                        }
                    }
                }
            this.ImagesBlob.push(...images)
        },
        AddToSize(value){
            this.good.size.push(value)
        },
        Valid(){
            this.validation.company_name = this.$valid('empty', this.good.company_name)
            this.validation.product_name = this.$valid('empty', this.good.product_name)
            this.validation.price = this.$valid('price', this.good.price)
            this.validation.small_text = this.$valid('empty', this.good.small_text)
            this.validation.background_text = this.$valid('empty', this.good.background_text)
            this.validation.article = this.$valid('empty', this.good.article)
            this.validation.size = this.$valid('array', this.good.size)
            this.validation.image = this.$valid('array', this.ImagesBase64)

                
            if(this.validation.company_name && this.validation.product_name && 
                this.validation.price && this.validation.small_text && 
                this.validation.background_text && this.validation.article && this.validation.size && this.validation.image){
                return true
            }else return false
        },
        async SaveGood(){
                if(this.Valid()){
                    const Data = {
                    ...this.good,
                    images: this.ImagesBlob
                }
                try{
                    if(!await this.$store.dispatch('CheckArticle', this.good.article)){
                        await this.$store.dispatch('createGood', Data)
                        await this.$store.dispatch('fetchAllGood')
                        this.$router.push('/a')
                    }else{
                        this.validation.article = false
                    }
                }
                catch(e){}
            }
        }
    },
}
</script>