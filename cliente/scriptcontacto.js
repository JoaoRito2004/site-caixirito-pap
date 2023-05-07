

// Registar o evento
document.querySelector("#contact-form").addEventListener("submit", onSubmit);

/**
 * Função responsável por enviar o e-mail
 * @param {*} event
 */
async function onSubmit(event) {
  event.preventDefault();

  // Obter o elemento HTML do form
  const form = event.target;

  // Obter os dados para enviar o e-mail
  // A API key é a que obtiveste da statiforms API
  // e a restante informação tens de ir buscar ao elemento form
  // através do nome do input
  const accessKey = "f8977cd4-b87a-4322-9a5c-8120f18c8688";
  const name = form.querySelector('input[name="name"]').value;
  const subject = form.querySelector('input[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;
  const email = form.querySelector('input[name="email"]').value;

  // Crias um object com a informação toda
  const contact = {
    accessKey,
    name,
    subject,
    email,
    message,
  };

  // Envias um post usando o método fetch do javascript
  const res = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });

  console.log(res.status);
  // Adicionar uma mensagem de sucesso ou erro à pagina
alert('Obrigado Sr(a). ' + name + ' , os seus dados foram encaminhados com sucesso')





   // Ligação ao servidor 
   const bodyRequest = {name,email,subject,message};

   fetch('http://localhost:3000/contact', {
   method: 'POST',
   headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
   },
   body: JSON.stringify(bodyRequest)
})
  .then(response => response.json())
  .then(response => {
   
   console.log(JSON.stringify(response))})






   
}
