var generateLocationMessage =(from, latitude, longitude)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: Date.now()

    }
}

module.exports = {generateLocationMessage};