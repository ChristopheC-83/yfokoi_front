interface ButtonFormProps {
  children: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonForm({
  children,
  type = "submit",
  onClick,
  disabled = false,
  className = "",
}: ButtonFormProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-slate-900 p-2 w-full rounded-lg border-2 border-slate-950 mt-5 text-amber-100 hover:bg-slate-700 hover:text-amber-300 duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
