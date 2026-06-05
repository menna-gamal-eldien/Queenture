let container = document.querySelector(".Bigcontainer");

let header = document.createElement("div");
header.classList.add("header", "R", "C");
header.innerHTML = '<div class="container R"><div><a target="_self" href="./account.html" class="logo R remove"><img src="../Web_logo.png" alt="logo"><span>QUEENTURE</span></a></div><div class="nav R C"><a href="./items.html" target="_self" class="remove">Item</a><a href="./profiles.html" target="_self" class="remove">Account</a><a href="./coupons.html" target="_self" class="remove">Coupon</a><a href="./contacts.html" target="_self" class="remove">Contact</a><a href="./account.html" target="_self" class="remove">Data</a></div><div class="control R C"><div class="profile R C"><div class="account R C"><a class="remove" target="_self" href="./account.html"><svg width="512" height="512" viewBox="0 0 512 512"><path d="M344,144c-3.92,52.87-44,96-88,96s-84.15-43.12-88-96c-4-55,35-96,88-96S348,90,344,144Z" /><path d="M256,304c-87,0-175.3,48-191.64,138.6C62.39,453.52,68.57,464,80,464H432c11.44,0,17.62-10.48,15.65-21.4C431.3,352,343,304,256,304Z" /></svg></a></div></div></div></div>';


let footer = document.createElement("div");
footer.classList.add("footer", "R", "C");
footer.innerHTML = '<div class="container"><div class="R Col"><div class="logo R Col C"><img src="../Web_logo.png" alt="logo" style="filter:brightness(3)"><span>QUEENTURE</span></div><div class="R Col"><span>Subscribe</span><span>Get 10% off your first order</span><input type="text" placeholder="Enter your email"></div></div><div class="links R"><div class="R Col"><span>Support</span><span>FAQs</span><span>Shipping & Returns</span><span>Privacy Policy</span><span>Terms of Use</span><span>Contact</span><span>Shipping & Returns</span><span>Track your order</span></div><div class="R Col"><span>Account</span><span>My Account</span><span>Login / Register</span><span>Cart</span><span>Wishlist</span><span>Shop</span></div><div class="R Col"><span>Quick Links</span><span>Home</span><span>About us</span><span>Contact us</span><span>Category</span><span>Why choose us</span></div><div class="R Col"><span>Download App</span><div class="R Col C"><span>Save up to $3 with App New User</span><div class="codebar R C"><div class="barcode"></div><div class="link R Col"><span>Get it on <a href="#">Google Play</a></span><span>Get it on <a href="#">App Store</a></span></div></div><div class="social R"><svg viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg><svg viewBox="0 0 50 50"><path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" /></svg><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg><svg viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg></div></div></div></div><div class="copyright">&copy; 2025 [QUEENTURE]. All rights reserved.</div></div>';

container.prepend(header);
container.append(footer);

let place = document.querySelector(".body .location");
if (place !== null) {
    let val = location.pathname.split(".")[0].substring(1).split("/");
    val.forEach((v, i) => {
        let span = document.createElement("span");
        span.innerHTML = v;
        if (i < val.length - 1) span.innerHTML += " / ";
        place.append(span);
    })
}

// Local Storage
let profile = document.querySelector(".header .profile .account");
if (ID) profile.classList.add("active");
if (Admin) profile.classList.add("Admin");

// Notification Manager
let notiparent = document.createElement("div");
notiparent.classList.add("R", "Col", "notiparent");
for (let i = 0; i < 5; i++) {
    let noti = document.createElement("div");
    noti.classList.add("datagiven");
    noti.addEventListener("click", _ => {
        noti.classList.remove("active");
    })
    notiparent.append(noti);
}
document.body.append(notiparent);

let notiList = []
function SetNoti(type, detail) {
    let noti = document.querySelector(".datagiven:not(.active)");

    if (noti) {
        noti.innerHTML = detail;
        noti.classList.add(type, "active");
        setTimeout(_ => {
            noti.classList.remove(type, "active");
            if (notiList.length > 0) {
                setTimeout(_ => {
                    let l = notiList.pop();
                    SetNoti(l["type"], l["detail"]);
                }, 1000)
            }
        }, 5000)
    }
    else {
        notiList.push({
            type: type,
            detail: detail
        });
    }
}