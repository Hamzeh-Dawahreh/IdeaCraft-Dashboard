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
import Description from "./description";
import Swal from "sweetalert2";
import { data } from "autoprefixer";
import Pagination from "@mui/material/Pagination";

export function Services() {
  const [services, setServices] = useState([]);
  const [openArray, setOpenArray] = useState(
    new Array(services.length).fill(false)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isDeleted, setIsDeleted] = useState(true);
  const [isApproveD, setIsApproved] = useState(true);
  const [open, setOpen] = useState(false);

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
    const confirmed = await showApprovePrompt();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let isApproved;

    if (confirmed == true) {
      isApproved = true; // Set isApproved to true if confirmed is true
    } else if (confirmed == false) {
      isApproved = false;
    }

    try {
      const response = await axios.put(
        `http://localhost:3500/form/approveService/${service_id}`,
        { isApproved },
        config
      );
      response.data.message
        ? Swal.fire(
            "Something went wrong!",
            `${response.data.message}`,
            "error"
          )
        : Swal.fire("Done!", `${response.data}`, "success");
    } catch (error) {
      console.error(error);
    }
    setIsApproved(!isApproveD);
  };
  const handleOpen = (index) => {
    const updatedOpenArray = [...openArray];
    updatedOpenArray[index] = !updatedOpenArray[index];
    setOpenArray(updatedOpenArray);
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
  const showApprovePrompt = async () => {
    const result = await Swal.fire({
      title: "Do You want to Approve this Service?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Approve",
      denyButtonText: `Don't Approve`,
    });

    if (result.isConfirmed) {
      return true;
    } else if (result.isDenied) {
      return false;
    }
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
          `http://localhost:3500/form/getAllServices?page=${currentPage}`,
          config
        );
        const { services, totalPages } = response.data;
        setTotalPages(totalPages);

        const filteredData = services.filter((user) => !user.isDeleted);
        setServices(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, isDeleted, isApproveD]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
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
                  " details",
                  "Country",
                  "City",
                  "Image ",
                  "Status ",
                  "Approval",
                  "Delete",
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
              {services.map((data, index) => {
                const className = `py-3 px-5 ${
                  index === services.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={data._id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {data.company_id.companyname}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.company_id.industry}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      {<Description description={data.description} />}{" "}
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.country}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {" "}
                        {data.city}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {" "}
                        <Button
                          onClick={() => handleOpen(index)}
                          className=" w-20 text-center text-xs"
                        >
                          image{" "}
                        </Button>{" "}
                        <Dialog
                          open={openArray[index]}
                          handler={() => handleOpen(index)}
                        >
                          <div className="flex items-center justify-between"></div>
                          <DialogBody divider>
                            {" "}
                            {data.Images.map((image, index) => (
                              <img
                                key={index}
                                src={`http://localhost:3500/${image}`}
                                alt="image"
                                className="w-full"
                              />
                            ))}
                          </DialogBody>
                        </Dialog>
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {data.isApproved == undefined
                          ? "pending"
                          : !data.isApproved
                          ? "Not Approved"
                          : "Approved"}
                      </Typography>
                    </td>

                    <td className={className}>
                      <div className="grid grid-cols-2 justify-center ">
                        <div className="justify-center">
                          <IconButton
                            className=""
                            color="green"
                            onClick={() => handleApprove(data._id)}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </IconButton>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <div className="grid grid-cols-2 justify-center ">
                        <div className="justify-center">
                          <IconButton
                            color="red"
                            onClick={() => {
                              handleDelete(data._id);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>{" "}
          <div className=" mt-20 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Services;
