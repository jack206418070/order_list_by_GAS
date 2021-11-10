let data = [
    {
        category: '海鮮',
        data:[
            {
                name: '鯖魚',
                price: 80
            },
            {
                name: '藍鑽蝦',
                price: 650
            },
            {
                name: '軟絲',
                price: 250
            }
        ]
    },
    {
        category: '肉品',
        data:[
            {
                name: '牛小排',
                price: 300
            },
            {
                name: '松阪豬',
                price: 150
            },
        ]
    },
    {
        category: '冷凍食品',
        data:[
            {
                name: '雞塊',
                price: 200
            },
            {
                name: '花枝丸',
                price: 250
            },
        ]
    }
];
let reslutData = {}
let selectBtn = document.querySelector('.select-btn');
let sendBtn = document.querySelector('.sendBtn');
let seafood = document.querySelector('.seafood');
let meat = document.querySelector('.meat');
let freezeFood = document.querySelector('.freezeFood');
selectBtn.addEventListener('click', selectHandler);
sendBtn.addEventListener('click', sendHandler);


function sendHandler(e){
    e.preventDefault();
    let apiUrl = 'https://script.google.com/macros/s/AKfycbxq7IrpQwaLHiq-KwKYF5kLBh3DZ50xXBMLNGEWaxj5i3nmKhM/exec';
    $.ajax({
        type: "post",
        url: apiUrl,
        data: reslutData,
        success: function (response) {
            if (response == "成功") {
                console.log(reslutData);
                alert('發送成功');
            }else{  
                console.log('失敗')
            }
        }
    });
}


function selectHandler(e){
    let getCouponData =[];
    let seafoodLen = data[0].data.length;
    let meatLen = data[1].data.length;
    let freezeFoodLen = data[2].data.length;
    let lenData = [ Math.floor( Math.random() * seafoodLen), Math.floor( Math.random() * meatLen), Math.floor( Math.random() * freezeFoodLen)];
    getCouponData.push(data[0].data[lenData[0]]);
    getCouponData.push(data[1].data[lenData[1]]);
    getCouponData.push(data[2].data[lenData[2]]);
    animate();
    setTimeout(function(){
        getCouponData.forEach( (item, index) => {
            switch(index){
                case 0: 
                    seafood.innerHTML = `
                    <li class="mid">
                        <p>${item.name}</p>
                        <p class="list__content__price">$${item.price}</p>
                    </li>`
                    break;
                case 1: 
                    meat.innerHTML = `
                    <li class="mid">
                        <p>${item.name}</p>
                        <p class="list__content__price">$${item.price}</p>
                    </li>`
                    break;
                case 2: 
                    freezeFood.innerHTML = `
                    <li class="mid">
                        <p>${item.name}</p>
                        <p class="list__content__price">$${item.price}</p>
                    </li>`
                    break;
                default: break;
            }
        })
    },10000)
    
    let nameStr = '';
    let priceStr = '';
    getCouponData.forEach((item,index) => {
        if(index == getCouponData.length - 1){
            nameStr += `${item.name}`;
            priceStr += `${item.price}`;
            return;
        }
        nameStr += `${item.name},`;
        priceStr += `${item.price},`;
    })
    reslutData.name = nameStr;
    reslutData.price = priceStr;
    console.log(reslutData)
}

function animate(){
    let arr = document.querySelectorAll('.list__content li');
    arr.forEach((item,index) => {
        setTimeout(function(){
            item.classList.add('run');
        },500*index, index);
    });
}