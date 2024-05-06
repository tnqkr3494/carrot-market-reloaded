"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={uploadProduct} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="aspect-square border-2 flex flex-col items-center justify-center border-dashed "
          style={{ background: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <span>사진을 추가해주세요.</span>
            </>
          ) : null}
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
        <FormInput
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
}
