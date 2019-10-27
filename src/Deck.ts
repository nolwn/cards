import cards from "./cards.json";
import * as _ from "lodash";

export default class Deck {
    private _cards: Array<string>;
    private _hands: Array<Array<string>>;

    constructor() {
        this._cards = this.openDeck();
        this._hands = [];
    }

    get cards() {
        return [...this._cards];
    }

    openDeck(): Array<string> {
        return [...cards];
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

    takeHand(): string[] {
        const hand = this._hands.shift();

        if (!hand) {
            this._hands = [];
            return null;
        }

        return hand;
    }
}