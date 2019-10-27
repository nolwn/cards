import { expect } from "chai";
import Card from "../Card";
import Deck from "../Deck";
import { Suit, Value } from "../utils";
import cards from "../cards.json";

describe("Card", () => {
    it("should have a suit and a value", () => {
        const card = new Card(Value.Ace, Suit.Spades);
        expect(card.suit).to.equal(Suit.Spades);
        expect(card.value).to.equal(Value.Ace);
    });

    it("should know its sorted order against another card", () => {
        const highCard = new Card(Value.King, Suit.Hearts);
        const lowCard = new Card(Value.Two, Suit.Diamonds);

        expect(highCard.isHigher(lowCard)).to.be.true;
    });
});

describe("Deck", () => {
    it("should open a new deck", () => {
        const deck: Deck = new Deck();

        expect(deck.cards).to.deep.equal(cards);
    });

    it("should cut the deck", () => {
        const deck: Deck = new Deck();
        const cutCards: string[] = [ ...cards.slice(26), ...cards.slice(0, 26) ];

        deck.cut();

        expect(deck.cards).to.deep.equal(cutCards);
    });

    it("should shuffle the deck", () => {
        const deckOne: Deck = new Deck();
        const deckTwo: Deck = new Deck();
        
        deckOne.shuffle();
        deckTwo.shuffle();

        expect(deckOne.cards.length).to.equal(cards.length);
        expect(deckOne.cards).to.not.deep.equal(cards);
        expect(deckTwo.cards).to.not.deep.equal(deckOne.cards);
    });

    it("should deal out a given number of hands", () => {
        const deck: Deck = new Deck();
        let hands: string[][];
        let hand: string[];
        let expectedHand: string[];

        deck.shuffle();

        const cards = deck.cards;

        deck.deal(1);
        expectedHand = cards.slice().reverse(); 
        hand = deck.takeHand();

        expect(hand).to.deep.equal(expectedHand);
        expect(deck.takeHand()).to.be.null;

        deck.deal(2);
        hand = deck.takeHand();
        expectedHand = cards.filter((_card, index) =>
            index % 2 === 0
        ).reverse();

        expect(hand).to.deep.equal(expectedHand);
        expect(deck.takeHand()).to.be.an("array");
        expect(deck.takeHand()).to.be.null;

        deck.deal(5);
        hand = deck.takeHand();
        expectedHand = cards.filter((_card, index) => 
            index % 5 === 0
        ).reverse();

        expect(hand).to.deep.equal(expectedHand);
        expect(deck.takeHand()).to.be.an("array");

        hand = deck.takeHand();
        expectedHand = cards.filter((_card, index) => {
            (index - 2) % 5 === 0
        }).reverse();
        
        expect(deck.takeHand()).to.be.an("array");
        expect(deck.takeHand()).to.be.an("array");
        expect(deck.takeHand()).to.be.null;
    });
});
