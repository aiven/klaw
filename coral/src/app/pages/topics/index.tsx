import { PageHeader } from "@aivenio/aquarium";
import add from "@aivenio/aquarium/dist/src/icons/add";
import { useNavigate } from "react-router-dom";
import AuthenticationRequiredBoundary from "src/app/components/AuthenticationRequiredBoundary";
import PreviewBanner from "src/app/components/PreviewBanner";
import BrowseTopics from "src/app/features/topics/browse/BrowseTopics";
import useFeatureFlag, { FeatureFlag } from "src/app/hooks/useFeatureFlag";
import Layout from "src/app/layout/Layout";

const Topics = () => {
  const navigate = useNavigate();
  const topicRequestEnabled = useFeatureFlag(FeatureFlag.TOPIC_REQUEST);
  return (
    <AuthenticationRequiredBoundary>
      <Layout>
        <PreviewBanner linkTarget={"/browseTopics"} />
        <PageHeader
          title={"All topics"}
          primaryAction={{
            text: "Request new topic",
            onClick: () =>
              topicRequestEnabled
                ? navigate("/topics/request")
                : (window.location.href = "/requestTopics"),
            icon: add,
          }}
        />
        <BrowseTopics />
      </Layout>
    </AuthenticationRequiredBoundary>
  );
};

export default Topics;
