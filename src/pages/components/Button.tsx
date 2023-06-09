import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "PRIMARY" | "SECONDARY";
}

const classNames: Record<Props["variant"], string> = {
  PRIMARY:
    "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-4",
  SECONDARY:
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
};

export default function Button({
  className,
  variant,
  children,
  ...other
}: Props) {
  let _className = className
    ? classNames[variant] + " " + className
    : classNames[variant];
  return (
    <button type="button" className={_className} {...other}>
      {children}
    </button>
  );
}
