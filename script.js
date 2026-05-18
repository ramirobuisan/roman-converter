// Standard Roman Mapping
const map = { M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1 };

// Strict Regex for standard Roman Numerals (1-3999)
const romanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

function handleIntConversion() {
    const input = document.getElementById("numInput");
    const err = document.getElementById("intError");
    const val = parseInt(input.value);

    if (val > 0 && val < 4000) {
        err.style.display = "none";
        const result = toRoman(val);
        document.getElementById("romanResult").innerText = result;
        // GA4 custom event: successful conversion
        if (typeof gtag !== "undefined") {
            gtag("event", "conversion_performed", {
                conversion_mode: "int_to_roman",
                input_value: val,
                output_value: result
            });
        }
    } else {
        document.getElementById("romanResult").innerText = "";
        if (input.value !== "") {
            err.style.display = "block";
            // GA4 custom event: invalid input
            if (typeof gtag !== "undefined") {
                gtag("event", "invalid_input", {
                    conversion_mode: "int_to_roman",
                    input_value: input.value
                });
            }
        }
    }
}

function handleRomanConversion() {
    const input = document.getElementById("romanInput");
    const err = document.getElementById("romanError");
    const str = input.value.toUpperCase();

    if (str === "") {
        err.style.display = "none";
        document.getElementById("numResult").innerText = "";
        return;
    }

    if (romanRegex.test(str)) {
        err.style.display = "none";
        const result = toInt(str);
        document.getElementById("numResult").innerText = result;
        // GA4 custom event: successful conversion
        if (typeof gtag !== "undefined") {
            gtag("event", "conversion_performed", {
                conversion_mode: "roman_to_int",
                input_value: str,
                output_value: result
            });
        }
    } else {
        err.style.display = "block";
        document.getElementById("numResult").innerText = "---";
        // GA4 custom event: invalid input
        if (typeof gtag !== "undefined") {
            gtag("event", "invalid_input", {
                conversion_mode: "roman_to_int",
                input_value: input.value
            });
        }
    }
}

function toRoman(num) {
    let result = "";
    for (const key in map) {
        while (num >= map[key]) {
            result += key;
            num -= map[key];
        }
    }
    return result;
}

function toInt(roman) {
    const valMap = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
    let total = 0;
    for (let i = 0; i < roman.length; i++) {
        const curr = valMap[roman[i]];
        const next = valMap[roman[i + 1]];
        if (next > curr) {
            total += next - curr;
            i++;
        } else {
            total += curr;
        }
    }
    return total;
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    if (text && text !== "---") {
        navigator.clipboard.writeText(text);
    }
}

// Export for Node.js testing (ignored in browser)
if (typeof module !== "undefined" && module.exports) {
    module.exports = { toRoman, toInt, romanRegex };
}