
getListInfo();
let row = document.querySelector('.row');
function getListInfo() {
    let ApiUrl = 'https://script.google.com/macros/s/AKfycbwpNGcEfSvodXZ_231EXhm5siuR4qV3pc-dgHJVU3YHiBtBzDZH/exec';
    $.ajax({
        type: "Get",
        url: ApiUrl,
        success: function (res) {
            let str = ``;
            let strProdcut = ``;
            let strNo = ``;
            let lastStr = ``;
            let tempStr = ``;
            let data = [];
            let length = res.length - 3;
            res.forEach((item, index) => {
                if(index > 40){
                    let productList = item.data[8];
                    productList = productList.split(/[\n]/);
                    let tempData = {
                        name: item.data[2],
                        phone: item.data[3],
                        pay: item.data[4],
                        address: item.data[6],
                        ps: item.data[7],
                        products: productList,
                        no: item.data[9]
                    };
                    data.push(tempData);
                }
            });
            data.forEach((item, index) => {
                str = str + `
                <div class="col-6 list-table${index + 1}">
                <table>
                    <tr>
                        <td>訂貨人</td>
                        <td colspan="3">${item.name}</td>
                    </tr>
                    <tr>
                        <td>連絡電話</td>
                        <td colspan="3">${item.phone}</td>
                    </tr>
                    <tr>
                        <td>付款方式</td>
                        <td colspan="3">${item.pay}</td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td colspan="3">${item.address}</td>
                    </tr>
                    <tr>
                        <td>備註</td>
                        <td colspan="3">${item.ps}</td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td>品項</td>
                        <td>數量</td>
                        <td>單價</td>
                        <td>金額</td>
                    </tr>
                `
                strNo = strNo + `
                        <tr>
                            <td>總金額</td>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td>訂單編號</td>
                            <td colspan="3">${item.no}</td>
                        </tr>
                    </table>
                </div>
                `

            item.products.forEach((product, index) => {
                strProdcut = strProdcut + `
                <tr>
                    <td class="title">${product}</td>
                    <td class="list"></td>
                    <td class="list"></td>
                    <td class="list"></td>
                </tr>
                    `
            })
            tempStr = str + strProdcut + strNo + str + strProdcut + strNo;
            lastStr += tempStr; 


            str = '';
            strProdcut = '';
            strNo = '';
            tempStr = '';
            })
            row.innerHTML = lastStr;
        },

    });
    
}


// let limtHeight = 702 - document.querySelector('.list-table1').clientHeight;
// document.querySelectorAll('.list-table2').forEach(item => {
//     item.style = `margin-top:${limtHeight}px`
// })
// limtHeight = 702 - document.querySelector('.list-table2').clientHeight;
// document.querySelectorAll('.list-table3').forEach(item => {
//     item.style = `margin-top: ${limtHeight}px`
// })
