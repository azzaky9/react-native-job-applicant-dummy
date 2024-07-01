import React from "react";
import { TextInput, TextInputProps } from "react-native";

export interface TextFieldProps extends TextInputProps {
  style?: object;
}

export default function TextField({ style, ...props }: TextFieldProps) {
  return (
    <TextInput
      style={{
        height: 60,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 9,
        ...style
      }}
      {...props}
    />
  );
}
