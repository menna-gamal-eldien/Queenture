// Start Setting Item
let Item_ID = location.search.split("=")[1];
let Item_T = Get_Table("Item");
let Item_Img_T = Get_Table("Item_img");

let Item_data = Item_T[Item_ID];


///////////////////////////////////////// 
let delbtn = document.querySelector(".btns .del");
let editbtn = document.querySelector(".btns .edit");
let cancelbts = document.querySelectorAll(".overflow .buttons .underline");

let delwindow = document.querySelector(".confirmdelete");
let delwindow_delete = document.querySelector(".confirmdelete .buttons button:nth-of-type(2)");

let edititem = document.querySelector(".edititem");
let edititem_edit = document.querySelector(".edititem .buttons button:nth-of-type(2)");

let color_win = document.querySelector(".colorselect");
let color_select = document.querySelector(".colorselect button:nth-of-type(2)");
let color_parent = document.querySelector(".edititem input[name='colors']+.subs");

let subcat_win = document.querySelector(".subcatselect");
let subcat_parent = document.querySelector(".edititem input[name='subcat']+.subs");


if (!Item_data) {
    SetNoti("bad", "Item Not Found");
}
else {

    let final = {
        "id": Item_ID,
        "name": Item_data["name"],
        "price": Item_data["price"],
        "review_n": Item_data["review_n"],
        "review_v": Item_data["review_v"],
        "detail": Item_data["detail"],
        "colors": Item_data["colors"].split("&"),
        "dimension": Item_data["dimension"],
        "h": Item_data["h"],
        "w": Item_data["w"],
        "d": Item_data["d"],
        "weight": Item_data["weight"],
        "material": Item_data["material"].split("&"),
        "instock": Item_data["instock"],
        "discount": Item_data["discount"],
        "discount_v": Item_data["discount_v"],
        "new": Item_data["new"],
        "num_sold": Item_data["num_sold"],
        "category": Item_data["category"],
        "subcat": Item_data["subcat"],
        "images": Item_Img_T.filter(d => d["item_id"] == Item_ID).map(d => d["url"])
    }


    SetItem(final);
    // End Setting Item
}

cancelbts.forEach(btn => {
    btn.addEventListener("click", _ => {
        btn.parentElement.parentElement.parentElement.classList.remove("active");
    })
})

color_select.addEventListener("click", _ => {
    let d = document.createElement("div");
    d.style.background = color_win.querySelector("input").value;

    let close = document.createElement("div");
    close.classList.add("close");
    close.innerHTML = "X";
    close.addEventListener("click", _ => {
        close.parentElement.remove();
    })

    d.append(close);
    color_parent.append(d);
    color_win.classList.remove("active");
})

