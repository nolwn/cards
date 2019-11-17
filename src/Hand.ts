import Card from "./Card";
import CardCollection from "./CardCollection";

export default class Hand extends CardCollection {
    private _limit: number;
    private _mustDiscard: boolean;
    
    constructor(limit: number, cards: Card[]) {
        super(cards);
        this._count = cards.length;
        if (limit > 0) {
            this._limit = limit;
            this._mustDiscard = this.checkSize();
        } else {
            this._limit = Infinity;
            this._mustDiscard = false;
        }
    }

    get limit(): number {
        return this._limit;
    }

    get mustDiscard(): boolean {
        return this._mustDiscard;
    }

    take(...card: Card[]): void {
        super.take(...card);
        this._mustDiscard = this.checkSize();
    }

    pass(): Card {
        const card = super.pass();
        this._mustDiscard = this.checkSize();

        return card;
    }

    private checkSize() {
        return this._cards.length > this._limit;
    }
}