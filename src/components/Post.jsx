import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

import TimeAgo from "javascript-time-ago";

import es from "javascript-time-ago/locale/es.json";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(es);
TimeAgo.addLocale(en);

import useTheme from "@context/ThemeContext";

const Post = ({
  postId,
  title,
  image,
  location,
  content,
  specie,
  condition,
}) => {
  
  const substrContent =
    content.length > 70 ? content.substr(0, 70) + "..." : content;
  const substrTitle = title.length > 40 ? title.substr(0, 40) + "..." : title;
  const { themeMode } = useTheme();
  return (
    <Card
      variant="outline"
      mb="5"
      mt="5"
      backgroundColor={themeMode === "dark" ? "#1F2E35" : ""}
      color={themeMode === "dark" ? "#ccc" : ""}
      className={`${
        themeMode === "dark"
          ? " hover:shadow-neutral-500 hover:shadow-lg"
          : "hover:shadow-2xl "
      } hover:card__selected transition-all duration-300`}
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Image
          objectFit="cover"
          maxW={{ base: "100%", md: "150px" }}
          src={image}
          alt={title}
        />
       
        <Stack ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} flex="1">
          <CardBody>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">{substrTitle}</Heading>

              <Link
                to={`/posts/location/${location}`}
                className={`${
                  themeMode === "dark"
                    ? "bg-dark-primary hover:bg-a-7"
                    : "bg-color-btn hover:bg-color-btnHover "
                } text-white py-2 px-4 rounded-md transition duration-300 hover:text-white`}
              >
                {location}
              </Link>
            </Flex>
            <Text py="2" mt="3">
              {substrContent}
            </Text>
          </CardBody>
          <CardFooter className="flex justify-between items-center">
            <Link
              to={`/post/${postId}/detail`}
              className={`${
                themeMode === "dark"
                  ? "bg-dark-primary hover:bg-a-7"
                  : "bg-color-btn hover:bg-color-btnHover "
              } text-white py-2 px-4 rounded-md transition duration-300 hover:text-white`}
            >
              Ver más
            </Link>

            <Button
              colorScheme={
                condition === "Perdido"
                  ? "red"
                  : condition === "Adopción"
                  ? "yellow"
                  : "green"
              }
              size="sm"
              hover="none"
            >
              {condition}
            </Button>

            <input type="hidden" name={specie} id={specie} />
          </CardFooter>
        </Stack>
      </Flex>
    </Card>
  );
};

export default Post;
