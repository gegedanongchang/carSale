var adminUserName = "admin";
var adminPassWord = "123456";
 
function login() {    
    var _userName = document.getElementById("userInput").value;
    var _passwd = document.getElementById("pwdInput").value;
 
    if(_userName == "" || _passwd == ""){
        alert("ユーザー名またはパスワードが入力されていません！");
        return;
    }
    else if (_userName == adminUserName && _passwd == adminPassWord) {
        window.location.href="./loginComplete.html";
    }
    else if(_userName == adminUserName && _passwd != adminPassWord){
        alert("ユーザー名またはパスワードが間違っています！");
        return;
    }
    var db = openDatabase('mydb', '1.0', 'UserDB', 2 * 1024 * 1024);    
    
    db.transaction(function (tx) {
    tx.executeSql("SELECT * FROM users", [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++){
            if(results.rows.item(i).userName == _userName)
            {
                var dbPasswd = results.rows.item(i).passWord;
                if(_passwd == dbPasswd){
                    window.location.href="./loginComplete.html";  
                }else{
                    alert("ユーザー名またはパスワードが間違っています！");
                }
                return;
            }
        }
        alert("ユーザー名またはパスワードが間違っています！");
    }, null);
    });
}
 
function logon(){
    var logon_userName = document.getElementById("_userInput").value;
    var logon_passwd = document.getElementById("_pwdInput").value;
    var logon_phoneNum = document.getElementById("_phoNumInput").value;
    if(logon_userName == ""){
        alert("ユーザー名を入力してください！");
        return;
    }
    if(logon_phoneNum == ""){
        alert("電話番号を入力してください！");
        return;
    }
    if(logon_passwd == ""){
        alert("パスワードを入力してください！");
        return;
    }
    
    var db = openDatabase('mydb', '1.0', 'UserDB', 2 * 1024 * 1024);
    var curLen = 0;
    db.transaction(function (tx) {        
        tx.executeSql("SELECT * FROM users", [], function (tx, results) {
            curLen = results.rows.length;
        }, null);
    });
    
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS users (id unique, userName unique, passWord, phoneNum)");
        tx.executeSql('INSERT INTO users (id, userName, passWord, phoneNum) VALUES ("' + String(curLen + 1) + '","' + logon_userName + '","' + logon_passwd + '","' + logon_phoneNum + '")');
    });
    db.transaction(function (tx) {
        tx.executeSql('SELECT userName FROM users WHERE id="' + String(curLen + 1) + '"', [], function (tx, results){
            if(results.rows.item(0).userName == logon_userName)
                alert(logon_userName + "アカウントの登録に成功しました！");
            else
                alert("アカウントの登録に失敗しました！");
            return;
        },null);
    });
}
    
function forgetPwd() {
    alert("管理者ログイン情報：\nユーザー名：" + adminUserName + "\nパスワード：" + adminPassWord);
}

function change() {
    alert("機能が切り替えされた")
}