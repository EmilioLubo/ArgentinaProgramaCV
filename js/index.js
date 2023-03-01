let user

getData()

if(document.title === "Mi CV"){
    let button = document.querySelector('#button-change')
    button.addEventListener('click', e => {
        localStorage.clear()
        getData()
    })
}

function getData(){
    user = JSON.parse(localStorage.getItem("User"))
    if(!user){
        try{
            fetch('https://randomuser.me/api/')
            .then(res => res.json())
            .then(data => {
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
}

function setData(u){
    let photo = document.querySelector("#photo")
    let mail = document.querySelector("#mail")
    let tel = document.querySelector("#tel")
    let {data, others} = u
    photo.src = others.photo
    if(document.title === "Mi CV"){
        let info = document.querySelectorAll(".info")
        let i = 0
        for(let dato in data){
                info[i].innerHTML = data[dato]
             i++
        }
    }
    mail.href = "mailto:" + others.email
    tel.href = others.phone
}