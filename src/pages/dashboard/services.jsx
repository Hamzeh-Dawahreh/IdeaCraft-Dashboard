import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

import Swal from "sweetalert2";

export function Services() {
  const [services, setServices] = useState([]);
  const [isDeleted, setIsDeleted] = useState(true);
  const [open, setOpen] = useState();
  const handleDelete = async (service_id) => {
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
          `http://localhost:3500/form/deleteService/${service_id}`,
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
  const handleApprove = async (service_id) => {
    const confirmed = showApprovePrompt();
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
          `http://localhost:3500/form/deleteService/${service_id}`,
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
  const handleOpen = () => {
    setOpen(!open);
  };

  const showConfirmationPrompt = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure you want to  delete this service?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, soft delete it!",
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };
  const showApprovePrompt = () => {
    Swal.fire({
      title: "Do You want to Approve this Service?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:3500/form/getAllServices",
          config
        );
        const filteredData = response.data.filter((user) => !user.isDeleted);
        setServices(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isDeleted]);
  console.log(services);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="grid grid-cols-6 justify-end gap-x-8">
            <Typography variant="h6" color="white">
              Services Table
            </Typography>

            <Typography
              as="a"
              href="booking/add"
              className="justify-center text-xs font-semibold text-blue-gray-600"
            ></Typography>
          </div>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "company name",
                  "industry",
                  " phone",
                  "Country",
                  "City",
                  "Image ",
                  "Status ",
                  "Action",
                ].map((el) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map(
                (
                  { _id, company_id, country, city, phone, Images, isApproved },
                  key
                ) => {
                  const className = `py-3 px-5 ${
                    key === services.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {company_id.companyname}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {company_id.industry}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {" "}
                          {country}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {" "}
                          {city}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {" "}
                          <Button
                            onClick={handleOpen}
                            className=" w-20 text-center text-xs"
                          >
                            image{" "}
                          </Button>
                          <Dialog open={open} handler={handleOpen}>
                            <div className="flex items-center justify-between"></div>
                            <DialogBody divider>
                              <img
                                src={`http://localhost:3500/${Images}`}
                                alt="image"
                                handleImageClick
                                className=" w-full"
                              />
                            </DialogBody>
                          </Dialog>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {
                            (isApproved = ""
                              ? "pending"
                              : (isApproved = false
                                  ? "Not Approved"
                                  : "Approved"))
                          }
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="grid grid-cols-2 justify-center ">
                          <div className="justify-center">
                            <IconButton
                              className=""
                              color="green"
                              onClick={() => handleApprove(_id)}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </IconButton>
                          </div>
                          <div className="justify-center">
                            <IconButton
                              color="red"
                              onClick={() => {
                                handleDelete(_id);
                              }}
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

export default Services;
