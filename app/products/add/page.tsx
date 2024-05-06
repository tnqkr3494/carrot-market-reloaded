"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = () => {};
  return (
    <div>
      <form className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="aspect-square border-2 flex items-center justify-center border-dashed"
        >
          <PhotoIcon className="w-20" />
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <FormInput name="title" required placeholder="제목" type="text" />
        <FormInput name="price" type="number" required placeholder="가격" />
        <FormInput name="description" type="text" placeholder="자세한 설명" />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
}
