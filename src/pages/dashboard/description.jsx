import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";

export default function description({ description }) {
  const [open, setOpen] = useState();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Typography className="text-xs font-semibold text-blue-gray-600">
      {" "}
      <Button onClick={handleOpen} className=" w-22 text-center text-xs">
        Details{" "}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between"></div>
        <DialogBody divider>
          <div>{description}</div>
        </DialogBody>
      </Dialog>
    </Typography>
  );
}
