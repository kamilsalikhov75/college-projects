import './custom-button.css';

function CustomButton({ text, handle, type, isDisabled }) {
  return (
    <button
      type={type ? type : null}
      onClick={handle ? handle : null}
      className="button"
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export { CustomButton };
