export default{
    install(Vue, options){
        Vue.prototype.$valid = function(TYPE, VALUE){
            if(TYPE === 'email') return VALIDATION_EMAIL(VALUE)
            if(TYPE ==='name') return VALIDATION_NAME(VALUE.toLowerCase())
            if(TYPE==='phone') return VALIDATION_NUMBERS(VALUE)
            if(TYPE==='empty') return VALIDATION_TEXT(VALUE)
            if(TYPE==='array') return VALIDATION_ARRAY(VALUE)
            if(TYPE==='price') return VALIDATION_PRICE(VALUE)

        }
        Vue.prototype.$more_valid = function(ARRAY_OBJECT){

            ARRAY_OBJECT.forEach(element => {
                $valid(element.type, element.value)
            });
        }
        function VALIDATION_PRICE(price){
            if(!ISEMPTY(price)){
                if(price >=1) return true
                else return false
            }else return false

        }
        function VALIDATION_ARRAY(array){
            if(Array.isArray(array)){
               let result =  array.length > 0 ? true : false
               return result
            }else return false
        }
        function VALIDATION_TEXT(text){
            if(typeof text === 'number') text.toString()
            if(!ISEMPTY(text)){
                return true
            }else return false
        }
        function VALIDATION_NAME(text){
            if(!ISEMPTY(text)){
                const regex = new RegExp(/^[a-z]{3,10}$/)
                let result = regex.test(text)
                return result
            }else{
                return false
            }
        }
        function VALIDATION_NUMBERS(text){
            if(!ISEMPTY(text)){
                const regex = new RegExp(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)
                let result = regex.test(text)
                return result
            }else{
                return false
            }
        }
        function VALIDATION_EMAIL(text){
            if(!ISEMPTY(text)){
                const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)
                let result = regex.test(text)
                return result
            }else{
                return false
            }
        }
        function ISEMPTY(text){
            if(text === '' || text===null || text === 'undefined') return true
            else false
        }
    }
}