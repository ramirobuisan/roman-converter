// tests.js
// Automated Test Suite for Roman Converter — Task 4 / Task 5
// Ramiro Buisan · Alu.130042 · Universidad San Jorge
//
// Mocha (BDD) + Chai (expect).
// Works in browser (test.html) and in Node.js (CI pipeline).

// ── Setup: detect environment ───────────────────────────────────────────────
let expect;
let toRoman, toInt, romanRegex;

if (typeof window === "undefined") {
    // Node.js environment (CI)
    const chai = require("chai");
    expect = chai.expect;
    const converter = require("./script.js");
    toRoman = converter.toRoman;
    toInt = converter.toInt;
    romanRegex = converter.romanRegex;
} else {
    // Browser environment
    expect = chai.expect;
    // toRoman, toInt, romanRegex are already global from script.js
}


// ── Helper: DOM simulation (browser-only, skipped in Node) ──────────────────

function resetDOM() {
    if (typeof document === "undefined") return;
    document.getElementById("numInput").value = "";
    document.getElementById("romanInput").value = "";
    document.getElementById("romanResult").innerText = "";
    document.getElementById("numResult").innerText = "";
    document.getElementById("intError").style.display = "none";
    document.getElementById("romanError").style.display = "none";
}

function simulateIntInput(value) {
    resetDOM();
    document.getElementById("numInput").value = value;
    handleIntConversion();
    return {
        result: document.getElementById("romanResult").innerText,
        errorVisible: document.getElementById("intError").style.display === "block"
    };
}

function simulateRomanInput(value) {
    resetDOM();
    document.getElementById("romanInput").value = value;
    handleRomanConversion();
    return {
        result: document.getElementById("numResult").innerText,
        errorVisible: document.getElementById("romanError").style.display === "block"
    };
}

const inBrowser = typeof window !== "undefined";


// =============================================================================
// SET 1: MANUAL TEST CASES
// =============================================================================

describe("SET 1 — Manual: toRoman()", function () {
    it('TC-M01: toRoman(1) → "I"', function () {
        expect(toRoman(1)).to.equal("I");
    });
    it('TC-M02: toRoman(3999) → "MMMCMXCIX"', function () {
        expect(toRoman(3999)).to.equal("MMMCMXCIX");
    });
    it('TC-M03: toRoman(5) → "V"', function () {
        expect(toRoman(5)).to.equal("V");
    });
    it('TC-M04: toRoman(10) → "X"', function () {
        expect(toRoman(10)).to.equal("X");
    });
    it('TC-M05: toRoman(50) → "L"', function () {
        expect(toRoman(50)).to.equal("L");
    });
    it('TC-M06: toRoman(100) → "C"', function () {
        expect(toRoman(100)).to.equal("C");
    });
    it('TC-M07: toRoman(500) → "D"', function () {
        expect(toRoman(500)).to.equal("D");
    });
    it('TC-M08: toRoman(1000) → "M"', function () {
        expect(toRoman(1000)).to.equal("M");
    });
    it('TC-M09: toRoman(4) → "IV"', function () {
        expect(toRoman(4)).to.equal("IV");
    });
    it('TC-M10: toRoman(9) → "IX"', function () {
        expect(toRoman(9)).to.equal("IX");
    });
    it('TC-M11: toRoman(40) → "XL"', function () {
        expect(toRoman(40)).to.equal("XL");
    });
    it('TC-M12: toRoman(90) → "XC"', function () {
        expect(toRoman(90)).to.equal("XC");
    });
    it('TC-M13: toRoman(400) → "CD"', function () {
        expect(toRoman(400)).to.equal("CD");
    });
    it('TC-M14: toRoman(900) → "CM"', function () {
        expect(toRoman(900)).to.equal("CM");
    });
    it('TC-M15: toRoman(3) → "III"', function () {
        expect(toRoman(3)).to.equal("III");
    });
    it('TC-M16: toRoman(30) → "XXX"', function () {
        expect(toRoman(30)).to.equal("XXX");
    });
    it('TC-M17: toRoman(300) → "CCC"', function () {
        expect(toRoman(300)).to.equal("CCC");
    });
    it('TC-M18: toRoman(3000) → "MMM"', function () {
        expect(toRoman(3000)).to.equal("MMM");
    });
    it('TC-M19: toRoman(1994) → "MCMXCIV"', function () {
        expect(toRoman(1994)).to.equal("MCMXCIV");
    });
    it('TC-M20: toRoman(2024) → "MMXXIV"', function () {
        expect(toRoman(2024)).to.equal("MMXXIV");
    });
    it('TC-M21: toRoman(99) → "XCIX"', function () {
        expect(toRoman(99)).to.equal("XCIX");
    });
    it('TC-M22: toRoman(0) → "" (no validation)', function () {
        expect(toRoman(0)).to.equal("");
    });
    it('TC-M23: toRoman(-5) → "" (no validation)', function () {
        expect(toRoman(-5)).to.equal("");
    });
    it('TC-M24: toRoman(4000) → "MMMM" (no validation)', function () {
        expect(toRoman(4000)).to.equal("MMMM");
    });
    it('TC-M25: toRoman(3.5) → "III" (floor via loop)', function () {
        expect(toRoman(3.5)).to.equal("III");
    });
});


