let Coupon_T = Get_Table("Coupon");
let Final_Coupons = [];

//  Get All Coupons
let User_Cou_T = Get_Table("User_Coupon").map(d => d["coupon_id"]);
User_Cou_T.forEach(id => {
    let IsThere = Coupon_T[id]["usednum"];

    if (IsThere) IsThere += 1;
    else IsThere = 1;

    Coupon_T[id]["usednum"] = IsThere;
})

Object.keys(Coupon_T).forEach(id => {
    let c = Coupon_T[id];

    if (
        (c["end_num"] && c["usednum"] >= c["end_num"]) ||
        (c["end_date"] && new Date() > new Date(c["end_date"]))
    ) {
        Coupon_T[id]["done"] = 1;
    }
})

let Parent = document.querySelector(".cardsholder");
let numitem = document.querySelector(".numitem span");
let max_cards = 20;
let max_call = Infinity;
let page = 0;

let filterbtn = document.querySelector(".filter button");
let resetbtn = document.querySelector(".filter button:last-of-type");
let inputs = document.querySelectorAll(".filter input");
let morebtn = document.querySelector(".more");

function SetFilter() {
    let maindivision = location.search.substring(1).split("&");
    let dict = {};

    maindivision.forEach(d => {
        let div = d.split("=");
        dict[div[0]] = div[1];
    })

    if (dict["name"]) document.querySelector("input[name='name']").value = dict["name"];
    if (dict["value"]) document.querySelector("input[name='value']").value = dict["value"];
    if (dict["discount"]) document.querySelector("input[name='discount']").value = dict["discount"];
    if (dict["date"]) document.querySelector("input[name='date']").value = dict["date"];
    if (dict["done"]) document.querySelector("input[name='done']").checked = true;

    GetFilter();
}
SetFilter();

function GetFilter(Delete = true) {
    let filter = {
        "name": "",
        "value": "",
        "discount": 0,
        "date": "",
        "done": 0
    }

    inputs.forEach(inp => {
        if (inp.name === "done") filter["done"] = inp.checked ? 1 : 0;
        else if (inp.name === "discount") filter["discount"] = +inp.value;
        else if (inp.value.trim() !== "") filter[inp.name] = inp.value;
    })

    let query = "";

    if (filter["name"].trim() !== "") query += "&name=" + filter["name"];
    if (filter["value"].trim() !== "") query += "&value=" + filter["value"];
    if (filter["discount"] > 0) query += "&discount=" + filter["discount"];
    if (filter["date"].trim() !== "") query += "&date=" + filter["date"];
    if (filter["done"]) query += "&done=" + filter["done"];

    if (page === 0) {
        Final_Coupons = [];

        Object.keys(Coupon_T).forEach(id => {
            let c = Coupon_T[id];

            if (
                (filter["name"] === "" || new RegExp(filter["name"]).test(c["name"])) &&
                (filter["value"] === "" || new RegExp(filter["value"]).test(c["value"])) &&
                (filter["date"] === "" || filter["date"] == c["end_date"]) &&
                (filter["discount"] === 0 || filter["discount"] == c["discount"]) &&
                (filter["done"] == c["done"])
            ) {
                c["id"] = id;
                Final_Coupons.push(c);
            }
        })
    }


    let Final = Final_Coupons.slice(page * max_cards, max_cards);

    window.history.pushState({}, "", "?" + query.substring(1));
    numitem.innerHTML = Final_Coupons.length;
    max_call = Final_Coupons.length;
    page++;

    if (max_cards * page > max_call) {
        morebtn.classList.add("disabled");
    }
    else {
        morebtn.classList.remove("disabled");
    }

    SetCards(Final, Delete);
}

function SetCards(AllCards, Delete) {
    if (Delete) Parent.innerHTML = "";
    GenerateCards(AllCards);
}

filterbtn.addEventListener("click", _ => {
    page = 0;
    GetFilter();
})

morebtn.addEventListener("click", _ => {
    if (morebtn.classList.contains("disabled")) return;
    GetFilter(false);
})

resetbtn.addEventListener("click", _ => {
    inputs.forEach(inp => {
        inp.checked = false;
        inp.value = "";
    })
    page = 0;
    GetFilter();
})


function GenerateCards(Items) {
    Items.forEach(coupon => {
        let card = document.createElement("div");
        card.classList.add("coupon", "R", "C");

        let name = document.createElement("div");
        name.innerHTML = coupon["name"];

        let val = document.createElement("div");
        val.innerHTML = coupon["value"];

        let dis = document.createElement("div");
        dis.innerHTML = "-" + coupon["discount"] + "%";

        let left = document.createElement("div");
        left.innerHTML = coupon["end_num"];

        let date = document.createElement("div");
        date.innerHTML = coupon["end_date"];

        let num = document.createElement("div");
        num.innerHTML = coupon["usednum"] ?? 0;

        let done = document.createElement("div");
        done.classList.add("done");
        if (coupon["done"]) done.classList.add("end");


        card.append(name, val, dis, left, date, num, done);
        Parent.append(card);
    })
}

let addbtn = document.querySelector(".addnew");
let add_win = document.querySelector(".addcoupon");
let add_inputs = document.querySelectorAll(".overflow input");
let add_cancel = document.querySelector(".overflow .underline");
let add_confirm = document.querySelector(".overflow button:not(.underline)");

addbtn.addEventListener("click", _ => add_win.classList.add("active"));
add_cancel.addEventListener("click", _ => add_win.classList.remove("active"));
add_confirm.addEventListener("click", _ => {
    let data = {
        "name": "",
        "value": "",
        "discount": 0,
        "end_num": null,
        "end_date": null,
        "done": 0
    }

    add_inputs.forEach(inp => {
        if (["name", "value"].includes(inp.name)) data[inp.name] = inp.value.trim();
        else if (inp.name === "discount") data["discount"] = +inp.value;
        else if (inp.name === "end") {
            if (inp.checked) {
                let next = inp.nextElementSibling;
                data["end_" + inp.value] = inp.value == "num" ? +next.value : next.value;
            }
        }
    })


    if (
        data["name"].trim() == "" ||
        data["value"].trim() == "" ||
        isNaN(data["discount"]) ||
        (!data["end_num"] && !data["end_date"])
    ) {
        SetNoti("bad", "You Need To Fill All Fields");
        return;
    }

    let id = Get_Next_ID("Coupon");

    Add_To("Coupon", id, data);

    SetNoti("good", "Coupon Added");
    SetNoti("good", "Reload The Page To See Result");
    add_inputs.forEach(inp => {
        if (inp.name !== "end") inp.value = "";
    })
    add_win.classList.remove("active");
})