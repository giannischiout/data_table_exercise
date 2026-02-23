import { ChevronDown } from "lucide-react";
import type { ChangeEventHandler } from "react";

export type IOption = {
  label: string;
  value: string | number;
}

export type ISelect = {
  options: IOption[];
  name: string;
  id: string;
  onChange: ChangeEventHandler<HTMLSelectElement>
  value: string;
  placeholder?: string;
}



export function SelectInput({
  onChange,
  value,
  options,
  name,
  id,
  placeholder = "Select an option"
}: ISelect) {
  return (
    <div className="input_wrapper">
      <ChevronDown className="select_icon"/>
      <select
        value={value}
        onChange={onChange}
        id={id} name={name}>
        {options.map((option) => (
          <option  
          key={option.value}
          value={option.value || ""}>{option.label || placeholder}</option>
        ))}
      </select>
    </div>
  )
}


export type ISearchInput = {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string;
  name: string;
  id: string;
  placeholder?: string;
}

export function SearchInput({
  onChange,
  placeholder,
  value,
  name,
  id
}: ISearchInput) {
  return (
    <div>
      <input
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}