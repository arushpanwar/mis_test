import { addContact } from "@/fiirebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddContact() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function onSubmit(data: any) {
    setLoading(true);
    addContact(data.name, data.phone.replaceAll(" ","").split(","), data.email.replaceAll(" ","").split(","), data.dob)
      .then((data) => {
        router.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="h-screen bg-amber-100 flex flex-col items-center justify-center space-y-4 p-5">
      <h1 className="text-3xl font-bold">Add Contact</h1>
      <form
        className="space-y-2 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p>Name</p>
        <input className="rounded-md h-10 w-96" {...register("name")} />
        <p>Emails</p>
        <input className="rounded-md h-10 w-96" {...register("email")} />
        <p>Phone Numbers (Comma Separated)</p>
        <input className="rounded-md h-10 w-96" {...register("phone")} />
        <p>Dob</p>
        <input
          className="rounded-md h-10 w-96"
          type="date"
          {...register("dob")}
        />
        <button className="bg-red-400 px-4 py-2 rounded-xl" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}
