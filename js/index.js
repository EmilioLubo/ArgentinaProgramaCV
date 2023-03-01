let user = JSON.parse(localStorage.getItem("User"))
if(!user){
    try{
        fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            const {name, phone, picture, dob, email, location} = data.results[0]
            const date = new Date(dob.date).toLocaleDateString()
            const user = {
                data: {
                    fName: name.first,
                    lName: name.last,
                    birth: date,
                    location: location.country,
                },
                others: {
                    email: email,
                    phone: phone,
                    photo: picture.large,
                }
            }
            setData(user)
            localStorage.setItem("User", JSON.stringify(user))
        })
    } catch(err) {
        console.log(err.message)
    }
} else {
    setData(user)
}

function setData(u){
    let photo = document.querySelector("#photo")
    let info = document.querySelectorAll(".info")
    let mail = document.querySelector("#mail")
    let tel = document.querySelector("#tel")
    let i = 0
    let {data, others} = u
    photo.src = others.photo
    for(let dato in data){
            info[i].innerHTML = data[dato]
         i++
    }
    mail.href = "mailto:" + others.email
    tel.href = others.phone
}