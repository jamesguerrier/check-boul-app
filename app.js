
data = [
    [20, 78, 83, 51], [21, 45, 36, 32], [22, 1, 68, 89], [23, 15, 48, 84], [24, 81, 38, 54], [25, 5, 6, 95], [26, 30, 59, 46], [27, 2, 62, 94], [14, 57, 87, 74], [28, 4, 79, 73], [29, 72, 34, 80], [31, 55, 69, 61], [33, 66, 76, 39], [71, 91, 63, 88], [92, 75, 56, 9], [12, 64, 86, 10], [82, 3, 43, 35], [16, 93, 53, 98], [96, 11, 44, 65], [42, 99, 97, 8], [19, 70, 58, 0], [17, 49, 87, 37], [18, 7, 52, 13], [90, 40, 47, 77], [85, 41, 50, 60]
]



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
