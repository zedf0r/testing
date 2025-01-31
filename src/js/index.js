import html from ".././index.html"
import css from "../css/main.css"
import { validateWidget } from "./widget/validate"
import img from "./img/import-img"
console.log('JS Init')

document.addEventListener("DOMContentLoaded", function () {
    const validate = new validateWidget(document.querySelector('.main'))
    validate.bindToDom();
    validate.findCard();
});