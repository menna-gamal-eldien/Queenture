let color_add = document.querySelector(".add.col");
let cat_add = document.querySelector(".add.cat");
let subcat_add = document.querySelector(".add.scat");

let color_win = document.querySelector(".colorselect");
let cat_win = document.querySelector(".catselect");
let subcat_win = document.querySelector(".subcatselect");

let cancel_btns = document.querySelectorAll(".underline");
cancel_btns.forEach(btn => {
    btn.addEventListener("click", _ => {
        btn.parentElement.parentElement.parentElement.classList.remove("active");
    })
});


color_add.addEventListener("click", _ => color_win.classList.add("active"));
cat_add.addEventListener("click", _ => cat_win.classList.add("active"));
subcat_add.addEventListener("click", _ => subcat_win.classList.add("active"));

// Cat
let cats = [];
Get_Table("admindata").forEach(cat => {
    if (cat["type"] == "cateory") cats = cat["data"].split(",");
})

let p_ = cat_win.querySelector(".subcats");
p_.innerHTML = "";

cats.forEach(cat => {
    let div = document.createElement("div");
    div.innerHTML = cat;
    div.addEventListener("click", _ => {
        cat_add.parentElement.append(div.cloneNode(true));
        cat_add.style.display = "none";
        cat_win.remove();
    })

    p_.append(div);
})

// Subcat
let subcat = [];
Get_Table("admindata").forEach(cat => {
    if (cat["type"] == "subcat") subcat = cat["data"].split(",");
})

let p = subcat_win.querySelector(".subcats");
p.innerHTML = "";

subcat.forEach(cat => {
    let div = document.createElement("div");
    div.innerHTML = cat;
    div.addEventListener("click", _ => {
        subcat_add.parentElement.append(div.cloneNode(true));
        subcat_win.classList.remove("active");
    })

    p.append(div);
})


let color_select = color_win.querySelector("button:not(.underline)");
color_select.addEventListener("click", _ => {
    let div = document.createElement("div");
    div.style.background = color_win.querySelector("input").value;
    color_add.parentElement.append(div);

    color_win.classList.remove("active");
})

let img = document.querySelector("input[type='file']");
let img_parent = document.querySelector(".R.images");
img.addEventListener("change", _ => {
    if (img.files.length > 5) {
        img.value = "";
        SetNoti("bad", "Images Should Be Less Than 5");
    }
    else {
        img_parent.innerHTML = "";
        for (let i = 0; i < img.files.length; i++) {
            let ph = document.createElement("img");
            let url = URL.createObjectURL(img.files[i]);
            ph.src = url;
            ph.alt = "Item_Image";

            img_parent.append(ph);
        }
    }
})

let addbtn = document.querySelector(".buttons button");

addbtn.addEventListener("click", _ => {
    let data = {
        name: "",
        detail: "",
        price: 0,
        w: 0,
        h: 0,
        d: 0,
        dimension: "",
        weight: 0,
        discount: false,
        discount_v: 0,
        instock: true,
        new: true,
        colors: [],
        category: "",
        subcat: [],
        material: ""
    }

    let inputs = document.querySelectorAll(".field [name]");

    inputs.forEach(inp => {
        if (["instock", "new"].includes(inp.name)) data[inp.name] = inp.checked;
        else if (["name", "detail", "material"].includes(inp.name)) data[inp.name] = inp.value;
        else data[inp.name] = +inp.value;
    })

    data["dimension"] = data["w"] + " x " + data["h"] + " x " + data["d"];
    data["discount"] = data["discount_v"] > 0;
    data["category"] = cat_add.parentElement.lastElementChild.innerHTML;

    let cols = color_add.parentElement.querySelectorAll("div:not(.add)");
    cols.forEach(c => data["colors"].push(c.style.background));

    let subcats = subcat_add.parentElement.querySelectorAll("div:not(.add)");
    subcats.forEach(c => data["subcat"].push(c.innerHTML));

    let IsEmpty = false;
    for (let k in data) {
        if (
            data[k] === null || data[k] === undefined ||
            (typeof (data[k]) === typeof ("") && data[k].trim() === "") ||
            (typeof (data[k]) === typeof ([]) && data[k].length === 0) ||
            (typeof (data[k]) === typeof (10) && data[k] <= 0)
        ) {
            IsEmpty = true;
            break;
        }
    }

    if (IsEmpty) {
        SetNoti("bad", "You Have To Fill All Fields");
        return;
    }
    if (img.files.length === 0) {
        SetNoti("bad", "You Need At Least One Image");
        return;
    }


    SetNoti("good", "Item Added");
    SetNoti("ok", "Not Really");
    SetNoti("ok", "Cant Add New Item");
})