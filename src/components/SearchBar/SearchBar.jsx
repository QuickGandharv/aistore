const SearchBar = ({
  placeholder,
  value,
  onChange,
  text,
  id,
  className,
  lableclass,
}) => {
  return (
    <div className={`flex flex-col`}>
      <label
        htmlFor={id}
        className={`text-black text-xs mb-2 flex-1 ${lableclass}`}
      >
        {text}
      </label>
      <div
        className={`bg-white flex items-center p-3 rounded-md border border-solid ${
          className ? className : ""
        }`}
      >
        <input
          className="text-black text-base bg-transparent w-full ml-2 outline-none"
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default SearchBar;
