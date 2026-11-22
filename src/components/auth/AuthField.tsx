import type { HTMLInputTypeAttribute, ReactNode } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  hint?: string;
  labelTrailing?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
};

export default function AuthField({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  hint,
  labelTrailing,
  required,
  disabled,
  minLength,
  maxLength,
}: AuthFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-purple-950">
          {label}
        </label>
        {labelTrailing}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        className="mt-2 h-11 w-full rounded-xl border border-purple-200 bg-[#fdfbff] px-3.5 text-sm text-purple-950 shadow-[0_1px_2px_rgba(70,34,90,0.03)] outline-none transition placeholder:text-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60"
      />
      {hint ? <p className="mt-1.5 text-xs text-purple-500">{hint}</p> : null}
    </div>
  );
}
