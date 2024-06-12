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
            <form class="form__editProduct" action="/login/logInPath" method="post">
                <label for="Email">Email:</label>
                <input type="text" id="Email" name="Email" required><br>
                <label for="Contraseña">Contraseña:</label>
                <input type="text" id="Contraseña" name="Contraseña" required><br>    
                <button class="" type="submit">Log in</button>
            </form>
        </body>
        </html>
    `);
};

const logIn = (req, res) => {
    res.redirect('/dashboard');
}

const logOut = (req, res) => {
    res.redirect('/products');
}

module.exports = { showLogin, logIn, logOut };


