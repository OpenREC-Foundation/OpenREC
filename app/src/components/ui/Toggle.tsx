interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Toggle = ({ enabled, onChange, label, disabled = false }: ToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      {label && <span className="text-sm text-gray-300">{label}</span>}
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-violet-500' : 'bg-gray-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