describe("SET 1 — Manual: toInt()", function () {
    it('TC-M26: toInt("I") → 1', function () {
        expect(toInt("I")).to.equal(1);
    });
    it('TC-M27: toInt("MMMCMXCIX") → 3999', function () {
        expect(toInt("MMMCMXCIX")).to.equal(3999);
    });
    it('TC-M28: toInt("V") → 5', function () {
        expect(toInt("V")).to.equal(5);
    });
    it('TC-M29: toInt("X") → 10', function () {
        expect(toInt("X")).to.equal(10);
    });
    it('TC-M30: toInt("L") → 50', function () {
        expect(toInt("L")).to.equal(50);
    });
    it('TC-M31: toInt("C") → 100', function () {
        expect(toInt("C")).to.equal(100);
    });
    it('TC-M32: toInt("D") → 500', function () {
        expect(toInt("D")).to.equal(500);
    });
    it('TC-M33: toInt("M") → 1000', function () {
        expect(toInt("M")).to.equal(1000);
    });
    it('TC-M34: toInt("IV") → 4', function () {
        expect(toInt("IV")).to.equal(4);
    });
    it('TC-M35: toInt("IX") → 9', function () {
        expect(toInt("IX")).to.equal(9);
    });
    it('TC-M36: toInt("XL") → 40', function () {
        expect(toInt("XL")).to.equal(40);
    });
    it('TC-M37: toInt("XC") → 90', function () {
        expect(toInt("XC")).to.equal(90);
    });
    it('TC-M38: toInt("CD") → 400', function () {
        expect(toInt("CD")).to.equal(400);
    });
    it('TC-M39: toInt("CM") → 900', function () {
        expect(toInt("CM")).to.equal(900);
    });
    it('TC-M40: toInt("MCMXCIV") → 1994', function () {
        expect(toInt("MCMXCIV")).to.equal(1994);
    });
    it('TC-M41: toInt("MMXXIV") → 2024', function () {
        expect(toInt("MMXXIV")).to.equal(2024);
    });
    it('TC-M42: toInt("XCIX") → 99', function () {
        expect(toInt("XCIX")).to.equal(99);
    });
    it('TC-M43: toInt("IIII") → 4 (no validation)', function () {
        expect(toInt("IIII")).to.equal(4);
    });
    it('TC-M44: toInt("VV") → 10 (no validation)', function () {
        expect(toInt("VV")).to.equal(10);
    });
    it('TC-M45: toInt("IC") → 99 (no validation)', function () {
        expect(toInt("IC")).to.equal(99);
    });
    it('TC-M46: toInt("") → 0', function () {
        expect(toInt("")).to.equal(0);
    });
    it('TC-M47: toInt("abc") → NaN', function () {
        expect(toInt("abc")).to.be.NaN;
    });
});


