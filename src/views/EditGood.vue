<template>
    <div class="edit">
        <Loader v-if="loading"/>
        <div v-if="!loading" class="photo">
            <div class="photo-container">
                <div v-if="!Good.images.length && !ImagesBase64.length" class="photo-text">
                    <p>Add Images</p>
                    <span v-if="!validation.image">Please select image</span>
                </div>
                <div v-else>
                    <div class="image" v-for="(image, index) in Good.images" :key="index">
                        <div @click="deleteImg(index, 1)" class="btn-delete"><i class="fal fa-times"></i></div>
                        <img :src="image.link" alt="">
                    </div>
                    <div class="image" v-for="(image, index) in ImagesBase64" :key="index+Good.images.length">
                        <div @click="deleteImg(index, 2)" class="btn-delete"><i class="fal fa-times"></i></div>
                        <img :src="image" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!loading" class="edit-form" >
            <div class="title">Edit</div>
            <div class="edit-form-texts">
                <div class="text-top">
                    <div class="input-text" :class="{invalid : !validation.company_name}">
                        <label for="company-name">Company name</label>
                        <div class="input">
                            <input id="company-name" type="text" placeholder="Nike" v-model="Good.company_name">
                        </div>
                        <span class="span">Please enter correct company name</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.product_name}">
                        <label for="product-name">Product name</label>
                        <div class="input">
                            <input id="product-name" type="text" placeholder="AirForce" v-model="Good.product_name">
                        </div>
                        <span class="span">Please enter correct product name</span>
                    </div>
                </div>
                <div class="text-center" >
                    <div class="input-text" :class="{invalid : !validation.price}">
                        <label for="price">Price $</label>
                        <div class="input">
                            <input id="price" type="number" min="1" placeholder="12" v-model="Good.price">
                        </div>
                        <span class="span">Please enter price</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.small_text}">
                        <label for="small-text">Small Text</label>
                        <div class="input">
                            <input id="small-text" type="text" placeholder="About Good" v-model="Good.small_text">
                        </div>
                        <span class="span">Please enter correct small text</span>
                    </div>
                </div>
                <div class="text-bottom">
                    <div class="input-text" :class="{invalid : !validation.background_text}">
                        <label for="bg-title">Background Title</label>
                        <div class="input">
                            <input id="bg-title" type="text" placeholder="NIKE" v-model="Good.background_text">
                        </div>
                        <span class="span">Please enter correct background title</span>
                    </div>
                    <div class="input-text" :class="{invalid : !validation.article}">
                        <label for="article">Article</label>
                        <div class="input">
                            <input id="article" type="text" placeholder="53224" v-model="Good.article">
                        </div>
                        <span class="span">Please enter correct article</span>
                    </div>
                </div>
                <div class="text-size" :class="{invalid : !validation.size}">
                    <p class="size-title">Choose size</p>
                    <div class="size-check">
                        <div v-for="(check,index) in checkValue" :key="index" class="checkbox">
                            <label >{{check.val}}</label>
                            <input v-model="Good.size" type="checkbox" :name="index" :value="check.val">
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
                <div @click="DeleteGood" class="btn-delete">
                    <p>Delete</p>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
import CardBlockMixin from '../mixins/card_block.mixin'

export default {
    name:'EditGood',
    mixins:[CardBlockMixin],
    metaInfo:{
        title: 'Admin | Edit Good'
    },
    data:()=>({
        id:'',
        Good:{},
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
        loading:true
    }),
    created(){
        this.StartEditGood()

    },
    methods:{
        async StartEditGood(){
            this.id = this.$route.params.id
            try{
                this.Good = await this.$store.dispatch('fetchGood', this.id)
                this.loading=false
            }
            catch(e){}           

        },
        deleteImg(idx, type){
            if(type===1){
                if(idx===0){
                    this.Good.images =[]
                }
                else{
                    this.Good.images.splice(idx,idx)
                }
            }
            if(type ===2){
                if(idx===0){
                    this.ImagesBlob = []
                    this.ImagesBase64 = []
                }
                else{
                    this.ImagesBlob.splice(idx,idx)
                    this.ImagesBase64.splice(idx,idx)
                }
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
            this.Good.size.push(value)
        },
        Valid(){
            this.validation.company_name = this.$valid('empty', this.Good.company_name)
            this.validation.product_name = this.$valid('empty', this.Good.product_name)
            this.validation.price = this.$valid('price', this.Good.price)
            this.validation.small_text = this.$valid('empty', this.Good.small_text)
            this.validation.background_text = this.$valid('empty', this.Good.background_text)
            this.validation.article = this.$valid('empty', this.Good.article)
            this.validation.size = this.$valid('array', this.Good.size)

            if(this.$valid('array', this.Good.images)) this.validation.image = true
            else if(this.$valid('array', this.ImagesBlob)) this.validation.image = true
            else this.validation.image = false
                
            if(this.validation.company_name && this.validation.product_name && 
                this.validation.price && this.validation.small_text && 
                this.validation.background_text && this.validation.article && this.validation.size && this.validation.image){
                return true
            }else return false
        },
        async SaveGood(){
                if(this.Valid()){
                    const Data = {
                    ...this.Good,
                    id: this.id,
                    new_img: this.ImagesBlob != [] ? this.ImagesBlob : 'none' 
                }
                try{
                    await this.$store.dispatch('updateGood', Data)
                    await this.$store.dispatch('fetchAllGood')
                    this.$router.push('/a')

                }
                catch(e){}
            }
        },
        async DeleteGood(){
            try{
                await this.$store.dispatch('deleteGood', this.id)
                await this.$store.dispatch('fetchAllGood')
                this.$router.push('/a')

            }
            catch(e){}
        }
    }
}
</script>