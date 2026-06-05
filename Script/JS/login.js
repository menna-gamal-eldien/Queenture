let logbtn = document.querySelector(".logindata input[type='submit']");
let input_parent = document.querySelectorAll("form .input");
let email = document.querySelector("input[name='email']");
let password = document.querySelector("input[name='password']");

document.querySelector("input[type='submit']+span").addEventListener("click", _ => {
    email.parentNode.classList.remove("error");

    if (email.value.trim() === "") {
        OK = false;
        email.parentNode.classList.add("error");
        return;
    }

    let emailforget = email.value.trim();

    let All_Emails_Dict = Get_Table("Account");
    let All_Emails = [];
    Object.keys(All_Emails_Dict).forEach(id => All_Emails = All_Emails_Dict[id]["email"])


    if (!All_Emails.includes(emailforget)) {
        email.parentElement.classList.add("error")
        SetNoti("bad", "This Email Is Invalid");
        return;
    }

    let Verification_code = Math.floor(Math.random() * 899999 + 100000);
    Add_Storage("Verify_Code", Verification_code, false, false);
    Add_Storage("Email", emailforget, false, false);


    window.open("passforget.html", "_self");
})

function IsValid() {
    input_parent.forEach(p => p.classList.remove("error"));
    let OK = true;

    if (email.value.trim() === "") {
        OK = false;
        email.parentNode.classList.add("error");
    }

    if (password.value.trim() === "") {
        OK = false;
        password.parentNode.classList.add("error");
    }

    return OK;
}

logbtn.addEventListener("click", e => {
    e.preventDefault();
    if (IsValid()) {
        let em = email.value;
        let passcode = password.value;

        let All_Accounts = Get_Table("Account");

        let Acc = undefined;
        Object.keys(All_Accounts).forEach(id => {
            let current_acc = All_Accounts[id];

            if (current_acc["email"] === em) {
                Acc = {
                    id: id,
                    email: current_acc["email"],
                    passcode: current_acc["passcode"],
                    isAdmin: current_acc["isAdmin"],
                }
            }
        })

        if (!Acc) {
            email.parentElement.classList.add("error");
            return;
        }


        if (Acc["passcode"] !== passcode) {
            password.parentElement.classList.add("error");
            return;
        }

        Add_Storage("ID", Acc["id"], false);
        Add_Storage("IsAdmin", Acc["isAdmin"], false);
        Add_Storage("IsLogged", 1, false);


        if (Acc["isAdmin"] == 1) window.open("../Admin/account.html", "_self");
        else window.open("./account.html", "_self");
    }
})

