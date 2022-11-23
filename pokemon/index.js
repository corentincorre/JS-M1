const url = `https://pokeapi.co/api/v2/`;

function getPokemons(number, lang = false) {
    let pkmList = [];
    fetch(url + 'generation/' + number)
        .then((data) => data.json())
        .then((res) => {
            const gen = res.pokemon_species;
            gen.forEach(element => {
                let pkm = {}
                fetch(url + 'pokemon-species/' + element.name)
                    .then((data) => data.json())
                    .then((res) => {
                        pkm.id = res.id;
                        let existantLang = [];
                        res.names.forEach(language => {
                            existantLang.push(language.language.name);
                        })
                        if (existantLang.includes(lang)) {
                            pkm.name = res.names[existantLang.indexOf(lang)]['name'];
                        } else {
                            pkm.name = res.name;
                        }


                        fetch(url + 'pokemon/' + element.name)
                            .then((data) => data.json())
                            .then((res) => {
                                pkm.image = res.sprites.other["official-artwork"];
                            })
                    })
                pkmList.push(pkm);
            });
            console.log(pkmList);
        })

}
getPokemons(1, 'ja');