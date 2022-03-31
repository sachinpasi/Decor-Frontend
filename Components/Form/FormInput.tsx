import classNames from "classnames";
import React from "react";

type InputProps = {
  label?: string;
  errorMessage?: any;
  marginY?: string;
} & React.ComponentPropsWithRef<"input">;

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, label, errorMessage, marginY, ...rest }, ref) => {
    return (
      <div className={classNames(marginY ? marginY : "my-2 ", "w-full")}>
        {label && (
          <h4 className="capitalize text-sm font-medium text-gray-700">
            {label}
          </h4>
        )}
        <input
          ref={ref}
          className={classNames(
            errorMessage
              ? "border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              : "border-gray-400 shadow-sm focus:border-gray-600 focus:ring-gray-600",
            "my-1.5  w-full rounded-md text-base placeholder:text-sm tracking-wide ",
            className
          )}
          {...rest}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 ">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
