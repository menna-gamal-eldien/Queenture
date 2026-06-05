let radios = document.querySelectorAll("input[type='radio']");
radios.forEach(rad => {
    rad.addEventListener("click", _ => {
        radios.forEach(r => {
            let doc = document.querySelector("." + r.value);
            if (r.checked) {
                doc.classList.add("active");
            }
            else {
                doc.classList.remove("active");
            }
        })
    })
})
radios[0].click();

function START() {
    let Acc_ID = location.search.split("=")[1];

    // Get Current Profile From The Account Table
    let Profile = Get_Table("Account")[Acc_ID];

    if (!Profile) {
        SetNoti("bad", "This Account Is Invalid");
        return;
    }

    // Initiate keys that order is going to be saved in
    Profile["orders"] = [];
    Profile["cancels"] = [];
    Profile["returns"] = [];


    let All_Orders = {};
    let All_Orders_id = [];

    let DB_Orders = Get_Table("Bill");
    let All_Address = Get_Table("Address");
    let All_Coupon = Get_Table("Coupon");
    let All_Cancel = Get_Table("User_Cancel");
    let All_Return = Get_Table("User_Return");

    Object.keys(DB_Orders).forEach(id => {
        let order = DB_Orders[id];

        if (order["user_id"] !== Acc_ID) return;

        All_Orders_id.push(id);

        All_Orders[id] = {
            id: id,
            label: All_Address[order["address_id"]]["label"],
            name: All_Coupon[order["coupon_id"]] ? All_Coupon[order["coupon_id"]]["name"] : "None",
            payment: order["payment_method"],
            date: "",
            reason: "",
            type: "",
            items: []
        }

        let DATE = "";
        let REASON = "";
        let TYPE = "";

        let data_c = All_Cancel.find(c => c["bill_id"] == id);
        let data_r = All_Return.find(r => r["bill_id"] == id);

        if (data_c) {
            DATE = new Date(data_c["date_time"]);
            REASON = data_c["reason"];
            TYPE = "Cancel";
        }
        else if (data_r) {
            DATE = new Date(data_r["date_time"]);
            REASON = data_r["reason"];
            TYPE = "Return";
        } else {
            DATE = new Date(order["date_created"]);
            REASON = "";
            TYPE = "Normal";
        }

        All_Orders[id]["date"] = DATE;
        All_Orders[id]["reason"] = REASON;
        All_Orders[id]["type"] = TYPE;
    })
    // Get Bill Items
    let All_Bill_Item = Get_Table("Bill_Item");
    let Item_Img_T = Get_Table("Item_img");

    All_Bill_Item.forEach(it => {
        if (!All_Orders_id.includes(it["bill_id"])) return;

        All_Orders[it["bill_id"]]["items"].push({
            id: it["item_id"],
            color: it["color"],
            quantity: it["quantity"],
            price: it["price"],
            url: Item_Img_T.find(i => i["item_id"] == it["item_id"])["url"]
        })
    })

    Object.keys(All_Orders).forEach(id => {
        let order = All_Orders[id];

        switch (order["type"]) {
            case "Normal":
                Profile["orders"].push(order);
                break;
            case "Return":
                Profile["returns"].push(order);
                break;
            case "Cancel":
                Profile["cancels"].push(order);
                break;
        }
    })

    Setprofile(Profile);
}
START();

function Setprofile(Profile) {
    console.log(Profile)
    document.querySelector(".location span:last-of-type").innerHTML = Profile["first_name"] + " " + Profile["last_name"];
    document.querySelector(".title.name span").innerHTML = Profile["first_name"] + " " + Profile["last_name"];
    document.querySelector(".email span:not(.small)").innerHTML = Profile["email"];
    document.querySelector(".phone span:not(.small)").innerHTML = Profile["phone"];
    document.querySelector(".date span:not(.small)").innerHTML = Profile["date_created"];
    document.querySelector(".admin span:not(.small)").innerHTML = Profile["isAdmin"] === 1 ? "Yes" : "No";

    let orders = document.querySelector(".orders");
    let returns = document.querySelector(".returns");
    let cancels = document.querySelector(".cancels");

    if (Profile["orders"]) Adddata(orders, Profile["orders"]);
    if (Profile["returns"]) Adddata(returns, Profile["returns"]);
    if (Profile["cancels"]) Adddata(cancels, Profile["cancels"]);
}

function Adddata(parent, data) {
    data.forEach(d => {
        let holder = document.createElement("div");
        holder.classList.add("order", "R", "Col");

        let date = document.createElement("div");
        date.innerHTML = d["date"];

        let address = document.createElement("div");
        address.innerHTML = "Address: " + d["label"];

        let coupon = document.createElement("div");
        coupon.innerHTML = "Coupon Used: " + d["name"];

        let payment = document.createElement("div");
        payment.innerHTML = "Payment Method: " + d["payment"];

        if (d["reason"]) {
            let reason = document.createElement("div");
            reason.innerHTML = "Reason: " + d["reason"];
        }

        let items = document.createElement("div");
        items.classList.add("items");
        d["items"].forEach(it => {
            let a = document.createElement("a");
            a.href = "./item.html?id=" + it["id"];
            a.target = "_blank";

            let img = document.createElement("div");
            img.classList.add("img");
            img.style.backgroundImage = "url(" + it["url"] + ")";

            a.append(img);

            let color = document.createElement("div");
            color.classList.add("color");
            color.style.background = it["color"];

            let quantity = document.createElement("div");
            quantity.classList.add("quantity");
            quantity.innerHTML = it["quantity"];

            let price = document.createElement("div");
            price.classList.add("price");
            price.innerHTML = it["price"];

            items.append(a, color, quantity, price);
        })

        let svg = document.querySelector(".expandsvg.hide").cloneNode(true);
        svg.classList.remove("hide");
        svg.addEventListener("click", _ => {
            holder.classList.toggle("active");
            if (holder.classList.contains("active")) holder.style.height = ((90 * d["items"].length) + 190 + 40 + 50) + "px";
            else holder.style.height = "190px";
        })

        holder.append(date, address, coupon, payment, items, svg);
        parent.append(holder);
    })
}