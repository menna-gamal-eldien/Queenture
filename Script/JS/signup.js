let createbtn = document.querySelector(".signup input[type='submit']");
let input_parent = document.querySelectorAll("form .input");
let first_name = document.querySelector("input[name='first_name']");
let last_name = document.querySelector("input[name='last_name']");
let email = document.querySelector("input[name='email']");
let password = document.querySelector("input[name='password']");

let nameregex = new RegExp("[^a-zA-Z\\s]", "i"); // if False
let emailregex = new RegExp("^[a-zA-Z0-9_.]{5,}@gmail.com$", "i"); // if True
let passregex = new RegExp("^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$", "i"); // if True

function IsValid() {
    input_parent.forEach(p => p.classList.remove("error"));
    email.nextElementSibling.innerHTML = "Email Or Phone Is Invalid";
    let OK = true;

    if (nameregex.test(first_name.value.trim()) || first_name.value.trim() === "") {
        OK = false;
        first_name.parentElement.classList.add("error");
    }
    if (nameregex.test(last_name.value.trim()) || last_name.value.trim() === "") {
        OK = false;
        last_name.parentElement.classList.add("error");
    }
    if (!emailregex.test(email.value.trim()) || email.value.trim() === "") {
        OK = false;
        email.parentElement.classList.add("error");
    }
    if (!passregex.test(password.value.trim()) || password.value.trim() === "") {
        OK = false;
        password.parentElement.classList.add("error");
    }

    return OK;
}

createbtn.addEventListener("click", e => {
    e.preventDefault();
    if (IsValid()) {
        let fName = first_name.value;
        let lName = last_name.value;
        let em = email.value;
        let pass = password.value;

        let All_Acc = Get_Table("Account");

        let EMAIL_FOUND = false
        Object.keys(All_Acc).forEach(id => {
            if (All_Acc[id]["email"] == em) EMAIL_FOUND = true;
        })
        if (EMAIL_FOUND) {
            email.nextElementSibling.innerHTML = "This Email Is Assigned To An Account";
            email.parentElement.classList.add("error");
            return;
        }

        let Verify_code = Math.floor(Math.random() * 899999 + 100000);
        Add_Storage("Verify_Code_sign", Verify_code, false, false);

        let Personal = {
            "first_name": fName,
            "last_name": lName,
            "email": em,
            "passcode": pass,
        }
        Add_Storage("Person", Personal, true, false);

        window.open("validate.html", "_self");
    }
})