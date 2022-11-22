'use strict';
function random(nb) {
    return Math.floor(Math.random() * nb)
}

function getLetter() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return letters[random(27)];
}


function makePassword(options) {
    if (typeof options.withNumber !== undefined) {
        options.withNumber = true;

    }
    if (typeof options.size !== undefined) {
        options.size = 10;
    }
    let mdp = '';
    for (let i = 0; i < options.size; i++) {
        if (options.withNumber === true && i % 2) {
            mdp += random(10);
        } else {
            mdp += getLetter();
        }
    }
    if (options.size < 8) {
        console.log("Le mot de passe n'est pas sécurisé");
    }
    return mdp;
}
console.log(makePassword({}));