function SetItem(Item) {
    editbtn.addEventListener("click", _ => {
        Setwindow(Item);
        edititem.classList.add("active");
    })

    delbtn.addEventListener("click", _ => {
        delwindow.classList.add("active");
    })

    delwindow_delete.addEventListener("click", _ => {
        Remove_From("Item", Item["id"]);

        SetNoti("good", "Item Deleted");
        RemoveAll();
    })

    document.querySelector(".location span:last-of-type").innerHTML = Item["name"];
    document.querySelector(".iteminfo .title").innerHTML = Item["name"];

    let stars = document.querySelectorAll(".stars svg");
    for (let i = 0; i < Item["review_v"]; i++) {
        stars[i].classList.add("active");
    }

    let imageParent = document.querySelector(".images");
    if (Item["images"].length > 0) imageParent.innerHTML = "";
    Item["images"].forEach(i => {
        let image = document.createElement("img");
        image.src = i;
        image.alt = "Item_Image";
        if (Item["images"].length === 1) image.classList.add("all");
        imageParent.append(image);
    })

    document.querySelector(".iteminfo .rate .review span").innerHTML = Item["review_n"];

    let stockdiv = document.querySelector(".iteminfo .rate .stock");
    let stock = "In Stock"
    if (!Item["instock"]) {
        stock = "Not In Stock";
        stockdiv.classList.add("no");
    }
    stockdiv.innerHTML = stock;


    let price = document.querySelector(".iteminfo .price span");
    price.innerHTML = "$" + Item["price"];

    if (Item["new"]) document.querySelector(".rate .new").classList.add("active");
    if (Item["discount"]) {
        document.querySelector(".rate .discount").classList.add("active");
        document.querySelector(".rate .discount").innerHTML = "-" + Item["discount_v"] + "%";
        price.classList.add("discount");
        let newPrice = document.querySelector(".price span:not(.discount)");
        newPrice.classList.add("active");
        newPrice.innerHTML = "$" + Math.ceil(Item["price"] * (1 - (Item["discount_v"] / 100)));
    }


    document.querySelector(".iteminfo .detail").innerHTML = Item["detail"];

    let colorParent = document.querySelector(".iteminfo .colors div");
    Item["colors"].forEach((c, i) => {
        let div = document.createElement("div");
        div.classList.add("color");
        div.style.backgroundColor = c;
        colorParent.append(div);
    })

    document.querySelector(".iteminfo .itemdata .dimension span").innerHTML = Item["dimension"];
    document.querySelector(".iteminfo .itemdata .weight span").innerHTML = Item["weight"];
    document.querySelector(".iteminfo .itemdata .material span").innerHTML = Item["material"];
    document.querySelector(".iteminfo .data .num_sold span").innerHTML = Item["num_sold"];

    let catparent = document.querySelector(".iteminfo .data .cat .cats");
    let cat = document.createElement("div");
    cat.classList.add("block");
    cat.innerHTML = Item["category"];
    catparent.append(cat);

    let subcatparent = document.querySelector(".iteminfo .data .sub_cat .cats");
    Item["subcat"].split(",").forEach(i => {
        let subcat = document.createElement("div");
        subcat.classList.add("block");
        subcat.innerHTML = i;
        subcatparent.append(subcat);
    })
}

function RemoveAll() {
    delbtn.remove();
    editbtn.remove();
    delwindow.remove();

    document.querySelector(".location span:last-of-type").innerHTML = "Deleted Item";
    document.querySelector(".iteminfo .title").innerHTML = "Deleted Item";

    let stars = document.querySelectorAll(".stars svg");
    for (let i = 0; i < 5; i++) {
        stars[i].classList.remove("active");
    }

    document.querySelector(".images").innerHTML = "";
    document.querySelector(".iteminfo .rate .review span").innerHTML = "";
    document.querySelector(".iteminfo .rate .stock").innerHTML = "";
    document.querySelector(".iteminfo .price span").innerHTML = "";
    document.querySelector(".rate .new").remove();
    document.querySelector(".rate .discount").remove();
    document.querySelector(".price span:not(.discount)").remove();
    document.querySelector(".iteminfo .detail").innerHTML = "";
    document.querySelector(".iteminfo .colors div").innerHTML = "";
    document.querySelector(".iteminfo .itemdata .dimension span").innerHTML = "";
    document.querySelector(".iteminfo .itemdata .weight span").innerHTML = "";
    document.querySelector(".iteminfo .itemdata .material span").innerHTML = "";
    document.querySelector(".iteminfo .data .num_sold span").innerHTML = "";
    document.querySelector(".iteminfo .data .cat .cats").innerHTML = "";
    document.querySelector(".iteminfo .data .sub_cat .cats").innerHTML = "";
}

