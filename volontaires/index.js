'use strict';
const usersList = document.querySelector('.list-personnes');
const addButton = document.querySelector('#add');
const deleteButton = document.querySelector('#delete');
const chooseButton = document.querySelector('#choose');
const chosenUsers = document.querySelector('.chosen');
const inputUser = document.querySelector('#player-add');
if (!localStorage.getItem('ListUsers')) {
    localStorage.setItem('ListUsers', JSON.stringify({ players: [] }));
}
document.addEventListener("DOMContentLoaded", () => {
    let data = JSON.parse(localStorage.getItem('ListUsers'));
    data.players.forEach((e) => {
        createUser(e);
    })
})


deleteButton.addEventListener('click', () => {
    usersList.innerHTML = "";
    localStorage.setItem('ListUsers', JSON.stringify({ players: [] }));
})

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem('ListUsers'));
    if (inputUser.value) {
        createUser(inputUser.value);
        data.players.push(inputUser.value);
        localStorage.setItem('ListUsers', JSON.stringify(data));
        inputUser.value = '';

    }
    else {
        console.error('aucun nom n\'est renseigné');
    }

})

chooseButton.addEventListener('click', (e) => {
    e.preventDefault();
    let listValidPlayer = document.querySelectorAll('.user:not(.not-chosable)');
    if (listValidPlayer.length !== 0) {
        let nb = listValidPlayer.length;
        let chosenPlayer = listValidPlayer[Math.floor(Math.random() * nb)];
        chosenUsers.textContent = chosenPlayer.textContent;
        chosenPlayer.classList.add('not-chosable');
        let allPlayer = document.querySelectorAll('.user');
        let allInvalidPlayer = document.querySelectorAll('.not-chosable');
        if (allPlayer.length === allInvalidPlayer.length) {
            allInvalidPlayer.forEach((p) => {
                p.classList.remove('not-chosable');
            })
        }

    } else {
        console.error('aucun joueurs');
    }

})
function createUser(name) {
    let newUser = document.createElement("div");
    newUser.textContent = name;
    newUser.classList.add('user');
    usersList.append(newUser);
}