import { Suit, Value } from "./utils";

export default class Card {
    private _value: Value;
    private _suit: Suit;

    constructor(value: Value, suit: Suit) {
        this._value = value;
        this._suit = suit;
    }

    get value(): Value { return this._value; }
    get suit(): Suit { return this._suit; }

    isHigher(card: Card): boolean {
        if (card.value !== this._value) {
            return this._value > card.value;
        }

        return this._suit > card.suit;
    }
}
