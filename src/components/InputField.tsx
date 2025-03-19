interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
}

function InputField({
  label,
  placeholder,
  register,
  type,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
