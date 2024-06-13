const showLogin = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="/static/styles.css">
            <title>Document</title>
        </head>
        <body>
            <nav>
                ${navBar()}
            </nav>
            <main class="loginPage">
                <h1>LOGIN PAGE</h1>
                <form class="form__loginPage" action="/login/logInPath" method="post">
                    <h2 class="form__loginPage__title">INICIAR SESION</h2>
                    <label for=loginEmail">Email:</label>
                    <input type="text" id="loginEmail" name="loginEmail" required><br>
                    <label for="loginContraseña">Contraseña:</label>
                    <input type="password" id="loginContraseña" name="loginContraseña" autocomplete="on" required><br>    
                    <button class="form__loginPage__button form__button" type="submit">Iniciar sesión</button>
                </form>
                <form class="form__loginPage" action="/login/createAccount" method="post">
                    <h2 class="form__loginPage__title">CREAR CUENTA</h2>
                    <label for="signupEmail">Email:</label>
                    <input type="text" id="signupEmail" name="signupEmail" required><br>
                    <label for="signupContraseña">Contraseña:</label>
                    <input type="password" id="signupContraseña" name="signupContraseña" autocomplete="on" required><br>    
                    <label for="DobleContraseña">Repite la contraseña:</label>
                    <input type="password" id="DobleContraseña" name="DobleContraseña" autocomplete="on" required><br>  
                    <button class="form__loginPage__button form__button" type="submit">Crar cuenta</button>
                </form>
            </main>
        </body>
        </html>
    `);
};

const newAccount = (req, res) => {
    res.redirect('/dashboard');
}

const logIn = (req, res) => {
    res.redirect('/dashboard');
}

const logOut = (req, res) => {
    res.redirect('/products');
}

const navBar = () => {
    const nav = `
    <div class="mainNav__wrap">   
            <a class="mainNav__wrap__link" href='/products'>Principal</a>
            <a class="mainNav__wrap__link" href="/products/category/Camisetas">Camisetas</a>
            <a class="mainNav__wrap__link" href="/products/category/Pantalones">Pantalones</a>
            <a class="mainNav__wrap__link" href="/products/category/Zapatos">Zapatos</a>
            <a class="mainNav__wrap__link" href="/products/category/Accesorios">Accesorios</a> 
    </div>
    `;

    return nav;
};

module.exports = { showLogin, newAccount, logIn, logOut };


