import firebase from 'firebase/app'

export default{
    actions:{
        async isAlreadyTaken({dispatch, commit}, gift){
            try{
                let info=''
                await firebase.database().ref('/gift').orderByChild('code').equalTo(gift).once('value', snapshot=>{
                    info = snapshot.val()
                })
                if(info != null){
                    return true
                }else return false
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async AddGift({dispatch, commit}, {type, code, discount}){
            try{
                await firebase.database().ref('/gift').push({
                    type,
                    code,
                    discount
                })
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        },
        async GetGift({dispatch, commit}, gift){
            try{
                let info=''
                await firebase.database().ref('/gift').orderByChild('code').equalTo(gift).once('value', snapshot=>{
                    info = snapshot.val()
                })
                return info
            }
            catch(e){
                commit('setError', e)
                throw e
            }
        }
    }
}