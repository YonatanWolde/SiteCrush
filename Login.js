function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  function goToLink() {
    var email = document.getElementById("email1").value;
    var password = document.getElementById("password1").value;

    if (validateEmail(email) && password.length >= 8) {
        if (checkIfRegistered(email)) {
            alert("Login successful!");
            window.location.href = "start2.html";
        } else {
            alert("You are not registered. Please register first.");
            window.location.href = "register.html";
        }
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
    }
}
  function checkIfRegistered(email) {
    var storedEmail = localStorage.getItem('email');
    if (storedEmail === email) {
        return true;
    } else {
        return false;
    }
}
  