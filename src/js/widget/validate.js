export class validateWidget {
  constructor(element) {
    this.element = element;
    this.card = "";
    this.statusCard = false;
    this.cardType = "";
    this.cardTypeColor = "";
  }

  static get markup() {
    return `
        <div class="container">
        <div class="widget-card">
          <div class="cards">
            <div data-card="mir">
              <img src="./src/image/mir.svg" alt="Карта MIR" />
            </div>
            <div data-card="mastercard">
              <img src="./src/image/mastercard.svg" alt="Карта MasterCard" />
            </div>
            <div data-card="visa">
              <img src="./src/image/visa.svg" alt="Карта Visa" />
            </div>
            <div data-card="discover">
              <img src="./src/image/discover.svg" alt="Карта Discover" />
            </div>
            <div data-card="american express">
              <img
                src="./src/image/american-express.svg"
                alt="Карта American Express"
              />
            </div>
            <div data-card="jcb">
              <img src="./src/image/jcb.svg" alt="Карта JCB" />
            </div>
            <div data-card="diners club">
              <img src="./src/image/diners-club.svg" alt="Карта Diners Club" />
            </div>
          </div>
          <form action="" class="form">
            <input type="text" placeholder="Credit number" />
            <button>Валидация</button>
          </form>
        </div>
      </div>
        `;
  }

  bindToDom() {
    this.element.innerHTML = validateWidget.markup;
  }

  getCardNumber() {
    const form = this.element.querySelector("form");
    const formInput = form.querySelector("input");
    this.card = formInput.value;
  }

  validateAlgorithm() {
    let cardNumberReverse = this.card.split("").reverse();
    let resultArray = [];
    cardNumberReverse.forEach((number, index) => {
      if (index % 2 === 1) {
        number *= 2;
        if (number > 9) {
          number -= 9;
        }
      }
      resultArray.push(Number(number));
    });
    let cardSum = resultArray.reduce((sum, acc) => sum + acc, 0);
    if (cardSum % 10 === 0) {
      return (this.statusCard = true);
    }
    return false;
  }

  validateCardType() {
    if (this.statusCard) {
      const cardLength = this.card.length;
      const americanCardNumber = ["34", "37"];
      if (
        Number(this.card.slice(0, 1)) === 4 &&
        cardLength >= 13 &&
        cardLength <= 16
      ) {
        return (this.cardType = "visa");
      } else if (
        Number(this.card.slice(0, 2)) >= 51 &&
        Number(this.card.slice(0, 2)) <= 55 &&
        cardLength === 16
      ) {
        return (this.cardType = "mastercard");
      } else if (
        americanCardNumber.includes(this.card.slice(0, 2)) &&
        cardLength === 15
      ) {
        return (this.cardType = "american express");
      } else if (Number(this.card.slice(0, 4)) === 6011 && cardLength === 16) {
        return (this.cardType = "discover");
      } else if (
        Number(this.card.slice(0, 4)) >= 3528 &&
        Number(this.card.slice(0, 4)) <= 3589 &&
        cardLength >= 16 &&
        cardLength <= 19
      ) {
        return (this.cardType = "jcb");
      } else if (Number(this.card.slice(0, 1)) === 2 && cardLength === 16) {
        return (this.cardType = "mir");
      } else if (
        Number(this.card.slice(0, 1)) === 3 &&
        cardLength >= 14 &&
        cardLength <= 16
      ) {
        return (this.cardType = "diners club");
      }
    }
  }

  validateCardColor() {
    const americanCardNumber = ["34", "37"];
    if (Number(this.card.slice(0, 1)) === 4) {
      this.cardTypeColor = "visa";
    } else if (
      Number(this.card.slice(0, 2)) >= 51 &&
      Number(this.card.slice(0, 2)) <= 55
    ) {
      this.cardTypeColor = "mastercard";
    } else if (americanCardNumber.includes(this.card.slice(0, 2))) {
      this.cardTypeColor = "american express";
    } else if (Number(this.card.slice(0, 4)) === 6011) {
      this.cardTypeColor = "discover";
    } else if (
      Number(this.card.slice(0, 4)) >= 3528 &&
      Number(this.card.slice(0, 4)) <= 3589
    ) {
      this.cardTypeColor = "jcb";
    } else if (Number(this.card.slice(0, 1)) === 2) {
      this.cardTypeColor = "mir";
    } else if (Number(this.card.slice(0, 1)) === 3) {
      this.cardTypeColor = "diners club";
    }
  }

  changeColorCard() {
    const widgetCards = this.element.querySelector(".cards");
    const cards = widgetCards.querySelectorAll("div");
    cards.forEach((card) => {
      card.classList.add("noactive");
      if (this.cardTypeColor === card.getAttribute("data-card")) {
        card.classList.remove("noactive");
      }
    });
  }

  findCard() {
    const form = this.element.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getCardNumber();
      this.validateAlgorithm();
      this.validateCardType();
      const existBox = this.element.querySelector("p");
      if (existBox) {
        existBox.remove();
      }
      const createBox = document.createElement("p");
      createBox.innerHTML = `Ваша карта принадлежит платеженой системе ${this.cardType.toUpperCase()}`;
      this.cardType = "";
      this.element.appendChild(createBox);
    });
    form.addEventListener("input", () => {
      this.getCardNumber();
      this.validateCardColor();
      this.changeColorCard();
    });
  }
}
