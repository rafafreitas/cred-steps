// let date = {
//     dd: today.getDate(),
//     mm: today.getMonth()+1,
//     yyyy: today.getFullYear(),
//     yyyy_old: today.getFullYear() - 18,
// }
// if(date.dd < 10) date.dd ='0'+date.dd
// if(date.mm < 10) date.mm ='0'+date.mm

function actualdate(value){

    let pastDate = new Date()
    let pastYear = pastDate.getFullYear() - 18;
    pastDate.setFullYear(pastYear)

    let dateUser = value.split('/')
    dateUser = new Date(dateUser[2]+'-'+dateUser[1]+'-'+dateUser[0]+'T23:59:59Z')

    if (pastDate.getTime() < dateUser.getTime()){
        return false
    }else{
        return true
    }

}

export default actualdate