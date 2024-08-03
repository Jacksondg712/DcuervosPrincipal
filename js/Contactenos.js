// document.getElementById('Contact_Form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const serviceID = 'service_mcmyb2j';
//     const templateID = 'template_peqxgcb';

//     emailjs.sendForm(serviceID, templateID, this)
//         .then(() => {
//             alert('Mensaje enviado!');
//         }, (err) => {
//             alert(JSON.stringify(err));
//         });
// });

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_mcmyb2j';
   const templateID = 'template_peqxgcb';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});