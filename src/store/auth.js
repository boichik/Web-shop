import firebase from 'firebase/app'

export default{
    state:{
      isLogin:false
    },
    mutations:{
      setLogin(state){
        state.isLogin = true
      },
      setLogout(state){
        state.isLogin = false
      }
    },
    getters:{
      getIsLogins: s=> s.isLogin
    },
    actions:{
        async CheckStatus({dispatch,commit}){
          try{
            const user =await firebase.auth().currentUser
            if(user != null){
              commit('setLogin')
            }
            else{
              commit('setLogout')
            }

          }
          catch(e){
            commit('setError', e)
            throw e
          }
        },
        async Login({dispatch, commit}, {email,password}){
          try{
              await firebase.auth().signInWithEmailAndPassword(email,password)
              commit('setLogin')
          }
          catch(e){
              commit('setError', e)
              throw e
          }
        },
        async Register({dispatch, commit}, {nickname, name, bio, photo, password, email, phone}){

          try{
              await firebase.auth().createUserWithEmailAndPassword(email, password)
              const uId = await dispatch('getUid')
              await firebase.database().ref(`/users/${uId}/info`).set({
                  nickname: nickname,
                  name: name,
                  bio: bio,
                  phone: phone,
                  isOnline: true,
                  isAdmin:false,
                  color: '#783939'
              })
              let data={}
              data[nickname] = uId
              await firebase.database().ref(`nicknames`).update(data)
              if(photo != null){
                  firebase.storage().ref(`/users/${uId}/avatar/`+'logo').putString(photo, 'data_url')
                  .then( res =>{
                      res.ref.getDownloadURL().then((downloadURL)=>{
                          firebase.database().ref(`/users/${uId}/info`).update({avatar: downloadURL})
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
      async LogOut({dispatch,commit}){
        try{
          await firebase.auth().signOut()
          commit('setLogout')
        }
        catch(e){
            commit('setError', e)
            throw e
        }
      },
      async getUid(){
          const user = await firebase.auth().currentUser
          return user ? user.uid : null
       }
    },

}