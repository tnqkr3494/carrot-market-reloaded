"use server";

export async function handleForm(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(formData);
  return {
    error: ["wrong password", "password is too short"],
  };
}
