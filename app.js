let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Deserted  Pumpkin Brownie ',
        image: '8.PNG',
        price: 320
    },
    {
        id: 2,
        name: 'Brown ChocoSyrup Cake',
        image: '9.PNG',
        price: 450
    },
    {
        id: 3,
        name: 'Strawberry Custard Combo Cake',
        image: '10.PNG',
        price: 300
    },
    {
        id: 4,
        name: 'Macroni Cheese Pizza',
        image: '14.PNG',
        price: 193
    },
    {
        id: 5,
        name: 'Iced Americano',
        image: '12.PNG',
        price: 390
    },
    {
        id: 6,
        name: 'Choco Latte Coffee',
        image: '13.PNG',
        price: 375
    }
];
let listCards  = [];

function initApp() {
    for (const key in products) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        let value = products[key];
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button id="addButton${key}" onclick="addToCard(${key})">Add To Card</button>`;
        newDiv.innerHTML += `<div id="q${key}"></div>`;
        list.append(newDiv);
    }
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
        let button = document.querySelector(`#addButton${key}`);
        button.disabled = true; 
        button.classList.add('disabled-button'); 
        //button.style.backgroundColor = 'grey'; 
    }
    reloadCard();
}
/*function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = products[key];
        listCards[key].quantity = 1;
        let button = document.querySelector(`#addButton${key}`);
        button.disabled = false; 
    }
    reloadCard();
}*/
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    for (const key in listCards) {
        if (listCards[key]) {
            const value = listCards[key];
            totalPrice += value.price;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    ${value.quantity > 0 ? `<div class="count">${value.quantity}</div>` : ''}
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    }
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
    
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}