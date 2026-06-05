let Parent = document.querySelector(".cardsholder");
let numitem = document.querySelector(".numitem span");
let max_cards = 20;
let max_call = Infinity;
let page = 0;

let All_Items = {};
let Curr_Items = [];

let additembtn = document.querySelector(".additem");
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

    if (dict["cat"]) dict["cat"].split("%").forEach(cat => document.querySelector("input[name='" + cat + "']").checked = true);
    if (dict["pmin"]) document.querySelector("input[name='price_min']").value = dict["pmin"];
    if (dict["pmax"]) document.querySelector("input[name='price_max']").value = dict["pmax"];
    if (dict["wmin"]) document.querySelector("input[name='weight_min']").value = dict["wmin"];
    if (dict["wmax"]) document.querySelector("input[name='weight_max']").value = dict["wmax"];
    if (dict["new"]) document.querySelector("input[name='new']").checked = true;
    if (dict["discount"]) document.querySelector("input[name='discount']").checked = true;
    if (dict["w"]) document.querySelector("input[name='w']").value = dict["w"];
    if (dict["h"]) document.querySelector("input[name='h']").value = dict["h"];
    if (dict["d"]) document.querySelector("input[name='d']").value = dict["d"];

    GetFilter();
}

function GetFilter(Delete = true) {
    if (Delete) {

        let filter = {
            "category": [],
            "price_min": 0,
            "price_max": Infinity,
            "new": false,
            "discount": false,
            "weight_min": 0,
            "weight_max": Infinity,
            "w": Infinity,
            "h": Infinity,
            "d": Infinity
        }
        inputs.forEach(inp => {
            let data_for = inp.parentElement.parentElement.getAttribute("data-for");

            if (data_for === "category") {
                if (inp.checked) filter["category"].push(inp.name);
            }
            else if (data_for === "special") filter[inp.name] = inp.checked;
            else if (inp.value.trim() !== "") filter[inp.name] = inp.value;
        })

        let query = "";

        if (filter["category"].length > 0) {
            query += "&cat=" + filter["category"].join("%");
        }
        if (filter["price_min"] > 0) {
            query += "&pmin=" + filter["price_min"];
        }
        if (filter["price_max"] < Infinity) {
            query += "&pmax=" + filter["price_max"];
        }
        if (filter["new"]) {
            query += "&new=1";
        }
        if (filter["discount"]) {
            query += "&disc=1";
        }
        if (filter["weight_min"] > 0) {
            query += "&wmin=" + filter["weight_min"];
        }
        if (filter["weight_max"] < Infinity) {
            query += "&wmax=" + filter["weight_max"];
        }
        if (filter["w"] < Infinity) {
            query += "&w=" + filter["w"];
        }
        if (filter["h"] < Infinity) {
            query += "&h=" + filter["h"];
        }
        if (filter["d"] < Infinity) {
            query += "&d=" + filter["d"];
        }

        window.history.pushState({}, "", "?" + query.substring(1));

        Object.keys(All_Items).forEach(id => {
            let item = All_Items[id];

            if (
                item["instock"] &&
                (filter["category"].length == 0 || filter["category"].includes(item["category"])) &&
                filter["price_min"] <= item["price"] &&
                filter["price_max"] >= item["price"] &&
                filter["w"] >= item["w"] &&
                filter["h"] >= item["h"] &&
                filter["d"] >= item["d"] &&
                filter["weight_max"] >= item["weight"] &&
                filter["weight_min"] <= item["weight"] &&
                +filter["new"] == item["new"] &&
                +filter["discount"] == item["discount"]
            ) {
                item["id"] = id;
                Curr_Items.push(item);
            }
        })

    }

    let Now_Item = Curr_Items.slice(page * max_cards, (page * max_cards) + max_cards);

    numitem.innerHTML = Curr_Items.length;
    max_call = Curr_Items.length;
    page++;
    if (max_cards * page > max_call) {
        morebtn.classList.add("disabled");
    }
    else {
        morebtn.classList.remove("disabled");
    }
    SetCards(Now_Item, Delete);


}

function SetCards(AllCards, Delete) {
    if (Delete) Parent.innerHTML = "";
    GenerateCards(AllCards, Parent);
}

filterbtn.addEventListener("click", _ => {
    page = 0;
    Curr_Items = [];
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
    Curr_Items = [];
    GetFilter();
})

function GenerateCards(Items, Parent) {
    Items.forEach(Item => {
        let card = document.createElement("div");
        card.classList.add("card", "R", "Col");

        let imgdiv = document.createElement("a");
        imgdiv.classList.add("image", "remove");
        imgdiv.href = "item.html?id=" + Item["id"];
        imgdiv.target = "_self";

        let img = document.createElement("img");
        img.src = Item["image"];
        img.alt = "Item_image";

        let infodiv = document.createElement("div");
        infodiv.classList.add("infodiv");

        infodiv.innerHTML = "See Details";
        imgdiv.append(img, infodiv);

        if (Item["new"]) {
            let newdiv = document.createElement("div");
            newdiv.classList.add("newdiv");
            newdiv.innerHTML = "New";
            imgdiv.append(newdiv);
        }

        if (Item["discount"]) {
            let newdiv = document.createElement("div");
            newdiv.classList.add("discount");
            if (Item["new"]) newdiv.classList.add("down");
            newdiv.innerHTML = "-" + Item["discount_v"] + "%";
            imgdiv.append(newdiv);
        }

        let info = document.createElement("div");
        info.classList.add("info", "R", "Col");

        let title = document.createElement("div");
        title.classList.add("title");
        title.innerHTML = Item["name"];

        let price = document.createElement("div");
        price.classList.add("price");
        price.innerHTML = "$" + Item["price"];

        let newPrice, priceholder;
        if (Item["discount"]) {
            priceholder = document.createElement("div");
            priceholder.classList.add("R", "priceholder");

            newPrice = document.createElement("div");
            newPrice.innerHTML = "$" + Math.ceil(Item["price"] * (1 - (Item["discount_v"] / 100)));
            newPrice.classList.add("price");
            price.classList.remove("price");
            price.classList.add("oldprice");

            priceholder.append(price, newPrice);
        }

        let rate = document.createElement("div");
        rate.classList.add("rate", "R");

        let stars = document.createElement("div");
        stars.classList.add("stars", "R")
        for (let j = 1; j < 6; j++) {
            let cop = document.querySelector(".starsvg.hide").cloneNode(true);
            cop.classList.remove("hide");
            if (j <= Item["review_v"]) {
                cop.classList.add("active");
            }
            stars.append(cop);
        }

        let val = document.createElement("div");
        val.classList.add("val");
        val.innerHTML = "(" + Item["review_n"] + ")";

        rate.append(stars, val);
        info.append(title);
        Item["discount"] ? info.append(priceholder) : info.append(price);
        info.append(rate);
        card.append(imgdiv, info);


        Parent.append(card);
    })
}

function START() {
    All_Items = Get_Table("Item");
    let Item_Img_T = Get_Table("Item_img");

    Object.keys(All_Items).forEach(id => {
        All_Items[id]["image"] = Item_Img_T.find(it => it["item_id"] == id)["url"];
    })


    SetFilter();
}
START();