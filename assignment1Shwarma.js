const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM: Symbol("item_1"),
    SIZE_1: Symbol("size_1"),
    TOPPINGS_1: Symbol("toppings_1"),
    ITEM_2: Symbol("item_2"),
    SIZE_2:   Symbol("size_2"),
    KIND:   Symbol("kind"),
    ICECREAM:  Symbol("icecream"),
    QUESTION: Symbol("question")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.currentState = OrderState.WELCOMING;
        this.sSize1 = "";
        this.sSize2 = "";
        this.sToppings = "";
        this.sKind = "";
        this.sItem = "";
        this.sIcecream = "";
        this.totalOrder = "";
        this.cost = 0;
        this.sQuestion = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.currentState){
            case OrderState.WELCOMING:
                aReturn.push("Welcome to Himanshu's Chicken and Fries.");
                aReturn.push("Please type 1 for Chicken Bowl and 2 for Fries");
                this.currentState = OrderState.ITEM;
                break;
            case OrderState.ITEM:
                if(sInput == 1){
                    this.sItem = "Chicken Bowl";
                    aReturn.push("What size of Bowl would you like? (small, regular OR massive)");
                    this.currentState = OrderState.SIZE_1;
                }else{
                    this.sItem = "Fries";
                    aReturn.push("What size of fries would you like? (small, medium OR large)");
                    this.currentState = OrderState.SIZE_2;
                }
                this.totalOrder += this.sItem;
                break;
            case OrderState.SIZE_1:
                if(sInput.toLowerCase() == "small"){
                    this.sSize1 = "small";
                    this.cost += 6;
                }else if(sInput.toLowerCase() == "regular"){
                    this.sSize1 = "regular";
                    this.cost += 10;
                }else{
                    this.sSize1 = "massive";
                    this.cost += 12;
                }
                this.totalOrder += " of size " + this.sSize1;
                this.currentState = OrderState.TOPPINGS_1;
                aReturn.push("What kind of toppings would you like?");
                aReturn.push("Type v for Vegetarian and nv for Non-vegetarian")
                break;
            case OrderState.SIZE_2:
                if(sInput.toLowerCase() == "small"){
                    this.sSize2 = "small";
                    this.cost += 5;
                }else if(sInput.toLowerCase() == "medium"){
                    this.sSize2 = "medium";
                    this.cost += 7;
                }else{
                    this.sSize2 = "large";
                    this.cost += 9;
                }
                this.totalOrder += " of size " + this.sSize2;
                this.currentState = OrderState.KIND;
                aReturn.push("Would you like them salted or unsalted ?");
                break;
            case OrderState.TOPPINGS_1:
                if(sInput.toLowerCase() == "v"){
                    this.sToppings = "vegetarian";
                    this.cost += 5;
                }else if(sInput.toLowerCase() == "nv"){
                    this.sToppings = "Non-vegetarian";
                    this.cost += 8;
                }
                this.totalOrder += " with " + this.sToppings + " toppings" + "\n";
                this.currentState = OrderState.QUESTION;
                aReturn.push("Would you like to order more (yes or no) ?");
                break;
            case OrderState.KIND:
                if(sInput.toLowerCase() == "salted"){
                    this.sKind = "salted";
                }else{
                    this.sKind = "unsalted";
                }
                this.totalOrder += " with " + this.sKind + " topping" + "\n";
                this.currentState = OrderState.QUESTION;
                aReturn.push("Would you like to order more (yes or no) ?");
                break;
            case OrderState.QUESTION:
                if(sInput.toLowerCase() == "yes"){
                    this.sQuestion = "yes";
                    aReturn.push("Please type 1 for Chicken Bowl and 2 for Fries");
                    this.currentState = OrderState.ITEM;
                }
                else{
                    this.sQuestion = "no";
                    aReturn.push("Would you like to order Icecream with your order ?");
                    aReturn.push("If 'yes' type the kind of icecream you would like, otherwise type 'no'");
                    this.currentState = OrderState.ICECREAM;
                }
                break;
            case OrderState.ICECREAM:
                if(sInput.toLowerCase() != "no"){
                    this.sIcecream = sInput.toLowerCase() + " icecream.";
                    this.cost += 10;
                }else{
                    this.sIcecream = "";
                }
                    this.isDone(true);
                    aReturn.push("Thank-you for your order of ");
                    aReturn.push(`${this.totalOrder}`);
                    if(this.sIcecream){
                        aReturn.push(" with " + this.sIcecream);
                    }
                    aReturn.push(`Total cost of your order is $${this.cost}`);
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}