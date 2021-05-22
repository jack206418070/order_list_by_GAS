let dateInfo = document.querySelector('#date');
        let time = document.querySelector('#time');
        let nameInfo = document.querySelector('#name');
        let phone = document.querySelector('#phone');
        let address = document.querySelector('#address');
        let list = document.querySelector('#list');
        let ps = document.querySelector('#ps');
        let infoListEmpty = [dateInfo, time, nameInfo, phone, address, ps, list];

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


        init();

        function orderListControl(e) {
            let flag;
            e == undefined ? flag = false : flag = true;
            let searchName = document.querySelector('#search_name');
            let searchPhone = document.querySelector('#search_phone');
            if (flag === true) {
                console.log(1);
                if(searchBtnFlag === true){
                    searchBtnFlag = !searchBtnFlag
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
                searchName.value = '';
                searchPhone.value = '';
                form.style = 'display: none';
            }
        }


        function getListInfo(e) {
            clickNode = e.target.innerText;
            let searchName = document.querySelector('#search_name');
            let searchPhone = document.querySelector('#search_phone');
            let editName = document.querySelector('#edit_name');
            let editPhone = document.querySelector('#edit_phone');
            let ApiUrl = 'https://script.google.com/macros/s/AKfycbzpur_MtR85k5FPDcHF18U5XHRmHkm0xNOLQA4DQR7ioSTjf7M/exec';
            let searchListInfo = [searchName, searchPhone];
            let editListInfo = [editName, editPhone];
            let data;
            if (clickNode == "查詢" ? checkList(searchListInfo) : false) {
                searchBtnFlag = !searchBtnFlag;
                checkProduct(searchBtnFlag, 'search');
                loadingHandler(true);
                $.ajax({
                    type: "Get",
                    url: ApiUrl,
                    data: {
                        "order_name": searchName.value,
                        "order_phone": searchPhone.value
                    },
                    success: function (res) {
                        console.log(res);
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
                        "order_name": editName.value,
                        "order_phone": editPhone.value
                    },
                    success: function (res) {
                        console.log(res);
                        if(res.length == 0){alert('查無此訂單'); loadingHandler(false); return}
                        editName.value = '';
                        editPhone.value = '';
                        data = res[0].data;
                        console.log(data);
                        lastIndex = data.length - 1;
                        listNo = data[lastIndex - 2];
                        console.log(listNo);
                        if (data[lastIndex] == '已送出') {
                            alert('訂單已送出 請重新訂購');
                            loadingHandler(false);
                        } else {
                            btn.style = 'display: none';
                            listEditbtn.style = 'display: block';
                            document.querySelector('.listNo-value').value = listNo;
                            infoListEmpty.forEach((item, index) => {
                                console.log(item, data[index])
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
            productList = data[6].split(/[ \n]/);

            productList.forEach((item, index) => {
                if (index % 2 == 0) {
                    item !== '' ? productStr1 = productStr1 + `${item} <br>` : 0;
                } else {
                    item !== '' ? productStr2 = productStr2 + `${item} <br>` : 0;
                }
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
                        <div class="listInfo-total d-flex jy-content-around">
                            <p class="text-c-white f-size-l f-w-bold ">總金額</p>
                            <p class="text-c-white f-size-l f-w-bold ">${data[data.length - 3] !== '' ? data[data.length - 3] : '訂單未結算'}</p>                            
                        </div>
                        <div class="listInfo-sendStatus my-m">
                            <p class="text-c-white f-size-l f-w-bold text-center" style="color: red">${data[data.length - 2] !== '' ? data[data.length - 2] : '未送出'}</p>                       
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
            let date = document.querySelector('#date');
            let time = document.querySelector('#time');
            let name = document.querySelector('#name');
            let phone = document.querySelector('#phone');
            let address = document.querySelector('#address');
            let list = document.querySelector('#list');
            let ps = document.querySelector('#ps');
            let listNo = document.querySelector('.listNo-value');
            let checkData = [date, time, name, address, list];
            if (checkList(checkData)) {
                loadingHandler(true);
                $.ajax({
                    type: "post",
                    url: "https://script.google.com/macros/s/AKfycbztKxtM7tXTkr7kgxvPOVkp7WzT85aIwukg7FZ4BhZ4p2vUKVTi/exec",
                    data: {
                        "order_date": date.value,
                        "order_time": time.value,
                        "order_name": name.value,
                        "order_phone": phone.value + '',
                        "order_address": address.value,
                        "order_ps": ps.value,
                        "order_list": list.value,
                        "order_no": listNo.value
                    },
                    success: function (response) {
                        if (response == "成功") {
                            date.value = "";
                            time.value = "";
                            name.value = "";
                            phone.value = "";
                            address.value = "";
                            ps.value = "";
                            list.value = "";
                            listNo.value = "";
                            btn.style = 'display: none';
                            listEditbtn.style = 'display: block';
                            loadingHandler(false);
                            alert('修改成功');
                        }
                    }
                });
            }

        }


        function sendList() {
            let date = document.querySelector('#date');
            let time = document.querySelector('#time');
            let name = document.querySelector('#name');
            let phone = document.querySelector('#phone');
            let address = document.querySelector('#address');
            let list = document.querySelector('#list');
            let ps = document.querySelector('#ps');
            let checkData = [date, time, name, address, list];
            if (checkList(checkData)) {
                loadingHandler(true);
                $.ajax({
                    type: "post",
                    url: "https://script.google.com/macros/s/AKfycbzpur_MtR85k5FPDcHF18U5XHRmHkm0xNOLQA4DQR7ioSTjf7M/exec",
                    data: {
                        "order_date": date.value,
                        "order_time": time.value,
                        "order_name": name.value,
                        "order_phone": phone.value + '',
                        "order_address": address.value,
                        "order_ps": ps.value,
                        "order_list": list.value,
                    },
                    success: function (response) {
                        if (response == "成功") {
                            date.value = "";
                            time.value = "";
                            name.value = "";
                            phone.value = "";
                            address.value = "";
                            ps.value = "";
                            list.value = "";
                            loadingHandler(false);
                            alert('訂購成功');
                        }
                    }
                });
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
                    console.log("flag:" + flag);
                    flag++;
                    item.classList.remove('danger')
                } else {
                    item.classList.add('danger')
                }
            })
            if (flag == data.length) {
                return true
            } else {
                console.log(flag);
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
        function getThisTime(){
            let date = new Date();
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

        let interval = setInterval(function(){
            if(getThisTime().hour == 10 && getThisTime().min == 0){
                alert('不好意思 今日訂購時間已過! 目前下定為下一批預購單')
                let option = document.querySelector('.firstOption');
                option.parentNode.removeChild(option);
                clearInterval(interval);
                return
            }else{
                return
            }
        },1000);

        function init(){
            let str = '';
            let day = getThisTime().day;
            let date = getThisTime().date;
            let month = getThisTime().month;
            let data = [];
            if(getThisTime().hour >= 10 && getThisTime().min >= 0){
                for(let i = 0; i < 6; i++){
                    if((day + i) % 7 !== 1){
                        data.push(`${month}/${date+i+1}`)
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
            }else{
                for(let i = 0; i < 6; i++){
                    if((day + i) % 7 !== 1){
                        data.push(`${month}/${date+i}`)
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
        }