import * as _ from "lodash";
import Card from "./Card";

export default class CardCollection {
    protected _count: number;
    protected _cards: Card[];

    constructor(cards: Card[]) {
        this._cards = [...cards];
        this._count = cards.length;
    }

    get cards(): Card[] {
        return [...this._cards];
    }

    get count(): number {
        return this._count;
    }

    sort(): void {
        this._cards = _.orderBy(this._cards, ["suit", "value"], ["desc", "asc"]);
    }

    pass(): Card {
        if (this._count === 0) {
            return null;
        }
        
        this._count--;
        return this._cards.shift();
    }

    take(...cards: Card[]): void {
        for (const card of cards) {
            this._count++;
            this._cards.push(card);
        }
    }

    cut(): void {
        const top = this._cards.slice(0, this._count / 2);
        const bottom = this._cards.slice(this._count / 2);
        
        this._cards = [...bottom, ...top];
    }
}
