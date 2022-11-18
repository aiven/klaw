import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { mockTopicGetRequest } from "src/domain/topic/topic-api.msw";
import { getTopics } from "src/domain/topic";
import { TopicApiResponse } from "src/domain/topic/topic-types";
import { Environment } from "src/domain/environment";

function useGetTopics({
  currentPage,
  topicEnv,
  teamName,
}: {
  currentPage: number;
  topicEnv: Environment;
  teamName?: string;
}): UseQueryResult<TopicApiResponse> {
  // everything in useEffect is used to mock the api call
  // and can be removed once the real api is connected
  useEffect(() => {
    const browserEnvWorker = window.msw;

    if (browserEnvWorker) {
      mockTopicGetRequest({ mswInstance: browserEnvWorker });
    }
  }, []);

  return useQuery<TopicApiResponse, Error>({
    queryKey: ["topics", currentPage, topicEnv, teamName],
    queryFn: () => getTopics({ currentPage, topicEnv, teamName }),
    keepPreviousData: true,
  });
}

export { useGetTopics };
