import { expect, describe, test } from '@jest/globals';
import { nameIsValid, fullTrim, getTotal } from '../src/app1.js';

describe('check nameIsValid function', () => {
    test('it loads without error', () => {
        expect(nameIsValid).toBeDefined();
        expect(typeof nameIsValid).toBe('function');
    });
    test.skip('lada its name', () => {
        expect(nameIsValid("lada")).toBe(true);
    });
    test.skip('123 its no name', () => {
        expect(nameIsValid(123)).toBe(false);
    });
    test.skip('d its no name', () => {
        expect(nameIsValid("d")).toBe(false);
    });
    test.skip('la-da its no name', () => {
        expect(nameIsValid("la-da")).toBe(false);
    });

    test.each([
        ["lada", true],
        [123, false],
        ["d", false],
        ["la-da", false],
    ])('%s it name %s', (a, expected) => {
        expect(nameIsValid(a)).toBe(expected);
    });
});

describe('check fullTrim function', () => {
    test('it loads without error', () => {
        expect(fullTrim).toBeDefined();
        expect(typeof fullTrim).toBe('function');
    });
    test.skip('lada = lada', () => {
        expect(fullTrim("lada")).toBe("lada");
    });

    test.skip('" lada " = lada', () => {
        expect(fullTrim(" lada ")).toBe("lada");
    });

    test.skip('" la da " = lada', () => {
        expect(fullTrim(" la da ")).toBe("lada");
    });
    test.skip('" la-da " = la-da', () => {
        expect(fullTrim(" la-da ")).toBe("la-da");
    });

    test.each([
        ["lada", "lada"],
        [" lada ", "lada"],
        [" la da ", "lada"],
        [" la-da ", "la-da"],
    ])('%s = %s', (a, expected) => {
        expect(fullTrim(a)).toBe(expected);
    });
});

describe('check getTotal function', () => {
    const order = [{ price: 10, quantity: 10 }];
    test('it loads without error', () => {
        expect(getTotal).toBeDefined();
        expect(typeof getTotal).toBe('function');
    });
    test(`products no discount`, () => {
        expect(getTotal(order)).toBe(100);
    });

    test('products discount', () => {
        expect(getTotal(order, 10)).toBe(90);
    });

    test('discount negative number', () => {
        expect(() => getTotal(order, -10)).toThrow();
    });

    test('discount > 100%', () => {
        expect(() => getTotal(order, 1000)).toThrow();
    });

    test('discount text', () => {
        expect(() => getTotal(order, "lada")).toThrow();
    });

    test.each([
        [0, 100],
        [10, 90],
        [-10, 'error'],
        [1000, 'error'],
        ["lada", 'error'],
    ])('discon %s result %s', (a, expected) => {
        if (a === 0) {
            expect(getTotal(order)).toBe(expected);
        } else if (expected === 'error') {
            expect(() => getTotal(order, a)).toThrow();
        } else {
            expect(getTotal(order, a)).toBe(expected);
        }
    });
});