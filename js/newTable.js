
getListInfo();
let row = document.querySelector('.row');
function getListInfo() {
  let ApiUrl = 'https://script.google.com/macros/s/AKfycbwpNGcEfSvodXZ_231EXhm5siuR4qV3pc-dgHJVU3YHiBtBzDZH/exec';
  $.ajax({
    type: "Get",
    url: ApiUrl,
    success: function (res) {
      let str = ``;
      let strProduct = ``;
      let strProduct2 = ``;
      let strNo = ``;
      let lastStr = ``;
      let tempStr = ``;
      let data = [];
      let egg = [[], []];
      // let pig = [];
      // let beef = [];
      let date = new Date();
      res.forEach((item, index) => {
        // if(index >= 49){
        if (item.data[0] == `${date.getMonth() + 1}/${date.getDate()}`) {
          let productList = item.data[8];
          let productListTwo = [];
          productList = productList.split(/[\n]/);
          if (productList.length > 19) {
            productList.forEach((item, index) => {
              if (index - 1 > 19) {
                productListTwo.push(item);
              }
            })
            productList.splice(21, productList.length - 1);
          }
          let tempData = {
            name: item.data[2],
            phone: item.data[3],
            pay: item.data[4],
            address: item.data[6],
            ps: item.data[7],
            products: productList,
            productsTwo: productListTwo,
            no: item.data[9],
            coupon: item.data[10]
          };

          if (checkProduct(tempData.productsTwo)) {
            data.push(tempData);
          } else {
            tempData.productsTwo = [];
            data.push(tempData);
          }
        }
        // }
      });
      data.forEach((item, index) => {
        str = str + `
                <div class="col-12 list-table${index + 1} noBreak">
                <div style="display:flex; align-items:center; justify-content:center">
                <h1 style="text-align: center; font-size:36px;">${item.no}</h1>
                ${item.pay === '貨到付款' ? '<p style="font-size:36px; margin-left:30px">V</p>' : '<p></p>'}
                </div>
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
                        <td>優惠項目</td>
                        <td colspan="3">${item.coupon}</td>
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
                    </table>
                </div>
                `

        item.products.forEach((product, index) => {
          let productStr = product.split('.');
          if ((productStr[1] == "" || productStr[1] == " ") && productStr[0].length < 4) {
            return;
          }

          // if(product.indexOf('蛋') !== -1){
          //     if(product.indexOf('鹹') !== -1){
          //         egg[0].push(product);
          //     }else if(product.indexOf('皮') !== -1){
          //         egg[1].push(product);
          //     }
          // }else if(product.indexOf('牛肉') !== -1){
          //     beef.push(product);
          // }else if(product.indexOf('豬') !== -1){
          //     pig.push(product);
          // }
          // }
          strProduct = strProduct + `
                <tr>
                    <td class="title" style="padding:7px 0">${product}</td>
                    <td class="list" style="padding:7px 0"></td>
                    <td class="list" style="padding:7px 0"></td>
                    <td class="list" style="padding:7px 0"></td>
                </tr>
                    `
        })
        if (item.productsTwo.length !== 0) {
          item.productsTwo.forEach((product, index) => {
            let productStr = product.split('.');
            if ((productStr[1] == "" || productStr[1] == " ") && productStr[0].length < 4) {
              return;
            }
            // if(product.indexOf('魚') !== -1){
            //     fish.push(product);
            // }else if(product.indexOf('牛') !== -1){
            //     beef.push(product);
            // }else if(product.indexOf('豬') !== -1){
            //     pig.push(product);
            // }
            strProduct2 = strProduct2 + `
                    <tr>
                        <td class="title" style="padding:7px 0">${product}</td>
                        <td class="list" style="padding:7px 0"></td>
                        <td class="list" style="padding:7px 0"></td>
                        <td class="list" style="padding:7px 0"></td>
                    </tr>
                        `
          })
          tempStr = str + strProduct + strNo + str + strProduct + strNo + str + strProduct2 + strNo + str + strProduct2 + strNo;
          lastStr += tempStr;
        } else {
          tempStr = str + strProduct + strNo + str + strProduct + strNo;
          lastStr += tempStr;
        }

        str = '';
        strProduct = '';
        strNo = '';
        tempStr = '';
        strProduct2 = '';


      })
      // row.innerHTML = lastStr;
    },

  });

}


function checkProduct(data) {
  let flag = true;
  let num = 0;
  data.forEach(item => {
    let productStr = item.split('.');
    if (productStr[1] == '' || productStr[1] == ' ') {
      num++;
    }
  })
  num == data.length ? flag = false : flag = true;
  return flag;
}




async function getOrders() {
  try {
    let date = new Date();
    const res = await axios('https://sweetvegetable.com.tw/wp-json/wc/v3/orders?consumer_key=ck_5bae04295d445511cb19bd9be105ed7531869016&consumer_secret=cs_9e75e7578a615c979ec9435d2885f846fba71d73')
    const productDOM = document.querySelector('.row')
    let htmlStr = ''
    const order_product = []
    let key = 0
    let realData = res.data.map((item, index) => {
      if (+item.date_created.split('T')[0].split('-')[2] === date.getDate()) {
        order_product[key] = []
        item.line_items.forEach((item) => {
          order_product[index].push({
            name: item.name,
            price: item.subtotal,
            qty: item.quantity
          })
          if (item.meta_data.length > 1) {
            let temp = item.meta_data.pop()
            temp.value.forEach((value, key) => {
              order_product[index].push(`${key + 1}. ${Object.values(value)}`)
            })
          }
        })
        key += 1
        return {
          name: item.billing.first_name,
          address: item.billing.address1 || '',
          phone: item.billing.phone || '',
          method: item.payment_method_title,
          total: item.total,
          createAt: item.date_created.split('T')[0],
          order_product: order_product
        }
      }
    })
    realData.forEach((item, index) => {
      if (item !== undefined) {
        htmlStr += `
        <li>
         <p>${item.createAt}</p>
         <p>${item.name}</p>
         <p>${item.address}</p>
         <p>${item.phone}</p>
         <p>${item.method}</p>
         <p>${item.total}</p>
      `
        order_product[index].forEach((p) => {
          if (p.name === undefined) {
            htmlStr += `<p>${p}</p>`
          } else {
            htmlStr += `<p>${p.name}</p>`
          }
        })
        htmlStr += '</li>'
      }
    })

    console.log(order_product)
    // productDOM.innerHTML = htmlStr
  } catch (err) {
    console.dir(err)
  }
}

getOrders()