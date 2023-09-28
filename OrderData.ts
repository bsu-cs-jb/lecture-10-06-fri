import { genid } from "./utils";

export function fetchMenu() {
  const MENU = [
    {
      id: genid(),
      name: "Cheeseburger",
      description: "The best Cheeseburger ever made.",
      calories: 870,
      price: 6.99,
      labels: ["meatie"],
      allergens: ["wheat", "eggs"],
    },
    {
      id: genid(),
      name: "Fries",
      description: "'Freedom' fries",
      calories: 230,
      price: 2.99,
      labels: ["vegetarian"],
      allergens: ["gluten", "peanuts"],
    },
    {
      id: genid(),
      name: "Donuts",
      description: "Dunkin'",
      calories: 430,
      price: 3.99,
      labels: ["vegetarian"],
      allergens: ["wheat", "peanuts"],
    },
    {
      id: genid(),
      name: "Soda",
      description: "More calories than anyone needs",
      calories: 250,
      price: 2.99,
      labels: ["vegetarian", "vegan"],
      allergens: [],
    },
  ];

  return new Promise<FoodItem[]>((resolve, reject) => {
    setTimeout(() => resolve(MENU), 1800);
  });
}
