import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(true);

  const handleDelete = async (user_id) => {
    const confirmed = await showConfirmationPrompt();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const isDeleted = true;

    if (confirmed) {
      try {
        const response = await axios.put(
          `http://localhost:3500/users/deleteUser/${user_id}`,
          { isDeleted },
          config
        );
        Swal.fire("Done!", `${response.data}`, "success");

        setIsDeleted(!isDeleted);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3500/users/getAllUsers", config)
      .then((response) => {
        const filteredData = response.data.filter((user) => !user.isDeleted);
        setUsersData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, [isDeleted]);
  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to  delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["First Name", "Last Name", "Username", "Email", "Action"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {usersData.map(
                ({ _id, firstname, lastname, username, email }, key) => {
                  const className = `py-3 px-5 ${
                    key === usersData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {firstname}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {lastname}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {username}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="grid grid-cols-2 justify-center gap-2">
                          <div className="justify-center">
                            <IconButton
                              color="red"
                              onClick={() => handleDelete(_id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </IconButton>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
