import classNames from "classnames";
import React from "react";

type SelectProps = {
  label?: string;
  errorMessage?: any;
  marginY?: string;
  PlaceHolder?: string;
} & React.ComponentPropsWithRef<"select">;

const FormSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { children, className, label, errorMessage, marginY, PlaceHolder, ...rest },
    ref
  ) => {
    return (
      <div className={classNames(marginY ? marginY : "my-2", "w-full")}>
        {label && (
          <h4 className="capitalize text-sm font-medium text-gray-700">
            {label}
          </h4>
        )}

        <select
          className={classNames(
            errorMessage
              ? "border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              : "border-gray-400 shadow-sm focus:border-gray-600 focus:ring-gray-600",
            "my-1  w-full rounded-md text-sm",
            className
          )}
          ref={ref}
          {...rest}
        >
          <option className="text-sm" hidden value="">
            {PlaceHolder}
          </option>
          {children}
        </select>

        {errorMessage && (
          <p className="text-xs text-red-500 ">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