describe("SET 1 — Manual: Handlers", function () {
    if (!inBrowser) return;

    beforeEach(function () { resetDOM(); });

    it('TC-M48: int "0" → error shown', function () {
        expect(simulateIntInput("0").errorVisible).to.be.true;
    });
    it('TC-M49: int "-3" → error shown', function () {
        expect(simulateIntInput("-3").errorVisible).to.be.true;
    });
    it('TC-M50: int "4000" → error shown', function () {
        expect(simulateIntInput("4000").errorVisible).to.be.true;
    });
    it('TC-M51: int "2024" → "MMXXIV"', function () {
        expect(simulateIntInput("2024").result).to.equal("MMXXIV");
    });
    it('TC-M52: roman "IIII" → rejected', function () {
        const r = simulateRomanInput("IIII");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-M53: roman "VV" → rejected', function () {
        const r = simulateRomanInput("VV");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-M54: roman "IC" → rejected', function () {
        const r = simulateRomanInput("IC");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-M55: roman "iv" → 4 (uppercased)', function () {
        const r = simulateRomanInput("iv");
        expect(r.errorVisible).to.be.false;
        expect(r.result).to.equal("4");
    });
    it('TC-M56: roman "MMXXIV" → 2024', function () {
        expect(simulateRomanInput("MMXXIV").result).to.equal("2024");
    });
    it('TC-M57: clear int → error hidden', function () {
        expect(simulateIntInput("").errorVisible).to.be.false;
    });
});


// =============================================================================
// SET 2: AI-ASSISTED TEST CASES
// =============================================================================

