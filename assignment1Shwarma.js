const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    Type:   Symbol("type"),
    SECOND_ITEM: Symbol("second"),
    DRINKS:  Symbol("drinks"),
    Fruit: Symbol("Fruit")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sType = "";
        this.sDrinks = "";
        this.sItem = "Seafood";
        this.sItem2 = "Soup";
        this.sItem2_type="Mushroom";
        this.sFruit = " ";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Conestoga's Seafood.");
                aReturn.push("What meal size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.Type
                this.sSize = sInput;
                aReturn.push("What type would you like?");
                break;
            case OrderState.Type:
                this.stateCur = OrderState.DRINKS
                this.sType = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} meals of ${this.sItem} of type ${this.sType}`);
                if(this.sDrinks){
                    aReturn.push(`with a drink of ${this.sDrinks}`);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}