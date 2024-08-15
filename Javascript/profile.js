window.addEventListener("load", () => {
    console.log(localStorage.getItem("UserID"));
    if (!localStorage.getItem("UserID")) {
      // window.location.replace("../Public/Pages/Login.html");
      window.location.replace("/Pages/Login.html");
  
    }
  });




import {
    doc,
    getDoc,
    db,
    updateDoc ,
    deleteDoc,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "./firebase.js";





let UserID = localStorage.getItem("UserID")
let email = localStorage.getItem("Email")

let fullname = document.getElementById("fullname")
let fathername = document.getElementById("fathername")
let phoneno = document.getElementById("phoneno")
let address = document.getElementById("address")
let cnic = document.getElementById("cnic")
let fathercnic = document.getElementById("fathercnic")
let gender = document.getElementById('gender');
let gendervalue = gender.value;
let course = document.getElementById('course');
let coursevalue = course.value;


window.addEventListener("load", async () => {

    const docRef = doc(db, "UserData", UserID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const UserObjectFromDb = docSnap.data()
        console.log("User Data from Database:", docSnap.data());

        localStorage.setItem("UserName", UserObjectFromDb.fullname)
        let Username = localStorage.getItem("UserName")
        console.log("Username::", Username)

        let parent = document.getElementById('parent')
        parent.innerHTML = ` <p class="text-center"
                    style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 1.7rem; font-weight: bold;">
                    My Profile</p>
                <img class="rounded-start-circle mt-2 prof-img" src="${UserObjectFromDb.imageUrl}" alt="">
                <p class="m-1 font-monospace " style="font-weight: bold;">${Username}</p>
                <p class="m-1 font-monospace">${email}</p>
                <button class="btn btn-danger" onclick="UpdateProfile()">Change Profile Picture</button>
                `

        fullname.value = UserObjectFromDb.fullname
        fathername.value = UserObjectFromDb.fathername
        phoneno.value = UserObjectFromDb.phoneno
        address.value = UserObjectFromDb.address
        cnic.value = UserObjectFromDb.cnic
        fathercnic.value = UserObjectFromDb.fathercnic
        gendervalue = UserObjectFromDb.gender
        coursevalue = UserObjectFromDb.course

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

})


let DeleteResponse = async () => {
    await deleteDoc(doc(db, "UserData", UserID));
    console.log("User Data Deleted")
    fullname.value = ""
    fathername.value = ""
    phoneno.value = ""
    address.value = ""
    cnic.value = ""
    fathercnic.value = ""
    gendervalue = ""
    coursevalue = ""
    Swal.fire({
        title: 'Your Response have been removed Successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

const UpdateProfile = async () => {

    const { value: file } = await Swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
            "accept": "image/*",
            "aria-label": "Upload your profile picture"
        }
    });
    if (file) {
        console.log(file)
        let imageUrl = await uploadImage(file)
        const dataRef = doc(db, "UserData", UserID);

        await updateDoc(dataRef, {
            imageUrl: imageUrl
        });

        Swal.fire({
            title: "Your New picture has been uploaded",
        });
        window.reload()
    };
}




const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const metadata = {
            contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                //   switch (error.code) {
                //     case 'storage/unauthorized':
                //       // User doesn't have permission to access the object
                //       break;
                //     case 'storage/canceled':
                //       // User canceled the upload
                //       break;

                //     // ...

                //     case 'storage/unknown':
                //       // Unknown error occurred, inspect error.serverResponse
                //       break;
                //   }
                reject(error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
};





const signout = ()=>{
    localStorage.removeItem("UserID");
    localStorage.clear();
    window.location.replace("../Pages/Login.html");
  }




window.DeleteResponse = DeleteResponse
window.UpdateProfile = UpdateProfile
window.signout = signout






