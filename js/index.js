let user
fetch('https://randomuser.me/api/')
.then(res => res.json())
.then(data => {
    const {name, phone, picture, dob, email, location} = data.results[0]
    const user = {
        fName: name.first,
        lName: name.last,
        birth: dob.date,
        location: location.country,
        email,
        phone,
        photo: picture.large,
    }
})

function setData(){

}