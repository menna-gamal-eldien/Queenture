document.querySelector(".vericode").innerHTML = Get_Storage("Verify_Code", false, false);

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

    let verify_code = Get_Storage("Verify_Code", false, false);

    if (data == verify_code) {
        let interval = Math.floor(Math.random() * 5 + 5);
        let code = "";

        while (code.length < 100) {
            code += Math.floor(Math.random() * 9);
        }

        code = code.split("");
        code[0] = data[0];
        code[interval] = data[1];
        code[2 * interval] = data[2];
        code[3 * interval] = data[3];
        code[4 * interval] = data[4];
        code[5 * interval] = data[5];

        code.unshift(interval);
        code = code.join("");

        window.open("passchange.html?c=" + code, "_self");
    }
    else {
        SetNoti("bad", "Validation Code Is Wrong");
    }
})