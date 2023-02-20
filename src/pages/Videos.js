import React from "react";
import {
  Text,
  Switch,
  Input,
  Flex,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import Photo from "../compoments/ListView";
import PhotoGrid from "../compoments/GridView";
import InfiniteScroll from "react-infinite-scroll-component";

export default function VideoPage() {
  const [data, setData] = React.useState([]);
  let [page, setPage] = React.useState(2);
  let [search, setSearch] = React.useState(false);
  let getData = async () => {
    let res = await fetch(
      `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_API_KEY}&per_page=21`
    );
    let dataVideo = await res.json();
    console.log(dataVideo);
    setData(dataVideo.hits);
  };
  React.useEffect(() => {
    getData();
  }, []);
  let [view, setView] = React.useState(
    localStorage.getItem("Vview") ? localStorage.getItem("Vview") : "grid"
  );
  let checked = "";
  if (view === "list") {
    checked = true;
  } else {
    checked = false;
  }

  function toggleView() {
    if (view === "list") {
      setView("grid");
      localStorage.setItem("Vview", "grid");
    } else {
      setView("list");
      localStorage.setItem("Vview", "list");
    }
  }

  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  async function handleSubmit() {
    setSearch(true);
    if (value) {
      let res = await fetch(
        `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_API_KEY}&q=${value}`
      );
      let dataPhoto = await res.json();
      setData(dataPhoto.hits);
    }
  }
  function moreData() {
    console.log("hello");
    let getData = async () => {
      let url = `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_API_KEY}&per_page=21&page=${page}`;
      let res = await fetch(
        !search
          ? url
          : `https://pixabay.com/api/videos/?key=${process.env.REACT_APP_API_KEY}&q=${value}&per_page=21&page=${page}`
      );

      let dataPhoto = await res.json();
      setData([...data, ...dataPhoto.hits]);
      setPage(page + 1);
    };
    getData();
  }
  const listElements = data.map((d) => (
    <Photo
      key={d.id}
      id={d.id}
      data={d}
      type={"videos"}
      preview={d.previewURL}
      largeImg={d.videos.tiny}
    />
  ));
  const gridElements = data.map((d) => (
    <PhotoGrid
      key={d.id}
      id={d.id}
      data={d}
      type={"videos"}
      preview={d.previewURL}
      largeImg={d.videos.tiny}
    />
  ));
  if (!data.length) {
    return (
      <Flex w="100%" h="90vh" justify="center" align="center">
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
    <Flex direction="column" align="center" w="100%">
      <br></br>
      <Flex w={[400, 450, 800, 900]} justify="space-evenly">
        <Flex justify="flex-start" w={[250, 420, 650, 750]}>
          <Flex justify="space-around" w={[200, 330, 450, 550]}>
            <Input
              isInvalid
              errorBorderColor="#c4c0c0"
              focusBorderColor="blue.500"
              color="black"
              variant="outline"
              h="4vh"
              w={[135, 200, 350, 330]}
              placeholder="Search Videos"
              value={value}
              onChange={handleChange}
            />
            <button className="butt" onClick={handleSubmit}>
              Search
            </button>
          </Flex>
        </Flex>
        <Flex
          bg="rgb(220, 223, 232)"
          borderRadius="15px"
          justify="space-evenly"
          w="100px"
          align="center"
        >
          <Text
            as="b"
            fontSize="16px"
            color={!!checked ? "#4b4c4f" : "#2237f0"}
          >
            Grid
          </Text>
          <Switch
            defaultChecked={checked}
            onChange={toggleView}
            size="sm"
          ></Switch>
          <Text as="b" fontSize="16px" color={checked ? "#2237f0" : "#4b4c4f"}>
            List
          </Text>
        </Flex>
      </Flex>
      <br></br>
      {view === "grid" ? (
        <InfiniteScroll dataLength={data.length} next={moreData} hasMore={true}>
          {/* <Grid templateColumns='repeat(3 ,1fr)'> */}
          <SimpleGrid columns={[2, 2, 3]}>{gridElements}</SimpleGrid>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll dataLength={data.length} next={moreData} hasMore={true}>
          <Flex direction="column" align="center">
            {listElements}
          </Flex>
        </InfiniteScroll>
      )}
    </Flex>
  );
}
