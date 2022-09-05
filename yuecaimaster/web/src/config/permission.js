import config from './config'
const PERMISSION_MAP = {
    ABUOT_PAGE = Symbol("ABOUT_PAGE")
}
export const init = ()=>{
    config.regist('permission',{
        SUPER_ADMIN:{
            [PERMISSION_MAP.ABUOT_PAGE]:true
        },
        ORIDNARY_ADMIN:{
            [PERMISSION_MAP.ABUOT_PAGE]:false
        }
    })
}