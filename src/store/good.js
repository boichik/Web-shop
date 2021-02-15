import firebase from 'firebase/app'

export default{
    state:{
        aGoods:[]
    },
    getters:{
        getGoods: s=> s.aGoods
    },
    mutations:{
        setGoods(state, date){
            state.aGoods = date
        },
        removeGoods(state){
            state.aGoods = []
        }
    },
    actions:{
        async fetchAllGood({dispatch, commit}){
            try{
                await firebase.database().ref('/good').once('value', snapshot=>{
                    var Data = Object.keys(snapshot.val()).map(key=>({...snapshot.val()[key], id:key})).map(item=> item ={
                        ...item,
                        images : Object.keys(item.images).map(k=>({...item.images[k], id:k}))
                    })
                    
                    commit('setGoods', Data)
                })
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async fetchGood({dispatch, commit}, id){
            try{
                let info= (await firebase.database().ref(`/good/${id}`).once('value')).val() || {}
                info.images = info.images != null ? Object.keys(info.images).map(k=>({...info.images[k], id:k})) : []
                return info
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async CheckArticle({dispatch, commit}, article){
            try{
                let info = ''
                await firebase.database().ref('/good').orderByChild('article').equalTo(article).once('value', snapshot=>{
                    info = snapshot.val()
                })
                if(info != null) return true
                else return false
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async createGood({dispatch, commit}, {company_name, product_name, price, small_text, background_text, article,size, images}){
            try{
                var goodId=''
                await firebase.database().ref('/good').push({
                    company_name,
                    product_name,
                    price,
                    small_text,
                    background_text,
                    article,
                    size,
                    images:[]
                }).then(res=> goodId = res.key)
                for(var i=0; i<images.length; i++){     
                    firebase.storage().ref(`/good/${goodId}/`+`item_${i}`).put(images[i])
                    .then( res =>{
                        res.ref.getDownloadURL().then((downloadURL)=>{
                            firebase.database().ref(`/good/${goodId}/images`).push({link:downloadURL})
                        })

                    })
                    .catch(err=> console.log(err))
                }
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async deleteGood({dispatch, commit}, id){
            try{
                await firebase.database().ref(`/good/${id}`).remove()
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async updateGood({dispatch, commit}, {id,company_name, product_name, price, small_text, background_text, article,size, images, new_img}){
            try{
                await firebase.database().ref(`/good/${id}`).update({
                    company_name,
                    product_name,
                    price,
                    small_text,
                    background_text,
                    article,
                    size,
                    images,
                })
                if(new_img !='none'){
                    for(var i=0; i<new_img.length; i++){     
                        firebase.storage().ref(`/good/${id}/`+`item_${i}`).put(new_img[i])
                        .then( res =>{
                            res.ref.getDownloadURL().then((downloadURL)=>{
                                firebase.database().ref(`/good/${id}/images`).push({link:downloadURL})
                            })
    
                        })
                        .catch(err=> console.log(err))
                    }
                }
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        }
    }
}