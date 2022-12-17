'use strict';
const url = 'https://geo.api.gouv.fr/';
const searchResult = document.querySelector('.search-res');
const displayResult = document.querySelector('.res');
let communes = [];
let departements = [];
let regions = [];
/**
 * C'est plutôt une mauvaise idée de précharger toute cette donnée.
 * Vu la quantité de communes (50k+), mieux vaut faire des appels
 * plus précis à chaque input
 */
fetch(url + 'communes')
    .then((data) => data.json())
    .then((res) => {
        communes = res.sort((a, b) => a.population - b.population);
    })
fetch(url + 'departements')
    .then((data) => data.json())
    .then((res) => {
        departements = res;

    })
fetch(url + 'regions')
    .then((data) => data.json())
    .then((res) => {
        regions = res;

    })
document.querySelector('#searchbar').addEventListener("input", (e) => {
    let data = e.target.value;
    autocomplete(data);
    /**
     * Tu pourrais ajouter les listeners directement quand tu crées les lis.
     * Là, tu sépares des bouts de code qui ont du sens ensemble.
     */
    let reslist = document.querySelectorAll('li')
    reslist.forEach(result => {
        result.addEventListener("click", (e) => {
            let data = e.target;
            // Tu pourrais plutôt te baser sur la donnée source plutot que sur le markup
            displayRes(data);
        })
    })
})

function autocomplete(data) {
    searchResult.innerHTML = "";
    // Utilise plutôt .filter()
    communes.forEach(commune => {
        if (commune.nom.toLowerCase().includes(data.toLowerCase())) {
            let com = document.createElement("li");
            com.textContent = commune.nom + " (" + commune.codeDepartement + ")";
            com.classList.add('commune');
            searchResult.append(com);
        }
    });
    // Utilise plutôt .filter()
    departements.forEach(departement => {
        if (departement.nom.toLowerCase().includes(data.toLowerCase())) {
            let dep = document.createElement("li");
            dep.textContent = departement.nom;
            dep.classList.add('departement');
            searchResult.append(dep);
        }
    });
    // Utilise plutôt .filter()
    regions.forEach(region => {
        if (region.nom.toLowerCase().includes(data.toLowerCase())) {
            let reg = document.createElement("li");
            reg.textContent = region.nom;
            reg.classList.add('region');
            searchResult.append(reg);
        }
    });
    if (data === "") {
        searchResult.innerHTML = "";
    }
}

function displayRes(data) {
    displayResult.innerHTML = "";
    searchResult.innerHTML = "";
    let resultToDisplay = []

    /**
     * Évite de te baser sur le markup pour extraire de la donnée
     * surtout quand tu as cette donnée en mémoire
     */
    if (data.classList.contains('commune')) {
        const name = data.textContent.split(" ");
        resultToDisplay = communes.find(element => element.nom === name[0])
        console.log(resultToDisplay)
    }
    else if (data.classList.contains('departement')) {
        resultToDisplay = departements.find(element => element.nom === data.textContent)
    }
    else if (data.classList.contains('region')) {
        resultToDisplay = regions.find(element => element.nom === data.textContent)
    }
    Object.keys(resultToDisplay).forEach(val => {
        let elem = document.createElement("div");
        elem.textContent = val + ' : ' + resultToDisplay[val];
        displayResult.append(elem);
    });
}


