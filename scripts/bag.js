
let bagItemObjects;
onLoad();
function onLoad(){
    loadItemObject();
    displayBagItem();
    displayBagSummery();
}


//^ this function will render by html of product summary
function displayBagSummery(){
    let bagSummeryElement = document.querySelector('.bag-summary');

    let totalItem = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount =0;

    bagItemObjects.forEach(bagItem =>{
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    })

    let finalPayment = (totalMRP - totalDiscount) + 99;

    bagSummeryElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem}) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹ ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹ 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹ ${finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`
}

//! this function is rendering the item which we added to the bag and how this function getting the data that which item is added so for that we have use the id which we are storing inside the bahItem array
function loadItemObject(){

    //~ We are getting the id of every object and we will map every id with its corresponding product details
    bagItemObjects = bagItems.map(itemId=>{

        //^ now we will run a for loop for items which is array of object and it is present inside the items.js file
        for(let index =0;index<items.length;index++){
            //~ now we check does this object id is equal to my id which is present inside my items array
            if(itemId == items[index].id){
                return items[index];
            }
        }
    });
    console.log(bagItemObjects);

}

// this function will render the html of the bag section
function displayBagItem(){

    console.log(bagItems)
    let containerElement = document.querySelector(".bag-items-container");

    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHtml(bagItem);
    });
    containerElement.innerHTML= innerHTML; 
}

//^ this function will remove the element when from cart when we click on the cross button
function removeFromBag(itemId){

    //~ humlog check kar rahe ha ke jo mera itemid hai agar wo mera bagitems array se match kar rahe hai to isko array ka under mt dalo kuki humlog ya element ko delete kar na chate hai and jub v humlog bagItems array ko update kar rahe hai to humlog ko ya local storage me store v kar na ho ga kuki tub mera bag sahi se count rakh paye ga mera bag me kitna items hai
    bagItems = bagItems.filter(bagItemId =>bagItemId !=itemId)
    localStorage.setItem('bagItems', JSON.stringify(bagItems));

    //^ jaise he humlog apne bagItems array ko update kiye to humloog phir se render kare ga loadItemObject
    loadItemObject();

    //& whenever we are removing item from bag then we also want that our bag number should decrease the count
    displayBagIcon();
    //* we are again calling the function which will render my html in bag section
    displayBagItem();

    //! we also have to call the function which is rendering the payment summery
    displayBagSummery()



}
function generateItemHtml(item){

    return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`
}

