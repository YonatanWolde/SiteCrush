  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
import {getFirestore, setDoc, doc} from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  const firebaseConfig = {
    apiKey: "AIzaSyDwRrgbe5RbpsNVFN6Vcy_W1rTYyBrRdjE",
    authDomain: "niga-9953c.firebaseapp.com",
    projectId: "niga-9953c",
    storageBucket: "niga-9953c.appspot.com",
    messagingSenderId: "849752442160",
    appId: "1:849752442160:web:449d10e9887b49cd37f4f5"
  };

  // Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;
    localStorage.setItem('firstname', firstName);
    localStorage.setItem('lastname', lastName);


    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)

    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=> {
            // Store the username in local storage

            localStorage.setItem('username', firstName + ' ' + lastName);
            window.location.href='loginandregister.html';
        })
        .catch((error)=> {
            console.error("error writing document", error);
        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('Unable to create User', 'signUpMessage');
        }
    });
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Login is successful', 'signInMessage');
        const user=userCredential.user;
        const username2 = localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"); // Replace this with the actual username retrieval logic
        localStorage.setItem('username', username2);
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='start2.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    });
});