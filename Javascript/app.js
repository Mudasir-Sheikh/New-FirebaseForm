
window.addEventListener("load", () => {
  console.log(localStorage.getItem("UserID"));
  if (!localStorage.getItem("UserID")) {
    // window.location.replace("../Public/Pages/Login.html");
    window.location.replace("/Pages/Login.html");

  }
});

import {
  doc,
  setDoc,
  getDoc,
  db,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "./firebase.js";




const submitform = async () => {
  
  

  try{


  let UserID = localStorage.getItem("UserID")
  let fullname = document.getElementById("fullname")
  let fathername = document.getElementById("fathername")
  let phoneno = document.getElementById("phoneno")
  let address = document.getElementById("address")
  let cnic = document.getElementById("cnic")
  let fathercnic = document.getElementById("fathercnic")
  const image = document.getElementById("uploadimg");
  const imagevalue = image.files[0]
  const gender = document.getElementById('gender');
  const gendervalue = gender.value;
  const course = document.getElementById('course');
  const coursevalue = course.value;
  console.log(fullname.value, fathername.value, phoneno.value, address.value, cnic.value, fathercnic.value, gendervalue, coursevalue)
  console.log(UserID)
  console.log(imagevalue)

  const imageUrl = await uploadImage(image.files[0]);

  

  const UserData = {
    fullname: fullname.value,
    fathername: fathername.value,
    phoneno: phoneno.value,
    address: address.value,
    cnic: cnic.value,
    fathercnic: fathercnic.value,
    gender: gendervalue,
    course: coursevalue,
    imageUrl: imageUrl,
    userID: UserID,
  }
  console.log(UserData)

  const userResponse = await setDoc(doc(db, "UserData", UserID), UserData);
  console.log(userResponse)

  console.log("UserDataAdded::", UserData)

  Swal.fire({
    title: 'Your Response have been Submitted Successfully!',
    icon: 'success',
    confirmButtonText: 'Ok'
  })

}
catch(error){
  Swal.fire({
    title: 'Please Fill all the Required fields!',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}


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

















window.submitform = submitform
window.signout = signout