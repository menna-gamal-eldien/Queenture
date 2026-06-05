let related = document.querySelector(".related .cards");
const Item_ID = location.search.split("=")[1];

// Get Data Related To Item
// Item_T and Item_img_T are taken from generateCards.js

let Item_data = Item_T[Item_ID];

if (!Item_data) SetNoti("bad", "Item Not Found");

let User_fav = Get_Table("Favorite")[ID];

let final = {
    id: Item_ID,
    name: Item_data["name"],
    price: Item_data["price"],
    review_n: Item_data["review_n"],
    review_v: Item_data["review_v"],
    detail: Item_data["detail"],
    colors: Item_data["colors"].split("&"),
    dimension: Item_data["dimension"],
    weight: Item_data["weight"],
    material: Item_data["material"].split("&"),
    instock: Item_data["instock"],
    discount: Item_data["discount"],
    discount_v: Item_data["discount_v"],
    new: Item_data["new"],
    num_sold: Item_data["num_sold"],
    category: Item_data["category"],
    subcat: Item_data["subcat"],
    favorite: User_fav.includes(Item_ID) ? 1 : 0,
    images: Item_img_T.filter(d => d["item_id"] == Item_ID).map(d => d["url"])
}

related.setAttribute("data-cat", final["category"]);
related.setAttribute("data-subcat", final["subcat"]);
SetItem(final);
GetRelated(final["id"]);
// End Getting Data Related To Item

function SetItem(Item) {
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
        if (i == 0) div.classList.add("active");
        div.setAttribute("data-color", c);
        div.style.backgroundColor = c;
        div.addEventListener("click", _ => {
            document.querySelector(".iteminfo .colors div .active").classList.remove("active");
            div.classList.add("active");
        })
        colorParent.append(div);
    })

    document.querySelector(".iteminfo .itemdata .dimension span").innerHTML = Item["dimension"];
    document.querySelector(".iteminfo .itemdata .weight span").innerHTML = Item["weight"];
    document.querySelector(".iteminfo .itemdata .material span").innerHTML = Item["material"];

    let heartbtn = document.querySelector(".amount .heart");
    if (Item["favorite"]) heartbtn.classList.add("active");
    heartbtn.addEventListener("click", e => {
        e.stopPropagation();
        if (ID) {
            let bool = heart.classList.contains("active");

            if (bool) Remove_From("Favorite", Item["id"]);
            else Add_To("Favorite", -1, Item["id"]);

            if (!bool) {
                heart.classList.add("active");
                SetNoti("good", "Added To Wishlist");
            }
            else {
                heart.classList.remove("active");
                SetNoti("good", "Removed From Wishlist");
            }
        }
        else {
            window.open("login.html", "_self");
        }
    })

    let cart = document.querySelector(".cart");
    let buybtn = document.querySelector(".iteminfo button");
    if (!Item["instock"]) buybtn.classList.add("disabled");
    buybtn.addEventListener("click", _ => {
        if (buybtn.classList.contains("disabled")) return;

        buybtn.classList.add("disabled");

        let data = {
            id: Item["id"],
            color: document.querySelector(".color.active").getAttribute("data-color"),
            quantity: +document.querySelector(".amount .val").innerHTML
        }

        let Sto_Cart = Get_Storage("Cart", true, false);
        if (Sto_Cart) Sto_Cart.push(data);
        else Sto_Cart = [data];

        Add_Storage("Cart", Sto_Cart, true, false);

        SetNoti("good", "Added To Cart");
        cart.lastElementChild.innerHTML = Sto_Cart.length;
        cart.classList.add("active");

        buybtn.classList.remove("disabled");

    })
}

function GetRelated(id) {
    let cat = related.getAttribute("data-cat");
    let subcat = related.getAttribute("data-subcat").split(",");

    let Final = [];

    Object.keys(Item_T).forEach(it_id => {
        let item = Item_T[it_id];

        if (Final.length > 3 || (item["category"] !== cat && !item["subcat"].split(",").some(it => subcat.includes(it)))) return;

        Final.push({
            id: it_id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],

            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],

            favorite: User_fav.includes(it_id) ? 1 : 0,
            images: Item_img_T.find(it => it["item_id"] === it_id)["url"]
        })
    })

    if (Final.length < 4) {
        let ids = [...Final.map(d => d["id"]), id];
        let total = Object.keys(Item_T).length;

        while (Final.length < 4) {
            let id_try = Math.floor(Math.random() * total);

            if (!ids.includes(id_try)) {
                ids.push(id_try);
                let item = Item_T[id_try];

                Final.push({
                    id: id_try,
                    name: item["name"],
                    price: item["price"],
                    review_n: item["review_n"],
                    review_v: item["review_v"],

                    discount: item["discount"],
                    discount_v: item["discount_v"],
                    new: item["new"],

                    favorite: User_fav.includes(id_try) ? 1 : 0,
                    images: Item_img_T.find(it => it["item_id"] === id_try)["url"]
                })
            }
        }
    }

    GenerateCards(Final, related);
}

let val = document.querySelector(".iteminfo .val");
document.querySelector(".iteminfo .min").addEventListener("click", _ => {
    if (val.innerHTML > 1) {
        val.innerHTML--;
    }
})
document.querySelector(".iteminfo .max").addEventListener("click", _ => val.innerHTML++)