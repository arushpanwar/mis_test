import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { deleteContact, getContact } from "@/fiirebase";
import Contact from "@/interfaces/Contact";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ contacts }: { contacts: Contact[] }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  function onSubmit(data: any) {
    let query = "";
    if (data.name) {
      query += `name=${data.name}&`;
    }
    if (data.phone) {
      query += `phone=${data.phone}&`;
    }
    if (data.email) {
      query += `email=${data.email}`;
    }
    if (query) router.push(`/?${query}`);
  }
  return (
    <div>
      <div className="bg-amber-100 flex flex-col items-center justify-center space-y-4 p-5">
        <h1 className="text-3xl">Search</h1>
        <form
          className="space-y-2 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>Name</p>
          <input className="rounded-md h-10 w-96" {...register("name")} />
          <p>Email</p>
          <input type="email" className="rounded-md h-10 w-96" {...register("email")} />
          <p>Phone</p>
          <input type="number" className="rounded-md h-10 w-96" {...register("phone")} />
          <button className="bg-red-400 px-4 py-2 rounded-xl">Search</button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl pt-12">All Contacts</h1>
        <div className="grid grid-cols-4 gap-12 p-10">
          {contacts.map((contact) => (
            <Card
              id={contact.id}
              name={contact.name}
              phone={contact.phone}
              email={contact.email}
              dob={contact.dob}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(data: any) {
  const { name, phone, email } = data.query;
  console.log(data.query);
  const contacts = await getContact(name, phone, email);
  return { props: { contacts } };
}
