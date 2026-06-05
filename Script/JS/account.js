let mess = location.search.substring(1);
switch (mess) {
    case "fill=1":
        SetNoti("ok", "You Need To Set Your Email, Phone, Address To Be Able To Shop")
        break;
    case "fill=2":
        SetNoti("ok", "You Need To Set Your Email and Phone To Be Able To Contact Service")
        break;
}

function START() {
    let Final = {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: [],
        order: [],
        recieve: [],
        cancel: [],
        return: [],
    };

    // Get Personal Data
    let PersonalData = Get_Table("Account")[ID];

    Final["email"] = PersonalData["email"];
    Final["first_name"] = PersonalData["first_name"];
    Final["last_name"] = PersonalData["last_name"];
    Final["phone"] = PersonalData["phone"];

    // Get Address
    let All_Add = Get_Table("Address");
    let All_Cou = Get_Table("Coupon");

    Object.keys(All_Add).forEach(id => {
        let row = All_Add[id];

        if (row["user_id"] !== ID) return;

        row["id"] = id;
        Final["address"].push(row);
    })


    // Get IDs For Return and Cancel 
    let AllOrders_Data = {}
    let AllOrders_ID = [];

    let AllOrders_unfiltered = Get_Table("Bill");

    Object.keys(AllOrders_unfiltered).forEach(id => {
        let row = AllOrders_unfiltered[id];

        if (row["user_id"] != ID || row["user_del"] == 1) return;

        AllOrders_Data[id] = {
            "id": id,
            "label": All_Add[row["address_id"]] ? All_Add[row["address_id"]]["label"] : "Address Deleted",
            "c_name": All_Cou[row["coupon_id"]] ? All_Cou[row["coupon_id"]]["name"] : null,
            "c_value": All_Cou[row["coupon_id"]] ? All_Cou[row["coupon_id"]]["discount"] : null,
            "payment_method": row["payment_method"],
            "date_created": row["date_created"],
            "recieved": row["recieved"],
            "items": []
        };
    })
    AllOrders_ID = Object.keys(AllOrders_Data);

    // Get Return Data
    let Return_data = [];
    Get_Table("User_Return").forEach(row => {
        if (!AllOrders_ID.includes(row["bill_id"])) return;

        AllOrders_Data[row["bill_id"]]["date_created"] = row["date_time"];
        AllOrders_Data[row["bill_id"]]["reason"] = row["reason"];

        Return_data.push(row["bill_id"]);
    })

    // Get Cancel Data
    let Cancel_data = [];
    Get_Table("User_Cancel").forEach(row => {
        if (!AllOrders_ID.includes(row["bill_id"])) return;

        AllOrders_Data[row["bill_id"]]["date_created"] = row["date_time"];
        AllOrders_Data[row["bill_id"]]["reason"] = row["reason"];

        Cancel_data.push(row["bill_id"]);
    })


    // Asign Orders To Their Items
    let All_Item = Get_Table("Bill_Item");
    let Item_Data = Get_Table("Item");
    let All_Item_Img = Get_Table("Item_Img");

    All_Item.forEach(row => {
        if (!AllOrders_ID.includes(row["bill_id"])) return;

        AllOrders_Data[row["bill_id"]]["items"].push({
            "item_id": row["item_id"],
            "color": row["color"],
            "quantity": row["quantity"],
            "total": row["price"] * row["quantity"],
            "name": Item_Data[row["item_id"]]["name"],
            "price": row["price"],
            "image": All_Item_Img.find(item => item["item_id"] == row["item_id"])["url"]
        })
    })


    // Asign each order to their group
    AllOrders_ID.forEach(id => {
        let order = AllOrders_Data[id];

        if (order["recieved"] === 1) {
            if (Return_data.includes(id)) Final["return"].push(order);
            else Final["recieve"].push(order);
        }
        else {
            if (Cancel_data.includes(id)) Final["cancel"].push(order);
            else Final["order"].push(order);
        }
    })

    SetData(Final)
};
START();

