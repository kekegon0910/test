document.addEventListener("DOMContentLoaded", function(event) {
    var box = document.querySelector('.box');
    var hello = document.getElementById('hello');
    var loginContainer = document.getElementById('login-container');
    var loginForm = document.getElementById('login-form');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    
    // ログインフォームの非表示
    loginContainer.style.display = 'none';
    
    // ログインフォームの表示
    setTimeout(function() {
        loginContainer.style.display = 'block';
    }, 2000); // 2秒後に表示
    
    // 初期位置
    var initialTransform = getComputedStyle(box).transform;
    box.style.transform = initialTransform + ' translateZ(-100px)'; // 初期位置を奥に設定
    
    // 画面内に入った時のアニメーション
    window.addEventListener('scroll', function() {
        var bounding = box.getBoundingClientRect();
        if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
            box.style.transform = initialTransform + ' translateZ(0)';
        } else {
            box.style.transform = initialTransform + ' translateZ(-100px)';
        }
    });

    // Hello Worldを表示
    hello.style.opacity = 1;

    // ダミーのログイン機能
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var username = usernameInput.value;
        var password = passwordInput.value;

        // ここで実際の認証を行う
        if (username === "user" && password === "password") {
            alert("ログインに成功しました！");
            // ログイン成功後の処理を追加する（例：他のページにリダイレクトする）
        } else {
            alert("ユーザー名またはパスワードが間違っています。");
        }
    });
});
