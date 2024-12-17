const Button = ({ labelActive, labelDeactive, isDisabled }) => {
  return (
    <button
      className={`font-bold p-3 rounded-lg text-white ${
        isDisabled ? "bg-gray-400" : " bg-blue-600 "
      }`}
      disabled={isDisabled}
    >
      {isDisabled ? labelDeactive : labelActive}
    </button>
  );
};

export default Button;
