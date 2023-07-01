import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
export function SignIn() {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/authentication/authAdmin",
        formData
      );
      console.log(response.response);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "We're sorry!",
        text: error.response.data,
      });
    }
  };
  return (
    <>
      <img
        src="https://media.istockphoto.com/id/538489900/photo/soccer-football-stadium-with-floodlights.jpg?s=612x612&w=0&k=20&c=qdExKdPyOirWjW8mb854vaAglX1IhmonkbGYbqJOUyU="
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              size="lg"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              name="password"
              onChange={handleChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="green"
              fullWidth
              onClick={handleClick}
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                ></Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
