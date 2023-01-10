/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  /** User can authenticate themselves with their username and password */
  "/user/authenticate": {
    /** Exchange username and password to an authentication token. The token can be later used as authentication mechanism for other API endpoints. */
    post: operations["userAuthentication"];
  };
  "/getTopics": {
    get: operations["topicsGet"];
  };
  "/getTopicsOnly": {
    get: operations["topicsGetOnly"];
  };
  "/getTopicTeam": {
    get: operations["topicGetTeam"];
  };
  "/createTopics": {
    post: operations["topicCreate"];
  };
  "/getAdvancedTopicConfigs": {
    get: operations["topicAdvancedConfigGet"];
  };
  "/getAllTeamsSUOnly": {
    get: operations["teamNamesGet"];
  };
  "/getEnvs": {
    get: operations["environmentsGet"];
  };
  "/getEnvsBaseClusterFilteredForTeam": {
    get: operations["envsBaseClusterFilteredForTeamGet"];
  };
  "/getClusterInfoFromEnv": {
    get: operations["clusterInfoFromEnvironmentGet"];
  };
  "/createAcl": {
    post: operations["createAclRequest"];
  };
  "/getSchemaRegEnvs": {
    get: operations["schemaRegEnvsGet"];
  };
  "/uploadSchema": {
    post: operations["schemaUpload"];
  };
};

