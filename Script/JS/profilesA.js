let Parent = document.querySelector(".cardsholder");
let numitem = document.querySelector(".numitem span");
let max_cards = 20;
let max_call = Infinity;
let page = 0;

let All_Accs = Get_Table("Account");
let Curr_Accs = [];

////////////////////////////////////////////////

let filterbtn = document.querySelector(".filter button");
let resetbtn = document.querySelector(".filter button:last-of-type");
let inputs = document.querySelectorAll(".filter input");
let morebtn = document.querySelector(".more");

function START() {
    let All_Order = Get_Table("Bill");
    let All_Return = Get_Table("User_Return").map(r => r["bill_id"]);
    let All_Cancel = Get_Table("User_Cancel").map(r => r["bill_id"]);

    Object.keys(All_Order).forEach(id => {
        let user = All_Order[id]["user_id"];

        if (!All_Accs[user]["orders"]) All_Accs[user]["orders"] = 0;
        if (!All_Accs[user]["returns"]) All_Accs[user]["returns"] = 0;
        if (!All_Accs[user]["cancels"]) All_Accs[user]["cancels"] = 0;

        if (All_Return.includes(id)) All_Accs[user]["returns"]++
        else if (All_Cancel.includes(id)) All_Accs[user]["cancels"]++

        All_Accs[user]["orders"]++
    })

    SetFilter();
}
START();

function SetFilter() {
    let maindivision = location.search.substring(1).split("&");
    let dict = {};

    maindivision.forEach(d => {
        let div = d.split("=");
        dict[div[0]] = div[1];
    })
    delete dict[""];


    Object.keys(dict).forEach(k => {
        if (k == "admin") document.querySelector("input[name='admin']").checked = true;
        else document.querySelector("input[name='" + k + "']").value = dict[k];
    })

    // if (dict["name"]) document.querySelector("input[name='name']").value = dict["name"];
    // if (dict["email"]) document.querySelector("input[name='email']").value = dict["email"];
    // // if (dict["phone"]) document.querySelector("input[name='phone']").value = dict["phone"];
    // if (dict["date"]) document.querySelector("input[name='date']").value = dict["date"];
    // if (dict["order"]) document.querySelector("input[name='order']").value = dict["order"];
    // if (dict["return"]) document.querySelector("input[name='return']").value = dict["return"];
    // if (dict["cancel"]) document.querySelector("input[name='cancel']").value = dict["cancel"];
    // if (dict["admin"]) document.querySelector("input[name='admin']").checked = true;

    GetFilter();
}

function GetFilter(Delete = true) {
    if (Delete) {
        let filter = {
            "name": "",
            "email": "",
            "date": "",
            "orders": -1,
            "returns": -1,
            "cancels": -1,
            "admin": 0
        }

        inputs.forEach(inp => {
            if (inp.name === "admin") filter["admin"] = +inp.checked
            else if (["orders", "returns", "cancels"].includes(inp.name)) {
                if (inp.value.trim() !== "") filter[inp.name] = +inp.value;
            }
            else filter[inp.name] = inp.value;
        })

        let query = "";

        if (filter["name"].trim() !== "") {
            query += "&name=" + filter["name"];
        }
        if (filter["email"].trim() !== "") {
            query += "&email=" + filter["email"];
        }
        if (filter["orders"] > -1 && filter["orders"] !== "") {
            query += "&orders=" + filter["orders"];
        }
        if (filter["returns"] > -1 && filter["returns"] !== "") {
            query += "&returns=" + filter["returns"];
        }
        if (filter["cancels"] > -1 && filter["cancels"].trim() !== "") {
            query += "&cancels=" + filter["cancels"];
        }
        if (filter["date"].trim() !== "") {
            query += "&date=" + filter["date"];
        }
        if (filter["admin"]) {
            query += "&admin=" + filter["admin"];
        }

        window.history.pushState({}, "", "?" + query.substring(1));

        Object.keys(All_Accs).forEach(id => {
            let acc = All_Accs[id];

            if (
                (acc["first_name"].includes(filter["name"]) || acc["last_name"].includes(filter["name"])) &&
                acc["email"].includes(filter["email"]) &&
                (filter["date"].trim() == "" || new Date(acc["date_created"]).getTime() == new Date(filter["date"]).getTime()) &&
                acc["isAdmin"] == +filter["admin"] &&

                (filter["orders"] == -1 || acc["orders"] == filter["orders"]) &&
                (filter["returns"] == -1 || acc["returns"] == filter["email"]) &&
                (filter["cancels"] == -1 || acc["cancels"] == filter["cancels"])
            ) {
                Curr_Accs.push(acc);
                Curr_Accs[Curr_Accs.length - 1]["id"] = id;
            }
        })

    }

    let Now_Accs = Curr_Accs.splice(page * max_cards, max_cards);

    numitem.innerHTML = Curr_Accs.length;
    max_call = Curr_Accs.length;
    page++;
    if (max_cards * page > max_call) {
        morebtn.classList.add("disabled");
    }
    else {
        morebtn.classList.remove("disabled");
    }
    SetCards(Now_Accs, Delete);
}

function SetCards(AllCards, Delete) {
    if (Delete) Parent.innerHTML = "";
    GenerateCards(AllCards);
}

filterbtn.addEventListener("click", _ => {
    page = 0;
    Curr_Accs = [];
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
    Curr_Accs = [];
    GetFilter();
})


function GenerateCards(Items) {
    Items.forEach(profile => {
        let card = document.createElement("a");
        card.classList.add("profilediv", "R", "Col", "remove");
        card.href = "./profile.html?id=" + profile["id"];
        card.target = "_self";

        let name1 = document.createElement("div");
        name1.classList.add("name");
        name1.innerHTML = profile["first_name"];

        let name2 = document.createElement("div");
        name2.classList.add("name");
        name2.innerHTML = profile["last_name"]

        let data = document.createElement("div");
        data.classList.add("data", "R", "C");

        let order = document.createElement("div");
        order.classList.add("orders");
        order.innerHTML = profile["orders"] ?? 0;

        let returns = document.createElement("div");
        returns.classList.add("returns");
        returns.innerHTML = profile["returns"] ?? 0;

        let cancel = document.createElement("div");
        cancel.classList.add("cancels");
        cancel.innerHTML = profile["cancels"] ?? 0;

        data.append(order, returns, cancel);
        card.append(name1, name2, data);
        Parent.append(card);
    })
}