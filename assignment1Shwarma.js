const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  TYPE: Symbol("type"),
  TYPE2: Symbol("type2"),
  SECOND_ITEM: Symbol("second"),
  DRINKS: Symbol("drinks"),
  FRUITS: Symbol("Fruits")
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sType = "";
    this.sDrinks = "";
    this.sDrinks2 = "";
    this.sFruits = "";
    this.sFruits2 = "";
    this.sItem = "BBQ";
    this.sItem2 = "Soup";
    this.sItem2_type = "Mushroom";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Conestoga's BBQ.");
        aReturn.push("What meal size would you like?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TYPE;
        this.sSize = sInput;
        aReturn.push("What type would you like?");
        break;
      case OrderState.TYPE:
        this.stateCur = OrderState.DRINKS;
        this.sType = sInput;
        console.log("1");
        aReturn.push("Would you like a drink with that? If yes please specify");
        break;
      case OrderState.DRINKS:
        this.stateCur = OrderState.FRUITS;
        this.sDrinks = sInput;
        console.log("2");
        aReturn.push("Would you like a fruit with that? If yes please specify");
        break;
      case OrderState.FRUITS:
        this.stateCur = OrderState.TYPE2;
        this.sFruits = sInput;
        console.log("3");
        aReturn.push(
          "Would you like a second item as well? If yes please specify"
        );
        break;
      case OrderState.TYPE2:
        this.stateCur = OrderState.DRINKS2;
        this.sType2 = sInput;
        console.log("4");
        aReturn.push("Would you like a drink with that? If yes please specify");
        break;
      case OrderState.DRINKS2:
        this.stateCur = OrderState.FRUITS2;
        this.sDrinks2 = sInput;
        console.log("5");
        aReturn.push("Would you like a fruit with that? If yes please specify");
        break;
      case OrderState.FRUITS2:
        if (sInput.toLowerCase() != "no") {
          this.sFruits2 = sInput;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(
          `${this.sSize} meal of ${this.sItem} of type ${this.sType}`
        );
        if (this.sDrinks) {
          aReturn.push(`with a drink of ${this.sDrinks}`);
        }
        if (this.sFruits) {
          aReturn.push(`with a side of ${this.sFruits}`);
        }
        if (this.sType2) {
          aReturn.push(`and a second order of ${this.sType2} meal of ${this.sItem2} of type ${this.sType}`);
        }

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
