export const API_KEY='AIzaSyBskcND06EH8pI6KG9s_EtNYC0BAWfXEyk'


export const value_converter = (value)=>{

    if(value>=1000000){
       return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value
    }
}