import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function GridView(props) {
  return (
    <Link to={`/view?id=${props.id}&type=${props.type}`}>
      {props.type === "image" ? (
        <Box p="5px" w={[160, 260, 250, 370]}>
          <div className="contain">
            <Image
              className="grid-img"
              h={[104, 150, 180, 250]}
              w={[155, 250, 250, 360]}
              src={props.largeImg}
            />
            <Flex
              className="overlay"
              direction="column"
              p="4px"
              h={[104, 150, 180, 250]}
              w={[155, 240, 240, 360]}
              justify="center"
            >
              <Text fontSize={{ base: "12px", md: "20px", lg: "20px" }}>
                Uploaded by:{" "}
                <span>
                  <strong>{props.data.user}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "10px", md: "18px", lg: "18px" }}>
                Views:{" "}
                <span>
                  <strong>{props.data.views}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "10px", md: "18px", lg: "18px" }}>
                Likes:{" "}
                <span>
                  <strong>{props.data.likes}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "10px", md: "18px", lg: "18px" }}>
                Tags: <span>{props.data.tags}</span>
              </Text>
            </Flex>{" "}
          </div>
        </Box>
      ) : (
        <Box p="5px">
          <div className="video-contain">
            <video controls className="video-grid">
              <source src={props.data.videos.small.url} />
            </video>
            <Flex
              className="video-overlay"
              direction="column"
              p="4px"
              justify="center"
            >
              <Text fontSize={{ base: "8px", md: "14px", lg: "20px" }}>
                Uploaded by:{" "}
                <span>
                  <strong>{props.data.user}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "6px", md: "12px", lg: "18px" }}>
                Views:{" "}
                <span>
                  <strong>{props.data.views}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "6px", md: "12px", lg: "18px" }}>
                Likes:{" "}
                <span>
                  <strong>{props.data.likes}</strong>
                </span>
              </Text>
              <Text fontSize={{ base: "5px", md: "10px", lg: "16px" }}>
                Tags: <span>{props.data.tags}</span>
              </Text>
            </Flex>
          </div>
        </Box>
      )}
    </Link>
  );
}
