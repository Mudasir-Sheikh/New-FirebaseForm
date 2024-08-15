window.addEventListener("load", () => {
    if (localStorage.getItem("UserID")) {
        window.location.replace("../index.html");
    }
});


import { auth, createUserWithEmailAndPassword , doc ,setDoc ,db } from "./firebase.js";


let addUsertoDatabase = async(user , UserObj)=>{
    let CompleteUserData = {
        ...UserObj,
        verfiedEmail: user.emailVerified,
        userID:user.uid   
    } 
    const userResponse = await setDoc(doc(db, "users", user.uid), CompleteUserData);
    alert("New Account Created Sucessfully!\nPlease Login Now")
    console.log("UserDataAdded::",CompleteUserData)

}




const SignUp = async () => {
    let Username = document.getElementById("Username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let selectedGender = document.querySelector('input[name="gender"]:checked');

    let UserObj = {
        Name: Username.value,
        Email: email.value,
        Gender: selectedGender.value
    }
    console.log("UserObj", UserObj);

    
    
    
    // const response = await createUserWithEmailAndPassword(auth, email.value, password.value)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         console.log("User Added" , user.uid);

    //         const uid = user.uid;
    //         addUsertoDatabase(user , UserObj);
            
    //         window.location = "../Pages/Login.html";

    //     })
    //     .catch((error) => {
    //         const errorMessage = error.message;
    //         console.log("Error:", errorMessage)
    //         alert(`Something Went Wrong!\nError:${errorMessage}`)
            
    //     });


// }
        

    try {
        // Create the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log("User Added", user.uid);

        // Add the user data to Firestore and wait for it to complete
        await addUsertoDatabase(user, UserObj);

        // Redirect to the login page only after the user data is successfully added to Firestore
        window.location = "../Pages/Login.html";
    } catch (error) {
        const errorMessage = error.message;
        console.log("Error:", errorMessage);
        alert(`Something Went Wrong!\nError: ${errorMessage}`);
    }
};




let signupBtn = document.getElementById("SignupBtn")
signupBtn.addEventListener("click", SignUp);