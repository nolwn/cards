import * as _ from "lodash";
import Card from "./Card";

export class CardCollection {
    protected _count;
    protected _cards;

    constructor(cards: Card[]) {
        this._cards = cards;
        this._count = cards.length;
    }

    get cards() {
        return [...this._cards];
    }

    get count() {
        return this._count;
    }

    sort() {
        this._cards = _.orderBy(this._cards, ["suit", "value"], ["desc", "asc"]);
    }

    pass() {
        this._count--;
        return this._cards.unshift();
    }

    shuffle() {
        _.shuffle(this._cards);
    }

    cut() {
        const top = [this._cards.slice(0, this._count)];
        const bottom = [this._count.slice(this._count)];
        
        this._cards = [...bottom, ...top];
    }

    merge() {

    }
}
