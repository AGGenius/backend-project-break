const {initializeApp} = require('firebase/app');
const  {
    getAuth, 
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut} = require('firebase/auth');

let auth;

const initializeFB = () => {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: "project-break-2.firebaseapp.com",
        projectId: "project-break-2",
        storageBucket: "project-break-2.appspot.com",
        messagingSenderId: "983213254305",
        appId: "1:983213254305:web:364e25f0f41a7fc244f2e0"
    };
      
    const firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, user => {
        if(user != null) {
          console.log('logged in!');
        } else {
          console.log('No user');
        }
    });
}

const authUser = async(req, res, next) => {
	const loginEmail = req.body.Email;
    const loginPassword = req.body.Contraseña;

    try{
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        res.locals.user = userCredential;
        next();
    } catch(error) {
        if(error.code == 'auth/invalid-email') {
            console.log(error);
            return res.json({ "error": "El email no indicado no tiene cuenta en este servicio."});
        } else if(error.code = 'auth/invalid-email'){ 
            console.log(error);
            return res.json({ "error": "La contraseña indicada no es correcta."});
        } else { 
            console.log(error);
            return res.json({ "error": `${error}`});
        }
    }
}

const createAccount = async (req, res, next) => {
    const loginEmail = req.body.Email;
    const loginPassword = req.body.Contraseña;  
    const loginPasswordRepeated = req.body.DobleContraseña;

    if(loginPassword !== loginPasswordRepeated) {   
        return res.json({ "error": "Las contraseñas no coinciden."});
    }

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        res.locals.user = userCredential;
        next();
    } catch(error) {
        if(error.code == 'auth/email-already-in-use') {
            console.log(error);
            return res.json({ "error": "El email indicado ya tiene cuenta en el servicio."});
        } else { 
            console.log(error);
            return res.json({ "error": `${error}`});
        }
    }
}

const logOutUser = async (req, res, next) => {
    try{
        await signOut(auth);
        next();
    } catch(error) {
        console.log(error);
        res.json({ "error": "Error al cerrar sesion."});
    }
}

const alrreadyLogged = (req, res, next) => {
    if(auth.currentUser) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

const monitorAuthState = (req, res, next) => {
    if(auth.currentUser) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    initializeFB,
	authUser,
    createAccount,
    logOutUser,
    alrreadyLogged,
    monitorAuthState,
}