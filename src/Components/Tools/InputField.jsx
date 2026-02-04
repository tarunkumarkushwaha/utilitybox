const InputField = ({ label, value, placeholder, onChange }) => {
  return (
    <div>
      {/* <label className="block text-sm font-medium mb-1">{label}</label> */}
      <input
        className="w-80 border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] my-1 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;