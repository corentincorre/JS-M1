'use strict';
const url = 'https://geo.api.gouv.fr/';
const searchResult = document.querySelector('.search-res');
const displayResult = document.querySelector('.res');
let communes = [];
let departements = [];
let regions = [];
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
    let reslist = document.querySelectorAll('li')
    reslist.forEach(result => {
        result.addEventListener("click", (e) => {
            let data = e.target;
            displayRes(data);
        })
    })
})

function autocomplete(data) {
    searchResult.innerHTML = "";
    communes.forEach(commune => {
        if (commune.nom.toLowerCase().includes(data.toLowerCase())) {
            let com = document.createElement("li");
            com.textContent = commune.nom + " (" + commune.codeDepartement + ")";
            com.classList.add('commune');
            searchResult.append(com);
        }
    });
    departements.forEach(departement => {
        if (departement.nom.toLowerCase().includes(data.toLowerCase())) {
            let dep = document.createElement("li");
            dep.textContent = departement.nom;
            dep.classList.add('departement');
            searchResult.append(dep);
        }
    });
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


