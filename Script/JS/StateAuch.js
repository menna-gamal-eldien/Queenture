// Get log in and admin information from local storage
let IsLogged = localStorage.getItem("IsLogged");
let IsAdmin = localStorage.getItem("IsAdmin");

// Set State => OUT - USER - ADMIN
let State;

if (IsLogged === null) State = "OUT";
else {
    if (IsAdmin == 0) State = "USER";
    else State = "ADMIN";
}

// Control based on page
let LocArr = location.pathname.substring(1).split("/");
let P_type = LocArr[0].toLowerCase();
let P_name = LocArr[1].split(".")[0].toLowerCase();
let OutArr = ["main", "validate", "signup", "passforget", "passchange", "login", "about"];
let OutOnly = ["signup", "validate", "passforget", "passchange", "login"];


if (P_type === "admin" && State !== "ADMIN") window.open("../Home/about.html", "_self");
else if (P_type === "home") {
    if (State === "ADMIN") window.open("../Admin/account.html", "_self");
    if (State === "OUT" && !OutArr.includes(P_name)) window.open("./login.html", "_self");
    if (State === "USER" && OutOnly.includes(P_name)) window.open("./about.html", "_self");
}

if (P_name == "passforget" && !sessionStorage.getItem("Verify_Code")) window.open("./login.html", "_self");
if (P_name == "passchange") {
    let data = location.search.substring(1).split("=");
    let code = "";

    if (data.length < 2) window.open("./login.html", "_self");

    let interval = +data[1][0];
    data[1] = data[1].substring(1);
    code = data[1][0] + "" + data[1][interval] + "" + data[1][2 * interval] + "" + data[1][3 * interval] + "" + data[1][4 * interval] + "" + data[1][5 * interval];

    if (code != sessionStorage.getItem("Verify_Code")) window.open("./login.html", "_self");
}
if (
    P_name == "validate" &&
    (!sessionStorage.getItem("Verify_Code_sign") || !sessionStorage.getItem("Person"))
) window.open("./signup.html", "_self");