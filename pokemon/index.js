const url = `https://pokeapi.co/api/v2/`;

function getPokemons(number, lang = false) {
    fetch(url + 'generation/' + number)
        .then((data) => data.json())
        .then((res) => {
            const gen = res.pokemon_species;
            gen.forEach(element => {
                let pkm = {}
                pkm.name = element.name;
                console.log(element)
            });
        })

}
getPokemons(1);