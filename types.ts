interface FoodItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  price: number;
  labels: string[];
  allergens: string[];
}

interface BagItem {
  id: string;
  foodItemId: string;
  name: string;
  quantity: number;
}
