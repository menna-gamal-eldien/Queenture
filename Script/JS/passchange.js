let pass = document.querySelector("input[name='newpassword']");
let conf = document.querySelector("input[name='confirmpass']");
let subm = document.querySelector(".content button");

let passregex = new RegExp("^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$", "i"); // if True


subm.addEventListener("click", _ => {
    if (!passregex.test(pass.value.trim()) || pass.value.trim() === "") {
        SetNoti("bad", "Password Is Invalid");
        SetNoti("ok", "Must Contain Upper and Lower Case");
        SetNoti("ok", "Must Contain Numbers");
        SetNoti("ok", "Must Contain Special Symbols");
        SetNoti("ok", "Must Be Longer Than 8");
        return;
    }

    if (conf.value.trim() !== pass.value.trim()) {
        SetNoti("bad", "Invalid Confirm Password");
        SetNoti("ok", "Confirm Password Must Be The Same as Password");
        return;
    }

    let newpassword = pass.value;

    let All_Acc = Get_Table("Account");

    let email = Get_Storage("Email", false, false);

    let Acc_ID = -1;
    Object.keys(All_Acc).forEach(id => {
        let acc = All_Acc[id];
        if (acc["email"] == email) {
            Acc_ID = id;
        }
    })

    let Person = All_Acc[Acc_ID];
    Person["passcode"] = newpassword;

    Add_To("Account", Acc_ID, Person);

    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Verify_Code");

    window.open("login.html", "_self");
})