function SetData(Data) {
    ////////////////////////////////////// Profile

    let inputs = document.querySelectorAll(".content input[type='text']");
    for (let i = 0; i < inputs.length - 3; i++) {
        if (Data[inputs[i].name] !== null) {
            inputs[i].placeholder = Data[inputs[i].name];
        }
    }

    ////////////////////////////////////// Address

    Data["address"].forEach(address => NewAddress(address));

    ////////////////////////////////////// Orders
    ////////////////////////////////////// Recieved
    ////////////////////////////////////// Returns
    ////////////////////////////////////// Cancels

    let orderholder = document.querySelector(".orderholder");
    let recieveholder = document.querySelector(".recieveholder");
    let returnholder = document.querySelector(".returnholder");
    let cancelholder = document.querySelector(".cancelholder");
    SetProcedure(Data["order"], orderholder, "order", true);
    SetProcedure(Data["recieve"], recieveholder, "recieved", true);
    SetProcedure(Data["return"], returnholder, "return");
    SetProcedure(Data["cancel"], cancelholder, "cancel");
}

function SetProcedure(Data, Parent, type, Isrecieve = false) {
    Data.forEach(parts => {
        let ads = document.createElement("div");
        ads.classList.add("address");
        ads.setAttribute("data-id", parts["id"]);

        let top = document.createElement("div");
        top.classList.add("top", "R");

        let label = document.createElement("div");
        label.classList.add("label");
        label.innerHTML = new Date(parts["date_created"]).toDateString();

        let del = document.querySelector(".delsvg.hide").cloneNode("true");
        del.classList.remove("hide");
        del.addEventListener("click", _ => {
            if (confirmdel.getAttribute("data-type") !== "") {
                SetNoti("ok", "Wait a sec ...");
                return;
            }
            confirmdel.classList.add("active");
            confirmdel.setAttribute("data-type", "bill");
            confirmdel.setAttribute("data-types", type);
            confirmdel.setAttribute("data-id", parts["id"]);
        })

        top.append(label, del);

        let body = document.createElement("div");
        body.classList.add("body");

        let head = document.createElement("div");
        head.classList.add("head");

        head.innerHTML = "<span>Image</span><span>Name</span><span>Color</span><span>Price</span><span>Quantity</span><span>Total</span>"

        body.append(head);

        let totalvalue = 0;
        parts["items"].forEach(item => {
            let itemdiv = document.createElement("div");
            itemdiv.classList.add("item");

            let img = document.createElement("img");
            img.src = item["image"];
            img.alt = "Item_Image";

            let name = document.createElement("span");
            name.innerHTML = item["name"];

            let color = document.createElement("span");
            color.style.backgroundColor = item["color"];

            let price = document.createElement("span");
            price.innerHTML = "$" + item["price"];

            let quantity = document.createElement("span");
            quantity.innerHTML = item["quantity"];

            let total = document.createElement("span");
            total.innerHTML = "$" + item["total"];
            totalvalue += item["total"];

            itemdiv.append(img, name, color, price, quantity, total);
            body.append(itemdiv);
        })

        if (parts["c_name"] !== null) {
            let itemdiv = document.createElement("div");
            itemdiv.classList.add("item");

            let img = document.createElement("div");

            let name = document.createElement("span");
            name.innerHTML = parts["c_name"] + " Coupon";

            let color = document.createElement("span");
            color.style.visibility = "hidden";

            let price = document.createElement("span");
            let quantity = document.createElement("span");

            let total = document.createElement("span");
            total.innerHTML = "-" + parts["c_value"] + "%";

            totalvalue *= ((100 - parts["c_value"]) / 100);

            itemdiv.append(img, name, color, price, quantity, total);
            body.append(itemdiv);
        }

        let totalprice = document.createElement("div");
        totalprice.classList.add("totalprice");
        totalprice.innerHTML = "<span>$" + totalvalue + "</span>"

        let reason = document.createElement("div");
        reason.classList.add("reason");
        if (Isrecieve) {
            reason.innerHTML = "<span>Payment Method:</span><span>" + parts["payment_method"] + "</span>";
        }
        else {
            reason.innerHTML = "<span>Reason:</span><span>" + parts["reason"] + "</span>";
        }

        body.append(totalprice, reason);

        let expand = document.querySelector(".expandsvg.hide").cloneNode("true");
        expand.classList.remove("hide");
        expand.addEventListener("click", _ => {
            ads.classList.toggle("active");
            if (ads.classList.contains("active")) ads.style.height = "100%";
            else ads.style.height = "50px";
        })

        ads.append(top, body, expand);
        Parent.append(ads);
    })
}

