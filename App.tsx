import * as React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./styles";
import { TitleText } from "./Shared";
import MenuView from "./MenuView";
import BagView from "./BagView";
import { addFoodToBag } from "./OrderUtils";
import { fetchMenu } from "./OrderData";

export default function App() {
  const [menu, setMenu] = React.useState<FoodItem[]>([]);
  const [bag, setBag] = React.useState<BagItem[]>([]);

  React.useEffect(() => {
    // fetch menu from server (fake)
    fetchMenu().then((newMenu) => {
      setMenu(newMenu);
    });
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
