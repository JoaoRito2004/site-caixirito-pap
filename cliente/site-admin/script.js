function obterDados(){
    fetch('http://localhost:3000/contactos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

       .then(response => response.json())

       .then( response => {
        injetarContactos(response.data);

    })
    }
    
  function injetarContactos(contactos){
console.log(contactos);
let htmlString =``;
for (let i =0; i<contactos.length;i++){
  let actionhtml= "";
  if(contactos[i].status==='por responder')
  {
    htmlString = htmlString + `<tr>
    <th scope="row">${contactos[i].id}</th>
    <td>${contactos[i].name}</td>
    <td>${contactos[i].email}</td>
    <td>${contactos[i].subject}</td>
    <td>${contactos[i].message}</td>
    <td  style="text-align: right;">
    <button class="reply-contact" class="btn btn-light btn-small" data-contact='${JSON.stringify(contactos[i])}'><i class="bi bi-pencil"></i> Responder</button>
    </td>
  </tr>`;
  } else {
    htmlString = htmlString + `<tr>
    <th scope="row">${contactos[i].id}</th>
    <td>${contactos[i].name}</td>
    <td>${contactos[i].email}</td>
    <td>${contactos[i].subject}</td>
    <td>${contactos[i].message}</td>
    <td  style="text-align: right;">
   Respondido
    </td>
  </tr>`;
  }
}
console.log(htmlString);
document.querySelector('#contactos-tbody').innerHTML= htmlString;

const replyButtons = document.querySelectorAll('.reply-contact');

console.log(replyButtons);
for(let j = 0; j < replyButtons.length; j++) {
  replyButtons[j].addEventListener('click', showReplyContact);
} 
}

function showReplyContact(event) {
  const button = event.target;
  const contact = JSON.parse(button.dataset.contact);
const contactosContainer= document.querySelector('.contactos-container');
contactosContainer.classList.add('show');

contactosContainer.querySelector('input[name="id"]').value = contact.id;
contactosContainer.querySelector('input[name="name"]').value = contact.name;
contactosContainer.querySelector('input[name="email"]').value = contact.email;
contactosContainer.querySelector('input[name="subject"]').value = 'Responder : ' + contact.subject;


}
  




    obterDados();




  

    

const formCliente = document.querySelector("#contact-form");

formCliente.addEventListener("submit", mandarEmail);


function mandarEmail(event) {
  event.preventDefault();
  const form = event.target;

  const id = form.querySelector('input[name="id"]').value;
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const subject = form.querySelector('input[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;


  const emailCliente = {id,name,email,subject,message};

  console.log(emailCliente);

  fetch('http://localhost:3000/responderContacto', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailCliente)
})

   .then(response => response.json())
   .then( response => {
    alert(response.message);

})


}






