import { Suit, Value } from "./utils";

export default class Card {
    private _value: Value;
    private _suit: Suit;
    
    constructor(value: Value, suit: Suit) {
        this._value = value;
        this._suit = suit;
    }

    get value() {
        return this._value;
    }

    get suit() {
        return this._suit;
    }

    isHigher(card: Card) {
        return this._value > card.value;
    }
}
