function START() {
    // Get Personal Data
    let PersonalData = Get_Table("Account")[ID];

    let Final = {
        "email": PersonalData["email"],
        "first_name": PersonalData["first_name"],
        "last_name": PersonalData["last_name"],
        "phone": PersonalData["phone"],
    };

    SetData(Final)
}
START();


function SetData(Data) {
    ////////////////////////////////////// Profile
    let inputs = document.querySelectorAll(".content input[type='text']");
    for (let i = 0; i < inputs.length - 3; i++) {
        if (Data[inputs[i].name] !== null) {
            inputs[i].placeholder = Data[inputs[i].name];
        }
    }
}

//////////////////////////////////////////////Set Navigation Bar
let logoutwindow = document.querySelector(".logoutwindow");
document.querySelector(".sidenav [data-for='logout']").addEventListener("click", _ => logoutwindow.classList.add("active"));
logoutwindow.querySelector("button:nth-of-type(1)").addEventListener("click", _ => logoutwindow.classList.remove("active"));
logoutwindow.querySelector("button:nth-of-type(2)").addEventListener("click", _ => {

    logoutwindow.classList.remove("active");

    localStorage.removeItem("IsLogged");
    localStorage.removeItem("IsAdmin");
    localStorage.removeItem("ID");

    sessionStorage.clear();
    window.open("../Home/about.html", "_self");
});

///////////////////////// Setting Profile Data
let input_parent = document.querySelectorAll("form[data-form='profile'] .input");
let first_name = document.querySelector("form[data-form='profile'] input[name='first_name']");
let last_name = document.querySelector("form[data-form='profile'] input[name='last_name']");
let email = document.querySelector("form[data-form='profile'] input[name='email']");
let phone = document.querySelector("form[data-form='profile'] input[name='phone']");

let password = document.querySelector("form[data-form='profile'] input[name='password']");
let new_password = document.querySelector("form[data-form='profile'] input[name='new_password']");
let confirm_password = document.querySelector("form[data-form='profile'] input[name='confirm_password']");

let profile_cancelbtn = document.querySelector("form[data-form='profile'] button");
let profile_confirmbtn = document.querySelector("form[data-form='profile'] input[type='submit']");

let nameregex = new RegExp("[^a-zA-Z\\s]", "i"); // if False
let emailregex = new RegExp("^[a-zA-Z0-9_.]{5,}@gmail.com$", "i"); // if True
let phoneregex = new RegExp("[^0-9]", "i"); // if false
let passregex = new RegExp("^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$", "i"); // if True

function IsValid() {
    input_parent.forEach(p => p.classList.remove("error"));
    email.nextElementSibling.innerHTML = "Email Or Phone Is Invalid";
    let OK = true;

    if (nameregex.test(first_name.value.trim()) && first_name.value.trim() !== "") {
        OK = false;
        first_name.parentElement.classList.add("error");
    }
    if (nameregex.test(last_name.value.trim()) && last_name.value.trim() !== "") {
        OK = false;
        last_name.parentElement.classList.add("error");
    }
    if (!emailregex.test(email.value.trim()) && email.value.trim() !== "") {
        OK = false;
        email.parentElement.classList.add("error");
    }
    if (phoneregex.test(phone.value.trim()) && phone.value.trim() !== "") {
        OK = false;
        phone.parentElement.classList.add("error");
    }

    if (password.value.trim() !== "") {
        if (!passregex.test(new_password.value.trim()) || new_password.value.trim() === "") {
            OK = false;
            new_password.parentElement.classList.add("error");
        }
        if (new_password.value.trim() !== confirm_password.value.trim() || confirm_password.value.trim() === "") {
            OK = false;
            confirm_password.parentElement.classList.add("error");
        }
    }

    return OK;
}

profile_cancelbtn.addEventListener("click", e => {
    e.preventDefault();
    input_parent.forEach(p => {
        p.firstElementChild.value = "";
        p.classList.remove("error");
    });
})

profile_confirmbtn.addEventListener("click", e => {
    e.preventDefault();

    if (
        first_name.value.trim() == "" &&
        last_name.value.trim() == "" &&
        email.value.trim() == "" &&
        phone.value.trim() == "" &&
        password.value.trim() == ""
    ) {
        SetNoti("bad", "You Must Enter A Value");
        return;
    }


    if (IsValid()) {

        let bod = {
            "first_name": first_name.value.trim() === "" ? first_name.placeholder : first_name.value.trim(),
            "last_name": last_name.value.trim() === "" ? last_name.placeholder : last_name.value.trim(),
            "email": email.value.trim() === "" ? email.placeholder : email.value.trim(),
            "phone": phone.value.trim() === "" ? phone.placeholder : phone.value.trim()
        }

        if (password.value.trim() !== "") {
            bod["passcode"] = password.value.trim();
            bod["new_passcode"] = new_password.value.trim();
            bod["confirm_passcode"] = confirm_password.value.trim();
        }


        // Checking Email If Used By Different Account

        let All_Acc = Get_Table("Account");

        let last_email = All_Acc[ID]["email"];
        let last_passcode = All_Acc[ID]["passcode"];
        let IsEmailUsed = false;

        Object.keys(All_Acc).forEach(id => {
            if (All_Acc[id]["email"] === bod["email"] && id !== ID) IsEmailUsed = true;
        })

        // Check Password
        let IsPassFailed = undefined;
        if (
            bod["passcode"] !== undefined &&
            bod["new_passcode"] !== undefined &&
            bod["confirm_passcode"] !== undefined
        ) {
            IsPassFailed = true;

            if (
                bod["passcode"] === last_passcode &&
                bod["new_passcode"] === bod["confirm_passcode"] &&
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$/.test(bod["new_passcode"])
            ) IsPassFailed = false;
        }


        if (IsEmailUsed) {
            email.nextElementSibling.innerHTML = "This Email Is Assigned To An Accout";
            email.parentElement.classList.add("error");
        } else if (IsPassFailed !== undefined && IsPassFailed) {
            SetNoti("bad", "Password Fields Are Invalid");
            password.parentElement.classList.add("error");
        }
        else if (
            /[^a-zA-Z\s]/.test(bod["first_name"]) ||
            /[^a-zA-Z\s]/.test(bod["last_name"]) ||
            /[^0-9]/.test(bod["phone"]) ||
            !/^[A-Za-z0-9_.]{5,}@gmail.com$/.test(bod["email"])
        ) {
            SetNoti("bad", "Invalid Format");
        }
        else {

            let personalData = {
                "first_name": bod["first_name"],
                "last_name": bod["last_name"],
                "email": bod["email"],
                "phone": bod["phone"],
                "passcode": last_passcode,
                "isAdmin": All_Acc[ID]["isAdmin"],
                "date_created": All_Acc[ID]["date_created"]
            }

            if (IsPassFailed === false) personalData["passcode"] = bod["new_passcode"]

            Add_To("Account", ID, personalData);

            SetNoti("good", "Profile Data Updated");
            for (let i = 0; i < input_parent.length - 3; i++) {
                if (input_parent[i].firstElementChild.value.trim() !== "") {
                    input_parent[i].firstElementChild.placeholder = input_parent[i].firstElementChild.value.trim();
                }
            }
        }

        input_parent.forEach(p => p.firstElementChild.value = "");
    }
})


//////////////////////////// Adding Enter Handler
let fields = document.querySelectorAll("*[data-form='profile'] input[type='text']");

fields.forEach(inp => {
    inp.onkeydown = e => {
        if (e.key === "Enter") profile_confirmbtn.click();
    }
})