import { useEffect, useState } from "react";
import { getData, isAuthenticated } from "@/util/apicalls";
import moment from "moment";
import ResultNotFound from "@/util/resultNotFound";
import Attendaceui from "@/util/Ui/attendaceui";
import Header from "@/util/header";
function View() {
  const [attendances, setAttendances] = useState();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }

    async function fetchData(userid) {
      let data = await getData(
        `/getindividualattendance/${userid}`,
        isAuthenticated().token
      );
      console.log(isAuthenticated().user._id);
      console.log(data);
      if (data.success == true) {
        setAttendances(data.att);
      }
    }

    isAuthenticated().user.role == "student" &&
      fetchData(isAuthenticated().user._id);
    isAuthenticated().user.role == "parent" &&
      fetchData(isAuthenticated().user.student_id._id);
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-[90vh]">
        {attendances && attendances.length == 0 ? <ResultNotFound /> : ""}
        {attendances &&
          attendances.map((attendance) => {
            return (
              <Attendaceui
                htno={moment(attendance.timeStamp).format("MMM Do YY")}
                key={attendance._id}
                link="#"
                isPresent={attendance.isPresent}
                isAttendaceview={true}
                name={attendance.lectureId.firstName}
              />
            );
          })}
      </div>
    </>
  );
}

export default View;
