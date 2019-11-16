import { expect } from "chai";
import Card from "../Card";
import Deck from "../Deck";
import { Suit, Value } from "../utils";

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
        expect(highCard.isHigher(highCard)).to.be.false;
        expect(lowCard.isHigher(highCard)).to.be.false;
    });
});

describe("Deck", () => {
    const deckValues = [ 
        "Ace",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Jack",
        "Queen",
        "King"
    ];
    
    const deckSuits = [ 
        "Diamonds",
        "Clubs",
        "Hearts",
        "Spades"
    ];
    
    it("should open a new deck", () => {
        const deck: Deck = new Deck();
        
        expect(deck.cards.length).to.deep.equal(52);
        checkSortedDeck(deckValues, deckSuits, deck);
    });

    it("should cut the deck", () => {
        const deck: Deck = new Deck();
        const cutValues = [ ...deckValues.slice(26), ...deckValues.slice(0, 26) ];
        const cutSuits = [ ...deckSuits.slice(2), ...deckSuits.slice(0, 2) ];

        deck.cut();

        expect(deck.cards.length).to.deep.equal(52);
        checkSortedDeck(cutValues, cutSuits, deck);
    });

    it("should shuffle the deck", () => {
        const deckOne: Deck = new Deck();
        const deckTwo: Deck = new Deck();
        const unshuffledDeck = new Deck();
        
        deckOne.shuffle();
        deckTwo.shuffle();

        expect(deckOne.cards.length).to.equal(52);
        expect(deckOne.cards).to.not.deep.equal(unshuffledDeck.cards);
        expect(deckTwo.cards).to.not.deep.equal(deckOne.cards);
    });

    it("should deal out a given number of hands", () => {
        const deck: Deck = new Deck();
        let hands: Card[][];
        let hand: Card[];
        let expectedHand: Card[];

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

const checkSortedDeck = (deckValues, deckSuits, deck) => {
    let index = 0;
    let valueIndex = 0;
    let suitIndex = 0;
    while (index < 52) {
        const card = deck.cards[index];
        const value = deckValues[valueIndex++];
        const suit = deckSuits[suitIndex];

        expect(card.value).to.equal(Value[value]);
        expect(card.suit).to.equal(Suit[suit]);

        index++;

        if (valueIndex >= deckValues.length) {
            valueIndex = 0;
            suitIndex++;
        }
    }
}
