
import { Ui } from "./ui.js";
import { Details } from "./details.js";



 
  export class Games {
  constructor() {
    this.getGames("mmorpg");

    document.querySelector(".menu a").forEach((link) => {
      link.addEventListner("click", (e) => {
        document.querySelector(".menu .active").classList.remove(".active");
        e.target.classList.add("active");
        this.getGames(e.target.dataset.category);
      });
    });
    this.ui = new Ui();
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "fe6a7e2b17msh4248b97cf10c8c4p1eafdbjsn731603eba097",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const response = await api.json();
    // console.log(response);
    this.ui.displayDataGame(response);
    this.startEvent();
    loading.classList.add("d-none");
  }

  startEvent() {
    document.querySelector(".card").forEach((item) => {
      item.addEventListner("click", () => {
        const id = item.dataset.id;
        this.showDetails(id);
      });
    });
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}



