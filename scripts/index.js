const itemsContainerElement = document.querySelector(".items-container");

//!humlog ek array create kare ge jisme humlog jo element par click kiye hai wo sub added ho ta jaye ga
let bagItems

//^ we can see that we are calling the function here but in induestry all the function which are calling at the time of insitalize of js file that function should be inside the a special function
OnLoad();

function OnLoad(){
    //! after referse the page still our count becomes 0 so we have to retrieve the data which is store inside the storage 
    let bagItemStr = localStorage.getItem('bagItems');

    //~ we are checking if bagItemStr is empty if it is not empty then we will convert the string into the object and insert the value into the array 
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];

    //& we are calling the function when the js part is rander beacuse we want that when the user come to this page he or she can see the item
    displayItemsOnHomePage();
    
    //! we are calling this function because in displayBagIcon we are checking if the the bagItems array has 0 item then we will not show the 0 there that why we are calling the function
    displayBagIcon();
}

//~ this function will add the items which we want in our bag
function addToBag(itemId){
    bagItems.push(itemId);
    
    //^ if we notice that when we are clicking in the bag then our count of items which are inside the bag becomes to 0 which is not good so to solve this problem we have to use the concept of local storage
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

//~ this function whill increase the count of bag whenever we are clicking on the item button and this function will call inside the addToBag function because we know our count will increase when we add something in the bag
function displayBagIcon(){

    let bagItemCountElement = document.querySelector('.bag-item-count');

    if(bagItems.length>0){
        bagItemCountElement.style.visibility = 'visible'
        bagItemCountElement.innerText = bagItems.length;
    }
    else{
        bagItemCountElement.style.visibility = 'hidden'
    }
}

function displayItemsOnHomePage(){
    let innerHtml = '';

    if(!itemsContainerElement){
        return
    }

    items.forEach(value=>{
    innerHtml += `<div class="item-container">
    <img class="item-image" src=${value?.image} alt="">
    <div class="rating">
       ${value?.rating.stars}⭐ | ${value?.rating.count}
    </div>
    <div class="company-name">${value?.company}</div>
    <div class="item-name">${value?.item_name}</div>
    <div class="price">
        <span class="current-price">Rs ${value?.current_price}</span>
        <span class="orginal-price">Rs ${value?.original_price}</span>
        <span class="discount">(${value?.discount_percentage}% OFF)</span>
    </div>
    
    <button class="btn-add-bag" onclick="addToBag(${value.id})">Add to Bag</button>
    </div>`
})
//! humlog pura html js ka help se render kar rahe ha kuki jub humlog real life project me kam kare ge to humlog ko data object ka thorough aaye ga to humlog ko aise he render kar na ho ga
itemsContainerElement.innerHTML = innerHtml;
}
console.log(items.image);

