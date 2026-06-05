document.querySelector(".vericode").innerHTML = Get_Storage("Verify_Code_sign", false, false);

let inputs = document.querySelectorAll(".inputs input");

inputs[0].focus();

inputs.forEach((inp, i) => {
    inp.addEventListener("input", _ => {
        if (i + 1 < 6 && inp.value != "") inputs[i + 1].focus();
        else if (i + 1 == 6) inp.blur();
    })

    inp.addEventListener("keydown", e => {
        if (e["key"] == "Backspace" && inp.value == "" && i - 1 > -1) {
            inputs[i - 1].focus();
        }
    })
})

let submitbtn = document.querySelector(".content button");
submitbtn.addEventListener("click", _ => {
    data = "";
    inputs.forEach(inp => data += inp.value);

    let Verify = Get_Storage("Verify_Code_sign", false, false);

    console.log(Verify, data);
    if (data == "" || Verify != data) {
        SetNoti("bad", "Validation Code Is Wrong");
        SetNoti("ok", "Try Again");
        return;
    }

    let New_Person = undefined;
    if (Get_Storage("Person", true, false)) {
        New_Person = Get_Storage("Person", true, false);
        New_Person["phone"] = "Not Added";
        New_Person["isAdmin"] = 0;
        New_Person["date_created"] = new Date();
    }
    else {
        SetNoti("ok", "What Are You Doing Here");
        SetNoti("ok", "GO BACK!!");
        return;
    }

    let new_id = Get_Next_ID("Account");

    Add_To("Account", new_id, New_Person);

    sessionStorage.removeItem("Verify_Code_sign");
    sessionStorage.removeItem("Person");

    window.open("login.html", "_self");
})