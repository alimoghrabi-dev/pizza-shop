"use client";

import { useState } from "react";

const ChangeQuantity = () => {
  const [selectedNumber, setSelectedNumber] = useState("");

  const handleSelectChange = (e: { target: { value: string } }) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const intValue = parseInt(value, 10);
      if (intValue >= 1 && intValue <= 10) {
        setSelectedNumber(value);
      }
    }
  };

  return (
    <select
      id="numberSelect"
      value={selectedNumber}
      onChange={handleSelectChange}>
      <option value={""}>Select...</option>
      {[...Array(10).keys()].map((num) => (
        <option key={num + 1} value={num + 1}>
          {num + 1}
        </option>
      ))}
    </select>
  );
};

export default ChangeQuantity;
