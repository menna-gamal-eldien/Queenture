let Cart_T = Get_Storage("Cart", true, false);

function START() {
    // Personal Data
    let Personal = Get_Table("Account")[ID];
    Personal = {
        "first_name": Personal["first_name"],
        "last_name": Personal["last_name"],
        "phone": Personal["phone"],
        "email": Personal["email"]
    }

    // Get Address
    let All_Address = Get_Table("Address");
    let My_Address = [];

    Object.keys(All_Address).forEach(id => {
        let row = All_Address[id];

        if (row["user_id"] !== ID) return;

        My_Address.push({
            "id": id,
            "label": row["label"],
            "location": row["location"],
            "deatail": row["deatail"],
            "zip": row["zip"],
        })
    })

    if (
        Personal["email"] === "" ||
        Personal["phone"] === "" ||
        My_Address.length === 0
    ) {
        window.open("./account.html?fill=1", "_self");
    }


    let cartData = []
    let Item_Img = Get_Table("Item_img");
    let Item_T = Get_Table("Item");

    if (Cart_T) {
        Cart_T.forEach(item => {
            let Item = Item_T[item["id"]];

            cartData.push({
                "name": Item["name"],
                "price": item["quantity"] * Item["price"] * (1 - (Item["discount_v"] * 0.01)),
                "image": Item_Img.find(i => i["item_id"] === item["id"])["url"]
            })
        })
    }


    Setinput(Personal);
    Setaddress(My_Address);
    SetBill(cartData);

}
START();

function Setinput(Account) {
    document.querySelectorAll(".billdetail input").forEach(inp => {
        if (Account[inp.name]) inp.value = Account[inp.name];
    })
}

function Setaddress(Address) {
    let address = document.querySelector(".billdetail input[name='address']");
    let detail = document.querySelector(".billdetail input[name='detail']");
    let list = document.querySelector(".billdetail input+.list");

    address.addEventListener("click", _ => {
        list.classList.add("active");
    })

    Address.forEach(add => {
        let span = document.createElement("span");
        span.innerHTML = add["label"];
        span.addEventListener("click", e => {
            e.stopPropagation();
            address.value = add["label"];
            address.setAttribute("data-id", add["id"]);
            detail.value = add["detail"] ?? "No Specific Detail";
            list.classList.remove("active");
        })

        list.append(span);
    })
}

function SetBill(Bill) {
    let bill = document.querySelector(".bill");
    let total = 0;
    Bill.forEach(t => {
        let item = document.createElement("div");
        item.classList.add("item");

        let img = document.createElement("img");
        img.src = t["image"];
        img.alt = "Image_Item";

        let name = document.createElement("div");
        name.classList.add("name");
        name.innerHTML = t["name"];

        let price = document.createElement("div");
        price.classList.add("price");
        price.innerHTML = "$" + t["price"].toLocaleString("en-US");
        total += t["price"];

        item.append(img, name, price);
        bill.prepend(item);
    });

    let subtotal = document.querySelector(".subtotal span:nth-of-type(2)");
    let shipping = document.querySelector(".shipping span:nth-of-type(2)");
    let totaldiv = document.querySelector(".total span:nth-of-type(2)");

    subtotal.innerHTML = "$" + total.toLocaleString("en-US");
    shipping.innerHTML = "$" + (150).toLocaleString("en-US");
    totaldiv.innerHTML = "$" + (150 + total).toLocaleString("en-US");
}

function AddCoupon(Coupon) {
    let div = document.createElement("div");
    div.classList.add("coupondiv", "R", "C");
    div.setAttribute("data-id", Coupon["id"]);
    div.setAttribute("data-discount", Coupon["discount"]);
    div.setAttribute("data-val", Coupon["val"]);
    div.setAttribute("data-name", Coupon["name"]);

    let title = document.createElement("span");
    title.innerHTML = Coupon["name"] + " Coupon:";

    let price = document.createElement("span");
    price.classList.add("price");
    price.innerHTML = "-" + Coupon["discount"] + "%";

    div.append(title, price);
    document.querySelector(".bill").insertBefore(div, document.querySelector(".bill .total"))

    let old = document.querySelector(".bill .total .price");

    old.innerHTML = "$" + Math.ceil(old.innerHTML.substring(1).replace(",", "") * (1 - (Coupon["discount"] / 100))).toLocaleString("en-US");
}

let couponbtn = document.querySelector(".bill .coupon button");
let couponinp = document.querySelector(".bill .coupon input");

