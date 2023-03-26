//// sidebar

$('#btn').click((e)=>{
    
    e.preventDefault()
    $('.sidebar').toggleClass('show')
})

//dropdownmenu
$('.hide').hide()
$('.submenu').hide()
$('.dropdown').hover(function (e) {
    
    e.preventDefault()
    
    $(this).find('.show').toggle()
    $(this).find('.hide').toggle()
    $(this).find('.submenu').stop().slideToggle()
})

//dark mode

$('#sun').hide()
let dark = false
$('.darkmode').click(function(){
    $('#sun').toggle()
    $('#moon').toggle()
    $('#sun').toggleClass('sun-yellow')
    $('body').toggleClass('body-dark')
    $('.left ul li a').toggleClass('ul-darkmode')
    $('.submenu').toggleClass('submenu-bcg-darkmode')
    $('.right ul li a').toggleClass('ul-darkmode')
    $('.box p').toggleClass('ul-darkmode')
    $('.card-body').toggleClass('card-darkmode')
    $('.card-body p').toggleClass('p-darkmode')
    $('.card-body h5').toggleClass('p-darkmode')
    if (dark == false ){
        dark = true
        $('.logo').attr('src','images/logo.png')
    }else if (dark == true){
        $('.logo').attr('src','images/logo2.png')
        dark = false
    }

    
})

//shoping Cart

const purchasebutton = document.querySelector('.purchasebutton')
const boxes = document.querySelector('.boxes')
const amount = document.querySelector('.amount')
const price = document.getElementById('price')





// let shopingCart = []

let shopItems = [
{
    'id': 4411,
    'itemName' : 'The Last of Us™ Part I' ,
    'price' : 60 ,
    'img' : 'images/thelastofus.jpg',
    'quantity' : 3,
    'cart' : 0
    
},
{
    'id': 4422 ,
    'itemName' : 'God of War Ragnarök' ,
    'price' : 69 ,
    'img' : 'images/godofwar.jpg',
    'quantity' : 4,
    'cart' : 0
},
{
    'id' : 4433,
    'itemName' : 'SpiderMan-MilesMorales' ,
    'price' : 45 ,
    'img' : 'images/spiderman (2).jpg',
    'quantity' : 5,
    'cart' : 0
},
{
    'id' : 4444,
    'itemName' : 'Company of Heroes 3' ,
    'price' : 60 ,
    'img' : 'images/34211.jpg',
    'quantity' : 2,
    'cart' : 0 
},
{
    'id' : 4455,
    'itemName' : 'Starfield' ,
    'price' : 75 ,
    'img' : 'images/Untitled-1.jpg',
    'quantity' : 1,
    'cart' : 0 
},
{
    'id' : 4466,
    'itemName' : 'Horizon Forbidden West' ,
    'price' : 70 ,
    'img' : 'images/horizen.jpg',
    'quantity' : 3,
    'cart' : 0 
}
]

let generateShop = () => {
    boxes.innerHTML = '';

    shopItems.forEach(element => {
        
        //بررسی وضعیت موجودی
        if(element.quantity > 0) {
            boxes.innerHTML += `
            <div class="col-md-3 mt-3 me-5">
                        <div class="card" style="width: 18rem;">
                <img src="${element.img}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.itemName}</h5>
                    <p class="card-text amount">Quantity : ${element.quantity}</p>
                    <p class="card-text">${element.price}$</p>
                    <button type="button" class="btn btn-success btn-add" value="${element.id}"  onclick="addToCart(${element.id})">Add to Cart</button>
                </div>
                </div>
            
            </div>`
        }else {
            boxes.innerHTML += `
            <div class="col-md-3 mt-3 me-5">
                        <div class="card" style="width: 18rem;">
                <img src="${element.img}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.itemName}</h5>
                    <p class="card-text amount ">Quantity : ${element.quantity}</p>
                    <p class="card-text">${element.price}$</p>
                    <button type="button" class="btn btn-danger btn-finish" value="${element.id}"  disabled>Finished</button>
                </div>
                </div>
            
            </div>`
        }
        
    })


}
    
generateShop()


function addToCart(id) {
    shopItems.forEach(product => {
        if (product.id === id){

            
                
                product.quantity -=  1
                $('.sidebar').addClass('show')
                product.cart++
                
                
                insertTOUI ()

                //بعد از تغییر در موجودی، صفحه آپدیت میشود
                generateShop()
                  
        
            
        }
        
    })
    
    
    console.log(shopItems)
}

//نیازی به این بخش نیست چون کل دکمه هارو تحت تاثیر قرار میده
// function quantityUpdate(id){
//     shopItems.forEach(element =>{
//         if (element.id === id){
//             if (element.quantity === 0 ){
                
//                  $('.btn-finish').show()
//                  $('.btn-add').hide()
                 
//             } else if (element.quantity > 0){
//                 $('.btn-finish').hide()
//                  $('.btn-add').show()
//             }
//         }
//     })
// }





function insertTOUI () {
    myList.innerHTML = ''
    
    shopItems.forEach((element,i) => {
        if(element.cart > 0){
            myList.innerHTML += 
        `<li>
        
         ${element.itemName} <br>
        Price : ${element.price}$  * ${element.cart}
        <button class="btn"  onclick="decrement(${element.id})"><i class="fa-solid fa-minus"></i></button>
        
        
        </li>
        
        `
        price.innerText = `Total = ${totalPrice()}$`
        console.log(totalPrice())
        purchasebutton.innerHTML = `<hr><button id="purchaseBttn" class="btn btn-success w-100 purchase"> Purchase </button>`
        }
 
        if (myList.innerHTML == ''){
            price.innerText = ``
            purchasebutton.innerHTML =''
           
        }
    });

      const purchaseBttn = document.getElementById('purchaseBttn')
      purchaseBttn.addEventListener('click' , function() {
        alert('Purchased successfully')
      })
}




function totalPrice(){
    let total = 0;
    shopItems.forEach(element => {
        if (element.cart > 0){
            total += element.price * element.cart
            
            
        }
    })
    return(total)
}

function decrement (id){
    shopItems.forEach((product,i) => {
        if (product.id === id){

            if(product.cart > 0) {
                    product.cart--
                    product.quantity++
                    generateShop()
                    insertTOUI ()
                    return
                
                    
          
            }else if(product.cart < 1) {
                return remove(i)
                
               
            }
            
            
            
        }
       
               
    })
    
}

// function remove(i) {
    
//     shopingCart.splice(i , 1)
    
    
//     insertTOUI ()
    
    
// }







