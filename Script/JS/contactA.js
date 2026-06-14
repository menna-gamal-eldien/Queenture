let answer_win = document.querySelector(".answercontact");
let cancel = document.querySelector(".overflow .underline");
let confirm = document.querySelector(".overflow button:not(.underline)");

cancel.addEventListener("click", _ => {
    cancel.parentElement.parentElement.parentElement.classList.remove("active");
})

let clicked = false;
confirm.addEventListener("click", _ => {
    if (clicked) return;
    
    cancel.click();
    clicked = true;
    fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(d => {

            let Personal = Get_Table("Account")[ID];

            const data = {
                username: "Admin - " + Personal["first_name"] + " " + Personal["last_name"],
                IP: d.ip,
                message: confirm.parentElement.previousElementSibling.value,
            };

            fetch("https://formspree.io/f/mrevrjrl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        SetNoti("good", "Answer Sent");
                        confirm.parentElement.previousElementSibling.value = "";
                    } else {
                        SetNoti("bad", "Failed to send answer");
                    }

                    clicked = false;
                })
                .catch(error => console.error("Error:", error));
        });
})

let Contact_T = Get_Table("Contact");

let Parent = document.querySelector(".contacts");
let numitem = document.querySelector(".numitem span");
let max_cards = 20;

let max_call = Contact_T.length;
numitem.innerHTML = max_call;

let page = 0;

let morebtn = document.querySelector(".more");


function fetchdata() {
    let final = Contact_T.splice(page * max_cards, max_cards);

    page++;

    if (max_cards * page > max_call) morebtn.classList.add("disabled");
    else morebtn.classList.remove("disabled");

    if (final.length > 0) GenerateCards(final);
}

morebtn.addEventListener("click", _ => {
    if (morebtn.classList.contains("disabled")) return;
    fetchdata();
})

fetchdata();

function GenerateCards(Items) {
    Items.forEach(contact => {
        let card = document.createElement("div");
        card.classList.add("contact", "R", "Col");
        card.addEventListener("click", _ => {
            answer_win.classList.add("active");
        })

        let name = document.createElement("a");
        name.classList.add("remove");
        name.href = "./profile.html?id=" + contact["user_id"];
        name.target = "_self";
        name.innerHTML = contact["user_name"];

        let reason = document.createElement("div");
        reason.innerHTML = contact["message"];

        card.append(name, reason);
        Parent.append(card);
    })
}
