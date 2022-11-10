import { Topic, TopicDTOApiResponse } from "src/domain/topics/topics-types";
import { transformTopicApiResponse } from "src/domain/topics/topic-transformer";

const getTopics = async (): Promise<Topic[]> => {
  return fetch("/getTopics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const test: TopicDTOApiResponse = await response.json();
    return transformTopicApiResponse(test);
  });
};

export { getTopics };