describe("SET 2 — AI: toRoman()", function () {
    it('TC-A01: toRoman(1) → "I"', function () {
        expect(toRoman(1)).to.equal("I");
    });
    it('TC-A02: toRoman(3999) → "MMMCMXCIX"', function () {
        expect(toRoman(3999)).to.equal("MMMCMXCIX");
    });
    it('TC-A03: toRoman(2) → "II"', function () {
        expect(toRoman(2)).to.equal("II");
    });
    it('TC-A04: toRoman(4) → "IV"', function () {
        expect(toRoman(4)).to.equal("IV");
    });
    it('TC-A05: toRoman(9) → "IX"', function () {
        expect(toRoman(9)).to.equal("IX");
    });
    it('TC-A06: toRoman(14) → "XIV"', function () {
        expect(toRoman(14)).to.equal("XIV");
    });
    it('TC-A07: toRoman(40) → "XL"', function () {
        expect(toRoman(40)).to.equal("XL");
    });
    it('TC-A08: toRoman(44) → "XLIV"', function () {
        expect(toRoman(44)).to.equal("XLIV");
    });
    it('TC-A09: toRoman(90) → "XC"', function () {
        expect(toRoman(90)).to.equal("XC");
    });
    it('TC-A10: toRoman(99) → "XCIX"', function () {
        expect(toRoman(99)).to.equal("XCIX");
    });
    it('TC-A11: toRoman(400) → "CD"', function () {
        expect(toRoman(400)).to.equal("CD");
    });
    it('TC-A12: toRoman(444) → "CDXLIV"', function () {
        expect(toRoman(444)).to.equal("CDXLIV");
    });
    it('TC-A13: toRoman(900) → "CM"', function () {
        expect(toRoman(900)).to.equal("CM");
    });
    it('TC-A14: toRoman(999) → "CMXCIX"', function () {
        expect(toRoman(999)).to.equal("CMXCIX");
    });
    it('TC-A15: toRoman(1000) → "M"', function () {
        expect(toRoman(1000)).to.equal("M");
    });
    it('TC-A16: toRoman(1987) → "MCMLXXXVII"', function () {
        expect(toRoman(1987)).to.equal("MCMLXXXVII");
    });
    it('TC-A17: toRoman(2421) → "MMCDXXI"', function () {
        expect(toRoman(2421)).to.equal("MMCDXXI");
    });
    it('TC-A18: toRoman(3888) → "MMMDCCCLXXXVIII" (longest)', function () {
        expect(toRoman(3888)).to.equal("MMMDCCCLXXXVIII");
    });
    it('TC-A19: toRoman(0) → ""', function () {
        expect(toRoman(0)).to.equal("");
    });
    it('TC-A20: toRoman(-1) → ""', function () {
        expect(toRoman(-1)).to.equal("");
    });
    it('TC-A21: toRoman(4000) → "MMMM"', function () {
        expect(toRoman(4000)).to.equal("MMMM");
    });
    it("TC-A22: toRoman(10000) → 10 M's", function () {
        expect(toRoman(10000)).to.equal("MMMMMMMMMM");
    });
    it('TC-A23: toRoman(3.7) → "III"', function () {
        expect(toRoman(3.7)).to.equal("III");
    });
    it('TC-A24: toRoman("X") → ""', function () {
        expect(toRoman("X")).to.equal("");
    });
    it('TC-A25: toRoman(true) → "I"', function () {
        expect(toRoman(true)).to.equal("I");
    });
    it('TC-A26: toRoman(undefined) → ""', function () {
        expect(toRoman(undefined)).to.equal("");
    });
    it('TC-A27: toRoman(NaN) → ""', function () {
        expect(toRoman(NaN)).to.equal("");
    });
    // TC-A28: toRoman(Infinity) — SKIPPED (infinite loop)
    it("TC-A28: toRoman(Infinity) — SKIPPED (would freeze)");
    it('TC-A29: toRoman([]) → ""', function () {
        expect(toRoman([])).to.equal("");
    });
    it("TC-A30: Round-trip toInt(toRoman(n)) === n for 1–3999", function () {
        for (let n = 1; n <= 3999; n++) {
            expect(toInt(toRoman(n))).to.equal(n, "Failed at n=" + n);
        }
    });
});


describe("SET 2 — AI: toInt()", function () {
    it('TC-A31: toInt("I") → 1', function () {
        expect(toInt("I")).to.equal(1);
    });
    it('TC-A32: toInt("MMMCMXCIX") → 3999', function () {
        expect(toInt("MMMCMXCIX")).to.equal(3999);
    });
    it('TC-A33: toInt("IV") → 4', function () {
        expect(toInt("IV")).to.equal(4);
    });
    it('TC-A34: toInt("IX") → 9', function () {
        expect(toInt("IX")).to.equal(9);
    });
    it('TC-A35: toInt("XLIV") → 44', function () {
        expect(toInt("XLIV")).to.equal(44);
    });
    it('TC-A36: toInt("XCIX") → 99', function () {
        expect(toInt("XCIX")).to.equal(99);
    });
    it('TC-A37: toInt("CDXLIV") → 444', function () {
        expect(toInt("CDXLIV")).to.equal(444);
    });
    it('TC-A38: toInt("CMXCIX") → 999', function () {
        expect(toInt("CMXCIX")).to.equal(999);
    });
    it('TC-A39: toInt("MMMDCCCLXXXVIII") → 3888', function () {
        expect(toInt("MMMDCCCLXXXVIII")).to.equal(3888);
    });
    it('TC-A40: toInt("MCMLXXXVII") → 1987', function () {
        expect(toInt("MCMLXXXVII")).to.equal(1987);
    });
    it('TC-A41: toInt("IIII") → 4', function () {
        expect(toInt("IIII")).to.equal(4);
    });
    it('TC-A42: toInt("VV") → 10', function () {
        expect(toInt("VV")).to.equal(10);
    });
    it('TC-A43: toInt("IC") → 99', function () {
        expect(toInt("IC")).to.equal(99);
    });
    it('TC-A44: toInt("IL") → 49', function () {
        expect(toInt("IL")).to.equal(49);
    });
    it('TC-A45: toInt("XD") → 490', function () {
        expect(toInt("XD")).to.equal(490);
    });
    it('TC-A46: toInt("XM") → 990', function () {
        expect(toInt("XM")).to.equal(990);
    });
    it('TC-A47: toInt("VX") → 5', function () {
        expect(toInt("VX")).to.equal(5);
    });
    it('TC-A48: toInt("MMMM") → 4000', function () {
        expect(toInt("MMMM")).to.equal(4000);
    });
    it('TC-A49: toInt("") → 0', function () {
        expect(toInt("")).to.equal(0);
    });
    it('TC-A50: toInt("abc") → NaN', function () {
        expect(toInt("abc")).to.be.NaN;
    });
    it('TC-A51: toInt("iii") → NaN', function () {
        expect(toInt("iii")).to.be.NaN;
    });
    it("TC-A52: toInt(123) → 0", function () {
        expect(toInt(123)).to.equal(0);
    });
    it("TC-A53: toInt(null) → throws", function () {
        expect(function () { toInt(null); }).to.throw();
    });
    it("TC-A54: toInt(undefined) → throws", function () {
        expect(function () { toInt(undefined); }).to.throw();
    });
});


