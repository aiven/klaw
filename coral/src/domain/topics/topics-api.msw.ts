import { rest } from "msw";
import { MswInstance } from "src/services/api-mocks/types";
import { TopicDTOApiResponse } from "src/domain/topics/topics-types";
import { transformTopicApiResponse } from "src/domain/topics/topic-transformer";

function mockTopicGetRequest({
  mswInstance,
  scenario,
}: {
  mswInstance: MswInstance;
  scenario?: "error" | "empty";
}) {
  mswInstance.use(
    rest.get("getTopics", async (req, res, ctx) => {
      // error path
      if (scenario === "error") {
        return res(ctx.status(400), ctx.json(""));
      }
      // response empty
      else if (scenario === "empty") {
        return res(ctx.status(200), ctx.json([]));
      }
      // success part
      return res(ctx.status(200), ctx.json(mockedResponse));
    })
  );
}

const mockedResponse: TopicDTOApiResponse = [
  [
    {
      topicid: 1010,
      sequence: "338",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "aivtopic1",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV", "TST"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1011,
      sequence: "339",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "aivtopic2",
      noOfPartitions: 2,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1015,
      sequence: "340",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "aivtopic3",
      noOfPartitions: 1,
      description: "test topic",
      documentation: null,
      noOfReplcias: "1",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
  ],
  [
    {
      topicid: 1012,
      sequence: "341",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "demotopic1",
      noOfPartitions: 2,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "DevRel",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1008,
      sequence: "342",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "newaudittopic",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV", "TST"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1002,
      sequence: "343",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "testospo2",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
  ],
  [
    {
      topicid: 1003,
      sequence: "344",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "testtopic",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "DevRel",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1004,
      sequence: "345",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "testtopic1",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
    {
      topicid: 1005,
      sequence: "346",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "testtopic2",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "DevRel",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
  ],
  [
    {
      topicid: 1006,
      sequence: "347",
      totalNoPages: "1",
      currentPage: "1",
      allPageNos: ["1"],
      topicName: "uptimetopic",
      noOfPartitions: 1,
      description: "Topic description",
      documentation: null,
      noOfReplcias: "2",
      teamname: "Ospo",
      cluster: "1",
      clusterId: null,
      environmentsList: ["DEV"],
      showEditTopic: false,
      showDeleteTopic: false,
      topicDeletable: false,
    },
  ],
];

// This mirrors the formatting formation used in the api call
// for usage in tests that use the mock API
const mockedResponseTransformed = transformTopicApiResponse(mockedResponse);

export { mockTopicGetRequest, mockedResponseTransformed };
