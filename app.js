
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