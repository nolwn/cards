import Card from "./Card";
import { Suit, Value } from "./utils";
import * as _ from "lodash";

export default class Deck {
    private _cards: Card[];
    private _hands: Card[][];

    constructor() {
        this._cards = this.openDeck();
        this._hands = [];
    }

    get cards(): Card[] {
        return [...this._cards];
    }

    openDeck(): Card[] {
        const cards: Card[] = [];

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 12; j++) {
                const suit: Suit = i;
                const value: Value = j;

                cards.push(new Card(value, suit));
            }
        }

        return cards;
    }

    cut(): void {
        this._cards = [...this._cards.slice(26), ...this._cards.slice(0, 26)];
    }

    shuffle(): void {
        const cards = _.shuffle(this._cards);

        this._cards = cards;
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
    }

    takeHand(): Card[] {
        const hand = this._hands.shift();

        if (!hand) {
            this._hands = [];
            return null;
        }

        return hand;
    }
}