export type components = {
  schemas: {
    CommonError: {
      /**
       * message
       * @description Description for user why a certain operation failed
       */
      message?: string;
    };
    /** GenericApiResponse */
    GenericApiResponse: {
      /** @enum {string} */
      status?:
        | "100 CONTINUE"
        | "101 SWITCHING_PROTOCOLS"
        | "102 PROCESSING"
        | "103 CHECKPOINT"
        | "200 OK"
        | "201 CREATED"
        | "202 ACCEPTED"
        | "203 NON_AUTHORITATIVE_INFORMATION"
        | "204 NO_CONTENT"
        | "205 RESET_CONTENT"
        | "206 PARTIAL_CONTENT"
        | "207 MULTI_STATUS"
        | "208 ALREADY_REPORTED"
        | "226 IM_USED"
        | "300 MULTIPLE_CHOICES"
        | "301 MOVED_PERMANENTLY"
        | "302 FOUND"
        | "302 MOVED_TEMPORARILY"
        | "303 SEE_OTHER"
        | "304 NOT_MODIFIED"
        | "305 USE_PROXY"
        | "307 TEMPORARY_REDIRECT"
        | "308 PERMANENT_REDIRECT"
        | "400 BAD_REQUEST"
        | "401 UNAUTHORIZED"
        | "402 PAYMENT_REQUIRED"
        | "403 FORBIDDEN"
        | "404 NOT_FOUND"
        | "405 METHOD_NOT_ALLOWED"
        | "406 NOT_ACCEPTABLE"
        | "407 PROXY_AUTHENTICATION_REQUIRED"
        | "408 REQUEST_TIMEOUT"
        | "409 CONFLICT"
        | "410 GONE"
        | "411 LENGTH_REQUIRED"
        | "412 PRECONDITION_FAILED"
        | "413 PAYLOAD_TOO_LARGE"
        | "413 REQUEST_ENTITY_TOO_LARGE"
        | "414 URI_TOO_LONG"
        | "414 REQUEST_URI_TOO_LONG"
        | "415 UNSUPPORTED_MEDIA_TYPE"
        | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
        | "417 EXPECTATION_FAILED"
        | "418 I_AM_A_TEAPOT"
        | "419 INSUFFICIENT_SPACE_ON_RESOURCE"
        | "420 METHOD_FAILURE"
        | "421 DESTINATION_LOCKED"
        | "422 UNPROCESSABLE_ENTITY"
        | "423 LOCKED"
        | "424 FAILED_DEPENDENCY"
        | "425 TOO_EARLY"
        | "426 UPGRADE_REQUIRED"
        | "428 PRECONDITION_REQUIRED"
        | "429 TOO_MANY_REQUESTS"
        | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
        | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
        | "500 INTERNAL_SERVER_ERROR"
        | "501 NOT_IMPLEMENTED"
        | "502 BAD_GATEWAY"
        | "503 SERVICE_UNAVAILABLE"
        | "504 GATEWAY_TIMEOUT"
        | "505 HTTP_VERSION_NOT_SUPPORTED"
        | "506 VARIANT_ALSO_NEGOTIATES"
        | "507 INSUFFICIENT_STORAGE"
        | "508 LOOP_DETECTED"
        | "509 BANDWIDTH_LIMIT_EXCEEDED"
        | "510 NOT_EXTENDED"
        | "511 NETWORK_AUTHENTICATION_REQUIRED";
      /**
       * Timestamp
       * Format: date-time
       * @example 2018-11-13T20:20:39.000Z
       */
      timestamp?: string;
      message?: string;
      debugMessage?: string;
      result?: string;
      data?: { [key: string]: unknown };
    };
    UserAuthenticationRequest: {
      /**
       * username
       * @description Username
       * @example john.doe@klaw-project.io
       */
      username: string;
      /**
       * password
       * @example password123
       */
      password: string;
    };
    UserAuthenticationResponse: {
      /**
       * token
       * @description Klaw authentication token
       * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
       */
      token: string;
      /**
       * Token type
       * @example JWT
       * @enum {string}
       */
      tokenType: "JWT";
    };
    /**
     * Type of request related to topic
     * @example Update
     * @enum {string}
     */
    TopicRequestTypes: "Create" | "Update" | "Delete" | "Claim";
    TopicsGetResponse: components["schemas"]["TopicInfo"][][];
    /**
     * @example [
     *   "myTopic",
     *   "otherTopic"
     * ]
     */
    TopicsGetOnlyResponse: string[];
    /**
     * @example {
     *   "team": "Team A"
     * }
     */
    TopicGetTeamResponse: {
      team: string;
    };
    TopicInfo: {
      /**
       * Topic identifier
       * Format: int32
       * @description This identifier is used in Klaw metadata store to ensure uniquenes.
       * @example 1010
       */
      topicid: number;
      /**
       * Total number of pages
       * @example 1
       */
      totalNoPages: string;
      /**
       * Current page number
       * @example 1
       */
      currentPage: string;
      /**
       * All page numbers
       * @description List of all page numbers
       * @example [
       *   "1"
       * ]
       */
      allPageNos: string[];
      /**
       * Topic name
       * @description Kafka Topic name
       * @example topicName
       */
      topicName: string;
      /**
       * Number of partitions
       * Format: int32
       * @description Topic partition count
       * @example 10
       */
      noOfPartitions: number;
      /**
       * Description
       * @description Kafka topic description stored in Klaw metadata.
       * @example Main PostgreSQL change data capture stream
       */
      description: string;
      /**
       * Documentation
       * @deprecated
       */
      documentation: string | null;
      /**
       * Number of replicas
       * @description Topic replica count
       * @example 2
       */
      noOfReplicas?: string;
      /**
       * Sequence
       * @deprecated
       */
      sequence?: string;
      /**
       * Team name
       * @description Topic owner team name
       * @example application-X-developers
       */
      teamname: string;
      /**
       * cluster
       * @deprecated
       * @example 1
       */
      cluster: string;
      /**
       * Cluster identifier
       * @deprecated
       */
      clusterId: string | null;
      /**
       * Environments list
       * @description List of environments where the topic is present.
       * @example [
       *   "DEV",
       *   "TEST"
       * ]
       */
      environmentsList: string[];
      /**
       * Show edit topic
       * @description Describes if the user should see topic edit action.
       * @example false
       */
      showEditTopic: boolean;
      /**
       * Show delete topic
       * @description Describes if the user should see topic delete action.
       * @example true
       */
      showDeleteTopic: boolean;
      /**
       * Topic deletable
       * @description Describes if the topic can be deleted.
       * @example true
       */
      topicDeletable: boolean;
    } & {
      noOfReplcias: unknown;
    };
    /**
     * @example [
     *   "All teams",
     *   "Team A",
     *   "Team B"
     * ]
     */
    TeamNamesGetResponse: string[];
    Environment: {
      /**
       * id
       * @description Environment identifier
       * @example 1
       */
      id: string;
      /**
       * Name
       * @description Environment name
       * @example DEV
       */
      name: string;
      /**
       * Type
       * @description Environment type
       * @enum {string}
       */
      type: "kafka" | "kafkaconnect" | "schema";
      /**
       * TenantId
       * @description Tenant identifier
       * @example 101
       */
      tenantId: number;
      /**
       * Topic prefix
       * @description Topic name prefix
       * @example test-
       */
      topicprefix: string | null;
      /**
       * Topic suffix
       * @description Topic name suffix
       * @example -test
       */
      topicsuffix: string | null;
      /**
       * Cluster identifier
       * @example 1
       */
      clusterId: number;
      /**
       * Tenant name
       * @example default
       */
      tenantName: string;
      /**
       * Cluster name
       * @example DEV
       */
      clusterName: string;
      /**
       * Environment status
       * @example ONLINE
       * @enum {string}
       */
      envStatus: "ONLINE" | "OFFLINE";
      /**
       * Other parameters
       * @description Topic configuration parameters
       * @example default.partitions=2,max.partitions=2,default.replication.factor=1,max.replication.factor=1,topic.prefix=,topic.suffix
       */
      otherParams: string;
      /**
       * Default partitions
       * @example 1
       */
      defaultPartitions: string | null;
      /**
       * Maximum partitions
       * @example 2
       */
      maxPartitions: string | null;
      /**
       * Default replication factor
       * @example 1
       */
      defaultReplicationFactor: string | null;
      /**
       * Maximum replication factor
       * @example 2
       */
      maxReplicationFactor: string | null;
      /**
       * Show delete environment
       * @description Describes if the user should see environment delete action.
       * @example true
       */
      showDeleteEnv: boolean;
      /**
       * Total number of pages
       * @example 1
       */
      totalNoPages: string;
      /**
       * All page numbers
       * @description List of all page numbers
       * @example [
       *   "1"
       * ]
       */
      allPageNos: string[];
    };
    /**
     * TopicAdvancedConfigGetResponse
     * @example {
     *   "CLEANUP_POLICY": "cleanup.policy",
     *   "COMPRESSION_TYPE": "compression.type",
     *   "DELETE_RETENTION_MS": "delete.retention.ms",
     *   "FILE_DELETE_DELAY_MS": "file.delete.delay.ms",
     *   "FLUSH_MESSAGES": "flush.messages",
     *   "FLUSH_MS": "flush.ms",
     *   "FOLLOWER_REPLICATION_THROTTLED_REPLICAS": "follower.replication.throttled.replicas",
     *   "INDEX_INTERVAL_BYTES": "index.interval.bytes",
     *   "LEADER_REPLICATION_THROTTLED_REPLICAS": "leader.replication.throttled.replicas",
     *   "MAX_COMPACTION_LAG_MS": "max.compaction.lag.ms",
     *   "MAX_MESSAGE_BYTES": "max.message.bytes",
     *   "MESSAGE_DOWNCONVERSION_ENABLE": "message.downconversion.enable",
     *   "MESSAGE_FORMAT_VERSION": "message.format.version",
     *   "MESSAGE_TIMESTAMP_DIFFERENCE_MAX_MS": "message.timestamp.difference.max.ms",
     *   "MESSAGE_TIMESTAMP_TYPE": "message.timestamp.type",
     *   "MIN_CLEANABLE_DIRTY_RATIO": "min.cleanable.dirty.ratio",
     *   "MIN_COMPACTION_LAG_MS": "min.compaction.lag.ms",
     *   "MIN_INSYNC_REPLICAS": "min.insync.replicas",
     *   "PREALLOCATE": "preallocate",
     *   "RETENTION_BYTES": "retention.bytes",
     *   "RETENTION_MS": "retention.ms",
     *   "SEGMENT_BYTES": "segment.bytes",
     *   "SEGMENT_INDEX_BYTES": "segment.index.bytes",
     *   "SEGMENT_JITTER_MS": "segment.jitter.ms",
     *   "SEGMENT_MS": "segment.ms",
     *   "UNCLEAN_LEADER_ELECTION_ENABLE": "unclean.leader.election.enable"
     * }
     */
    topicAdvancedConfigGetResponse: { [key: string]: string };
    /**
     * @description Flavor of Kafka cluster (Aiven or other)
     * @example {
     *   "aivenCluster": "false"
     * }
     */
    environmentGetClusterInfoResponse: {
      /** @enum {string} */
      aivenCluster: "true" | "false";
    };
    /**
     * Status of a request
     * @example created
     * @enum {string}
     */
    RequestStatus: "created" | "deleted" | "declined" | "approved";
    /** TopicCreateRequest */
    topicCreateRequest: {
      /**
       * Topic name
       * @description Kafka Topic name
       * @example topicName
       */
      topicname: string;
      environment: string;
      /** Format: int32 */
      topicpartitions: number;
      /**
       * Team name
       * @example Marketing
       */
      teamname: string;
      /**
       * Remarks
       * @description Message for the approval
       */
      remarks?: string;
      /** Description */
      description: string;
      /**
       * Replication factor
       * @example 1
       */
      replicationfactor: string;
      /**
       * Environment name
       * @example DEV
       */
      environmentName?: string;
      /**
       * Topic identifier
       * Format: int32
       * @description This identifier is used in Klaw metadata store to ensure uniquenes.
       * @example 1010
       */
      topicid?: number;
      advancedTopicConfigEntries?: {
        configKey?: string;
        configValue?: string;
      }[];
      /** App name */
      appname?: string;
      /**
       * Topic type
       * @enum {string}
       */
      topictype?: "Create" | "Update" | "Delete" | "Claim";
      /** Requestor */
      requestor?: string;
      /**
       * Request time
       * Format: date-time
       * @example 2018-11-13T20:20:39.000Z
       */
      requesttime?: string;
      /** Request time string */
      requesttimestring?: string;
      topicstatus?: components["schemas"]["RequestStatus"];
      /**
       * Approver
       * @example jon.snow@klaw-project.io
       */
      approver?: string;
      /**
       * Approving time
       * Format: date-time
       * @example 2018-11-13T20:20:39.000Z
       */
      approvingtime?: string;
      /**
       * Sequence
       * @deprecated
       */
      sequence?: string;
      /**
       * Username
       * @example jon.snow@klaw-project.io
       */
      username?: string;
      /**
       * Total number of pages
       * @example 1
       */
      totalNoPages?: string;
      approvingTeamDetails?: string;
      otherParams?: string;
      /**
       * Team identifier
       * Format: int32
       * @example 1010
       */
      teamId?: number;
      /**
       * All page numbers
       * @description List of all page numbers
       * @example [
       *   "1"
       * ]
       */
      allPageNos?: string[];
      /** Possible teams */
      possibleTeams?: string[];
      /**
       * Current page number
       * @example 1
       */
      currentPage?: string;
    };
    aclRequest: {
      /**
       * @description A comment on the request for the approver.
       * @example Hello, thank you.
       */
      remarks?: string;
      /**
       * @description This is mandatory if topictype is consumer
       * @example Group-one
       */
      consumergroup?: string;
      /**
       * @example [
       *   "35.239.43.144",
       *   "35.239.43.145"
       * ]
       */
      acl_ip?: string[];
      /**
       * @example [
       *   "username",
       *   "username-two"
       * ]
       */
      acl_ssl?: string[];
      /**
       * @description If topictype is consumer, this field can only be LITERAL. If topictype is producer, this field can be LITERAL or PREFIXED
       * @example LITERAL
       * @enum {string}
       */
      aclPatternType: "LITERAL" | "PREFIXED";
      /**
       * @description Only available if aclPatternType is LITERAL
       * @example id-123
       */
      transactionalId?: string;
      /**
       * unique identifier
       * Format: int32
       * @example 100
       */
      req_no?: number;
      /**
       * @description Only topics available in chosen environment are allowed
       * @example myTopic
       */
      topicname: string;
      /**
       * @description ID of environment
       * @example 1
       */
      environment: string;
      /**
       * @description Name of environment
       * @example DEV
       */
      environmentName?: string;
      /** @example Ospo */
      teamname: string;
      /**
       * Format: int32
       * @example 1
       */
      teamId?: number;
      /**
       * Format: int32
       * @example 1
       */
      requestingteam?: number;
      /** @example App */
      appname?: string;
      /**
       * @example Producer
       * @enum {string}
       */
      topictype: "Producer" | "Consumer";
      /** @example User */
      username?: string;
      /**
       * Format: date-time
       * @example 2018-03-20T09:12:28Z
       */
      requesttime?: string;
      /** @example 10-11-2020 10:45:30 */
      requesttimestring?: string;
      /**
       * @example created
       * @enum {string}
       */
      aclstatus?: "created" | "approved" | "denied" | "deleted";
      approver?: string;
      /**
       * Format: date-time
       * @example 2018-03-20T09:12:28Z
       */
      approvingtime?: string;
      /**
       * @example Producer
       * @enum {string}
       */
      aclType?: "Producer" | "Consumer";
      /**
       * @example PRINCIPAL
       * @enum {string}
       */
      aclIpPrincipleType: "IP_ADDRESS" | "PRINCIPAL" | "USERNAME";
      /**
       * @description Other possible values GROUP, CLUSTER
       * @example TOPIC
       */
      aclResourceType?: string;
      /** @example 1 */
      currentPage?: string;
      otherParams?: string;
      /** @example 10 */
      totalNoPages?: string;
      /**
       * @example [
       *   "1",
       *   "2"
       * ]
       */
      allPageNos?: string[];
      /** @example DevRel */
      approvingTeamDetails?: string;
    };
    /** SchemaRequest */
    SchemaRequest: {
      /**
       * unique identifier
       * Format: int32
       */
      req_no?: number;
      /**
       * Topic name
       * @description Kafka Topic name
       * @example testtopic
       */
      topicname?: string;
      /**
       * environment
       * @description Id of the environment
       * @example 3
       */
      environment?: string;
      /**
       * environmentName
       * @description Name of the environment
       * @example DEV
       */
      environmentName?: string;
      /**
       * schemaversion
       * @description SchemaRequest version
       * @example 1.0
       */
      schemaversion?: string;
      /**
       * Team name
       * @description Topic owner team name
       * @example Infra
       */
      teamname?: string;
      /**
       * Team ID
       * Format: int32
       * @description Team identifier
       * @example 1010
       */
      teamId?: number;
      /**
       * App name
       * @example App
       */
      appname?: string;
      /**
       * schemafull
       * @description A valid json/avro schema
       * @example {
       *   "doc": "exampleTopic",
       *   "fields": [
       *     {
       *       "default": "123456",
       *        "doc": "test",
       *       "name": "test",
       *       "namespace": "test",
       *       "type": "string"
       *  }
       *   ],
       *   "name": "exampleTopic",
       *   "namespace": "exampleTopic",
       *   "type": "record"
       * }
       */
      schemafull: string;
      /**
       * username
       * @description Username
       * @example jon.snow@klaw-project.io
       */
      username?: string;
      /**
       * Request time
       * Format: date-time
       * @example 2018-11-13T20:20:39.000Z
       */
      requesttime?: string;
      /**
       * Request time string representation
       * @example 28-Dec-2022 14:54:57
       */
      requesttimestring?: string;
      topicstatus?: components["schemas"]["RequestStatus"];
      requesttype?: components["schemas"]["TopicRequestTypes"];
      /**
       * Remarks
       * @description SchemaRequest specific comment
       * @example Please approve
       */
      remarks?: string;
      /** Approver */
      approver?: string;
      /**
       * Approving time
       * Format: date-time
       * @example 2022-11-13T20:20:39.000Z
       */
      approvingtime?: string;
      /**
       * Approving team details
       * @example Team : Stark, Users : jonsnow,sansastark,aryastark,branstark
       */
      approvingTeamDetails?: string;
      /**
       * Total number of pages
       * @example 3
       */
      totalNoPages?: string;
      /**
       * All page numbers
       * @description List of all page numbers
       * @example [
       *   "1",
       *   "2",
       *   "3"
       * ]
       */
      allPageNos?: string[];
      /**
       * Current page number
       * @example 2
       */
      currentPage?: string;
    };
  };
};

