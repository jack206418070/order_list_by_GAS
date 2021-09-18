        let dateInfo = document.querySelector('#date');
        let time = document.querySelector('#time');
        let nameInfo = document.querySelector('#name');
        let phone = document.querySelector('#phone');
        let pay = document.querySelector('#pay');
        let area = document.querySelector('#area');
        let address = document.querySelector('#address');
        let list = document.querySelector('#list');
        let ps = document.querySelector('#ps');
        let infoListEmpty = [dateInfo, time, nameInfo, phone, pay, area, address, ps, list];

        let btn = document.querySelector('.js-list-send');
        let listEditbtn = document.querySelector('.js-list-edit');
        let orderBtn = document.querySelector('.js-order');
        let productBtn = document.querySelector('.js-product');
        let loading = document.querySelector('.js-loading');
        let form = document.querySelector('form');
        let orderList = document.querySelector('.b-order');
        let product = document.querySelector('.product-list');
        let productCloseBtn = document.querySelector('.js-product-close');
        let productCloseBlock = document.querySelector('.product-close');
        let search = document.querySelector('.search');
        let edit = document.querySelector('.edit');
        let productBtnFlag = false;
        let searchBtnFlag = false;
        let editBtnFlag = false;
        let listNo = '';
        let searchBtn = document.querySelector('.js-search');
        let searchCloseBtn = document.querySelector('.js-search-close');
        let searchSendBtn = document.querySelector('.js-search-send');
        let editBtn = document.querySelector('.js-edit');
        let editCloseBtn = document.querySelector('.js-edit-close');
        let editSendBtn = document.querySelector('.js-edit-send');
        let listInfoHtml = document.querySelector('.listInfo');
        let options = document.querySelector('#date option');
        let coupon = document.querySelector('#coupon');
        let couponData = "";
        // btn.addEventListener('click', fixAlert);
        btn.addEventListener('click', sendList);
        orderBtn.addEventListener('click', orderListControl);
        productBtn.addEventListener('click', productHandler);
        productCloseBtn.addEventListener('click', productHandler);
        searchBtn.addEventListener('click', searchHandler);
        searchCloseBtn.addEventListener('click', searchHandler);
        searchSendBtn.addEventListener('click', getListInfo);
        editBtn.addEventListener('click', editHandler);
        editCloseBtn.addEventListener('click', editHandler);
        editSendBtn.addEventListener('click', getListInfo);
        listEditbtn.addEventListener('click', editList);
        coupon.addEventListener('blur', checkCoupon);
        
        

        function useCoupon(coupon){
            let ApiUrl = 'https://script.google.com/macros/s/AKfycbxoYiKQyibJ1t5dq4FLh2Of1Gv5GMMpeCU9RXl34cIHP3xDkOY/exec';
            $.ajax({
                type: 'post',
                url: ApiUrl,
                data: {
                    "coupon": coupon
                },
                success: function(res){
                    if(res == '成功'){
                        return
                    }else{
                        console.log(res)
                    }
                }
            })
        }
        function checkCoupon(){
            let ApiUrl = 'https://script.google.com/macros/s/AKfycbxoYiKQyibJ1t5dq4FLh2Of1Gv5GMMpeCU9RXl34cIHP3xDkOY/exec';
            $.ajax({
                type: 'get',
                url: ApiUrl,
                data: {
                    "coupon": coupon.value.trim()
                },
                success: function(res){
                   if(res == '失敗'){
                        document.querySelector('.js-couponSuccess').style = "display: none";
                        document.querySelector('.js-couponErr').style = "display: block";
                        document.querySelector('.js-couponErr').textContent = "無此優惠碼";
                        document.querySelector('.coupon').classList.add('error');
                   }else if(res == '已使用'){
                        document.querySelector('.js-couponSuccess').style = "display: none";
                        document.querySelector('.js-couponErr').style = "display: block";
                        document.querySelector('.js-couponErr').textContent = "此優惠碼已使用過";
                        document.querySelector('.coupon').classList.add('error');
                   }else if(res == "清空"){
                        let input = document.querySelector('.coupon');
                        if(input.classList[1] == 'error'){
                            input.classList.remove('error');
                            document.querySelector('.js-couponErr').style = "display: none";
                            couponData = "";
                        }else{
                            document.querySelector('.js-couponSuccess').style = "display: none";
                            couponData = "";
                        }
                   }else{
                        let input = document.querySelector('.coupon');
                        if(input.classList[1] == 'error'){
                            input.classList.remove('error');
                            document.querySelector('.js-couponErr').style = "display: none";
                        }
                        couponData = res[0].data[1];
                        document.querySelector('.js-couponSuccess').style = "display: block";
                        document.querySelector('.js-couponSuccess').textContent = `此優惠碼獲得 ${res[0].data[1]} 優惠`;
                   }
                }
            })
        }


        init();

        function orderListControl(e) {
            
            let flag;
            e == undefined ? flag = false : flag = true;
            let searchPhone = document.querySelector('#search_phone');
            if (flag === true) {
                if(searchBtnFlag === true){
                    searchBtnFlag = !searchBtnFlag;
                    checkProduct(searchBtnFlag, 'search');
                }else if(editBtnFlag === true){
                    editBtnFlag = !editBtnFlag;
                    checkProduct(searchBtnFlag, 'edit');
                }
                listInfoHtml.style = 'display: none';
                listInfoHtml.innerHTML = '';
                form.style = 'display: block';
            } else {
                listInfoHtml.style = 'display: block';
                searchPhone.value = '';
                form.style = 'display: none';
            }
        }


        function getListInfo(e) {
            clickNode = e.target.innerText;
            let searchPhone = document.querySelector('#search_phone');
            let editPhone = document.querySelector('#edit_phone');
            let ApiUrl = 'https://script.google.com/macros/s/AKfycbzpur_MtR85k5FPDcHF18U5XHRmHkm0xNOLQA4DQR7ioSTjf7M/exec';
            let searchListInfo = [searchPhone];
            let editListInfo = [editPhone];
            let data;
            if (clickNode == "查詢" ? checkList(searchListInfo) : false) {
                searchBtnFlag = !searchBtnFlag;
                checkProduct(searchBtnFlag, 'search');
                loadingHandler(true);
                $.ajax({
                    type: "Get",
                    url: ApiUrl,
                    data: {
                        "order_phone": searchPhone.value
                    },
                    success: function (res) {
                        if(res.length == 0){alert('查無此訂單'); loadingHandler(false); return}
                        data = res[0].data;
                        lastIndex = data.length - 1;
                        orderListControl();
                        inneHtmlListInfo(data);
                        loadingHandler(false);
                    },

                });
            } else if (clickNode == "送出" ? checkList(editListInfo) : false) {
                editBtnFlag = !editBtnFlag;
                checkProduct(editBtnFlag, 'edit');
                loadingHandler(true);
                $.ajax({
                    type: "Get",
                    url: ApiUrl,
                    data: {
                        "order_phone": editPhone.value
                    },
                    success: function (res) {
                        if(res.length == 0){alert('查無此訂單'); loadingHandler(false); return}
                        editPhone.value = '';
                        let dateInfo = `${getThisTime().month}/${getThisTime().date}`;
                        data = res[0].data;
                        let date = data[0];

                        lastIndex = data.length - 1;
                        listNo = data[9]; // 要修改
                        if (data[lastIndex] == '已送出') {
                            alert('訂單已送出 請重新訂購');
                            loadingHandler(false);
                        } else if(dateInfo == date){
                            alert('抱歉今日訂單無法修改');
                            loadingHandler(false);
                        } else {
                            listInfoHtml.style = "display: none";
                            form.style = "display: block";
                            btn.style = 'display: none';
                            listEditbtn.style = 'display: block';
                            document.querySelector('.listNo-value').value = listNo;
                            infoListEmpty.forEach((item, index) => {
                                item.value = data[index];
                            })
                            loadingHandler(false);
                        }
                    },
                })
            }
        }


        function inneHtmlListInfo(data) {
            let listInfo = document.querySelector('.listInfo');
            let productList;
            let productStr1 = '';
            let productStr2 = '';
            productList = data[8].split(/[\n]/);
            productList.forEach((item) => {
                    item !== '' ? productStr1 = productStr1 + `${item} <br>` : 0;
            })

            let str = `
                        <p class="text-c-thirdary f-size-l f-w-bold text-center mb-m">訂單狀態</p>
                        <div class="listInfo-name d-flex jy-content-center">
                            <p class="text-c-primary f-size-m f-w-600 mx-xs">訂購人</p>
                            <p class="text-c-primary f-size-m f-w-600 mx-xs">${data[2]}</p>
                        </div>
                        <div class="listInfo-list my-s">
                            <p class="text-c-primary f-size-m f-w-600 text-center my-xxs">訂單內容</p>
                            <div class="listInfo-list-product d-flex jy-content-center bg-thirdary p-s">
                                <p class="text-c-primary f-size-s f-w-600 text-center mx-xs">${productStr1}</p>
                                <p class="text-c-primary f-size-s f-w-600 text-center mx-xs">${productStr2}</p>
                            </div>
                        </div>
            `
            listInfo.innerHTML = str;
        }


        function editHandler(e) {
            if (e.target.innerText === '取消') {
                editBtnFlag = false;
                checkProduct(editBtnFlag, 'edit');
            } else {
                editBtnFlag = !editBtnFlag;
                checkProduct(editBtnFlag, 'edit');
            }
        }


        function searchHandler(e) {
            if (e.target.innerText === '取消') {
                searchBtnFlag = false;
                checkProduct(searchBtnFlag, 'search');
            } else {
                searchBtnFlag = !searchBtnFlag;
                checkProduct(searchBtnFlag, 'search');
            }
        }

        function productHandler(e) {
            if (e.target.nodeName == 'I') {
                productBtnFlag = false;
                checkProduct(productBtnFlag, 'product');
            } else {
                productBtnFlag = !productBtnFlag;
                checkProduct(productBtnFlag, 'product');
            }
        }

        function editList(){
            let dateInfo = getThisTime().date;
            let date = document.querySelector('#date');
            let time = document.querySelector('#time');
            let name = document.querySelector('#name');
            let phone = document.querySelector('#phone');
            let pay = document.querySelector('#pay');
            let area = document.querySelector('#area');
            let address = document.querySelector('#address');
            let list = document.querySelector('#list');
            let ps = document.querySelector('#ps');
            let listNo = document.querySelector('.listNo-value');
            

            let checkData = [date, time, name, pay, area, address, list];
            if (checkList(checkData) && coupon.classList.length == 1) {
                console.log(couponData)
                loadingHandler(true);
                $.ajax({
                    type: "post",
                    url: "https://script.google.com/macros/s/AKfycbztKxtM7tXTkr7kgxvPOVkp7WzT85aIwukg7FZ4BhZ4p2vUKVTi/exec",
                    data: {
                        "order_date": date.value,
                        "order_time": time.value,
                        "order_name": name.value,
                        "order_phone": phone.value + '',
                        "order_pay": pay.value,
                        "order_area": area.value,
                        "order_address": address.value,
                        "order_ps": ps.value,
                        "order_list": list.value,
                        "order_no": listNo.value,
                        "order_coupon": couponData
                    },
                    success: function (response) {
                        if (response == "成功") {
                            useCoupon(coupon.value);
                            name.value = "";
                            phone.value = "";
                            address.value = "";
                            ps.value = "";
                            list.value = "";
                            listNo.value = "";
                            btn.style = 'display: block';
                            listEditbtn.style = 'display: none';
                            coupon.value = "";
                            document.querySelector(".js-couponSuccess").style = "display:none";
                            loadingHandler(false);
                            alert('修改成功');
                        }
                    }
                });
            }else if(coupon.classList.length == 2){
                alert("無此優惠碼 或 優惠碼以使用");
                coupon.classList.remove("error");
                coupon.value = "";
                document.querySelector(".js-couponErr").style = "display:none"
            }

        }


        function sendList() {
            let coupon = document.querySelector('#coupon');
            let date = document.querySelector('#date');
            let time = document.querySelector('#time');
            let name = document.querySelector('#name');
            let phone = document.querySelector('#phone');
            let pay = document.querySelector('#pay');
            let area = document.querySelector('#area');
            let address = document.querySelector('#address');
            let list = document.querySelector('#list');
            let ps = document.querySelector('#ps');
            // let limitNum = document.querySelector('.js-limitOrder').textContent;
            let checkData = [date, time, name, pay, phone, area, address, list];
            let test = name.value == '測試' ? true : false;
            let day = (getThisTime().day == 0 && `${getThisTime(addDays(1)).month}/${getThisTime(addDays(1)).date}` == date.value) || (getThisTime().day !== 0 && `${getThisTime(addDays(1)).month}/${getThisTime(addDays(1)).date}` == date.value) ? getThisTime().day + 1 : getThisTime().day + 2;
            
            if (checkList(checkData) && coupon.classList.length == 1) {
                loadingHandler(true);
                $.ajax({
                    type: "post",
                    url: "https://script.google.com/macros/s/AKfycbzpur_MtR85k5FPDcHF18U5XHRmHkm0xNOLQA4DQR7ioSTjf7M/exec",
                    data: {
                        "order_date": date.value,
                        "order_time": time.value,
                        "order_name": name.value,
                        "order_phone": phone.value + '',
                        "order_pay": pay.value,
                        "order_area": area.value,
                        "order_address": address.value,
                        "order_ps": ps.value,
                        "order_list": list.value,
                        "order_day": day,
                        "order_test": test ? '測試' : '非測試',   
                        "order_coupon":couponData
                    },
                    success: function (response) {
                        if (response == "成功") {
                            useCoupon(coupon.value);
                            name.value = "";
                            phone.value = "";
                            address.value = "";
                            ps.value = "";
                            list.value = "";
                            coupon.value = "";
                            document.querySelector(".js-couponSuccess").style = "display:none";
                            loadingHandler(false);
                            decLimitOrderNum();
                            alert('訂購成功');
                        }else if(response == '訂單已滿'){
                            loadingHandler(false);
                            alert('明日訂單已滿 請等待下一批訂單開放時間 謝謝您的配合');
                        }else{  
                            loadingHandler(false);
                            alert('訂單重複 請利用修改功能');
                        }
                    }
                });
            }else if(coupon.classList.length == 2){
                alert("無此優惠碼 或 優惠碼以使用");
                coupon.classList.remove("error");
                coupon.value = "";
                document.querySelector(".js-couponErr").style = "display:none"
            }
        }
        function loadingHandler(flag) {
            if (flag == true) {
                loading.classList.add('loading');
                form.classList.add('loading')
            } else {
                loading.classList.remove('loading');
                form.classList.remove('loading')
            }
        }

        function checkList(data) {
            let flag = 0;
            data.forEach(item => {
                if (item.value !== '') {
                    flag++;
                    item.classList.remove('danger')
                } else {
                    item.classList.add('danger')
                }
            })
            if (flag == data.length) {
                return true
            } else {
                alert(`請將必填選項填入`);
                return false
            }

        }

        function checkProduct(flag, type) {
            if (type == 'search') {
                if (flag === true) {
                    if(editBtnFlag === true){
                        edit.classList.remove('active');
                        editBtnFlag = !editBtnFlag;
                    }
                    search.classList.add('active');
                    orderList.classList.add('active');
                } else {
                    search.classList.remove('active');
                    orderList.classList.remove('active');
                }

            } else if (type == 'edit') {
                if (flag === true) {
                    if(searchBtnFlag === true){
                        search.classList.remove('active');
                        searchBtnFlag = !searchBtnFlag;
                    }
                    edit.classList.add('active');
                    orderList.classList.add('active');
                } else {
                    edit.classList.remove('active');
                    orderList.classList.remove('active');
                }
            } else {
                if (flag === true) {
                    productBtn.text = '關閉圖片';
                    product.classList.add('active');
                    orderList.classList.add('active');
                    setTimeout(function () { productCloseBlock.style = "display: block" }, 500);
                } else {
                    productCloseBlock.style = "display: none";
                    productBtn.text = '開啟圖片';
                    product.classList.remove('active');
                    orderList.classList.remove('active');
                }
            }
        }
        function getThisTime(dateInfo = new Date()){
            let date = new Date(dateInfo);
            let dateNum = date.getDate();
            let month = date.getMonth() + 1;
            let hour = date.getHours();
            let min = date.getMinutes();
            let day = date.getDay();
            let data = {
                hour: hour,
                min: min,
                date: dateNum,
                month: month,
                day: day
            } 
            return data
        }


        function addDays(days) {
            var result = new Date();
            result.setDate(result.getDate() + days);
            return result;
        }

        let interval = setInterval(function(){
            if(getThisTime().hour == 0 && getThisTime().min == 0){
                alert('不好意思 今日訂購時間已過! 目前下定為下一批預購單')
                let option = document.querySelector('.firstOption');
                option.value = `${getThisTime().month}/${getThisTime().date}`
                return
            }
        },1000);

        function init(){
            let str = '';
            let day = getThisTime().day;
            let data = [];
            if(getThisTime().hour >= 0 && getThisTime().min >= 0){
                for(let i = 0; i < 1; i++){
                    if(((day + i) % 7 == 0  && `${getThisTime().month}/${getThisTime().date}` !== '9/19')){
                        let reslut = addDays(i+2);
                        data.push(`${getThisTime(reslut).month}/${getThisTime(reslut).date}`)
                    }else{
                        let reslut = addDays(i+1);
                        data.push(`${getThisTime(reslut).month}/${getThisTime(reslut).date}`)
                    }
                }
                data.forEach((item, index) => {
                    if(index == 0){
                        str = str +`<option class="firstOption" value="${item}">${item}</option>`
                    }else{
                        str = str + `<option value="${item}">${item}</option>`
                    }
                })
                document.querySelector('#date').innerHTML = str;
            }

            // else{
            //     for(let i = 0; i < 1; i++){
            //         if((day + i) % 7 !== 1){
            //             data.push(`${month}/${date+i}`)
            //         }
            //     }
            //     data.forEach((item, index) => {
            //         if(index == 0){
            //             str = str +`<option class="firstOption" value="${item}">${item}</option>`
            //         }else{
            //             str = str + `<option value="${item}">${item}</option>`
            //         }
            //     })
            //     document.querySelector('#date').innerHTML = str;
            // }


            for(let i = 1; i < 26; i++){
                if(i == 25){
                    list.textContent += `${i}.`
                }else{
                    list.textContent += `${i}.\n`
                }
            }
            // alert('6/3日 因大市場休錫 不開放預約 如有需求 請撥店裡電話! 專人處理')
        }


        // function getLimitOrderNum(){
        //     $.ajax({
        //         type: "GET",
        //         url: 'https://script.google.com/macros/s/AKfycbxLrq-i5RIlpgVIg2gDz9JtJnc2F-4eUoQksqzJ5N6JcgIFYbc/exec',
        //         success: function (res) {
        //             if(res[0] == 0){
        //                 alert('抱歉訂單已滿 暫時不接單');
        //                 document.querySelector('.js-limitOrder').textContent = `${res[0]}`
        //             }else{
        //                document.querySelector('.js-limitOrder').textContent = `${res[0]}`
        //             }
        //         }
        //     })
        // }


        function decLimitOrderNum(){
            $.ajax({
                type: "POST",
                url: 'https://script.google.com/macros/s/AKfycbxLrq-i5RIlpgVIg2gDz9JtJnc2F-4eUoQksqzJ5N6JcgIFYbc/exec',
                success: function (res) {
                    console.log(res)
                }
            })
        }

        // let getLimtNum = setInterval(function(){
        //     $.ajax({
        //         type: "GET",
        //         url: 'https://script.google.com/macros/s/AKfycbxLrq-i5RIlpgVIg2gDz9JtJnc2F-4eUoQksqzJ5N6JcgIFYbc/exec',
        //         success: function (res) {
        //             if(res[0] == 0){
        //                 alert('抱歉訂單已滿 暫時不接單');
        //                 document.querySelector('.js-limitOrder').textContent = `${res[0]}`
        //                 clearInterval(getLimtNum);
        //             }else{
        //                document.querySelector('.js-limitOrder').textContent = `${res[0]}`
        //             }
        //         }
        //     })
        // },2000);


