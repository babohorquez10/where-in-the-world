"use client";

import { PropsWithChildren } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = (
  props: PropsWithChildren<ButtonProps>
) => {
  return (
    <button
      {...props}
      className={`drop-shadow-md py-2 px-10 rounded font-light ${
        props.className || ""
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
