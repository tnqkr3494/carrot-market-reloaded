import HackedComponent from "@/components/hacked-component";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";
import woman from "../../public/woman.jpeg";

async function getData() {
  const data = await fetch(
    "https://nomad-movies.nomadcoders.workers.dev/movies"
  );
}

async function getSecret() {
  const keys = {
    apiKey: "23123123",
    secretKey: "123as0123",
  };
  //experimental_taintObjectReference("API Keys were leaked", keys);
  experimental_taintUniqueValue(
    "Secret Keys was exposed",
    keys,
    keys.secretKey
  );
}

const action = async () => {
  "use server";
  revalidatePath("/extras");
};

export default async function Extras() {
  await getData();
  const data = await getSecret();

  return (
    <div className="flex flex-col gap-3 py-10">
      {/* local src로 경로설정해야 width, height없이 blur사용이 가능해진다. */}
      <Image
        src="/woman.jpeg"
        alt=""
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
      />
    </div>
  );
}
