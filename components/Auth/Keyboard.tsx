import { FC, ReactElement } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

type TKeyboardProps = {
  children: ReactElement | ReactElement[];
};
export const Keyboard: FC<TKeyboardProps> = ({ children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
