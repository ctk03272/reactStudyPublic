export default function getTomorrow(date) {
    if(date instanceof Date){
        date.setDate(date.getDate()+1);
        return `${date.getFullYear()}-${date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`;
    }else{
        return null;
    }
};