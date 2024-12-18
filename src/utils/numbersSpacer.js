export const numbersWithSpaces = (number) => {
    if (isNaN(number)) {
        return "-";
    }
    if (number == Infinity) {
        return "-";
    }
    if(typeof number !== "undefined" && number !== null) {
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(",");
    }
};
