import axios from "axios";

/**
 *  GET Link
 *
 * @returns data:MUser
 */
export const getLink = async (url: string) => {
  try {
    const link = `https://api.shrtco.de/v2/shorten?url=${url}`;
    const response = await axios.get(link, {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("fetch error : ", error);
  }
};
