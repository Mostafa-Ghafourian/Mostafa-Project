
function getNumber(value) {
    input.value += value;
}

const oprate = [];

function getOprate(value) {
    input.value += value;
    oprate.push(value);
}

function calculate() {
    const expression = input.value;
    try {
        const result = eval(expression); // استفاده از eval برای محاسبه
        input.value = result; // نمایش نتیجه
    } catch (error) {
        console.error("Error in calculation: ", error);
        input.value = "Error"; // نمایش خطا در صورت وجود
    }
}
const _ = document;
const input = _.getElementById("input");
const buttons = _.querySelectorAll("#div button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();
        if (!isNaN(value)) {
            getNumber(value);
        } else if (value === "R") {
            input.value = input.value.slice(0, -1); // حذف آخرین کاراکتر
        } else if (value === "C") {
            input.value = ""; // پاک کردن ورودی
        } else if (value === "=") {
            calculate(); // محاسبه نتیجه
        } else {
            getOprate(value); // افزودن عملگر
        }
    });
});
