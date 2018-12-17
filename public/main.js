let userNavbarCart;
let itemsCount = 0;
let userProducts = [];

window.onload = function(){
   winOnload();
}

let winOnload = () => {
    userNavbarCart = document.querySelector('.cart-counter');
    if(window.localStorage.getItem('cart')){
        userProducts = JSON.parse(window.localStorage.getItem('cart'));
    }

    if(document.querySelector(".user-cart")){
        
        if(userProducts.length == 0){
            document.querySelector(".user-cart").innerHTML = "<p>Tuscias</p>"  
        }else{
            let total = 0;
            for(let i = 0; i< userProducts.length; i++){
                total += userProducts[i].price;
                document.querySelector(".user-cart").innerHTML += 
                `<div class="cart-product">
                    <div class='title'>${userProducts[i].title} &nbsp;</div>
                    <div class='title'>${userProducts[i].size} &nbsp;</div>                
                    <div class='title'>${userProducts[i].price}</div>
                    <div><button onclick="removeFromCart(this, ${i})">remove</button></div>
                </div>
               `
            }
            document.querySelector(".user-cart").innerHTML += `<div>Total: ${total}</div>`;
        }
    }

    userNavbarCart.innerText = userProducts.length;
}

let removeFromCart = (element, index) =>{
    userProducts.splice(index,1);
    element.parentElement.parentElement.remove();
    window.localStorage.setItem('cart', JSON.stringify(userProducts));
    userNavbarCart.innerText = userProducts.length;
    document.querySelector(".user-cart").innerHTML = "";
    winOnload();
}

let addToCart = (product) => {
    if (!document.querySelector(".active")){
        alert("Nepasirinktas dydis");
    } else {
        let productFromBrowser = {
            "title": product.title,
            "price": product.price,
            "size": document.querySelector(".active").innerText
        }
        userProducts.push(productFromBrowser);
        window.localStorage.setItem('cart', JSON.stringify(userProducts));
        userNavbarCart.innerText = userProducts.length;
    }

}

let makeActive = element =>{
    let sizeArray = [];
    sizeArray = document.querySelectorAll(".size");
    sizeArray.forEach(sizeButton => {
        sizeButton.classList.remove("active");
    });
    element.classList.add("active");
}