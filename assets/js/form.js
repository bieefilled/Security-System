const loginForm = document.getElementById("login");
const otpverify = document.getElementById("verifyOtp");
const phoneNum = document.getElementById("phoneNumber");
const Submitbtn = document.getElementById("Otpclick");
const comfirmOtp = document.getElementById("loginsubmmit");
const innerInfo = document.getElementById("container");
const svg1 = document.getElementById("svg");
const form = document.getElementById("formID");
const formContent = document.querySelector(".formContent");

const verifiedMenu = document.querySelector(".statMenu");
verifiedMenu.addEventListener("click", verifyMenu);
const verifiedContent = document.querySelector(".verifiedContent");

function verifyMenu() {
  formContent.classList.add("hidden");
  verifiedContent.classList.remove("hidden");
}

//mobile login form
const navlogin = document.querySelector("#mlogin");
navlogin.addEventListener("click", () => {
  svg1.classList.add("hidden");
  form.classList.remove("hidden");
});

const registerform = document.querySelector("#register");
registerform.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

const registerBtn = document.querySelector("#printIcon");
registerBtn.addEventListener("click", () => {
  registerform.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

const loginbtn = document.querySelector("#loginbtn");
loginbtn.addEventListener("click", () => {
  registerform.classList.add("hidden");
});
const output = document.getElementById("message");
function Output(text) {
  const currentText = output.innerHTML;
  var newLine = text;
  output.innerHTML = newLine;
}
// Print Status messages to UI.
const status = document.getElementById("status");
function Status(text) {
  const currentText = status.innerHTML;
  var newLine = "[" + new Date().toLocaleTimeString() + "]: \n " + text + "\n";
  status.innerHTML = newLine;
}
Status("Enter matricNo");

async function Signin(alias) {
  var challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  var userID = "Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=";
  var id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

  var publicKey = {
    challenge: challenge,

    rp: {
      name: "YABA COLLEGE OF TECHNOLOGY",
    },

    user: {
      id: id,
      name: alias,
      displayName: "Student",
    },

    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      // { type: "public-key", alg: -257 },
    ],
    authenticatorSelection: {
      // Try to use UV if possible. This is also the default.
      userVerification: "preferred",
    },
  };

  navigator.credentials
    .create({ publicKey: publicKey })
    .then((newCredentialInfo) => {
      // Send new credential info to server for verification and registration.
      console.log(`"SUCCESS:" ${newCredentialInfo}`);
      document.querySelector("#modalauth").classList.remove("hidden");
    })
    .catch((error) => {
      // No acceptable authenticator or user refused consent. Handle appropriately.
      console.log("FAIL", error.message);
      Status(`${error.message}`);
    });
}
// DEMO UI
function signoutbtn() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
}
function mattempty() {
  document.querySelector("#status").classList.add("text-brand-primary");
  Status("EMPTY FIELD");
}

function verifymat() {
  const alias = document.querySelector("#alias");

  if (alias.value === "" || alias.value === undefined) {
    document.querySelector("#status").classList.add("text-brand-primary");
    return mattempty();
  }
  if (alias.value === "f/nd/19/3210137" || alias.value === "f/nd/19/3210147") {
    document.querySelector("#status").classList.add("text-brand-primary");
    return true;
  }
}
function Hint() {
  alert(
    "for security purpose use 070115501818 for phone number \n verification and 112233 for the OTP"
  );
}

async function handleSignInSubmit() {
  if (verifymat() === true) {
    document.querySelector("#status").classList.add("text-brand-primary");
    Status("Please Wait...");
    var user = await Signin(alias);
    Status("User details: " + JSON.stringify(user));
    Status("Please Wait...");
  } else if (verifymat() == mattempty()) {
    document.querySelector("#status").classList.add("text-brand-primary");
    Status("Invalid matric-no");
    alias.value === "";
  } else {
    document.querySelector("#status").classList.add("text-brand-primary");
    Status("NOT IN DATABASE");

    alias.value === "";
  }
}

document
  .getElementById("passwordless-signin")
  .addEventListener("click", handleSignInSubmit);
