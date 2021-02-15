<template>
    <div class="order">
        <div class="order-container">
            <div class="status">
                <div class="status-circle" :class="{active: forms >= 1}">
                    <div class="status-circle__header">
                        <p>Account</p>
                    </div>
                    <div class="status-circle__point">
                        <div class="pre-line">
                            
                        </div>
                        <div class="center-point">
                            <div class="point"></div>
                        </div>
                        <div class="post-line">
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
                <div class="status-circle" :class="{active : forms >=2, soon : forms===1}">
                    <div class="status-circle__header">
                        <p>Shipping</p>
                    </div>
                    <div class="status-circle__point">
                        <div class="pre-line">
                            <div class="line"></div>
                        </div>
                        <div class="center-point">
                            <div class="point"></div>
                        </div>
                        <div class="post-line">
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
                <div class="status-circle" :class="{active : forms>=3, soon : forms===2}">
                    <div class="status-circle__header">
                        <p>Payment</p>
                    </div>
                    <div class="status-circle__point">
                        <div class="pre-line">
                            <div class="line"></div>
                        </div>
                        <div class="center-point">
                            <div class="point"></div>
                        </div>
                        <div class="post-line">
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
                <div class="status-circle" :class="{active : forms===4 , soon : forms===3}">
                    <div class="status-circle__header">
                        <p>Review</p>
                    </div>
                    <div class="status-circle__point">
                        <div class="pre-line">
                            <div class="line"></div>
                        </div>
                        <div class="center-point">
                            <div class="point"></div>
                        </div>
                        <div class="post-line">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="order-form-1" class="order-form" :class="{active : forms=== 1}">
                <div class="order-form-container">
                    <div class="input-text" :class="{invalid: !validation.fn}" >
                        <label for="first-name">First Name</label>
                        <div class="input">
                            <i class="fal fa-user-friends"></i>
                            <input id="first-name" type="text" v-model="form1.first_name" placeholder="Devid">
                        </div>
                        <span  class="span">Please enter correct first name</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.ln}">
                        <label for="last-name">Last Name</label>
                        <div class="input">
                            <i class="fal fa-user-friends"></i>
                            <input id="last-name" type="text" v-model="form1.last_name" placeholder="Arrow">
                        </div>
                        <span class="span">Please enter correct last name</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.email}">
                        <label for="email">Email</label>
                        <div class="input">
                            <i class="fal fa-envelope"></i>
                            <input id="email" type="email" v-model="form1.email" placeholder="myemail@email.com">
                        </div>
                        <span class="span">Please enter correct email</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.phone}">
                        <label for="phone">Phone</label>
                        <div class="input">
                            <i class="fal fa-phone"></i>
                            <input id="phone" type="number" v-model="form1.phone" placeholder="1-365-323-4453">
                        </div>
                        <span class="span">Please enter correct phone number</span>
                    </div>
                </div>
            </div>
            <div id="order-form-2" class="order-form" :class="{active : forms=== 2}">
                <div class="order-form-container">
                    <div class="input-text" :class="{invalid: !validation.country}">
                        <label for="country">Country</label>
                        <div class="input">
                            <i class="fal fa-flag"></i>
                            <country-select v-model="form2.country" :country="form2.country" :countryName="true" topCountry="US" />
                        </div>
                        <span class="span">Please select country</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.city}">
                        <label for="city">City</label>
                        <div class="input">
                            <i class="fal fa-city"></i>
                            <input id="city" type="text" v-model="form2.city" placeholder="New York">
                        </div>
                        <span class="span">Please enter correct city</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.address}">
                        <label for="address">Address</label>
                        <div class="input">
                            <i class="fal fa-map-marker-alt"></i>
                            <input id="address" type="text" v-model="form2.address" placeholder="Down town, 18 s-t, 25A">
                        </div>
                        <span class="span">Please enter correct adress</span>
                    </div>
                    <div class="input-text" :class="{invalid: !validation.zipcode}">
                        <label for="zipcode">Zip-code</label>
                        <div class="input">
                            <i class="fal fa-bullseye"></i>
                            <input id="zipcode" type="number" v-model="form2.zipcode" placeholder="334231">
                        </div>
                        <span class="span">Please enter correct zipcode</span>
                    </div>
                </div>
            </div>
            <div id="order-form-3" class="order-form" :class="{active : forms=== 3}">
                <div class="order-form-container">
                    <div class="radio">
                        <div class="radio-btn">
                            <input id="r1" type="radio" name="radio" disabled :value="false" v-model="isDisablePay">
                            <label for="r1">Pay now</label>
                        </div>
                        <div class="radio-btn">
                            <input id="r2" type="radio" name="radio" :value='true' v-model="isDisablePay">
                            <label for="r2">Pay on delivery</label>
                        </div>
                    </div>
                    <div class="payment-form">
                        <div class="input-text">
                            <label for="name-card">Name on card</label>
                            <div class="input">
                                <i class="fal fa-user-friends"></i>
                                <input id="name-card" type="text" :disabled='isDisablePay' v-model="form3.card_bio" placeholder="John Smith">
                            </div>
                            <span class="span">Please enter correct name</span>
                        </div>
                        <div class="input-text">
                            <label for="number-card">Card number</label>
                            <div class="input">
                                <i class="fal fa-credit-card-blank"></i>
                                <input id="number-card" type="text"  v-model="form3.card_number" :disabled='isDisablePay' maxlength="19" placeholder="2222 2222 2222 2222">
                            </div>
                            <span class="span">Please enter correct name</span>
                        </div>
                        <div class="input-text">
                            <label for="expiration">Expiration</label>
                            <div class="input">
                                <i class="fal fa-calendar-alt"></i>
                                <input id="expiration" type="text" v-model="form3.card_date" :disabled='isDisablePay' maxlength="5" placeholder="01 08">
                            </div>
                            <span class="span">Please enter correct name</span>
                        </div>
                        <div class="input-text">
                            <label for="cvc">CVC</label>
                            <div class="input">
                                <i class="fal fa-key"></i>
                                <input id="cvc" type="text" :disabled='isDisablePay' v-model="form3.card_cvv" placeholder="111">
                            </div>
                            <span class="span">Please enter correct name</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="order-form-4" class="order-form" :class="{active : forms=== 4}">
                <div class="order-form-container last">
                    <h4>Sucsses</h4>
                </div>
            </div>
            <div class="buttons">
                <div @click="$emit('closeOrder')" class="btn-cancel">
                    <p>Cancel</p>
                </div>
                <div @click="NextOrderForm()" class="btn-next">
                    <p>Next</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Order',
    props:{
        goods:{
            required:true
        },
        gift:{
            
        }
    },
    data:()=>({
        tax:0,
        shipping:0,
        isDisablePay:true,
        forms: 1,
        order:{
            country:''
        },
        form1:{
            first_name:'',
            last_name:'',
            email:'',
            phone:''
        },
        form2:{
            country:'',
            city:'',
            address:'',
            zipcode:''
        },
        form3:{
            card_bio:'',
            card_number:'',
            card_date:'',
            card_cvv:''
        },
        form4:{

        },
        numberCard:'',
        cardDate:'',
        validation:{
            fn:true,
            ln:true,
            email:true,
            phone:true,
            country:true,
            city:true,
            address:true,
            zipcode:true
        },
        discount:0
    }),
    mounted(){
    },
    watch:{
        forms: function(new_val, old_val){
            if(new_val === 4) this.$router.push('/')
        }
    },
    methods:{
        Total(){
            let Price ={}
            Price.goods = 0
            this.goods.forEach(item=>{
                Price.goods= Price.goods+(item.price*item.count)
            })
            if(this.gift !=null){
                if(this.gift.type==='procent'){
                    this.discount = Price.goods / 100 * this.gift.discount
                }else this.discount = this.gift.discount
            }
            Price.total = ((Price.goods+this.tax+this.shipping)-this.discount)
            if(Price.total <0) Price.total = 0
            return Price
        },
        async SetOrder(){
            const Price = this.Total()
            let Data ={
                date_order: new Date().toString(),
                goods: this.goods,
                email: this.form1.email,
                phone: this.form1.phone,
                gift: this.discount,
                tax: this.tax,
                goods_price: Price.goods,
                total:Price.total,
                shipping:this.shipping,
                bio: this.form1.first_name+' '+this.form1.last_name,
                address: this.form2.country+','+ this.form2.city+','+this.form2.address+','+this.form2.zipcode,
                payment: this.isDisablePay ? 'pay on delivery' : 'pay on card'
            }
            try{
                const key = await this.$store.dispatch('setOrder', Data)
                Data.order_number = key
                let name  =[]
                this.goods.map(item=>{
                    name.push(item.product_name+' X'+item.count+' $'+item.price+' size: '+item.select_size)
                })
                Data.company="AirSoft, Canada, Toronto, 12-str 34, 1-323-44-34-3445"
                Data.goods = name.toString()
                this.$getCheck(Data)
                this.$store.dispatch('removeCartItems')
            }
            catch(e){}
        },
        Validet(value){
            if(value===1){
                this.validation.fn = this.$valid('name', this.form1.first_name)
                this.validation.ln = this.$valid('name', this.form1.last_name)
                this.validation.email = this.$valid('email', this.form1.email)
                this.validation.phone = this.$valid('phone', this.form1.phone)
                
                if(this.validation.fn && this.validation.ln && this.validation.email && this.validation.phone){
                    return true
                }else return false
            }
            if(value===2){
                this.validation.country= this.$valid('empty', this.form2.country)
                this.validation.city= this.$valid('empty', this.form2.city)
                this.validation.address= this.$valid('empty', this.form2.address)
                this.validation.zipcode= this.$valid('empty', this.form2.zipcode)

                if(this.validation.country && this.validation.city && this.validation.address && this.validation.zipcode){
                    return true
                }else return false
            }
            if(value===3){
                this.SetOrder()
                return true
            }
        },
        NextOrderForm(){
            if(this.Validet(this.forms)){
                this.forms++
            }
        }
    }
}
</script>