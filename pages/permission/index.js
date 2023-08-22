import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/util/header";
import NoResultFound from "../../util/no-content.png";
import { useRouter } from "next/router";
import PermissionForm from "@/util/Form/permissionForm";
import ResultNotFound from "@/util/resultNotFound";
import Loading from "@/util/loading";
// import Header from "../core/Header";
import PermssionCard from "@/util/permssionCard";
import { getData, postData, isAuthenticated } from "@/util/apicalls";
function AdminAllPermission() {
  const router = useRouter();
  const [newRequest, setNewRequest] = useState(false);
  const [isloading, setloading] = useState(false);
  const [isView, setIsView] = useState(false);
  const [count, setCount] = useState(1);
  const [allRequests, setAllRequests] = useState(null);
  const [userData, setUserData] = useState(null);

  const [searchSort, setSearchSort] = useState({
    is_PermisssionGranted: 0,
    search: null,
    section: null,
  });

  // next page moving function
  function pageShifting(operation) {
    if (operation == "Add") {
      router.query.page = parseInt(router.query.page) + 1;
      router.push(router);
    } else if (operation == "Sub") {
      if (page > 0) {
        router.query.page = parseInt(page) - 1;
        router.push(router);
      }
    }
  }

  const inputHandler = (user) => (event) => {
    // setSearchSort({ ...searchSort, [user]: event.target.value });
    let value = event.target.value;
    router.query.status = value;
    router.push(router);
  };
  const OnSubmit = (el) => {
    //     el.preventDefault();
    //      GetAllPermissions(isAuthenticated().user.email,isAuthenticated().token,isAuthenticated().user.role,`/?is_PermisssionGranted=${is_PermisssionGranted} ${search?`&search=${search}`:""}`).then(data=>(setAllRequests(data.products) ))
  };

  const { is_PermisssionGranted, search, section } = searchSort;
  const { page, status } = router.query;

  //status query tranfer
  const statusRequest = () => {
    let roleDataFecth;
    if (isAuthenticated().user.role == "lecturer") {
      if (status == "success") {
        return "isLectureApproved=1";
      } else if (status == "reject") {
        return "isLectureApproved=2";
      } else if (status == "pending") {
        return "isLectureApproved=0";
      } else {
        return "isLectureApproved=0";
      }
    } else if (isAuthenticated().user.role == "parent") {
      if (status == "success") {
        return "isParentApproved=1";
      } else if (status == "reject") {
        return "isParentApproved=2";
      } else if (status == "pending") {
        return "isParentApproved=0";
      } else {
        return "isParentApproved=0";
      }
    } else if (isAuthenticated().user.role == "student") {
      if (status == "pending") {
        return "isLectureApproved=0&isParentApproved=0";
      } else if (status == "success") {
        return "isLectureApproved=1&isParentApproved=1";
      } else if (status == "reject") {
        return "isLectureApproved=2&isParentApproved=2&isParentApproved=1";
      } else {
        return "isLectureApproved=0&isParentApproved=0";
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
    console.log("&&***" + status);
    setloading(true);
    async function data(status) {
      if (router.query.page == undefined) {
        router.query.page = 1;
        router.push(router);
      }

      console.log("^^^^" + statusRequest());
      setUserData(isAuthenticated);
      console.log("@@@@@" + status);
      let leavesData = await getData(
        //   isAuthenticated().user.email,
        //   isAuthenticated().token,
        //   isAuthenticated().user.role,
        //   `/viewleaveuser/?${isAuthenticated().user.role == "lecture"?`isLectureApproved=${status=="success"?"1":status=="reject"?"2":"0"}`:`isParentApproved=${status=="success"?"1":status=="reject"?"2":"0"}}`}isLectureApproved=1&page=${page}`
        isAuthenticated().user.role == "student"
          ? `/viewleaveuser/${
              isAuthenticated().user._id
            }/?${statusRequest()}&page=${page}`
          : isAuthenticated().user.role == "lecturer"
          ? `/viewleavelecture?${statusRequest()}&page=${page}`
          : isAuthenticated().user.role == "parent"
          ? `/viewleaveuser/${
              isAuthenticated().user.student_id._id
            }/?${statusRequest()}&page=${page}`
          : null,
        // `/viewleaveuser/?isLectureApproved=0&page=1`
        isAuthenticated().token
      );
      if (leavesData) {
        setloading(false);
      }

      console.log("****990" + JSON.stringify(leavesData));
      setAllRequests(leavesData.permission);
      console.log("999000" + allRequests);
      // .then((data) => setAllRequests(data.leaves)
    }
    isAuthenticated() && data();
    // );
  }, [router, page, count, isView]);
  console.log(allRequests);
  console.log(searchSort);
  function activeSelect(option) {
    if (status == option) {
      return true;
    } else {
      return false;
    }
  }
  const closeForm = (data) => {
    setIsView(!isView);
  };
  return (
    <>
      {<Header />}
      {/* ------ top menu ----- */}
      {isView && <PermissionForm closeForm={closeForm}></PermissionForm>}
      <div className="flex  gap-[80px] h-[60px] mx-7 my-2 rounded-lg items-center justify-center  ">
        <h2 className="text-white">List of Permssions </h2>

        <select
          name="status"
          className="shadow px-[20px] rounded-[40px]  font-[Avenirregular]  h-[35px]  bg-secoundblack text-lightwg "
          onChange={inputHandler("is_PermisssionGranted")}
        >
          <option value="pending" selected={activeSelect("pending")}>
            Pending
          </option>
          <option value="success" selected={activeSelect("success")}>
            Approve
          </option>
          <option value="reject" selected={activeSelect("reject")}>
            Reject
          </option>
        </select>
        {/* 
        <button
          onClick={OnSubmit}
          className="px-[15px] py-[7px] rounded-md bg-primarycolor  text-[white]"
          type="submit"
        >
          Submit
        </button> */}
      </div>

      <div className="min-h-[80vh]  bg-secoundblack mx-4 py-3 px-3 rounded-lg">
        <button
          className="bg-primarycolor ml-2 text-[white] px-2 py-1 rounded-md  block"
          onClick={() => setIsView(!isView)}
        >
          + New
        </button>
        {allRequests && allRequests.length == 0 ? <ResultNotFound /> : ""}
        {allRequests && !allRequests.length == 0 && (
          <div className="flex flex-wrap md:flex-row justify-center md:justify-between text-lightwg text-center  md:px-[5rem]  items-center  my-2">
            <p className=" w-[100%] md:w-[200px] ">Name</p>

            <p className=" w-[100%] md:w-[200px] ">Subject</p>
            <p className=" w-[50%] md:w-[100px]">Days</p>
            <p className="  w-[50%] md:w-[100px]">Status</p>
            {console.log("{{" + allRequests)}
          </div>
        )}

        {/* ---  card of the permission  ---*/}
        {isloading && <Loading />}
        {allRequests &&
          allRequests.map((element) => (
            <PermssionCard
              isAdmin={true}
              subject={element.subject}
              tag={element.tag}
              img={element.userId.photo.secure_url}
              name={element.userId.firstName + " " + element.userId.lastName}
              htno={
                element.userId.htno +
                " - " +
                element.userId.departments[0].department.department
              }
              description={element.description}
              //   isApprovedParent={element.isParentApproved}
              //   isApprovedLecture = {element.isLectureApproved}
              isApproved={
                isAuthenticated().user.role == "lecturer"
                  ? element.isLectureApproved
                  : isAuthenticated().user.role == "parent"
                  ? element.isParentApproved
                  : isAuthenticated().user.role == "student"
                  ? element.isLectureApproved == 0 ||
                    element.isParentApproved == 0
                    ? 0
                    : element.isLectureApproved == 1 &&
                      element.isParentApproved == 1
                    ? 1
                    : 2
                  : ""
              }
              userid={element.userId}
              key={element.userId}
              from={element.fromDate}
              id={element._id}
              to={element.toDate}
            />
          ))}
      </div>

      {/* -------  pagenation  -------*/}
      <div className="flex gap-[50px] m-[1rem]  ">
        <div
          className="border-[2px] border-[white] rounded-[50%] cursor-pointer"
          onClick={() => {
            pageShifting("Sub");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-left"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </div>
        <div
          className="border-[2px] border-[white] rounded-[50%] cursor-pointer"
          //   onClick={() => setCount(count + 1)}
          onClick={() => {
            pageShifting("Add");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-narrow-right"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="15" y1="16" x2="19" y2="12" />
            <line x1="15" y1="8" x2="19" y2="12" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default AdminAllPermission;
