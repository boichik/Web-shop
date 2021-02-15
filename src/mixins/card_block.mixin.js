export default{
    data:()=>({
        mainBlock:null
    }),
    mounted(){
        this.mainBlock = document.getElementById('main-block');
        if(window.screen.width <=1024) this.mobileMainBlock();

        window.addEventListener('resize', (e)=>{
            if(e.target.innerWidth <= 1024){
                this.mobileMainBlock()
            }else{
                this.desctopMainBlock()
            }
        })
    },
    methods:{
        mobileMainBlock(){
            if(!this.mainBlock.classList.contains('scroll')) 
                    this.mainBlock.classList.add('scroll')
        },
        desctopMainBlock(){
            if(this.mainBlock.classList.contains('scroll'))
                    this.mainBlock.classList.remove('scroll')
        }
    },
    beforeDestroy(){
        this.desctopMainBlock()
    }
}