let Fav_T = Get_Table("Favorite")[ID] ?? [];
let Item_T = Get_Table("Item");
let Item_img_T = Get_Table("Item_img");

let wishlist = document.querySelector(".wishlist .items");
let wishrand = document.querySelector(".wishrand .cards");
let flashsales = document.querySelector(".flashsales .cards");

let bestselling = document.querySelector(".bestselling .cards");
let random = document.querySelector(".random .cards");
let newarrival = document.querySelector(".newarrival .cards");

// 0 => normal      1 => new arrival    2 => wishlist
if (wishlist) {
    let items = [];

    Fav_T.forEach(id => {
        items.push({
            id: id,
            name: Item_T[id]["name"],
            price: Item_T[id]["price"],
            review_n: Item_T[id]["review_n"],
            review_v: Item_T[id]["review_v"],
            images: Item_img_T.find(e => e["item_id"] == id)["url"],
            discount: Item_T[id]["discount"],
            discount_v: Item_T[id]["discount_v"],
            new: Item_T[id]["new"]
        })
    })

    document.querySelector(".location").innerHTML = "<span>Wishlist (" + items.length + ")</span>";
    GenerateCards(items, wishlist, 2);
}
if (wishrand) {
    let num = 4;
    let items = [];

    Object.keys(Item_T).forEach(id => {
        let item = Item_T[id];

        if (!item["instock"] || Fav_T.includes(id.toString())) return;

        items.push({
            id: id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],
            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],
            images: Item_img_T.find(i => i["item_id"] == id)["url"],
            favorite: Fav_T.includes(id)
        })
    })


    let final = [];
    items.sort(_ => Math.random() > 0.5 ? -1 : 1);
    if (items.length < num) final = items;
    else final = items.slice(0, num);

    GenerateCards(final, wishrand);
}
if (flashsales) {
    let num = 16;
    let items = [];

    Object.keys(Item_T).forEach(id => {
        let item = Item_T[id];

        if (!item["instock"]) return;

        items.push({
            id: id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],
            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],
            images: Item_img_T.find(i => i["item_id"] == id)["url"],
            favorite: Fav_T.includes(id)
        })
    })


    let final = [];
    items.sort((a, b) => a["discount_v"] > b["discount_v"]);
    if (items.length < num) final = items;
    else final = items.slice(0, num);

    GenerateCards(final, flashsales);
}
if (bestselling) {
    let num = 16;
    let items = [];

    Object.keys(Item_T).forEach(id => {
        let item = Item_T[id];

        if (!item["instock"]) return;

        items.push({
            id: id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],
            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],
            images: Item_img_T.find(i => i["item_id"] == id)["url"],
            favorite: Fav_T.includes(id)
        })
    })

    let final = [];
    items.sort((a, b) => a["num_sold"] > b["num_sold"]);
    if (items.length < num) final = items;
    else final = items.slice(0, num);

    GenerateCards(final, bestselling);
}
if (random) {
    let num = 32;
    let items = [];

    Object.keys(Item_T).forEach(id => {
        let item = Item_T[id];

        if (!item["instock"]) return;

        items.push({
            id: id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],
            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],
            images: Item_img_T.find(i => i["item_id"] == id)["url"],
            favorite: Fav_T.includes(id)
        })
    })


    let final = [];
    items.sort(_ => Math.random() > 0.5 ? -1 : 1);
    if (items.length < num) final = items;
    else final = items.slice(0, num);

    GenerateCards(final, random);
}
if (newarrival) {
    let num = 4;
    let items = [];

    Object.keys(Item_T).forEach(id => {
        let item = Item_T[id];

        if (!item["instock"]) return;

        items.push({
            id: id,
            name: item["name"],
            price: item["price"],
            review_n: item["review_n"],
            review_v: item["review_v"],
            discount: item["discount"],
            discount_v: item["discount_v"],
            new: item["new"],
            images: Item_img_T.find(i => i["item_id"] == id)["url"],
            favorite: Fav_T.includes(id)
        })
    })


    let final = [];
    items.sort((a, b) => a["new"] > b["new"]);
    if (items.length < num) final = items;
    else final = items.slice(0, num);

    GenerateCards(final, newarrival, 1);
}

function GenerateCards(Items, Parent, Special = 0) {
    Items.forEach(Item => {
        let card = document.createElement("div");
        card.classList.add("card", "R", "Col");

        let imgdiv = document.createElement("a");
        imgdiv.classList.add("image", "remove");
        imgdiv.href = "./Store/item.html?id=" + Item["id"];
        imgdiv.target = "_self";

        let img = document.createElement("img");
        img.src = Item["images"];
        img.alt = "Item_image";

        let infodiv = document.createElement("div");
        infodiv.classList.add("infodiv");

        if (Special === 1) {
            let link = document.createElement("a");
            link.classList.add("remove");
            link.href = "./store/item.html?id=" + Item["id"];
            link.style.cssText = "height:100%;width:100%;";
            link.append(img);

            infodiv.innerHTML = Item["name"];
            card.append(link, infodiv);
        }
        else {
            infodiv.innerHTML = "See Details";
            imgdiv.append(img, infodiv);

            if (Special === 2) {
                let del = document.createElement("div");
                del.classList.add("del");
                let svg = document.querySelector(".delsvg.hide").cloneNode(true);
                svg.classList.remove("hide");
                del.append(svg);
                del.addEventListener("click", e => {
                    e.stopPropagation();

                    if (ID == -1) {
                        SetNoti("ok", "You Have To Be Signed In");
                        return;
                    }

                    Remove_From("Favorite", Item["id"]);

                    del.parentElement.parentElement.remove()
                    SetNoti("good", "Removed From Wishlist");
                })
                imgdiv.append(del);
            }
            else {
                let heart = document.createElement("div");
                heart.classList.add("heart");
                if (Item["favorite"]) heart.classList.add("active");
                heart.addEventListener("click", e => {
                    e.stopPropagation();
                    if (ID == -1) {
                        SetNoti("ok", "You Must Be Signed In");
                        return;
                    }

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
                })

                let svg = document.querySelector(".heartsvg.hide").cloneNode(true);
                svg.classList.remove("hide");
                heart.append(svg);
                imgdiv.append(heart);
            }

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
        }

        Parent.append(card);
    })
}
