const userData = [
  {
    id: 1,
    email: "venkat@venkat.com",
    password: "venkat",
  },
  {
    id: 2,
    email: "mohan@mohan.in",
    password: "mohan",
  },
  {
    id: 3,
    email: "narayanan@narayanan.org",
    password: "narayanan",
  },
  {
    id: 4,
    email: "prakash@prakash.co.in",
    password: "prakash",
  },
];

const EMAIL_REGEX = /[A-Za-z0-9]@[A-Za-z].[A-Za-z]/;

const PWD_REGEX = /^[A-Za-z0-9@#*]{6,10}/;

const validateEmail = (email) => EMAIL_REGEX.test(email);

const validatePwd = (pwd) => PWD_REGEX.test(pwd);

const handleSubmit = (e) => {
  e.preventDefault();
  const loginMessageLabel = document.getElementById("login-message-lbl");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (validateEmail(email) && validatePwd(password)) {
    loginMessageLabel.innerText = "Either username or password is incorrect!";
    userData.forEach((data) => {
      if (data.email === email && data.password === password) {
        loginMessageLabel.innerText = "Login Successful! Welcome";
        return;
      }
    });
  } else {
    loginMessageLabel.innerText = "Please enter a valid email and password";
  }
};

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleSubmit);
