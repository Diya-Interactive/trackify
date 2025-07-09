import React, { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  value: Array<string | number>;
  onChange: (value: Array<string | number>) => void;
  placeholder?: string;
  isMulti?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMulti = false,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      if (!value.includes(option.value)) {
        onChange([...value, option.value]);
      }
    } else {
      onChange([option.value]);
      setOpen(false);
    }
    setInputValue("");
  };

  const handleRemove = (val: string | number) => {
    onChange(value.filter((v) => v !== val));
  };

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      (!isMulti || !value.includes(opt.value))
  );

  return (
    <div ref={ref} style={{ position: "relative", minWidth: 220 }}>
      <div
        className="overflow-auto h-[45px] px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white w-full focus:outline-none"
        style={{
          border: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          cursor: "pointer",
          background: "#fff",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {isMulti && value.length > 0 ? (
          value.map((val) => {
            const opt = options.find((o) => o.value === val);
            return (
              <span
                key={val}
                style={{
                  background: "#e0e0e0",
                  borderRadius: 12,
                  padding: "2px 8px",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 4,
                  marginBottom: 2,
                }}
                onClick={e => e.stopPropagation()}
              >
                {opt?.label}
                <button
                  style={{
                    marginLeft: 4,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(val)}
                  type="button"
                >
                  ×
                </button>
              </span>
            );
          })
        ) : !isMulti && value.length === 1 ? (
          <span>
            {options.find((o) => o.value === value[0])?.label}
          </span>
        ) : (
          <span style={{ color: "#aaa" }}>{placeholder}</span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 18, userSelect: "none" }}>
          ▼
        </span>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            zIndex: 10,
            maxHeight: 180,
            overflowY: "auto",
            marginTop: 2,
          }}
        >
          <input
            type="text"
            value={inputValue}
            placeholder="Search..."
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              padding: 8,
              boxSizing: "border-box",
              borderBottom: "1px solid #eee",
            }}
            onClick={e => e.stopPropagation()}
          />
          {filteredOptions.length === 0 && (
            <div style={{ padding: 8, color: "#aaa" }}>No options</div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                background: value.includes(option.value) ? "#f0f0f0" : "#fff",
              }}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;