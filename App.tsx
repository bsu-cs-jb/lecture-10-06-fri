import * as React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import styles from "./styles";
import {
  BigButton,
  FlexFill,
  LabelText,
  LctView,
  TitleText,
} from "./Shared";
import MenuView from "./MenuView";
import BagView from "./BagView";

let lastId = 0;
function genid() {
  const randInt = Math.random() * 10 ** 15;
  const perfNowInt = (performance.now() % 10 ** 5) * 10 ** 10;
  const p = (randInt + perfNowInt + lastId++).toFixed().toString();

  return `id-${p}`;
}

/**
 * Food ordering
 * - menu
 * - entree
 * - add-ons
 * - drink
 * - dessert
 * - items have cost
 * - total amount
 * - tax
 * - tip
 * - calorie counts
 */

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

function findFoodItemIndex(
  foodItemId: string,
  bag: BagItem[],
): number {
  return bag.findIndex(
    (bagItem) => bagItem.foodItemId === foodItemId,
  );
}

function addFoodToBag(food: FoodItem, bag: BagItem[]) {
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

export default function App() {
  const [menu, setMenu] = React.useState<FoodItem[]>([]);
  const [bag, setBag] = React.useState<BagItem[]>([]);

  React.useEffect(() => {
    // fetch menu from server
    setMenu(MENU);
  }, []);

  const handleAddItem = (item: FoodItem) => {
    // add item to bag
    setBag(addFoodToBag(item, bag));
  };

  const handleDecrementBagItem = (item: BagItem) => {
    const bagItemIndex = bag.findIndex(
      (bagItem) => bagItem.id == item.id,
    );
    const updatedBag = [...bag];
    updatedBag[bagItemIndex].quantity -= 1;
    if (updatedBag[bagItemIndex].quantity <= 0) {
      updatedBag.splice(bagItemIndex, 1);
    }
    setBag(updatedBag);
  };

  const handleIncrementBagItem = (item: BagItem) => {
    const bagItemIndex = bag.findIndex(
      (bagItem) => bagItem.id == item.id,
    );
    const updatedBag = [...bag];
    updatedBag[bagItemIndex].quantity += 1;
    setBag(updatedBag);
  };

  return (
    <SafeAreaView style={styles.topLevelContainer}>
      <View style={styles.container}>
        <TitleText>Wed 9/27</TitleText>
        <MenuView menu={menu} onAddToBag={handleAddItem} />
        <View style={{ flex: 0.2 }} />
        <BagView
          bag={bag}
          onDecrement={handleDecrementBagItem}
          onIncrement={handleIncrementBagItem}
        />
      </View>
    </SafeAreaView>
  );
}
