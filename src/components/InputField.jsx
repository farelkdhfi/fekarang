function InputField({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  accept, 
  error // Tambahkan properti error
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300 ${
            error ? "border-red-500" : ""
          }`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={type === "file" ? undefined : value}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-green-300 ${
            error ? "border-red-500" : ""
          }`}
          required={required}
          accept={accept}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

export default InputField;
