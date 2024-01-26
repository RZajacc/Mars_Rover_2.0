/* eslint-disable @typescript-eslint/no-non-null-assertion */
import emailjs from '@emailjs/browser'
// *Initialize emailJS
;(function () {
  emailjs.init('DzZ6BIu3N4pT6e34Q')
})()

const contactForm: HTMLFormElement = document.querySelector('#contact-form')!
// * Send email with data from the document
contactForm.addEventListener('submit', (event) => {
  // handle the form data
  event.preventDefault()

  // *Send form with emailjs
  emailjs
    .sendForm('contact_service', 'contact_form', contactForm)
    .then(() => {
      contactForm.submit()
    })
    .catch((error) => {
      const par = document.getElementById('test') as HTMLParagraphElement
      par.innerText = 'Something went wrong!'
      console.log('FAILED....', error)
    })
})
