import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Spinner, Box, Text, Flex, Image, Button } from "@chakra-ui/react";

export default function View() {
  const [single, setSingle] = React.useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  let url = "";
  if (type === "image") {
    url = `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&id=${id}`;
  } else {
    url = `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_API_KEY}&id=${id}`;
  }

  let data = async () => {
    let res = await fetch(url);
    let result = await res.json();
    console.log("res", result);
    setSingle(result.hits[0]);
  };
  useEffect(() => {
    data();
  }, []);

  console.log(single);
  if (!Object.keys(single).length) {
    return (
      <Flex w="100%" h="100vh" justify="center" align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <Box>
      <Link to="/">
        <Button className="back" colorScheme="blue" size="sm">
          Back
        </Button>
      </Link>
      <Flex direction="column" p={[2, 10, 20]} justify="center">
        <Flex w="100%" justify="center">
          {type === "image" ? (
            <Image
              className="view-image"
              borderRadius="9px"
              src={single.largeImageURL}
            />
          ) : (
            <video controls className="video-view">
              <source src={single.videos.medium.url} />
            </video>
          )}
        </Flex>

        <Flex direction="column" align="center" justify="center" p="4px">
          <Text fontSize={{ base: "16px", md: "20px", lg: "20px" }}>
            Uploaded by:{" "}
            <span>
              <strong>{single.user}</strong>
            </span>
          </Text>
          <Text fontSize={{ base: "12px", md: "18px", lg: "18px" }}>
            Views:{" "}
            <span>
              <strong>{single.views}</strong>
            </span>
          </Text>
          <Text fontSize={{ base: "12px", md: "18px", lg: "18px" }}>
            Likes:{" "}
            <span>
              <strong>{single.likes}</strong>
            </span>
          </Text>
          <Text fontSize={{ base: "12px", md: "18px", lg: "18px" }}>
            Tags: <span>{single.tags}</span>
          </Text>
          <Text fontSize={{ base: "12px", md: "18px", lg: "18px" }}>
            Resolution:{" "}
            <span>
              {type === "image"
                ? single.imageHeight
                : single.videos.medium.height}
              *
              {type === "image"
                ? single.imageWidth
                : single.videos.medium.width}
            </span>
          </Text>
          <Text fontSize={{ base: "12px", md: "18px", lg: "18px" }}>
            Downloads: <span>{single.downloads}</span>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