function NewAddress(address) {
    let ads = document.createElement("div");
    ads.classList.add("address");
    ads.setAttribute("data-id", address["id"]);

    let top = document.createElement("div");
    top.classList.add("top", "R");

    let label = document.createElement("div");
    label.classList.add("label");
    label.innerHTML = address["label"];

    let del = document.querySelector(".delsvg.hide").cloneNode("true");
    del.classList.remove("hide");
    del.addEventListener("click", _ => {
        if (confirmdel.getAttribute("data-type") !== "") {
            SetNoti("ok", "Wait a sec ...");
            return;
        }
        confirmdel.classList.add("active");
        confirmdel.setAttribute("data-type", "address");
        confirmdel.setAttribute("data-types", "address");
        confirmdel.setAttribute("data-id", address["id"]);
    })

    top.append(label, del);

    let body = document.createElement("div");
    body.classList.add("body");

    let addressdiv = document.createElement("div");
    addressdiv.innerHTML = "Address:";
    let addressspan = document.createElement("span");
    addressspan.innerHTML = address["location"];

    let zipdiv = document.createElement("div");
    zipdiv.innerHTML = "Zip:";
    let zipspan = document.createElement("span");
    zipspan.innerHTML = address["zip"];

    let detaildiv = document.createElement("div");
    detaildiv.innerHTML = "Detail:";
    let detailspan = document.createElement("span");
    detailspan.innerHTML = address["detail"];

    body.append(addressdiv, addressspan, zipdiv, zipspan, detaildiv, detailspan);

    let expand = document.querySelector(".expandsvg.hide").cloneNode("true");
    expand.classList.remove("hide");
    expand.addEventListener("click", _ => {
        ads.classList.toggle("active");
        if (ads.classList.contains("active")) ads.style.height = "100%";
        else ads.style.height = "50px";
    })

    ads.append(top, body, expand);
    document.querySelector(".addressholder").append(ads);
}

//////////////////////////////////////////////Set Navigation Bar
let logoutwindow = document.querySelector(".logoutwindow");
document.querySelector(".sidenav [data-for='logout']").addEventListener("click", _ => logoutwindow.classList.add("active"));
logoutwindow.querySelector("button:nth-of-type(1)").addEventListener("click", _ => logoutwindow.classList.remove("active"));
logoutwindow.querySelector("button:nth-of-type(2)").addEventListener("click", _ => {
    logoutwindow.classList.remove("active");

    localStorage.removeItem("IsLogged");
    localStorage.removeItem("IsAdmin");
    localStorage.removeItem("ID");

    sessionStorage.clear();
    window.open("./about.html", "_self");
});



let navs = document.querySelectorAll(".sidenav span");
let forms = document.querySelectorAll("form");
navs.forEach(n => {
    n.addEventListener("click", _ => {
        navs.forEach(nn => nn.classList.remove("active"));
        forms.forEach(f => {
            f.classList.remove("active");
            if (f.getAttribute("data-form") === n.getAttribute("data-for")) f.classList.add("active");
        })
        n.classList.add("active");
    })
})

///////////////////////// Setting Profile Data
let input_parent = document.querySelectorAll("form[data-form='profile'] .input");
let first_name = document.querySelector("form[data-form='profile'] input[name='first_name']");
let last_name = document.querySelector("form[data-form='profile'] input[name='last_name']");
let email = document.querySelector("form[data-form='profile'] input[name='email']");
let phone = document.querySelector("form[data-form='profile'] input[name='phone']");

let password = document.querySelector("form[data-form='profile'] input[name='password']");
let new_password = document.querySelector("form[data-form='profile'] input[name='new_password']");
let confirm_password = document.querySelector("form[data-form='profile'] input[name='confirm_password']");

let profile_cancelbtn = document.querySelector("form[data-form='profile'] button");
let profile_confirmbtn = document.querySelector("form[data-form='profile'] input[type='submit']");

let nameregex = new RegExp("[^a-zA-Z\\s]", "i"); // if False
let emailregex = new RegExp("^[a-zA-Z0-9_.]{5,}@gmail.com$", "i"); // if True
let phoneregex = new RegExp("^[0-9]{11}$", "i"); // if True
let passregex = new RegExp("^(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$", "i"); // if True

