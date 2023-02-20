import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ListView(props) {
  return (
    <>
      <Link to={`/view?id=${props.id}&type=${props.type}`}>
        <Flex
          bgColor="#d2e9f7"
          w={[300, 450, 900]}
          rounded="xl"
          direction="row"
        >
          {props.type === "image" ? (
            <Image
              className="list-img"
              h={[104, 150, 300]}
              w={[100, 250, 500]}
              src={props.largeImg}
            />
          ) : (
            <video controls className="video">
              <source src={props.data.videos.tiny.url} />
            </video>
          )}
          <Flex direction="column" justify="center" pl="10px">
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
          </Flex>
        </Flex>
      </Link>

      <br></br>
    </>
  );
}
