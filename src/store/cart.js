let cart = window.localStorage.getItem('cart');

export default{  
    state:{
        cart: cart ? JSON.parse(cart) : [],
    },
    mutations:{
        setItem(state, item){
            state.cart.push(item)
        },
        updateItem(state, item){
            state.cart.map(i=>{
                if(i.id === item.id){
                    i = item
                }
            })
        },
        removeItem(state, item){
            let index = state.cart.indexOf(item);

            if (index > -1) {        
                state.cart.splice(index, 1);
            }
            
        },
        removeAllItems(state){
            state.cart = []
        },
        saveCart(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
    getters:{
        getItems: s=>s.cart
    },
    actions:{

        addCart({dispatch, commit, state}, good){
            let isFound = state.cart.find(item=> item.id === good.id)
            if(isFound){
                isFound.count++
                commit('updateItem', isFound)
            }else{
                good.count = 1
                commit('setItem', good)
            }
            commit('saveCart')
        },
        removeCartItem({dispatch, commit}, good){
            commit('removeItem', good)
            commit('saveCart')
        },
        removeCartItems({dispatch,commit}){
            commit('removeAllItems')
            commit('saveCart')
        }
        
    }
}