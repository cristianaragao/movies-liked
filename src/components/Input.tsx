import { useToken } from "@gluestack-style/react"
import { TextInput, TextInputProps } from "react-native"

export const Input = (props: TextInputProps) => {

  const border = useToken("colors", "darkBlue600")
  const bg = useToken("colors", "darkBlue800")
  const placeholder = useToken("colors", "secondary300")

  return (
  <TextInput
    {...props}
    placeholderTextColor={placeholder}
    cursorColor={placeholder}
    style={{
      ...(props.style as StylePropertyMap),
      backgroundColor: bg,
      paddingTop: 5,
      paddingBottom: 7,
      paddingHorizontal: 20,
      borderRadius: 20,
      color: "white",
      borderWidth: 1,
      borderColor: border,
      fontSize: 16,
    }}
  />
)}
