import firebase from 'firebase/app'

export default{
    state:{
        Orders:[]
    },
    mutations:{
        SetOrders(state, data){
            state.Orders = data
        },
        RemoveOrders(state){
            state.Orders = []
        }
    },
    getters:{
        GetOrders : s => s.Orders
    },
    actions:{
        async setOrder({dispath, commit}, {date_order, goods, email, phone, gift, tax, goods_price, total, shipping, bio, address, payment}){
            try{
                var key =''
                await firebase.database().ref('/orders').push({
                    date_order,
                    goods,
                    email,
                    phone,
                    gift,
                    tax,
                    goods_price,
                    total,
                    shipping,
                    bio,
                    address,
                    payment,
                }).then(res=> {key = res.key})
                return key
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async GetLastOrderKey({dispath, commit}){
            try{
                let info = null
                await firebase.database().ref(`/orders`).limitToLast(1).once('value', snapshot=>{
                    info = Object.keys(snapshot.val()).map(key=> ({...snapshot.val()[key], id:key}))
                })
                if(info[0].id != null && info[0].id != 'undefined') return info[0].id
                else return null
            }
            catch(e){
                commit('setError', e)
                throw e
            }
            
        },
        async GetFirstOrderKey({dispath, commit}){
            try{
                let info = null
                await firebase.database().ref(`/orders`).limitToFirst(1).once('value', snapshot=>{
                    info = Object.keys(snapshot.val()).map(key=> ({...snapshot.val()[key], id:key}))
                })
                if(info[0].id != null && info[0].id != 'undefined') return info[0].id
                else return null
            }
            catch(e){
                commit('setError', e)
                throw e
            }
            
        },
        async fetchOrders({dispath, commit}, {LastKey, countLoad}){
            try{
                let Goods = []
                await firebase.database().ref(`/orders`).limitToLast(countLoad).once('value', snapshot=>{
                    if(snapshot.val() === null || snapshot.val() === 'undefined'){
                        Goods = []
                    }
                    var info = Object.keys(snapshot.val()).map(key=>({...snapshot.val()[key], id:key})).reverse()
                    Goods.push(...info)
                })
                commit('SetOrders', Goods)
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async fetchOrder({dispath, commit}, id){
            try{
                let info = (await firebase.database().ref(`/orders/${id}`).once('value')).val() || {}
                return info
            }
            catch(e){

            }
        }
    }
}