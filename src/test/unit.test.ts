import { expect } from "chai";
import Card from "../Card";
import CardCollection from "../CardCollection";
import Deck from "../Deck";
import Hand from "../Hand";
import { Suit, Value } from "../utils";

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

const cards = [
    new Card(Value.King, Suit.Diamonds),
    new Card(Value.Jack, Suit.Hearts),
    new Card(Value.Five, Suit.Hearts),
    new Card(Value.Eight, Suit.Spades),
    new Card(Value.Ace, Suit.Clubs),
    new Card(Value.Ten, Suit.Hearts),
    new Card(Value.Five, Suit.Clubs),
    new Card(Value.Six, Suit.Hearts)
];

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

describe("CardCollection", () => {
    it("should pass out the top card", () => {
        const cards = [
            new Card(Value.Ace, Suit.Spades),
            new Card(Value.Two, Suit.Spades),
            new Card(Value.Three, Suit.Spades)
        ];
        const collection = new CardCollection(cards);

        const cardOne = collection.pass();
        const cardTwo = collection.pass();
        const cardThree = collection.pass();
        const cardFour = collection.pass();

        expect(cardOne).to.deep.equal(new Card(Value.Ace, Suit.Spades));
        expect(cardTwo).to.deep.equal(new Card(Value.Two, Suit.Spades));
        expect(cardThree).to.deep.equal(new Card(Value.Three, Suit.Spades));
        expect(cardFour).to.deep.equal(null);
    });

    it("should take a card", () => {
        const collection = new CardCollection([]);
        
        expect(collection.cards).to.deep.equal([]);
        
        collection.take(new Card(Value.Jack, Suit.Diamonds));

        expect(collection.cards).to.deep.equal([
            new Card(Value.Jack, Suit.Diamonds)
        ]);

        collection.take(
            new Card(Value.Queen, Suit.Spades), 
            new Card(Value.Ace, Suit.Diamonds),
            new Card(Value.King, Suit.Hearts)
        );

        expect(collection.cards).to.deep.equal([
            new Card(Value.Jack, Suit.Diamonds),
            new Card(Value.Queen, Suit.Spades),
            new Card(Value.Ace, Suit.Diamonds),
            new Card(Value.King, Suit.Hearts)
        ]);
    });

    it("should sort", () => {
        const sortedCards = [
            new Card(Value.Eight, Suit.Spades),
            new Card(Value.Five, Suit.Hearts),
            new Card(Value.Six, Suit.Hearts),
            new Card(Value.Ten, Suit.Hearts),
            new Card(Value.Jack, Suit.Hearts),
            new Card(Value.Ace, Suit.Clubs),
            new Card(Value.Five, Suit.Clubs),
            new Card(Value.King, Suit.Diamonds)
        ]

        const deck = new CardCollection(cards);

        deck.sort();

        expect(deck.cards).to.deep.equal(sortedCards);
    });

    it("should cut", () => {
        const deck: Deck = new Deck();
        const cutValues = [...deckValues.slice(26), ...deckValues.slice(0, 26)];
        const cutSuits = [...deckSuits.slice(2), ...deckSuits.slice(0, 2)];

        deck.cut();

        expect(deck.cards.length).to.deep.equal(52);
        checkSortedDeck(cutValues, cutSuits, deck);
    });
    
    it("should keep an accurate count", () => {
        const collection = new CardCollection(cards);
        let count = cards.length;
        
        expect(collection.count).to.equal(count);
        
        collection.pass();
        collection.pass();
        
        count = count - 2;
        
        expect(collection.count).to.equal(count);
    })
});

describe("Deck", () => {
    it("should implement CardCollection", () => {
        const deck = new Deck();
        const proto = Object.getPrototypeOf(deck);

        expect(proto instanceof CardCollection).to.be.true;
    });
    
    it("should open a new deck", () => {
        const deck: Deck = new Deck();
        
        expect(deck.cards.length).to.deep.equal(52);
        checkSortedDeck(deckValues, deckSuits, deck);
    });

    it("should shuffle", () => {
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

describe("Hand", () => {
    it("should implement CardCollection", () => {
        const hand = new Hand(0, []);
        const proto = Object.getPrototypeOf(hand);

        expect(proto instanceof CardCollection).to.be.true;
    });

    it("should return it's limit", () => {
        const littleHand = new Hand(2, []);
        const mediumHand = new Hand(7, []);
        const bigHand = new Hand(50, []);

        expect(littleHand.limit).to.equal(2);
        expect(mediumHand.limit).to.equal(7);
        expect(bigHand.limit).to.equal(50);
    });

    it("should have a maximum size", () => {
        const hand = new Hand(5, cards);
        const emptyHand = new Hand(5, []);
        const limitlessHand = new Hand(0, cards);

        expect(hand.mustDiscard).to.be.true;
        expect(emptyHand.mustDiscard).to.be.false;
        expect(limitlessHand.mustDiscard).to.be.false;

        expect(hand.pass()).to.equal(cards[0]);
        expect(hand.pass()).to.equal(cards[1]);
        expect(hand.pass()).to.equal(cards[2]);

        emptyHand.take(...cards);
        limitlessHand.take(...cards);

        expect(hand.mustDiscard).to.be.false;
        expect(emptyHand.mustDiscard).to.be.true;
        expect(limitlessHand.mustDiscard).to.be.false;
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
