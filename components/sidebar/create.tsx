import React from "react";
import { Button } from "@/components/ui/button";

const Create = () => {
  return (
    <div className={"flex justify-between"}>
      <p className={"text-2xl font-semibold text-white"}>
        Todo
      </p>
      <div className={"flex gap-2"}>
        <Button>
          +
        </Button>
        <Button>
        . .
      </Button>
      </div>

    </div>

  );
};
export default Create;
