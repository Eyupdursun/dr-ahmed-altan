type ShinyTextProps = {
  text: string;
  className?: string;
  disabled?: boolean;
};

export default function ShinyText({
  text,
  className = "",
  disabled = false,
}: ShinyTextProps) {
  return (
    <span className={`shiny-text ${disabled ? "shiny-text-disabled" : ""} ${className}`}>
      {text}
    </span>
  );
}
