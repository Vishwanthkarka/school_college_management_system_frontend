import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isAuthenticated } from "./apicalls";
import moment from "moment";

function ListStudent(props) {
  const [studentAttendace, setStudentAttendace] = useState();
  return (
    <>
      <Link
        href={props.link}
        className="no-underline text-inherit decoration-inherit rounded"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <div className="px-[5rem] py-2 flex justify-around items-center rounded-lg flex-w  bg-primarylight my-3.5  shadow-xl mx-2 text-[#717377]">
          {/* <input type="checkbox" name="topping" value="Regular" id="regular" className='w-[1.2rem] h-[1.2rem]' /> */}
          {props.img ? (
            <div className="">
              <Image
                src={
                  props.img
                    ? props.img
                    : "https://res.cloudinary.com/dfceagnv7/image/upload/v1669976521/users/nlqbwvkoj7chzzdwm3p9.jpg"
                }
                alt=""
                width={40}
                height={40}
                className="rounded-md shadow-md border-lightwg border-[1px]"
              />
            </div>
          ) : (
            " "
          )}
          <div class="flex flex-col text-center">
            <p className="text-[1.2rem] text-white m-0">{props.name}</p>
            <p class="text-[#606F7B] font-[Avenirregular] ">
              {" "}
              {props.department}
            </p>{" "}
          </div>
          <p className="text-primarycolor font-bold"> {props.htno}</p>
          {props.date && (
            <p className="">{moment(props.date).format("MMMM Do YYYY")}</p>
          )}

          {props.email && <p> {props.email}</p>}
        </div>
      </Link>
    </>
  );
}

export default React.memo(ListStudent);
