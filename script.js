document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防止

    // ここでログイン処理を行う（ダミーの処理として、ユーザ名が"admin"でパスワードが"password"の場合にログイン成功とする）
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "password") {
        document.getElementById("message").textContent = "Login successful";
        setTimeout(function() {
            window.location.href = "welcome.html"; // 2秒後にwelcome.htmlに遷移
        }, 2000);
    } else {
        document.getElementById("message").textContent = "Invalid username or password";
    }
});
