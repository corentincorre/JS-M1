'use strict';
const buttonsOne = document.querySelectorAll('.one');
const buttonRandom = document.querySelector('.random');
const buttonAll = document.querySelector('.all');
const result = document.querySelector('.res');
const url = `https://swapi.dev/api/people/`;

buttonsOne.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault;
        getCaraters(button.id);
        selected(e.target);
    })
});
buttonRandom.addEventListener('click', (e) => {
    e.preventDefault;
    getCaraters(Math.floor(Math.random() * 10 + 1));
    selected(e.target);
})
buttonAll.addEventListener('click', (e) => {
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
    while (result.childNodes.length > 8) {
        result.removeChild(result.lastChild);
    }
    if (!number) {
        for (let index = 1; index < 11; index++) {
            fetch(url + index)
                .then((data) => data.json())
                .then((res) => {
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
                console.log(res);
            });

    }


}


