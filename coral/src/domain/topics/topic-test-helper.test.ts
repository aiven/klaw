import {
  createMockTopic,
  createMockTopicApiResponse,
} from "src/domain/topics/topic-test-helper";

const defaultGeneratedMockTopic = {
  topicid: expect.any(Number),
  sequence: expect.any(String),
  totalNoPages: "1",
  currentPage: "1",
  allPageNos: expect.arrayContaining([expect.any(String)]),
  topicName: expect.any(String),
  noOfPartitions: expect.any(Number),
  description: expect.any(String),
  documentation: null,
  noOfReplcias: expect.any(String),
  teamname: expect.any(String),
  cluster: expect.any(String),
  clusterId: null,
  environmentsList: expect.arrayContaining([expect.any(String)]),
  showEditTopic: false,
  showDeleteTopic: false,
  topicDeletable: false,
};

describe("topic-test-helper.ts", () => {
  describe("createMockTopic", () => {
    it("creates a topic mock with a autogenerated name", () => {
      expect(createMockTopic({})).toMatchObject(defaultGeneratedMockTopic);
    });

    it("creates a topic mock with a given name", () => {
      const testName = "My topic name";
      const result = {
        ...defaultGeneratedMockTopic,
        topicName: testName,
      };

      expect(createMockTopic({ topicName: testName })).toMatchObject(result);
    });
  });

  describe("createMockTopicApiResponse", () => {
    it("creates a mocked api response for topics with 2 entries", () => {
      const result = [
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
      ];

      expect(createMockTopicApiResponse({ entries: 2 })).toEqual(result);
    });

    it("creates a mocked api response for topics with 2 entries, 10 total pages", () => {
      const result = [
        [
          expect.objectContaining({
            ...defaultGeneratedMockTopic,
            totalNoPages: "10",
          }),
          expect.objectContaining({
            ...defaultGeneratedMockTopic,
            totalNoPages: "10",
          }),
        ],
      ];

      expect(
        createMockTopicApiResponse({ entries: 2, totalPages: 10 })
      ).toEqual(result);
    });

    it("creates a mocked api response for topics with 2 entries, 3 total pages and 2 as current page", () => {
      const result = [
        [
          expect.objectContaining({
            ...defaultGeneratedMockTopic,
            totalNoPages: "3",
            currentPage: "2",
          }),
          expect.objectContaining({
            ...defaultGeneratedMockTopic,
            totalNoPages: "3",
            currentPage: "2",
          }),
        ],
      ];

      expect(
        createMockTopicApiResponse({
          entries: 2,
          totalPages: 3,
          currentPage: 2,
        })
      ).toEqual(result);
    });

    it("creates a mocked api response for topics with 3 entries", () => {
      const result = [
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
      ];

      expect(createMockTopicApiResponse({ entries: 3 })).toEqual(result);
    });

    it("creates a mocked api response for topics with 4 entries", () => {
      const result = [
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
        [expect.objectContaining(defaultGeneratedMockTopic)],
      ];

      expect(createMockTopicApiResponse({ entries: 4 })).toEqual(result);
    });

    it("creates a mocked api response for topics with 6 entries", () => {
      const result = [
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
      ];

      expect(createMockTopicApiResponse({ entries: 6 })).toEqual(result);
    });

    it("creates a mocked api response for topics with 10 entries", () => {
      const result = [
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
        [
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
          expect.objectContaining(defaultGeneratedMockTopic),
        ],
        [expect.objectContaining(defaultGeneratedMockTopic)],
      ];

      expect(createMockTopicApiResponse({ entries: 10 })).toEqual(result);
    });
  });
});