describe("SET 2 — AI: Handlers", function () {
    if (!inBrowser) return;

    beforeEach(function () { resetDOM(); });

    it('TC-A55: int "0" → error', function () {
        expect(simulateIntInput("0").errorVisible).to.be.true;
    });
    it('TC-A56: int "-10" → error', function () {
        expect(simulateIntInput("-10").errorVisible).to.be.true;
    });
    it('TC-A57: int "4000" → error', function () {
        expect(simulateIntInput("4000").errorVisible).to.be.true;
    });
    it('TC-A58: int "3999" → "MMMCMXCIX"', function () {
        expect(simulateIntInput("3999").result).to.equal("MMMCMXCIX");
    });
    it('TC-A59: roman "IIII" → rejected', function () {
        const r = simulateRomanInput("IIII");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A60: roman "IC" → rejected', function () {
        const r = simulateRomanInput("IC");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A61: roman "VV" → rejected', function () {
        const r = simulateRomanInput("VV");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A62: roman "MMMM" → rejected', function () {
        const r = simulateRomanInput("MMMM");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A63: roman "iv" → 4', function () {
        const r = simulateRomanInput("iv");
        expect(r.errorVisible).to.be.false;
        expect(r.result).to.equal("4");
    });
    it('TC-A64: roman "mcmxciv" → 1994', function () {
        const r = simulateRomanInput("mcmxciv");
        expect(r.errorVisible).to.be.false;
        expect(r.result).to.equal("1994");
    });
    it('TC-A65: roman "Iv" → 4', function () {
        const r = simulateRomanInput("Iv");
        expect(r.errorVisible).to.be.false;
        expect(r.result).to.equal("4");
    });
    it('TC-A66: roman " X " → rejected (whitespace)', function () {
        expect(simulateRomanInput(" X ").errorVisible).to.be.true;
    });
    it('TC-A67: roman "LL" → rejected', function () {
        const r = simulateRomanInput("LL");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A68: roman "DD" → rejected', function () {
        const r = simulateRomanInput("DD");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
    it('TC-A69: clear roman → reset', function () {
        const r = simulateRomanInput("");
        expect(r.errorVisible).to.be.false;
        expect(r.result).to.equal("");
    });
    it('TC-A70: roman "XXXX" → rejected', function () {
        const r = simulateRomanInput("XXXX");
        expect(r.errorVisible).to.be.true;
        expect(r.result).to.equal("---");
    });
});