function IsValid() {
    input_parent.forEach(p => p.classList.remove("error"));
    email.nextElementSibling.innerHTML = "Email Or Phone Is Invalid";
    let OK = true;

    if (nameregex.test(first_name.value.trim()) && first_name.value.trim() !== "") {
        OK = false;
        first_name.parentElement.classList.add("error");
    }
    if (nameregex.test(last_name.value.trim()) && last_name.value.trim() !== "") {
        OK = false;
        last_name.parentElement.classList.add("error");
    }
    if (!emailregex.test(email.value.trim()) && email.value.trim() !== "") {
        OK = false;
        email.parentElement.classList.add("error");
    }
    if (!phoneregex.test(phone.value.trim()) && phone.value.trim() !== "") {
        OK = false;
        phone.parentElement.classList.add("error");
    }
    // Location Validation

    if (password.value.trim() !== "") {
        if (!passregex.test(new_password.value.trim()) || new_password.value.trim() === "") {
            OK = false;
            new_password.parentElement.classList.add("error");
        }
        if (new_password.value.trim() !== confirm_password.value.trim() || confirm_password.value.trim() === "") {
            OK = false;
            confirm_password.parentElement.classList.add("error");
        }
    }

    return OK;
}

profile_cancelbtn.addEventListener("click", e => {
    e.preventDefault();
    input_parent.forEach(p => {
        p.firstElementChild.value = "";
        p.classList.remove("error");
    });
    SetNoti("good", "Changes Canceled")
})

profile_confirmbtn.addEventListener("click", e => {
    e.preventDefault();

    if (
        first_name.value.trim() == "" &&
        last_name.value.trim() == "" &&
        email.value.trim() == "" &&
        phone.value.trim() == "" &&
        password.value.trim() == ""
    ) {
        SetNoti("bad", "You Must Enter A Value");
        return;
    }

    if (IsValid()) {

        let bod = {
            "first_name": first_name.value.trim() === "" ? first_name.placeholder : first_name.value.trim(),
            "last_name": last_name.value.trim() === "" ? last_name.placeholder : last_name.value.trim(),
            "email": email.value.trim() === "" ? email.placeholder : email.value.trim(),
            "phone": phone.value.trim() === "" ? phone.placeholder : phone.value.trim()
        }

        if (password.value.trim() !== "") {
            bod["passcode"] = password.value.trim();
            bod["new_passcode"] = new_password.value.trim();
            bod["confirm_passcode"] = confirm_password.value.trim();
        }


        // Checking Email If Used By Different Account

        let All_Acc = Get_Table("Account");

        let last_email = All_Acc[ID]["email"];
        let last_passcode = All_Acc[ID]["passcode"];
        let IsEmailUsed = false;

        Object.keys(All_Acc).forEach(id => {
            if (All_Acc[id]["email"] === bod["email"] && id !== ID) IsEmailUsed = true;
        })

        // Check Password
        let IsPassFailed = undefined;
        if (
            bod["passcode"] !== undefined &&
            bod["new_passcode"] !== undefined &&
            bod["confirm_passcode"] !== undefined
        ) {
            IsPassFailed = true;

            if (
                bod["passcode"] === last_passcode &&
                bod["new_passcode"] === bod["confirm_passcode"] &&
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\$+=_;#?!:@%&]).{8,}$/.test(bod["new_passcode"])
            ) IsPassFailed = false;
        }


        if (IsEmailUsed) {
            email.nextElementSibling.innerHTML = "This Email Is Assigned To An Accout";
            email.parentElement.classList.add("error");
        } else if (IsPassFailed !== undefined && IsPassFailed) {
            SetNoti("bad", "Password Fields Are Invalid");
            password.parentElement.classList.add("error");
        }
        else if (
            /[^a-zA-Z\s]/.test(bod["first_name"]) ||
            /[^a-zA-Z\s]/.test(bod["last_name"]) ||
            (/[^0-9]/.test(bod["phone"]) && bod["phone"] !== "Not Added") ||
            !/^[A-Za-z0-9_.]{5,}@gmail.com$/.test(bod["email"])
        ) {
            SetNoti("bad", "Invalid Format");
        }
        else {
            let personalData = {
                "first_name": bod["first_name"],
                "last_name": bod["last_name"],
                "email": bod["email"],
                "phone": bod["phone"],
                "passcode": last_passcode,
                "isAdmin": All_Acc[ID]["isAdmin"],
                "date_created": All_Acc[ID]["date_created"]
            }

            if (IsPassFailed === false) personalData["passcode"] = bod["new_passcode"];

            Add_To("Account", ID, personalData);

            SetNoti("good", "Profile Data Updated");
            for (let i = 0; i < input_parent.length - 3; i++) {
                if (input_parent[i].firstElementChild.value.trim() !== "") {
                    input_parent[i].firstElementChild.placeholder = input_parent[i].firstElementChild.value.trim();
                }
            }
        }

        input_parent.forEach(p => p.firstElementChild.value = "");
    }
})

