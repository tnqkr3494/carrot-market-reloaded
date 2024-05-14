import HackedComponent from "@/components/hacked-component";
import { revalidatePath } from "next/cache";
import {
  experimental_taintObjectReference,
  experimental_taintUniqueValue,
} from "react";

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
      <h1 className="text-6xl font-metallica">Extras!</h1>
      <h2 className="font-roboto">So much more to learn!</h2>
      <HackedComponent data={data} />
      <form action={action}>
        <button>revalidate</button>
      </form>
    </div>
  );
}
