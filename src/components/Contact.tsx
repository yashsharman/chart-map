import { useState } from "react";
import crossIcon from "../assets/cancel.png";
import CreateContact from "./CreateContact";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteContact } from "../redux/slices/contact";
import { updateCurrentContact } from "../redux/slices/currentContact";

function Contact() {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const contact = useAppSelector((state) => state.contacts);
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative">
      <button
        onClick={() => {
          setShowPopup(true);
          dispatch(
            updateCurrentContact({
              firstName: "",
              lastName: "",
              status: "",
              userId: NaN,
            })
          );
        }}
        className=" bg-slate-100 border-black px-6 py-4 w-max  font-semibold mt-6 cursor-pointer text-black"
      >
        Create Contact
      </button>
      <div className="contact_container flex flex-row flex-wrap gap-4 m-4 items-center ">
        {contact.length > 0 ? (
          contact.map((con) => {
            return (
              <div className="flex flex-col" key={con.userId}>
                <div className="bg-white p-2 text-black text-left w-[15rem]">
                  <div>
                    First Name: <b>{con.firstName}</b>
                  </div>{" "}
                  <div>
                    Last Name: <b>{con.lastName}</b>
                  </div>{" "}
                  <div>
                    Status: <b>{con.status}</b>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <button
                    onClick={() => {
                      dispatch(updateCurrentContact(con));
                      setShowPopup(true);
                    }}
                    className="bg-green-600 py-2 mt-2 px-4 border  border-solid border-black w-full text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      dispatch(deleteContact({ userId: con.userId }))
                    }
                    className="bg-red-600 py-2  px-4 border  border-solid border-black w-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-row gap-4 items-center justify-center bg-white border text-black p-10 mt-10">
            <img src={crossIcon} width={50} height={50} />
            <div className="text-left">
              No Contact found Please add contact from <br /> create contact
              button.
            </div>
          </div>
        )}
      </div>
      {showPopup && <CreateContact closePopup={() => setShowPopup(false)} />}
    </div>
  );
}

export default Contact;