couponbtn.addEventListener("click", _ => {
    if (couponinp.value.trim() === "") {
        SetNoti("bad", "You Need To Enter The Coupon");
        return;
    }
    if (document.querySelectorAll(".coupondiv").length > 0) {
        SetNoti("bad", "You Can Have One Coupon Per Bill");
        return;
    }

    let val = couponinp.value;

    // Get All Used Coupons
    let All_Used_Cou = Get_Table("User_Coupon");
    let My_Used_Cou = All_Used_Cou.filter(row => row["user_id"] == ID).map(row => row["coupon_id"]);
    let Cou_T = Get_Table("Coupon");
    let Allowed_Cou = undefined;

    Object.keys(Cou_T).forEach(id => {
        let cou = Cou_T[id];

        if (
            !Allowed_Cou &&
            !My_Used_Cou.includes(id) &&
            cou["done"] == 0 &&
            val == cou["value"] &&
            (cou["end_date"] == null || new Date() < new Date(cou["end_date"])) &&
            (cou["end_num"] == null || cou["end_num"] > All_Used_Cou.filter(c => c["coupon_id"] == id).length)

        ) {
            Allowed_Cou = {
                "id": id,
                "name": cou["name"],
                "discount": cou["discount"],
                "val": cou["value"],
            };
        }
    })

    if (Allowed_Cou) {
        AddCoupon(Allowed_Cou);
        SetNoti("good", "Added Coupon");
    }
    else {
        SetNoti("bad", "The Coupon Is Invalid OR Was Used Before");
    }
})

let orderbtn = document.querySelector(".bill .placeorder");
let orderbtnbuffer = Buffer();
function ORDERFUNC() {
    let OK = true;

    document.querySelectorAll(".billdetail input").forEach(inp => {
        if (inp.value.trim() === "") {
            OK = false;
        }
    })

    if (!OK) {
        SetNoti("bad", "Bill Details Must Be Filled");
        return;
    }

    if (document.querySelector(".bill .total .price").innerHTML === "") {
        SetNoti("bad", "An Error Occured Try Reloading The Page");
        return;
    }

    OK = document.querySelector(".bill .payment input:checked") ? true : false;

    if (!OK) {
        SetNoti("bad", "Choose A Billing Method");
        return;
    }

    let coupon = false;
    let coupon_div = document.querySelector(".bill .coupondiv");
    if (coupon_div) {
        coupon = {
            id: coupon_div.getAttribute("data-id"),
            name: coupon_div.getAttribute("data-name"),
            val: coupon_div.getAttribute("data-val"),
            discount: +coupon_div.getAttribute("data-discount"),
        }
    }

    let payment = document.querySelector(".paymentholder .payment input:checked").getAttribute("data-pay");
    let address = document.querySelector(".billdetail div:nth-of-type(4) input").getAttribute("data-id");


    let State = true;
    if (!address || !payment || !["bank", "cash"].includes(payment)) State = false;
    else {
        // Add Bill

        let Bill_Data = {
            "user_id": ID,
            "address_id": address,
            "coupon_id": coupon ? coupon["id"] : null,
            "payment_method": payment,
            "date_created": new Date(),
            "recieved": 0,
            "user_del": 0
        }

        let bill_id = Get_Next_ID("Bill");
        Add_To("Bill", bill_id, Bill_Data);


        // Add Items
        let Item_T = Get_Table("Item");
        let Bill_Items = [];

        Cart_T.forEach(item => {
            item["item_id"] = item["id"];
            item["bill_id"] = bill_id;
            item["price"] = Math.floor(Item_T[item["item_id"]]["price"] * (1 - (Item_T[item["item_id"]]["discount_v"] / 100)));

            delete item["id"];

            Bill_Items.push(item);
        })

        Bill_Items.forEach(it => Add_To("Bill_Item", -1, it));

        if (coupon) {
            let new_Used = {
                user_id: ID,
                coupon_id: coupon["id"],
                date_used: new Date()
            }

            Add_To("User_Coupon", -1, new_Used);
        }

        sessionStorage.clear();
    }

    if (State) {
        SetNoti("good", "Order Placed");
        setTimeout(_ => window.open("./main.html", "_self"), 1500);
    }
    else {
        SetNoti("bad", "Failed To Place Order");
    }

}
orderbtn.addEventListener("click", _ => orderbtnbuffer(5000, ORDERFUNC));


function Buffer() {
    let t = new Date().getTime();

    return (delay, func) => {
        let c = new Date().getTime();
        if (c - t > delay) {
            t = c;
            func();
        }
    };
}