function Setwindow(Item) {
    edititem_edit.onclick = _ => {
        let inputs = document.querySelectorAll(".edititem [name]");

        let data = {
            id: Item["id"],
            name: "",
            detail: "",
            price: "",
            weight: "",
            w: "",
            h: "",
            d: "",
            dimension: "",
            discount: "",
            discount_v: "",
            instock: "",
            new: "",
            material: "",
            category: "",
            subcat: [],
            colors: []
        }

        inputs.forEach(inp => {
            if (inp.name === "instock" || inp.name === "new") data[inp.name] = +inp.checked;
            else if (["name", "detail", "category", "material"].includes(inp.name)) data[inp.name] = inp.value.trim() !== "" ? inp.value : inp.placeholder;
            else if (["colors", "subcat"].includes(inp.name)) return;
            else data[inp.name] = inp.value.trim() !== "" ? +inp.value : +inp.placeholder;
        })

        data["dimension"] = data["w"] + " x " + data["h"] + " x " + data["d"];
        data["discount"] = data["discount_v"] > 0 ? 1 : 0;

        let cols = document.querySelectorAll(".edititem input[name = 'colors']+.subs>div:not(:first-of-type)");
        cols.forEach(c => {
            data["colors"].push(c.style.background);
        })

        let subcs = document.querySelectorAll(".edititem input[name = 'subcat']+.subs>div:not(:first-of-type)");
        subcs.forEach(c => {
            data["subcat"].push(c.firstChild.data);
        })

        let Item_id = data["id"];
        delete data["id"];

        data["review_n"] = Item_data["review_n"];
        data["review_v"] = Item_data["review_v"];
        data["colors"] = data["colors"].join("&");
        data["subcat"] = data["subcat"].join(",");

        Add_To("Item", Item_id, data);

        SetNoti("good", "Item Edited");
        setTimeout(_ => window.open(location, "_self"), 1000);

        edititem.classList.remove("active");
    }

    let input = edititem.querySelectorAll("[name]");

    input.forEach(inp => {
        if (inp.name === "instock") inp.checked = Item["instock"] === 1;
        else if (inp.name === "new") inp.checked = Item["new"] === 1;
        else inp.placeholder = Item[inp.name];

        if (inp.name === "colors") {
            let addbtn = color_parent.firstElementChild.cloneNode(true);
            addbtn.addEventListener("click", _ => {
                color_win.classList.add("active");
            })

            color_parent.innerHTML = "";
            color_parent.append(addbtn);

            Item["colors"].forEach(c => {
                let d = document.createElement("div");
                d.style.background = c;

                let close = document.createElement("div");
                close.classList.add("close");
                close.innerHTML = "X";
                close.addEventListener("click", _ => {
                    close.parentElement.remove();
                })

                d.append(close);
                color_parent.append(d);
            })
        }

        if (inp.name === "subcat") {
            let addbtn = subcat_parent.firstElementChild.cloneNode(true);
            addbtn.addEventListener("click", _ => {
                subcat_win.classList.add("active");
            })

            subcat_parent.innerHTML = "";
            subcat_parent.append(addbtn);

            Item["subcat"].split(",").forEach(c => {
                let d = document.createElement("div");
                d.innerHTML = c;

                let close = document.createElement("div");
                close.classList.add("close");
                close.innerHTML = "X";
                close.addEventListener("click", _ => {
                    close.parentElement.remove();
                })

                d.append(close);

                subcat_parent.append(d);
            })
        }
    })
}


let Admin_T = Get_Table("Admindata");
let subcat = [];
Admin_T.forEach(cat => {
    if (cat["type"] == "subcat") subcat = cat["data"].split(",");
})

let p = subcat_win.querySelector(".subcats");
p.innerHTML = "";

subcat.forEach(s => {
    let div = document.createElement("div");
    div.innerHTML = s;
    div.addEventListener("click", _ => {
        let divs = div.cloneNode(true);

        let close = document.createElement("div");
        close.classList.add("close");
        close.innerHTML = "X";
        close.addEventListener("click", _ => {
            close.parentElement.remove();
        })

        divs.append(close);

        subcat_parent.append(divs);
        subcat_win.classList.remove("active");
    })

    p.append(div);
})
