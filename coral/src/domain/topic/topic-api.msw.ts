import { rest } from "msw";
import { MswInstance } from "src/services/api-mocks/types";
import { transformTopicApiResponse } from "src/domain/topic/topic-transformer";
import {
  createMockTopic,
  createMockTopicApiResponse,
} from "src/domain/topic/topic-test-helper";
import { getHTTPBaseAPIUrl } from "src/config";
import { KlawApiResponse } from "types/utils";
import { TopicTeam, TopicNames } from "src/domain/topic";

type MockedResponse = {
  status?: number;
  data: KlawApiResponse<"topicsGet"> | { message: string };
};

type MockTopicGetRequestArgs =
  | {
      mswInstance: MswInstance;
      response: MockedResponse;
    }
  | {
      mswInstance: MswInstance;
      responses: MockedResponse[];
    };

function mockTopicGetRequest({
  mswInstance,
  ...responseOrResponses
}: MockTopicGetRequestArgs) {
  const base = getHTTPBaseAPIUrl();
  const responses =
    "responses" in responseOrResponses
      ? responseOrResponses.responses
      : [responseOrResponses.response];

  const handlers = responses.map((response) => {
    return rest.get(`${base}/getTopics`, (_, res, ctx) => {
      return res.once(
        ctx.status(response.status ?? 200),
        ctx.json(response.data)
      );
    });
  });

  mswInstance.use(...handlers);
}

const mockedResponseSinglePage: KlawApiResponse<"topicsGet"> =
  createMockTopicApiResponse({
    entries: 10,
  });

const mockedResponseMultiplePage: KlawApiResponse<"topicsGet"> =
  createMockTopicApiResponse({
    entries: 2,
    totalPages: 4,
    currentPage: 2,
  });

const mockedResponseMultiplePageTransformed = transformTopicApiResponse(
  mockedResponseMultiplePage
);

const mockedResponseTopicEnv: KlawApiResponse<"topicsGet"> = [
  [
    createMockTopic({
      topicName: "Topic 1",
      topicId: 1,
      environmentsList: ["DEV"],
    }),
    createMockTopic({
      topicName: "Topic 2",
      topicId: 2,
      environmentsList: ["DEV"],
    }),
    createMockTopic({
      topicName: "Topic 3",
      topicId: 3,
      environmentsList: ["DEV"],
    }),
  ],
];

// This mirrors the formatting formation used in the api call
// for usage in tests that use the mock API
const mockedResponseTransformed = transformTopicApiResponse(
  mockedResponseSinglePage
);

interface MockGetTopicNamesRequestArgs {
  mswInstance: MswInstance;
  response: TopicNames;
  isMyTeamTopics?: boolean;
}

function mockGetTopicNames({
  mswInstance,
  response,
  isMyTeamTopics = false,
}: MockGetTopicNamesRequestArgs) {
  const base = getHTTPBaseAPIUrl();
  const params = new URLSearchParams({
    isMyTeamTopics: isMyTeamTopics.toString(),
  });

  const handler = rest.get(`${base}/getTopicsOnly?${params}`, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(response));
  });

  mswInstance.use(handler);
}

const mockedResponseTopicNames: KlawApiResponse<"topicsGetOnly"> = [
  "aivtopic1",
  "topic-two",
  "topic-myteam",
];

const mockedResponseTopicNamesMyTeamOnly: KlawApiResponse<"topicsGetOnly"> = [
  "topic-myteam",
];

interface MockGetTopicTeamRequestArgs {
  mswInstance: MswInstance;
  response: TopicTeam;
  topicName: string;
  patternType?: "LITERAL" | "PREFIXED";
}

function mockGetTopicTeam({
  mswInstance,
  response,
  topicName,
  patternType = "LITERAL",
}: MockGetTopicTeamRequestArgs) {
  const base = getHTTPBaseAPIUrl();
  const params = new URLSearchParams({ topicName, patternType });

  const handler = rest.get(`${base}/getTopicTeam?${params}`, (_, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(response));
  });

  mswInstance.use(handler);
}

const mockedResponseTopicTeamLiteral: KlawApiResponse<"topicGetTeam"> = {
  team: "Ospo",
};
const mockedResponseTopicTeamPrefixed: KlawApiResponse<"topicGetTeam"> = {
  team: "prefixed-Ospo",
};

export {
  mockTopicGetRequest,
  mockedResponseTransformed,
  mockedResponseMultiplePageTransformed,
  mockedResponseSinglePage,
  mockedResponseMultiplePage,
  mockedResponseTopicEnv,
  mockGetTopicNames,
  mockedResponseTopicNames,
  mockedResponseTopicNamesMyTeamOnly,
  mockGetTopicTeam,
  mockedResponseTopicTeamLiteral,
  mockedResponseTopicTeamPrefixed,
};
