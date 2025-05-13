"use client";

import { Tooltip } from "flowbite-react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { IVnInput, VnInput } from "../input";

export interface ItemSuggest {
  components: () => ReactNode;
  value: string;
}

interface IVnSuggestInput extends Omit<IVnInput, "value" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  filterFn: (
    search: string,
    handleSelect: (value: string) => void,
  ) => ItemSuggest[];
}

export function VnInputSuggest({
  onChange,
  value = "",
  filterFn,
  ...props
}: IVnSuggestInput) {
  const [text, setText] = useState<string>("");
  const [suggestItem, setSuggestItem] = useState<ItemSuggest[]>([]);

  const handleSelect = (value: string) => {
    setText(value);
    setSuggestItem([]);
    onChange?.(value);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const components = filterFn(value, handleSelect);
    setSuggestItem(components);
    setText(value);
  };

  const renderSuggestBox = () => {
    return (
      <div className="flex flex-col gap-2">
        {suggestItem.map(({ components: Component, value }) => (
          <Component key={value} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (value) {
      setText(value);
      setSuggestItem([]);
    }
  }, [value]);

  return (
    <Tooltip
      content={renderSuggestBox()}
      style="light"
      animation="duration-300"
      trigger="click"
      arrow={false}
      placement="bottom"
    >
      <VnInput value={text} onChange={handleOnChange} {...props} />
    </Tooltip>
  );
}
