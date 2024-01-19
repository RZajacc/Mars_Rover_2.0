"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("@emailjs/browser"));
// *Initialize emailJS
(function () {
    browser_1.default.init("DzZ6BIu3N4pT6e34Q");
})();
const contact_Form = document.querySelector("#contact-form");
// * Send email with data from the document
contact_Form.addEventListener("submit", (event) => {
    // handle the form data
    event.preventDefault();
    // *Send form with emailjs
    browser_1.default
        .sendForm("contact_service", "contact_form", contact_Form)
        .then(() => contact_Form.submit())
        .catch((error) => {
        console.log("FAILED....", error);
    });
});
