// import { useHistory } from "react-router-dom";
// import Cookies from "js-cookie";

// const studentLogin = async () => {
//     const history = useHistory();
// const jwt = Cookies.get("jwt");

// if (!jwt) {
//     history.push("/login");
//     return;
// }
// const sendData1 = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//         jwt,
//     }),
// };
// let response = await fetch("http://localhost:6700/student/verify", sendData1);
// response = await response.json();
// if (response.statusCode != 200) {
//     history.push("/login");
//     return;
// }
// };

// export default studentLogin;

import React from "react";

function StudentLogin() {
    return <div></div>;
}

export default StudentLogin;
