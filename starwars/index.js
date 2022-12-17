'use strict';
const buttonsOne = document.querySelectorAll('.one');
const buttonRandom = document.querySelector('.random');
const buttonAll = document.querySelector('.all');
const result = document.querySelector('.res');
const url = `https://swapi.dev/api/people/`;

buttonsOne.forEach(button => {
    button.addEventListener('click', (e) => {
        // Ne sert à rien si non exécuté
        e.preventDefault;
        getCaraters(button.id);
        selected(e.target);
    })
});
buttonRandom.addEventListener('click', (e) => {
    // Ne sert à rien si non exécuté
    e.preventDefault;
    getCaraters(Math.floor(Math.random() * 10 + 1));
    selected(e.target);
})
buttonAll.addEventListener('click', (e) => {
    // Ne sert à rien si non exécuté
    e.preventDefault;
    getCaraters();
    selected(e.target);
})
function selected(e) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    })

    e.classList.add('active');
}
function getCaraters(number = null) {
  /**
   * while de manière général est risqué (risque fort de boucles infinies).
   * Tu pourrais faire la même avec une boucle for ou forEach
   */
    while (result.childNodes.length > 8) {
      /**
       * Si tu cliques vite sur 2 boutons différents,
       * tu cumules les infos de plusieurs personnages
       */
        result.removeChild(result.lastChild);
    }
    if (!number) {
      /**
       * Ici: risque de désynchronisation entre le nombre de boutons dans le markup
       * et le nombre de requêtes envoyées.
       * Tu pourrais plutôt te baser sur un tableau [1, 2, 3...] pour construire
       * ton markup, et sur le même tableau pour faire tes requêtes.
       */
        for (let index = 1; index < 11; index++) {
            fetch(url + index)
                .then((data) => data.json())
                .then((res) => {
                  // Ce code méritait d'être dans une fonction dédiée
                    let name = document.createElement("h2");
                    name.textContent = res.name;
                    name.classList.add('name');
                    result.append(name);
                })
        }
    } else {
        fetch(url + number)
            .then((data) => data.json())
            .then((res) => {
              // Ce code méritait d'être dans une fonction dédiée
                let name = document.createElement("h2");
                name.textContent = res.name;
                name.classList.add('name');
                result.append(name);
                let weight = document.createElement("p");
                weight.textContent = res.mass + ' kg';
                weight.classList.add('weight');
                result.append(weight);
                let height = document.createElement("p");
                height.textContent = res.height + ' cm';
                height.classList.add('height');
                result.append(height);
                let films = document.createElement("ul");
                films.classList.add('films-list');
                result.append(films);
                /**
                 * De manière générale, je n'aime pas trop l'effet
                 * "affichage au fur et a mesure", mais pourquoi pas
                 */
                res.films.forEach(element => {
                    fetch(element)
                        .then((data) => data.json())
                        .then((filmRes) => {
                            let film = document.createElement("li");
                            film.textContent = filmRes.title;
                            film.classList.add('film');
                            films.append(film);
                        })
                })
            });

    }


}


