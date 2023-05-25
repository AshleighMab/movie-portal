import React, { useEffect, useState } from "react";
import style from "../../pages/profile/style.module.css";
import Layout from "../../components/Layout";

const UserInf = () => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const userDetails =
      typeof window !== "undefined" && localStorage.getItem("userDetails")
        ? JSON.parse(localStorage.getItem("userDetails"))
        : null;
    setPerson(userDetails);
    console.log("MY USER is::", userDetails);
  }, []);

  if (!person) {
    return null;
  }

  return (
    <Layout>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.profileinfo}>
            <div className={style.profilepic}>
              <i className="fas fa-user-circle fa-1x"></i>
            </div>
            <h1 className={style.heading}>
              {person ? person.name : null} {person ? person.surname : null}
            </h1>

            <p className={style.p}>
              <i className="fas fa-phone icon"></i>
              Cellphone: {person ? person.phoneNumber : null}
            </p>
            <p className={style.p}>
              <i className="fas fa-envelope icon"></i>
              Email: {person ? person.emailAddress : null}
            </p>
            <p className={style.p}>
              <i className="fas fa-venus-mars icon"></i>
              Gender: {person ? person.genderName : null}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserInf;
