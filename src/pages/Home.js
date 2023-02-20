import Main from "../main";
import React from "react";
import { Flex } from "@chakra-ui/react";
import "../App.css";

function Home() {
  let change = React.useState(localStorage.getItem("switch"));

  const [state, setState] = React.useState(
    localStorage.getItem("change") ? localStorage.getItem("change") : "photos"
  );
  console.log(change);

  function toggle(buttValue) {
    window.location.reload();
    if (buttValue !== state) {
      if (state === "photos") {
        setState("videos");
        localStorage.setItem("change", "videos");
      } else {
        setState("photos");
        localStorage.setItem("change", "photos");
      }
    }
  }
  console.log(state);
  // 210, 225, 250 #202124
  return (
    <Flex justify="center" w="100%" bgColor="210, 225, 250">
      <Main mode={state} toggler={toggle} />
    </Flex>
  );
}

export default Home;
