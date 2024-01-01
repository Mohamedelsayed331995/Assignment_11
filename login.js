var signUpName = document.querySelector("#signUpName")
var signUpEmail = document.querySelector("#signUpEmail")
var signUpPassword = document.querySelector("#signUpPassword")
var userList;

if (localStorage.getItem("userList") == null) {
    userList = []
}
else {
    userList = JSON.parse(localStorage.getItem("userList"))
}

if (document.querySelector("#signUpButtom")) {
    document.querySelector("#signUpButtom").addEventListener("click", function (e) {
        signUp()
    })
}


function signUp() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        document.querySelector("#allInputsRequired").classList.replace("d-none", "d-block")
    }
    else if (validateEmail() === true && validatePassword() === true) {
        if (compareEmail() == true) {
            var userData = {
                name: signUpName.value,
                email: signUpEmail.value,
                password: signUpPassword.value,
            };

            userList.push(userData)
            // console.log(userData)
            localStorage.setItem("userList", JSON.stringify(userList))
            document.querySelector("#alreadyExist").classList.replace("d-block", "d-none")
            document.querySelector("#successMsg").classList.replace("d-none", "d-block")
            document.querySelector("#allInputsRequired").classList.replace("d-block", "d-none")
        }
    }
}

function validateEmail() {
    var Regex = /^.{6,}\.com$/
    if (Regex.test(signUpEmail.value)) {
        document.querySelector("#invalidEmailInput").classList.replace("d-block", "d-none")
        return true;
    }
    else {
        document.querySelector("#invalidEmailInput").classList.replace("d-none", "d-block")
        return false;
    }
}

function validatePassword() {
    var Regex = /^[a-z A-Z 0-9]{4,}$/
    if (Regex.test(signUpPassword.value)) {
        document.querySelector("#invalidPassInput").classList.replace("d-block", "d-none")
        return true
    }
    else {
        document.querySelector("#invalidPassInput").classList.replace("d-none", "d-block")
        return false;
    }
}

function compareEmail() {
    for (var i = 0; i < userList.length; i++) {
        if (signUpEmail.value == userList[i].email) {
            document.querySelector("#alreadyExist").classList.replace("d-none", "d-block")
            document.querySelector("#allInputsRequired").classList.replace("d-block", "d-none")
            return false;
        }
    }
    document.querySelector("#alreadyExist").classList.replace("d-block", "d-none")
    return true;



}

var emailLogin = document.querySelector("#emailLogin")
var passLogin = document.querySelector("#passLogin")
var loginName=JSON.parse(localStorage.getItem("loginName"));


if (document.querySelector("#loginButton")) {
    document.querySelector("#loginButton").addEventListener("click", function (e) {
        compareLogin()
    })
}

function compareLogin() {
    for (var i = 0; i < userList.length; i++) {
        if (emailLogin.value == userList[i].email && passLogin.value == userList[i].password) {
            loginName=userList[i].name
            localStorage.setItem("loginName",JSON.stringify(loginName))
            window.open("home.html", "_self")
            return true;
        }
    }

    document.querySelector("#loginErrorMessage").classList.replace("d-none", "d-block")
    return false;
}


var greating = "Welcome " + loginName;
if (document.querySelector("#greatingMessage")) {

    document.querySelector("#greatingMessage").innerHTML = greating;
    console.log(greating)


}