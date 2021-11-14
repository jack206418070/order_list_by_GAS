let data = [
    {
        category: '海鮮',
        data:[
            {
                name: '鯖魚',
                price: 60
            },
            {
                name: '藍鑽蝦仁',
                price: 550
            },
            {
                name: '軟絲',
                price: 120
            },
            {
                name: '黃魚',
                price: 150
            },
            {
                name: '鮪魚腹肉',
                price: 120
            },
            {
                name: '厚切鱈魚片',
                price: 200
            },
            {
                name: '蒲燒鰻',
                price: 200
            },
            {
                name: '活凍小捲',
                price: 120
            },
            {
                name: '水晶魚',
                price: 150
            },
            {
                name: '吻仔魚',
                price: 60
            },
            {
                name: '刻花花枝',
                price: 60
            },
            {
                name: '海瓜子',
                price: 120
            },
            {
                name: '鱔魚',
                price: 220
            },
            {
                name: '藍鑽蝦',
                price: 550
            },
            {
                name: '虱目魚肚',
                price: 100
            },
            {
                name: '活凍魷魚圈',
                price: 150
            },
            {
                name: '透抽',
                price: 200
            },
            {
                name: '鮭魚片',
                price: 150
            },
            {
                name: '鱸魚片',
                price: 80
            },
            {
                name: '鯛魚片',
                price: 120
            },
            {
                name: '多利魚片',
                price: 180
            },
            {
                name: '鱸魚下巴',
                price: 100
            },
            {
                name: '白帶魚塊',
                price: 120
            },
            {
                name: '白帶魚卷',
                price: 130
            },
            {
                name: '白鯧',
                price: 150
            },
            {
                name: '日本干貝',
                price: 1000
            },
            {
                name: '美國大干貝',
                price: 200
            },
            {
                name: '蟹鉗',
                price: 200
            },
            {
                name: '海草蝦',
                price: 200
            },
            {
                name: '蟹腿肉',
                price: 200
            },
            {
                name: '軟殼蟹',
                price: 200
            },
            {
                name: '黃魚一夜干',
                price: 200
            },
            {
                name: '鱸魚',
                price: 200
            },
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
            {
                name: '骰子牛',
                price: 200
            },
            {
                name: '霜降牛排',
                price: 200
            },
            {
                name: '板腱牛肉片',
                price: 200
            },
            {
                name: '牛肉絲',
                price: 200
            },
            {
                name: '豬里肌肉片',
                price: 200
            },
            {
                name: '梅花豬肉片',
                price: 200
            },
            {
                name: '去骨雞腿',
                price: 200
            },
            {
                name: '雞胸肉',
                price: 200
            },
            {
                name: '豬肉絲',
                price: 200
            },
            {
                name: '豬小排',
                price: 200
            },
            {
                name: '豬絞肉',
                price: 200
            }
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
            {
                name: '蟹味棒',
                price: 200
            },
            {
                name: '高麗菜海鮮卷',
                price: 200
            },
            {
                name: '燻鮭魚片',
                price: 200
            },
            {
                name: '高麗菜海鮮卷',
                price: 200
            },
            {
                name: '土魠魚塊',
                price: 200
            },
            {
                name: '高麗菜海鮮卷',
                price: 200
            },
            {
                name: '薯餅',
                price: 200
            },
            {
                name: '小鬆餅',
                price: 200
            },
            {
                name: '龍蝦沙拉',
                price: 200
            },
            {
                name: '藜麥雞湯',
                price: 200
            },
            {
                name: '烏骨雞湯',
                price: 200
            },
            {
                name: '起司條',
                price: 200
            },
            {
                name: '月亮蝦餅',
                price: 200
            },
            {
                name: '府城蝦捲',
                price: 200
            },
            {
                name: '酥炸魷魚圈',
                price: 200
            },
            {
                name: '麻油猴頭菇',
                price: 200
            },
            {
                name: '麵線蝦',
                price: 200
            },
            {
                name: '花枝楊',
                price: 200
            },
            {
                name: '虱目魚丸',
                price: 200
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