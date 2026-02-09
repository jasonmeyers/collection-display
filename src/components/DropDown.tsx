function DropDown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      {label}{" "}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value=""> - </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropDown;
