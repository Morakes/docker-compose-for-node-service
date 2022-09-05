import config from './config'
export const init = ()=>{
    config.regist('theme',{
        blue:{
            primary:'#007fff',
        },
        red:{
            primary:'red'
        }
    })
}
