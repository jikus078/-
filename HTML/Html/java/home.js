var product = [{
    id: 1,
    img:  'img/BTS.png',
    name: 'BBQ T-shirt',
    price: 500,
    description: 'BBQ geyta asdwqe asdwq sad',
    type: 'shirt' 
}, {
    id: 2,
    img: 'img/BTS.png',
    name: 'BBQ Hoodie',
    price: 500,
    description: 'BBQ geyta asdwqe asdwq sad',
    type: 'Hoodie'
}, {
    id: 3,
    img: 'img/BTS.png',
    name: 'BBQ Sweatpants',
    price: 500,
    description: 'BBQ geyta asdwqe asdwq sad',
    type: 'Sweatpants'
}, {
    id: 4,
    img: 'img/BTS.png',
    name: 'BBQ Compression',
    price: 500,
    description: 'BBQ geyta asdwqe asdwq sad',
    type: 'shirt'
},{
    id: 5,
    img: 'img/BTS.png',
    name: 'BBQ Whey',
    price: 500,
    description: 'BBQ geyta asdwqe asdwq sad',
    type: 'Whey Protein'
}];

$(document).ready(() => {
    var html = '';
    for(let i = 0; i < product.length; i++){
        html += `<div class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="${product[i].name}">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1.2vw;">${product[i].price}</p>
                </div>`;
    }
    $("#productlist").html(html);
});