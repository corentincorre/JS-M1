'use strict';
const res = document.createElement("div");
res.classList.add('res');
document.body.append(res);
const form = document.createElement("form");
document.body.append(form);
const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute('id', 'blackmail')
form.append(input);

document.querySelector('#blackmail').addEventListener("input", (e) => {
    let data = e.target.value;
    blackmail(data);
})
document.addEventListener("DOMContentLoaded", () => {
    blackmail();
})

function blackmail(data = false) {
    const container = document.querySelector('.res');
    container.innerHTML = '';
    if (data !== false) {
        localStorage.setItem('blackmail', data);
    }
    else if (!localStorage.getItem('blackmail')) {
        localStorage.setItem('blackmail', '');
    }
    let mail = localStorage.getItem('blackmail');
    for (let letter of mail) {
        const classNb = Math.floor(Math.random() * 5);
        const div = document.createElement("div");
        div.textContent = letter;
        div.classList.add('text' + classNb);
        if (div.textContent === ' ') {//pour que les espaces apparaissent
            div.classList.add('space');
        }
        document.querySelector('.res').append(div);

    };


}
