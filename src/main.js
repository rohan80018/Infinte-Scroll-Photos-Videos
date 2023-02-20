import { Flex } from "@chakra-ui/react";
import React from "react";
import PhotosPage from "./pages/Photos";
import VideoPage from "./pages/Videos";

export default function Main({ mode, toggler }) {
  return (
    <Flex direction="column" w="100%" justify="center" align="center">
      <Flex w="100%" h="6vh" align="center" justify="space-evenly">
        <button
          className={mode === "photos" ? "mode active" : "mode"}
          onClick={() => toggler("photos")}
        >
          Photos
        </button>

        <button
          className={mode !== "photos" ? "mode active" : "mode"}
          onClick={() => toggler("videos")}
        >
          Videos
        </button>
      </Flex>
      <Flex w="100%" align="center" direction="column">
        {mode === "photos" ? <PhotosPage /> : <VideoPage />}
      </Flex>
    </Flex>
  );
}
