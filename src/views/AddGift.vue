<template>
    <div class="gift">
        <div class="gift-container">
            <div class="title">Add Gift</div>
            <div class="inputs">
                <div class="gift-input-container" :class="{valid : isTaken===false, invalid : isTaken===true}">
                    <label>Enter gift</label>
                    <div class="gift-input">
                        <input class="input-text" type="text" v-model="gift">
                        <div @click="CheckValid" class="btn-save"><i class="fal fa-check"></i></div>
                    </div>
                    <span class="span-valid">This gift is not used</span>
                    <span class="span-invalid">This gift is already taken</span>     
                </div>
                <div class="gift-input-container">
                    <label >Enter count discount</label>
                    <div class="gift-input">
                        <input class="input-text" type="number" v-model="discount">
                        <div class="radio-btn">
                            <div class="radio-input">
                                <label for="1">$</label>
                                <input id="1" name="1" value="number" type="radio" v-model="type">
                            </div>
                            <div class="radio-input">
                                <label for="2">%</label>
                                <input id="2" name='1' value="procent" type="radio" v-model="type">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="AddGift" class="btn-add">
                <p>Add Gift</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AddGift',
    metaInfo:{
        title: 'Admin | Add Gift'
    },
    data:()=>({
        gift:'',
        discount:1,
        type:'',
        isTaken:null
    }),
    methods:{
        async CheckValid(){
            try{
                this.isTaken = await this.$store.dispatch('isAlreadyTaken', this.gift)
            }   
            catch(e){}
        },
        async AddGift(){
            const Data={
                code: this.gift,
                type: this.type,
                discount: this.discount
            }
            try{
                await this.CheckValid()
                if(!this.isTaken){
                    await this.$store.dispatch('AddGift', Data)
                    this.ClearData()
                }else return                
            }
            catch(e){

            }
        },
        ClearData(){
            this.discount ='',
            this.gift='',
            this.type='',
            this.isTaken=''
        }
    },
}
</script>