let signinBtn = document.querySelector('.js-signin');
signinBtn.addEventListener('click', checkSignIn);



function checkSignIn(){
    let account = document.querySelector('#account');
    let password = document.querySelector('#password');
    $.ajax({
        type: "post",
        url: "https://script.google.com/macros/s/AKfycbxxh4wJzQHc0xWOeb7pbcBLjvOoTE5zG8bsvIzHSWpCkHhJbGg/exec",
        data: {
            "account": account.value,
            "password": password.value,
        },
        success: function (response) {
            document.cookie=`token=${response[2]}`;
            document.cookie=`account=${response[0]}`;
            document.cookie=`password=${response[1]}`;
        }
    });




    // if(account.value === 'jack90928@gmail.com' && password.value === 'a12081616'){
    //     let str = `
    //     <div class="col-sm-6">
    //         <div class="btn btn-secondary mt-s py-s js-getList" onclick="getlist()">取得未送出訂單</div>
    //     </div>  
    //     `
    //     row[1].innerHTML = str;
    // }else if(account.value === 'abc123456' && password.value === 'abc123456'){
    //     let str = `
    //     <div class="col-sm-6">
    //         <div class="btn btn-secondary mt-s py-s js-getList" onclick="getlist()">取得未送出訂單</div>
    //     </div>  
    //     `
    //     row[1].innerHTML = str;
    // }else{
    //     alert('帳號或密碼錯誤 不要玩我 謝謝!');
    //     account.value = '';
    //     password.value = '';
    // }
}


function getCookie(name){
    let arr = document.cookie.match(new RegExp(name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[1]); 
    return null;
}
// function getlist(){
//     $.post('https://script.google.com/macros/s/AKfycbwrshbrEg8h6X-RzXjCwcW0laFrAj9iMTZLYp8clRf-2VQ3hWo/exec',
//     function(e){
//         console.log(e);
//     });
// }