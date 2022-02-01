const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  SIZE2: Symbol("size2"),
  TYPE: Symbol("type"),
  TYPE2: Symbol("type2"),
  SECOND_ITEM: Symbol("second"),
  DRINKS: Symbol("drinks"),
  DRINKS2: Symbol("drinks"),
  FRUITS: Symbol("Fruits"),
  FRUITS2: Symbol("Fruits")
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sSize2 = "";
    this.sType = "";
    this.sType2 = "";
    this.sDrinks = "";
    this.sDrinks2 = "";
    this.sFruits = "";
    this.sFruits2 = "";
    this.sItem = "Conestoga Cafteria";
    this.sItem2 = "Soup";
    this.sItem2_type = "Mushroom";
    this.total = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Conestoga's Cafeteria.");
        aReturn.push(
          "What meal size would you like? Small is $4, Medium is $5, Large is $6"
        );
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TYPE;
        if (sInput.toLowerCase() == "small") {
          this.sSize = sInput;
          this.total = this.total + 4;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "medium") {
          this.sSize = sInput;
          this.total = this.total + 5;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "large") {
          this.sSize = sInput;
          this.total = this.total + 6;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else {
          aReturn.push("Please enter valid size");
          this.stateCur = OrderState.SIZE;
        }
        break;
      case OrderState.TYPE:
        this.stateCur = OrderState.DRINKS;
        if (sInput.toLowerCase() != "fish" && sInput.toLowerCase() != "burger" && sInput.toLowerCase() != "chicken") {
          aReturn.push("Please enter valid type");
          this.stateCur = OrderState.TYPE;
        } else {
          this.sType = sInput;
          aReturn.push(
            "Would you like a drink with that for an extra $2? If yes please specify drink type else say no"
          );
        }
        break;
      case OrderState.DRINKS:
        this.stateCur = OrderState.FRUITS;
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
          this.total = this.total + 2;
        }
        console.log("2");
        aReturn.push(
          "Would you like a fruit with that for +$3? If yes please specify"
        );
        break;
      case OrderState.FRUITS:
        this.stateCur = OrderState.SIZE2;
        if (sInput.toLowerCase() != "no") {
          this.sFruits = sInput;
          this.total = this.total + 3;
        }
        console.log("3");
        aReturn.push(
          "Would you like a second item as well? If yes please specify either small medium or large else say no"
        );
        break;
      case OrderState.SIZE2:
        if (sInput.toLowerCase() == "small") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.total = this.total + 4;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "medium") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.total = this.total + 5;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "large") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.total = this.total + 6;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "no") {
          this.isDone(true);
          aReturn.push("Thank-you for your order of");
          aReturn.push(
            `${this.sSize} meal from ${this.sItem} of type ${this.sType}`
          );
          if (this.sDrinks) {
            aReturn.push(`with a drink of ${this.sDrinks}`);
          }
          if (this.sFruits) {
            aReturn.push(`with a side of ${this.sFruits}`);
          }
          aReturn.push(
            `Total cost with tax is $${(this.total * 1.13).toFixed(2)}`
          );
          let d = new Date();
          d.setMinutes(d.getMinutes() + 20);
          aReturn.push(`Please pick it up at ${d.toTimeString()}`);
          break;
        } else {
          aReturn.push("Please enter valid size");
          this.stateCur = OrderState.SIZE2;
        }
        break;
      case OrderState.TYPE2:
        this.stateCur = OrderState.DRINKS2;
        if (sInput.toLowerCase() != "fish" && sInput.toLowerCase() != "burger" && sInput.toLowerCase() != "chicken") {
          aReturn.push("Please enter valid type");
          this.stateCur = OrderState.TYPE2;
        } else {
          this.sType2 = sInput;
          aReturn.push(
            "Would you like a drink with that for an extra $2? If yes please specify drink type else say no"
          );
        }
        break;
      case OrderState.DRINKS2:
        this.stateCur = OrderState.FRUITS2;
        if (sInput.toLowerCase() != "no") {
          this.sDrinks2 = sInput;
          this.total = this.total + 2;
        }
        console.log("5");
        aReturn.push(
          "Would you like a fruit with that for +$3? If yes please specify"
        );
        break;
      case OrderState.FRUITS2:
        this.isDone(true);
        console.log("here");
        if (sInput.toLowerCase() != "no") {
          this.sFruits2 = sInput;
          this.total = this.total + 3;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(
          `${this.sSize} meal from ${this.sItem} of type ${this.sType}`
        );
        if (this.sDrinks) {
          aReturn.push(`with a drink of ${this.sDrinks}`);
        }
        if (this.sFruits) {
          aReturn.push(`with a side of ${this.sFruits}`);
        }
        if (this.sSize2) {
          aReturn.push(
            `and a second order of a ${this.sSize2} meal from ${this.sItem} of type ${this.sType2}`
          );
        }
        if (this.sDrinks2) {
          aReturn.push(`with a drink of ${this.sDrinks2}`);
        }
        if (this.sFruits2) {
          aReturn.push(`with a side of ${this.sFruits2}`);
        }

        aReturn.push(
          `Total cost with tax is $${(this.total * 1.13).toFixed(2)}`
        );

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
