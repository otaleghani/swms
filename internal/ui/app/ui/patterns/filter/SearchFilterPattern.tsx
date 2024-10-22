"use client"

import { ChangeEvent, Dispatch, memo, SetStateAction, useState } from "react";
import { Input } from "../../components/input";

interface Props {
  onInputChange: (value: string) => void;
  // dict
}

const Component = memo(function SearchFilterPattern({
  onInputChange
}: Props) {

  const [state, setState] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setState(newValue);
    onInputChange(newValue);
    //console.log(state)
  }

  return (
    <>
      <Input 
        type="text"
        placeholder="Your search.."
        onChange={handleChange}
        value={state}
      />
      <input type="hidden" />
    </>
  );
});

export default Component
