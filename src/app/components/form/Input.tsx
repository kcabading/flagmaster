
import { useState } from "react";

interface InputProps {
    defaultValue: string,
    placeholder: string
}

const Input = ({ defaultValue, placeholder }: InputProps) => {
    const [value, setValue] = useState(defaultValue);
  
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    );
  }

  export default Input