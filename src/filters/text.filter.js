import Vue from 'vue'
export default function textFilter(value, type){
    if(type=='sidebar'){
        if(value < 10) return `0${value}`
        else value
    }
}