import * as React from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import {
  BigButton,
  FlexFill,
  LabelText,
  SubtitleText,
  TitleText,
} from "./Shared";

interface BagItemViewProps {
  item: BagItem;
  onIncrement: (item: BagItem) => void;
  onDecrement: (item: BagItem) => void;
}
function BagItemView({
  item,
  onDecrement,
  onIncrement,
}: BagItemViewProps) {
  return (
    <View style={styles.bagItemView}>
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
  );
}

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
        {bag.length > 0 ? (
          bag.map((item) => (
            <BagItemView
              key={item.id}
              item={item}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          ))
        ) : (
          <SubtitleText>Order something...</SubtitleText>
        )}
      </ScrollView>
    </View>
  );
}
