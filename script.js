const conversionTable = {
  cup: { gram: 240, ounce: 8.0, teaspoon: 48 },
  gram: { cup: 1 / 240, ounce: 0.0353, teaspoon: 0.2 },
  ounce: { cup: 0.125, gram: 28.35, teaspoon: 6 },
  teaspoon: { cup: 1 / 48, gram: 5, ounce: 0.167 },
};

const convertQuantity = (fromUnit) => (toUnit) => (quantity) => {
  // First, use the fromUnit argument to access your conversionTable object,
  // then use the toUnit argument to access the nested object.

  // Return the result of multiplying that conversion value with the quantity value.
  //   return conversionTable[fromUnit][toUnit] * quantity;
  const conversionRate = conversionTable[fromUnit][toUnit];
  return quantity * conversionRate;
};

const gramsResult = convertQuantity("cup")("gram")(2);
console.log(gramsResult);

const adjustForServings = (baseQuantity) => (newServings) =>
  (baseQuantity / 1) * newServings;

const servingsResult = adjustForServings(4)(6);
console.log(servingsResult);

//This function should adjust the servings for the base quantity to the
// new servings, convert that adjusted quantity from the base unit into the
// new unit, and return the converted quantity as a fixed string with
// two decimal places.

const processIngredient = (baseQuantity, baseUnit, newUnit, newServings) => {
  // First adjust the quantity for the new servings
  const adjustedQuantity = adjustForServings(baseQuantity)(newServings);

  // Then convert the adjusted quantity to the new unit
  const convertedQuantity =
    convertQuantity(baseUnit)(newUnit)(adjustedQuantity);

  // Return as a string with 2 decimal places
  return convertedQuantity.toFixed(2);
};

const ingredientName = document.getElementById("ingredient");
const ingredientQuantity = document.getElementById("quantity");
const unitToConvert = document.getElementById("unit");
const numberOfServings = document.getElementById("servings");
const recipeForm = document.getElementById("recipe-form");
const resultList = document.getElementById("result-list");

const units = ["cup", "gram", "ounce", "teaspoon"];

const updateResultsList = () => {
  resultList.innerHTML = "";

  units.forEach((newUnit) => {
    if (newUnit !== unitToConvert.value) {
      const convertedQuantity = processIngredient(
        parseFloat(ingredientQuantity.value),
        unitToConvert.value,
        newUnit,
        parseFloat(numberOfServings.value)
      );

      resultList.innerHTML += `<li>${ingredientName.value}: ${convertedQuantity} ${newUnit}</li>`;
    }
  });
};

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission (page refresh)
  updateResultsList(); // Run our function to update the results
});
