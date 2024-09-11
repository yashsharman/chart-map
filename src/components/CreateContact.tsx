import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addContact, editContact } from "../redux/slices/contact";

function CreateContact({ closePopup }: { closePopup: Function }) {
  const dispatch = useAppDispatch();
  const currentContact = useAppSelector((state) => state.currentContact);
  const [firstName, setFirstName] = useState(currentContact.firstName || "");
  const [lastName, setLastName] = useState(currentContact.lastName || "");
  const [status, setStatus] = useState(currentContact.status || "");
  const [id] = useState(currentContact.userId || NaN);

  const handleSave = () => {
    if (id) {
      dispatch(editContact({ firstName, lastName, status, userId: id }));
    } else {
      const randomId = Math.floor(Math.random() * 100);
      dispatch(addContact({ firstName, lastName, status, userId: randomId }));
    }
    closePopup();
  };

  return (
    <div className="absolute bottom-0 w-full h-full bg-black flex items-center justify-center flex-col ">
      <h2 className="mb-4 text-[25px]">
        {id ? "Edit Contact Screen" : "Create Contact Screen"}{" "}
      </h2>
      <div className="box bg-white p-10  w-[max-content] flex flex-col gap-2 text-black">
        <div>
          <label htmlFor="">First Name: </label>{" "}
          <input
            className="bg-white border border-solid border-black"
            type="text"
            name=""
            id=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Last Name: </label>{" "}
          <input
            className="bg-white border border-solid border-black"
            type="text"
            name=""
            id=""
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-row ">
          <label htmlFor="status" className="mr-10">
            Status:{" "}
          </label>
          <input
            className="bg-white mr-1"
            type="radio"
            id="active"
            name="status"
            value="active"
            onClick={() => setStatus("active")}
          />{" "}
          <label htmlFor="active">Active</label>
          <input
            className="bg-white ml-4 mr-1"
            type="radio"
            id="inactive"
            name="status"
            value="inactive"
            onClick={() => setStatus("inactive")}
          />{" "}
          <label htmlFor="inactive">Inactive</label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className=" bg-slate-100 border-black px-6 py-4 w-max text-black font-semibold mt-6 cursor-pointer"
      >
        {id ? "Save Edited Contact" : "Save Contact"}
      </button>
    </div>
  );
}

export default CreateContact;
