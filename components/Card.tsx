import { deleteContact, updateContact } from "@/fiirebase";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  id: string;
  name?: string;
  email?: string[];
  phone?: string[];
  dob?: string;
}

const Card = (props: Props) => {
  const [name, setName] = React.useState(props.name || "");
  const [email, setEmail] = React.useState(props.email || [""]);
  const [phone, setPhone] = React.useState(props.phone || [""]);
  const [dob, setDob] = React.useState(props.dob || "");

  const router = useRouter();
  function onSubmit() {
    deleteContact(props.id).then()
  }

  const [edit, setEdit] = React.useState(true);

  return (
    <div className="border w-72 h-96 rounded-lg flex flex-col items-center justify-center space-y-4">
      <h1 className={`text-xl ${edit ? "block" : "hidden"}`}>{props.name}</h1>
      <h1 className={`text-xl ${edit ? "block" : "hidden"}`}>{props.email?.join(", ")}</h1>
      <h1 className={`text-xl ${edit ? "block" : "hidden"}`}>{props.phone?.join(", ")}</h1>
      <h1 className={`text-xl ${edit ? "block" : "hidden"}`}>{props.dob}</h1>
      <button
        className={`bg-blue-400 px-4 py-2 rounded-xl ${
          edit ? "block" : "hidden"
        }`}
        onClick={() => {deleteContact(props.id).then(() => router.reload())}}
      >
        Delete
      </button>
      <button
        className={`bg-blue-400 px-4 py-2 rounded-xl ${
          edit ? "block" : "hidden"
        }`}
        onClick={() => setEdit(false)}
      >
        Edit
      </button>
      <input
        className={`border rounded-md h-10 w-56 p-1 text-xl  ${
          edit ? "hidden" : "block"
        }`}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={`border rounded-md h-10 w-56 p-1 text-xl  ${
          edit ? "hidden" : "block"
        }`}
        value={email}
        onChange={(e) => setEmail([e.target.value])}
      />
      <input
        className={`border rounded-md h-10 w-56 p-1 text-xl  ${
          edit ? "hidden" : "block"
        }`}
        value={phone}
        onChange={(e) => setPhone([e.target.value])}
      />
      <input
        className={`border rounded-md h-10 w-56 p-1 text-xl  ${
          edit ? "hidden" : "block"
        }`}
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button
        className={`bg-blue-400 px-4 py-2 rounded-xl ${
          edit ? "hidden" : "block"
        }`}
        onClick={() => updateContact(props.id, { name, email, phone, dob }).then(() => router.reload())}
      >
        Save
      </button>
    </div>
  );
};

export default Card;
