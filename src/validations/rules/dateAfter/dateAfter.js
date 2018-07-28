
function allowDate(value){

    let today = new Date()

    let dateUser = value.split('/')
    dateUser = new Date(dateUser[2]+'-'+dateUser[1]+'-'+dateUser[0]+'T23:59:59Z')

    if (today.getTime() > dateUser.getTime()){
        return false
    }else{
        return true
    }

}

export default allowDate