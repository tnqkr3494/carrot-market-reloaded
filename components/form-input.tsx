import { InputHTMLAttributes } from "react";

interface IFormInput {
  errors?: string[];
  name: string;
}

export default function FormInput({
  errors = [],
  name,
  ...rest
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        {...rest}
        className="h-10 bg-transparent rounded-md ring-neutral-200 border-none ring-2 focus:outline-none focus:ring-orange-500 focus:ring-4"
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
