
const loginForm = document.querySelector("#login-Form");


loginForm.addEventListener('submit', onlogin);
 

function onlogin(event){
    event.preventDefault();
    const form = event.target;

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    console.log('email:', email, 'password:', password);

    const bodyRequest = {email, password};

    fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyRequest)
})
   .then(response => response.json(200))
   .then(response => {
    if (response.message==='login success') {
        window.location="../site-admin/index.html";
    } else {
        alert(response.message);
    }

    console.log(response);

})
  
}

