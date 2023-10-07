import * as React from "react";
import { Switch, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { LctView, LabelText, TitleText, BigButton } from "./Shared";

export default function App() {
  // This could come from a prop or other external source
  const initialValue = "Initial Value";
  const [method, setMethod] = React.useState<"state"|"ref">("state");
  const [submitText, setSubmitText] = React.useState(initialValue);
  const [inputText, setInputText] = React.useState(initialValue);
  const tiValue = React.useRef(initialValue);

  const handleSwitch = () => {
    setMethod((method) =>
      method == "state" ? "ref" : "state"
    )
  }

  const handleSubmit = () => {
    if (method == "state") {
      console.log("Current value: ", inputText)
      setSubmitText(inputText);
    } else if (method == "ref") {
      console.log("Current value: ", tiValue.current)
      setSubmitText(tiValue.current);
    }
  }

  const handleChangeText = (text:string) => {
    if (method == "state") {
      setInputText(text);
    } else if (method == "ref") {
      tiValue.current = text;
    }
  }

  return (
    <SafeAreaView style={styles.topLevelContainer}>
      <LctView style={styles.container}>
        <TitleText>Wed 9/27</TitleText>
        <View style={{ flex: 0.2 }} />
        <View style={styles.horzContainer}>
          <LabelText>Use State to Track</LabelText>
          <Switch
            value={method === "state"}
            onValueChange={handleSwitch}/>
        </View>
        <LabelText>{submitText}</LabelText>
        <View style={styles.horzContainer}>
          <LabelText>Enter your name:</LabelText>
          <TextInput
            style={styles.input}
            defaultValue={initialValue}
            {...( method === "state" ?
              { value: inputText }: {}
            )}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <BigButton title="Submit" onPress={handleSubmit}/>
      </LctView>
    </SafeAreaView>
  );
}
