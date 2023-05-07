var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const ETHEREAL_EMAIL = 'ottis.dooley@ethereal.email';
const ETHEREAL_PASSWORD = 'VJ4ehVekJwsgTW4bsg';


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "joaorito_admin123",
    database: "caixirito",
    insecureAuth: true,
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

 
app.post('/login', function (req, res) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.query);

    // Ligacao a bd para validar o utilizador
    connection.query(`SELECT * FROM caixirito.users where email='${email}'and password='${password}';`, function (error, results, fields) {
        if (error) throw error;
        console.log('The user is: ', results);
        if(results.length==1){
            res.status(200).json({message: 'login success', data: results[0]});
        }else if(results.length==0){
            res.status(400).json({message: 'Dados do utilizador invalidos' });

        }
      });
        
})



app.post('/contact', function (req, res) {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    console.log(req.query);

    // Ligacao a bd para validar o utilizador
    connection.query(`INSERT INTO caixirito.contact (name, email, subject, message, status) VALUES ('${name}', '${email}','${subject}', '${message}' , 'por responder');`, function (error, results, fields) {
        if (error) throw error;
        console.log('The user is: ', results);
        if(results.length==1){
            res.status(200).json({message: 'Seu pedido foi enviado!', data: results[0]});
        }else if(results.length==0){
            res.status(400).json({message: 'Seu pedido não foi enviado, tente novamente!' });
        }
      });
})



app.get('/contactos', function (req, res) {

    // Ligacao a bd para validar o utilizador
    connection.query(`SELECT * FROM caixirito.contact;`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
            res.status(200).json({ data: results});
      }); 
})




app.post('/responderContacto', function (req,res) {

    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

console.log(id,name,email,subject,message);




const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ETHEREAL_EMAIL,
        pass: ETHEREAL_PASSWORD
    }
});


var mailOptions = {
  from: ETHEREAL_EMAIL,
  to: email,
  subject: subject,
  text: message};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.status(500).json({message: 'Falha a processar o pedido'});
  } else {
    connection.query(`UPDATE contact SET status='respondido', response='${message}' WHERE id=${id};`, function (error) {
        if (error) {
            res.status(500).json({message: 'Falha a processar o pedido'});
        } else {
            res.status(200).json({message: 'Resposta enviada com sucesso'});
        }
     
       
      });
  }
});



})


app.listen(3000)