export type operations = {
  /** Exchange username and password to an authentication token. The token can be later used as authentication mechanism for other API endpoints. */
  userAuthentication: {
    responses: {
      /** Successful authentication */
      200: {
        content: {
          "application/json": components["schemas"]["UserAuthenticationResponse"];
        };
      };
      /** Invalid credentials */
      403: {
        content: {
          "application/json": components["schemas"]["CommonError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserAuthenticationRequest"];
      };
    };
  };
  topicsGet: {
    parameters: {
      query: {
        /** The value should be either an environment identifier or "ALL". */
        env: string;
        pageNo: string;
        currentPage?: string;
        topicnamesearch?: string;
        teamName?: string;
        topicType?: "Producer" | "Consumer";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TopicsGetResponse"];
        };
      };
    };
  };
  topicsGetOnly: {
    parameters: {
      query: {
        /** Set to true to only get the topic names for topics belonging to the team of the current user */
        isMyTeamTopics?: components["schemas"]["TopicsGetOnlyResponse"];
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": string[];
        };
      };
    };
  };
  topicGetTeam: {
    parameters: {
      query: {
        /** The name of the topic */
        topicName: string;
        /** The pattern type of the topic */
        patternType?: "LITERAL" | "PREFIXED";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TopicGetTeamResponse"];
        };
      };
    };
  };
  topicCreate: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["GenericApiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["topicCreateRequest"];
      };
    };
  };
  topicAdvancedConfigGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["topicAdvancedConfigGetResponse"];
        };
      };
    };
  };
  teamNamesGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TeamNamesGetResponse"];
        };
      };
    };
  };
  environmentsGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["Environment"][];
        };
      };
    };
  };
  envsBaseClusterFilteredForTeamGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["Environment"][];
        };
      };
    };
  };
  clusterInfoFromEnvironmentGet: {
    parameters: {
      query: {
        /** The environment for which to get the cluster info */
        envSelected: string;
        /** The type of  environment for which to get the cluster info */
        envType: "kafka" | "kafkaconnect" | "schema";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["environmentGetClusterInfoResponse"];
        };
      };
    };
  };
  createAclRequest: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["GenericApiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["aclRequest"];
      };
    };
  };
  schemaRegEnvsGet: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["Environment"][];
        };
      };
    };
  };
  schemaUpload: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["GenericApiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SchemaRequest"];
      };
    };
  };
};

export type external = {};

export enum ApiPaths {
  userAuthentication = "/user/authenticate",
  topicsGet = "/getTopics",
  topicsGetOnly = "/getTopicsOnly",
  topicGetTeam = "/getTopicTeam",
  topicCreate = "/createTopics",
  topicAdvancedConfigGet = "/getAdvancedTopicConfigs",
  teamNamesGet = "/getAllTeamsSUOnly",
  environmentsGet = "/getEnvs",
  envsBaseClusterFilteredForTeamGet = "/getEnvsBaseClusterFilteredForTeam",
  clusterInfoFromEnvironmentGet = "/getClusterInfoFromEnv",
  createAclRequest = "/createAcl",
  schemaRegEnvsGet = "/getSchemaRegEnvs",
  schemaUpload = "/uploadSchema",
}
