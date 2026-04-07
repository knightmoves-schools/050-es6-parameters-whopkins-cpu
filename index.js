function calculateTotal(subtotal, shipping = 2.50) {
    return subtotal + shipping
}
function printTopThreeHeadlines(...headlines){
    return headlines.slice(0, 3).join("\n");
}