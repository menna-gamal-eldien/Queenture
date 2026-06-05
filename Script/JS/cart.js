let table = document.querySelector(".table");
let shopbtn = document.querySelector(".buttons button:nth-of-type(1)");
let updatebtn = document.querySelector(".buttons button:nth-of-type(2)");
let checkbtn = document.querySelector(".bill button");

let subtotal = document.querySelector(".bill .subtotal span");
let shipping = document.querySelector(".bill .shipping span");
let total = document.querySelector(".bill .total span");

let Cart_T = Get_Storage("Cart", true, false);

updatebtn.addEventListener("click", _ => {

    let items = [];

    let vals = document.querySelectorAll(".quantity span");
    vals.forEach(v => {
        items.push({
            "item_id": v.getAttribute("data-id"),
            "quantity": v.innerHTML,
            "color": v.getAttribute("data-color")
        })
    })


    items.forEach(item => {
        Cart_T.forEach(it => {
            if (it["id"] === item["item_id"] && it["color"] === item["color"]) {
                it["quantity"] = item["quantity"];
            }
        })
    })

    Add_Storage("Cart", Cart_T, true, false);

    cart.lastElementChild.innerHTML = Cart_T.length;
    cart.classList.add("active");
    let tot = 0;
    let subs = document.querySelectorAll(".table .subtotal");
    subs.forEach(s => tot += +s.innerHTML.substring(1));

    subtotal.innerHTML = "$" + tot;
    shipping.innerHTML = "$150";
    total.innerHTML = "$" + (tot + 150);
    SetNoti("good", "Updated Cart");
})


function SetSubtotal(btn, quantity) {
    let sub = btn.parentNode.parentElement.parentElement.querySelector(".subtotal");
    let price = btn.parentNode.parentElement.parentElement.querySelector(".price").innerHTML.substring(1);
    sub.innerHTML = "$" + price * quantity;
}

function SetCart(Cart) {
    Cart.forEach(t => {
        let item = document.createElement("div");
        item.classList.add("item");

        let pic = document.createElement("div");
        pic.classList.add("pic", "R", "C");

        let close = document.createElement("div");
        close.classList.add("close", "R", "C");
        close.innerHTML = "X";
        close.addEventListener("click", _ => {
            Cart_T.splice(Cart_T.indexOf(Cart_T.find(i => i["id"] == t["id"] && i["color"] == t["color"])), 1);

            if (Cart_T.length == cart.lastElementChild.innerHTML - 1) {

                Add_Storage("Cart", Cart_T, true, false);

                cart.lastElementChild.innerHTML = Cart_T.length;
                cart.classList.add("active");

                SetNoti("good", "Item Removed From Cart");
                close.parentElement.parentElement.remove();
            }
            else SetNoti("bad", "Failed To Delete");
        });

        let img = document.createElement("img");
        img.src = t["image"];
        img.alt = "Item_Image";

        let name = document.createElement("span");
        name.innerHTML = t["name"];

        pic.append(close, img, name)

        let price = document.createElement("div");
        price.classList.add("price");
        price.innerHTML = "$" + t["price"];

        let quantity = document.createElement("div");
        quantity.classList.add("quantity", "R", "C");

        let val = document.createElement("span");
        val.innerHTML = t["quantity"];
        val.setAttribute("data-id", t["id"]);
        val.setAttribute("data-color", t["color"]);

        let change = document.createElement("div");
        change.classList.add("change", "R", "Col", "C");

        let min = document.createElement("div");
        min.classList.add("min");
        min.innerHTML = "-"

        let max = document.createElement("div");
        max.classList.add("max");
        max.innerHTML = "+"

        change.append(min, max);

        quantity.append(val, change);

        let color = document.createElement("div");
        color.classList.add("color");
        color.style.backgroundColor = t["color"];

        let subtotal = document.createElement("div");
        subtotal.classList.add("subtotal");
        subtotal.innerHTML = "$" + t["price"] * t["quantity"];

        item.append(pic, price, quantity, color, subtotal);

        table.insertBefore(item, table.children[1]);
    })

    let mins = document.querySelectorAll(".table .item .min");
    let maxs = document.querySelectorAll(".table .item .max");

    mins.forEach(min => {
        min.addEventListener("click", _ => {
            let val = min.parentElement.parentElement.children[0];
            if (val.innerHTML > 1) {
                val.innerHTML--;
                SetSubtotal(min, val.innerHTML);
            }
        })
    })
    maxs.forEach(max => {
        max.addEventListener("click", _ => {
            let val = max.parentElement.parentElement.children[0];
            if (val.innerHTML < 99) {
                val.innerHTML++;
                SetSubtotal(max, val.innerHTML);
            }
        })
    })

    updatebtn.click();
}

function START() {
    let All_Item = Get_Table("Item");
    let All_Item_img = Get_Table("Item_img");
    let Data = Get_Storage("Cart", true, false);

    if (Data) {
        Data.forEach(item => {
            let DBItem = All_Item[item["id"]];

            item["name"] = DBItem["name"];
            item["price"] = DBItem["price"] * (1 - (DBItem["discount_v"] / 100));
            item["image"] = All_Item_img.find(img => img["item_id"] == item["id"])["url"];
        })


        cart.lastElementChild.innerHTML = Data.length;
        cart.classList.add("active");
        SetCart(Data);
    }
    else {
        SetNoti("bad", "No Items In Cart");
    }
}
START();