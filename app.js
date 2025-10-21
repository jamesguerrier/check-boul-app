
data = [
    [20, 78, 83, 51], [21, 45, 36, 32], [22, 1, 68, 89], [23, 15, 48, 84], [24, 81, 38, 54], [25, 5, 6, 95], [26, 30, 59, 46], [27, 2, 62, 94], [14, 57, 87, 74], [28, 4, 79, 73], [29, 72, 34, 80], [31, 55, 69, 61], [33, 66, 76, 39], [71, 91, 63, 88], [92, 75, 56, 9], [12, 64, 86, 10], [82, 3, 43, 35], [16, 93, 53, 98], [96, 11, 44, 65], [42, 99, 97, 8], [19, 70, 58, 0], [17, 49, 87, 37], [18, 7, 52, 13], [90, 40, 47, 77], [85, 41, 50, 60]
]


const toggle = document.getElementById('toggle');

const sunContent = document.getElementById('sunContent');
const moonContent = document.getElementById('moonContent');
const body = document.body;

toggle.addEventListener('click', () => {
    body.classList.toggle('moon-mode');
    if (body.classList.contains('moon-mode')) {
        sunContent.style.display = 'block';
        moonContent.style.display = 'none';
    } else {

        sunContent.style.display = 'none';
        moonContent.style.display = 'block';
    }
});








// Force two-digit limit and prevent invalid input
const inputs = document.querySelectorAll('.num-input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.length > 2) {
            input.value = input.value.slice(0, 2);
        }
        if (input.value < 0) input.value = '00';
        if (input.value > 99) input.value = '99';
    });
});


document.getElementById("checkBtn").addEventListener("click", () => {
    const inputs = document.querySelectorAll(".num-input");

    // Collect values and convert "00"-"09" to 0-9
    const inputValues = Array.from(inputs)
        .map(input => {
            let val = input.value.trim();
            if (val === "") return null;
            return val.startsWith("0") && val.length === 2 ? parseInt(val[1]) : parseInt(val);
        })
        .filter(v => v !== null);

    // Count how many times each number appears
    const counts = {};
    inputValues.forEach(num => counts[num] = (counts[num] || 0) + 1);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    let foundArrays = [];

    for (const arr of data) {
        const matches = arr.filter(num => inputValues.includes(num));

        // If at least two different matches
        // OR one match that appears twice or more among inputs
        const hasRepeatedInput = matches.some(num => counts[num] >= 2);
        if (matches.length >= 2 || hasRepeatedInput) {
            foundArrays.push({ arr, matches });
        }
    }

    if (foundArrays.length === 0) {
        resultDiv.innerHTML = "<p>No matches found.</p>";
    } else {
        foundArrays.forEach(item => {
            let html = item.arr
                .map(num => item.matches.includes(num)
                    ? `<span class="highlight">${num}</span>`
                    : num
                ).join(", ");
            resultDiv.innerHTML += `<p>[ ${html} ]</p>`;
        });
    }
});



const bool = {
    lunMar: {
        firstLM: {
            lundi: [7, 54],
            mardi: [55, 10, 70],
        },
        secondLM: {
            lundi: [89, 57, 61],
            mardi: [16, 75, 96],
        },
        thirdLM: {
            lundi: [43, 39, 72],
            mardi: [34, 93, 27],
        }
    },
    marMer: {
        firstMM: {
            mardi: [88, 8, 46],
            mercredi: [44, 92],
        },
        secondMM: {
            mardi: [42, 38, 68],
            mercredi: [24, 83, 86],
        },
        thirdMM: {
            mardi: [53, 94],
            mercredi: [49, 35],
        }
    },
    merJeu: {
        firstMJ: {
            mercredi: [30, 9, 64],
            jeudi: [33, 3, 98],
        },
        secondMJ: {
            mercredi: [62, 58, 91],
            jeudi: [26, 1, 85],
        }
    },
    jeuVen: {
        firsJV: {
            jeudi: [31, 28],
            vendredi: [13, 80]
        },
        secondJV: {
            jeudi: [56, 78],
            vendredi: [22, 0, 87]
        },
        thirdJV: {
            jeudi: [63, 2, 95],
            vendredi: [59, 20, 36]
        }
    },
    vensam: {
        firstVS: {
            vendredi: [79, 47, 51],
            samedi: [15, 74, 97]
        },
        secondVS: {
            vendredi: [65, 67, 77],
            samedi: [76, 19, 11]
        }
    },
    samdim: {
        firstSD: {
            samedi: [50, 29, 21],
            dimanche: [12, 5, 82]
        },
        secondSD: {
            samedi: [71, 69, 32],
            dimanche: [23, 17, 90]
        },
        thirdSD: {
            samedi: [66, 60, 99],
            dimanche: [4, 45]
        }
    },
    dimlun: {
        firstDL: {
            dimanche: [40, 37, 41],
            lundi: [14, 4, 73]
        },
        secondDL: {
            dimanche: [52, 48, 81],
            lundi: [25, 18, 84]
        }
    }
}


// ✅ Format numbers as two digits ("00"–"09")
function formatTwoDigits(num) {
    return num.toString().padStart(2, "0");
}

// ✅ Get all input values, normalize 00–09 as numbers
function getAllInputValues() {
    const inputs = document.querySelectorAll(".num-input");
    return Array.from(inputs)
        .map(i => {
            const val = i.value.trim();
            return val === "" ? null : parseInt(val, 10);
        })
        .filter(v => v !== null && v >= 0 && v <= 99);
}

// ✅ Compare input values to bool object
function findMatch(dayKey) {
    const allNumbers = getAllInputValues();
    const dayData = bool[dayKey];
    const resultDiv = document.getElementById("resulting");
    resultDiv.innerHTML = ""; // clear previous

    for (const [subKey, pair] of Object.entries(dayData)) {
        const allValues = Object.values(pair).flat();
        const found = allNumbers.some(num => allValues.includes(num));

        if (found) {
            // Format with leading zeros
            const formattedPair = {};
            for (const [day, nums] of Object.entries(pair)) {
                formattedPair[day] = nums.map(formatTwoDigits);
            }

            resultDiv.innerHTML = `
        <div class="matched-box">
          <strong>✅ Match found in ${subKey}:</strong><br>
          ${JSON.stringify(formattedPair, null, 2)}
        </div>
      `;
            console.log("✅ Match found in", subKey, formattedPair);
            return;
        }
    }

    resultDiv.innerHTML = `<div class="no-match">❌ No match found.</div>`;
}

// ✅ Event Listeners for Buttons
document.getElementById("btn-lunMar").addEventListener("click", () => findMatch("lunMar"));
document.getElementById("btn-marMer").addEventListener("click", () => findMatch("marMer"));
document.getElementById("btn-merJeu").addEventListener("click", () => findMatch("merJeu"));
document.getElementById("btn-jeuVen").addEventListener("click", () => findMatch("jeuVen"));
document.getElementById("btn-vensam").addEventListener("click", () => findMatch("vensam"));
document.getElementById("btn-samdim").addEventListener("click", () => findMatch("samdim"));
document.getElementById("btn-dimlun").addEventListener("click", () => findMatch("dimlun"));
