import Card from "./Card";
import CardCollection from "./CardCollection";
import { Suit, Value } from "./utils";
import * as _ from "lodash";

export default class Deck extends CardCollection{
    private _hands: Card[][];

    constructor() {
        const cards: Card[] = [];

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 12; j++) {
                const suit: Suit = i;
                const value: Value = j;

                cards.push(new Card(value, suit));
            }
        }

        super(cards);
        this._hands = [];
    }

    deal(n: number): void {
        let j = 0;
        for (let i = 0; i < this._cards.length; i++) {
            if (!this._hands[j]) {
                this._hands.push([]);
            }

            this._hands[j].unshift(this._cards[i]);

            if (++j >= n) {
                j = 0;
            }
        }

        this._count = 0;
    }

    takeHand(): Card[] {
        const hand = this._hands.shift();

        if (!hand) {
            this._hands = [];
            return null;
        }

        return hand;
    }

    shuffle(): void {
        this._cards = _.shuffle(this._cards);
    }
}