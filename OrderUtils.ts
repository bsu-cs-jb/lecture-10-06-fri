import { genid } from "./utils";

export function findFoodItemIndex(
  foodItemId: string,
  bag: BagItem[],
): number {
  return bag.findIndex(
    (bagItem) => bagItem.foodItemId === foodItemId,
  );
}

export function addFoodToBag(food: FoodItem, bag: BagItem[]) {
  const foodItemIndex = findFoodItemIndex(food.id, bag);
  if (foodItemIndex == -1) {
    return [
      ...bag,
      {
        id: genid(),
        foodItemId: food.id,
        name: food.name,
        quantity: 1,
      },
    ];
  } else {
    const updatedBag = [...bag];
    updatedBag[foodItemIndex].quantity += 1;
    return updatedBag;
  }
}
