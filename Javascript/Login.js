window.addEventListener("load", () => {
    if (localStorage.getItem("UserID")) {
        window.location.replace("../index.html");
    }
});


import {auth , signInWithEmailAndPassword  } from "./firebase.js"


let Login = async() => {
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    let response = await signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User Login Sucessfully",user)

            const UserId = user.uid
            console.log(UserId)

            localStorage.setItem("UserID",UserId);
            localStorage.setItem("Email",user.email)
            window.location = "../index.html";  ////Where you want to Navigate After login or Already Logined 

        })


        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error",errorMessage)
            alert(`Error: ${errorMessage}\nPlease Try again`)
        });





}

let LoginBtn = document.getElementById("login_btn")
LoginBtn.addEventListener("click" , Login)