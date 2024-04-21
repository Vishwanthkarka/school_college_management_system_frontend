import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/util/header";
import toast, { Toaster } from "react-hot-toast";
import { getData, postData, isAuthenticated } from "@/util/apicalls";
function PaymentAddForm(props) {
  //this contains user info
  const [userData, setUserData] = useState(null);
  //payment info entered in form
  const [paymentAdd, setPaymentAdd] = useState(null);
  // cookie user data
  const [userinfo, setUserInfo] = useState(null);


  useEffect(() => {
    if (isAuthenticated().user.role != "lecturer") {
      router.push("/");
    }

    if (!isAuthenticated()) {
      router.push("/login");
    }
    
    async function fetchdata() {

      let data = await getData(
        `/getuserinfowithid/${props.sid}`,
        isAuthenticated().token
      );
      setUserInfo(isAuthenticated().user);
      setUserData(data);
   
    }

    fetchdata();
  }, []);

  // handling input
  const handleInput = (user) => (el) => {
    // userinfo has the content
    userinfo &&
      setPaymentAdd({ ...paymentAdd, [user]: el.target.value, sid: props.sid });
  
  };

  // submitting data
  const handlePaymentSubmit = async (el) => {
    el.preventDefault();
    let waiting =  toast.loading('Waiting...',{
    
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })
    
    const isDone = await postData(
      "/addpayment",
      paymentAdd,
      isAuthenticated().token
    );

    if (isDone) {
     
      toast.dismiss(waiting);
      toast.success("Amount Added ",{
   
       style: {
         borderRadius: '10px',
         background: '#333',
         color: '#fff',
       }});
       setTimeout(() => {
        props.closeForm(true)
      }, "600");
      //  setTimeout(props.closeForm(true), 10000);
       
    }

  };
  return (
    <>
      <div className=" h-[100%]  w-[100%] absolute flex justify-center items-center  flex-col  ">
      <Toaster position="top-center" />
        <div
          className=" h-[100vh] w-[100%] backdrop-blur-[2px] cursor-pointer  absolute"
          onClick={() => {
            props.closeForm(true);
          }}
        >
       
        </div>
        <div className="flex gap-[130px] items-center  "></div>
        <form
          className="md:w-[371px]  pt-4   w-[351px] h-[700px] bg-[#1A1E23]  border-secoundblack drop-shadow-md border-[5px] shadow-md rounded-[35px] drop-shadow-sm px-[1rem]  flex flex-col gap-[15px] "
          onSubmit={handlePaymentSubmit}
          enctype="multipart/form-data"
        >
          {userData ? (
            <Image
              src={userData.user.photo.secure_url}
              className="rounded-[50%] m-auto border-lightwg border-[px] border-2 shadow-sm"
              width={100}
              height={100}
            ></Image>
          ) : (
            ""
          )}
          <p className="text-lightwg m-0">Enter the payment title </p>
          <input
            type="text"
            class="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
            placeholder="Ex: Yearly payment fee"
            onChange={handleInput("title")}
            // value={title}
          />
          <p className="text-lightwg m-0">Enter the Amount </p>
          <input
            type="Number"
            class="py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white"
            placeholder="Amount"
            onChange={handleInput("amount")}
            // value={lastName}
          />
          <p className="text-lightwg m-0">Enter the last day of payment</p>
          <input
            type="Date"
            class="  py-1.5 pl-7 pr-20 border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md   text-white "
            placeholder="Amount"
            onChange={handleInput("lastDay")}
            // value={lastName}
          />
          <p className="text-lightwg m-0">Enter description</p>
          <textarea
            row="5"
            cols="900"
            placeholder="description"
            onChange={handleInput("description")}
            class=" border-[1.5px]  border-lightblack  bg-secoundblack   rounded-md p-3  text-white"
          ></textarea>
          <button
            className="block w-full bg-primarycolor rounded-md border-0 py-1.5 pl-7 pr-20  my-4 bg-indigo-600 text-white "
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}
export default PaymentAddForm;