///////////////////////// Setting Delete Window
let confirmdel = document.querySelector(".confirmdelete");
let del_cancelbtn = confirmdel.querySelector("button:first-of-type");
let deletebtn = confirmdel.querySelector("button:last-of-type");

del_cancelbtn.addEventListener("click", _ => {
    confirmdel.classList.remove("active");
    confirmdel.setAttribute("data-type", "");
    confirmdel.setAttribute("data-id", "");
})

deletebtn.addEventListener("click", _ => {
    confirmdel.classList.remove("active");

    let type = confirmdel.getAttribute("data-type");
    let id = confirmdel.getAttribute("data-id");

    if (!type || !id) SetNoti("bad", "Deletion Failed");
    else {
        if (type === "address") Remove_From("Address", id);
        else if (type === "bill") Remove_From("Bill", id);

        let item = document.querySelector("form[data-form='" + confirmdel.getAttribute("data-types") + "'] [data-id='" + confirmdel.getAttribute("data-id") + "']");
        item.remove();
        SetNoti("good", "Deleted Successfully");
    }

    confirmdel.setAttribute("data-type", "");
    confirmdel.setAttribute("data-id", "");

})

///////////////////////// Add Address
let addaddress = document.querySelector(".addaddress");

document.querySelector("form[data-form='address'] button").addEventListener("click", e => {
    e.preventDefault();
    addaddress.classList.add("active");
})

let address_label = addaddress.querySelector("input[name='label']"),
    address_address = addaddress.querySelector("input[name='address']"),
    address_zip = addaddress.querySelector("input[name='zip']"),
    address_detail = addaddress.querySelector("textarea"),
    address_cancel = addaddress.querySelector("button:first-of-type"),
    address_confirm = addaddress.querySelector("button:last-of-type")

function ClearAddressInput() {
    address_label.value = "";
    address_address.value = "";
    address_zip.value = "";
    address_detail.value = "";
}

address_cancel.addEventListener("click", _ => {
    addaddress.classList.remove("active");
    ClearAddressInput();
})

address_confirm.addEventListener("click", _ => {
    address_detail.nextElementSibling.classList.remove("active");
    if (
        address_label.value === "" ||
        address_address.value === "" ||
        address_zip.value === ""
    ) {
        address_detail.nextElementSibling.classList.add("active");
        return;
    }

    let label = address_label.value.trim();
    let location = address_address.value.trim();
    let zip = address_zip.value.trim();
    let detail = address_detail.value.trim();

    if (
        label !== "" &&
        location !== "" &&
        zip !== ""
    ) {
        let new_id = Get_Next_ID("Address");

        let data = {
            "user_id": ID,
            "label": label,
            "location": location,
            "zip": zip,
            "detail": detail
        }

        Add_To("Address", new_id, data);

        SetNoti("good", "Added Address Successfully");
        NewAddress({
            "id": new_id,
            "label": address_label.value,
            "location": address_address.value,
            "zip": address_zip.value,
            "detail": address_detail.value
        })

    }
    else SetNoti("bad", "You Have To Fill label, location and zip Fields");

    ClearAddressInput();
    addaddress.classList.remove("active");
})



//////////////////////////// Adding Enter Handler
let fields = document.querySelectorAll("*[data-form='profile'] input[type='text']");

fields.forEach(inp => {
    inp.onkeydown = e => {
        if (e.key === "Enter") profile_confirmbtn.click();
    }
})