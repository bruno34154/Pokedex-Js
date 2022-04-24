var chamander = document.getElementById("chamander");
var bullbasaur = document.getElementById("bullbasaur");
var squirtle = document.getElementById("squirtle");
const typepoke = [
  "normal",
  "fighting",
  "water",
  "fire",
  "rock",
  "flying",
  "poison",
  "grass",
  "electric",
  "bug",
  "psychic",
  "ghost",
  "dragon",
  "ice",
  "ground",
  "rock",
  "fairy",
];
function resetClass() {
  typepoke.forEach((element) => {
    
    card.classList.remove(element);
  });
}
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

function getPokemon(pokemon) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let namep = document.getElementById("name");
      let typep = document.getElementById("Types");
      let base = document.getElementById("base");
      let heightp = document.getElementById("height");
      let weightp = document.getElementById("weight");
      let pic = document.getElementById("pic");
      let card = document.getElementById("card");
      const { sprites, id, name, types, height, weight, stats } = data; //desestruturação.
      const hp = stats[0].base_stat;
      const atack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const specialatk = stats[3].base_stat;
      const specialdef = stats[4].base_stat;
      const speed = stats[5].base_stat;
      const namecase = capitalize(name);
      const { front_default } = sprites;
      const firstType = types[0];

      let attributes = "";
      if (Array.isArray(types)) {
        types.forEach((element, index) => {
          const separator = index == types.length - 1 ? "." : ",";
          const typename = element.type.name ? element.type.name : ""; //condicao ternaria if reduzido.

          attributes = `${attributes} ${typename}${separator}  `;
        });
      }

      namep.innerHTML = `#${id}. ${namecase}`;
      typep.innerHTML = ` ${attributes}`;
      heightp.innerHTML = `Height: ${height}`;
      weightp.innerHTML = `Weight: ${weight} `;
      base.innerHTML = `BASE STATUS: <br> <br>HP: ${hp} <br> ATK: ${atack} <br> DEF: ${defense} <br> SPATK: ${specialatk} <br> SPDEF ${specialdef} <br> SPD: ${speed}`;

      pic.setAttribute("src", front_default);
      resetClass();
      card.classList.add(firstType.type.name);
    })
    .catch((erro) => {
      console.log("Erro: " + erro);
    });
}
