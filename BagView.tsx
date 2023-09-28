import * as React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { BigButton, FlexFill, LabelText, TitleText } from "./Shared";

interface BagViewProps {
  bag: BagItem[];
  onIncrement: (item: BagItem) => void;
  onDecrement: (item: BagItem) => void;
}

export default function BagView({
  bag,
  onIncrement,
  onDecrement,
}: BagViewProps) {
  return (
    <View style={styles.bagView}>
      <TitleText>Bag</TitleText>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {bag.map((item) => (
          <View key={item.id} style={styles.bagItemView}>
            <LabelText>{item.name}</LabelText>
            <FlexFill />
            <BigButton
              style={styles.quantityButton}
              title="-"
              onPress={() => onDecrement(item)}
            />
            <LabelText>{item.quantity}</LabelText>
            <BigButton
              style={styles.quantityButton}
              title="+"
              onPress={() => onIncrement(item)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
