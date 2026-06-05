let nameinput = document.querySelector("[name='name']");
let email = document.querySelector("[name='email']");
let phone = document.querySelector("[name='phone']");
let massage = document.querySelector("textarea");
let btn = document.querySelector("input[type='submit']");


let Personal = Get_Table("Account")[ID];

if (Personal["email"] === "" || Personal["phone"] === "") window.open("./account.html?fill=2", "_self");


nameinput.value = Personal["first_name"] + " " + Personal["last_name"];
email.value = Personal["email"];
phone.value = Personal["phone"];

btn.addEventListener("click", e => {
    e.preventDefault();

    if (massage.value.trim() === "") {
        SetNoti("ok", "You Cant Send An Empty Massage");
        return;
    }

    let final = {
        user_id: ID,
        user_name: Personal["first_name"] + " " + Personal["last_name"],
        email: Personal["email"],
        phone: Personal["phone"],
        message: massage.value
    }

    Add_To("Contact", -1, final);

    SetNoti("good", "Massage Sent");

    massage.value = "";
})