import { useGetTopics } from "src/app/features/browse-topics/hooks/topic-list/useGetTopics";
import { Pagination } from "src/app/components/Pagination";
import SelectTeam from "src/app/features/browse-topics/components/select-team/SelectTeam";
import TopicTable from "src/app/features/browse-topics/components/topic-table/TopicTable";
import { useState } from "react";
import { Flexbox, FlexboxItem } from "@aivenio/aquarium";
import { useSearchParams } from "react-router-dom";
import SelectEnvironment from "src/app/features/browse-topics/components/select-environment/SelectEnvironment";
import { SearchTopics } from "src/app/features/browse-topics/components/search/SearchTopics";
import { Team, TEAM_NOT_INITIALIZED } from "src/domain/team";
import { ENVIRONMENT_NOT_INITIALIZED } from "src/domain/environment/environment-types";

function BrowseTopics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [teamName, setTeamName] = useState<Team>(TEAM_NOT_INITIALIZED);
  const [environment, setEnvironment] = useState(ENVIRONMENT_NOT_INITIALIZED);

  const initialPage = searchParams.get("page");
  const initialSearchTerm = searchParams.get("search");
  const [page, setPage] = useState(Number(initialPage) || 1);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm || "");

  const {
    data: topics,
    isLoading,
    isError,
    isPreviousData,
  } = useGetTopics({
    currentPage: page,
    environment,
    teamName,
    ...(searchTerm && { searchTerm: searchTerm }),
  });

  const hasTopics = topics && topics.entries.length > 0;
  const hasMultiplePages = topics && topics.totalPages > 1;

  return (
    <>
      <Flexbox direction={"column"} gap={"l1"}>
        <Flexbox justifyContent={"end"} colGap={"l1"} maxWidth={"6xl"}>
          <FlexboxItem alignSelf={"center"}>
            <SearchTopics onChange={searchTopics} value={searchTerm} />
          </FlexboxItem>
        </Flexbox>
        <Flexbox direction={"row"} colGap={"l1"} maxWidth={"6xl"}>
          <FlexboxItem grow={1}>
            <SelectTeam onChange={setTeamName} />
          </FlexboxItem>
          <FlexboxItem grow={1}>
            <SelectEnvironment onChange={setEnvironment} />
          </FlexboxItem>
        </Flexbox>
        <Flexbox direction={"column"} alignItems={"center"} rowGap={"l4"}>
          {isPreviousData && <div>Filtering list...</div>}
          {isLoading && <div>Loading...</div>}
          {isError && <div>Something went wrong 😔</div>}

          {!isLoading && !hasTopics && <div>No topics found</div>}
          {hasTopics && (
            <TopicTable
              topics={topics.entries}
              activePage={topics.currentPage}
              totalPages={topics.totalPages}
            />
          )}

          {hasMultiplePages && (
            <Pagination
              activePage={topics.currentPage}
              totalPages={topics.totalPages}
              setActivePage={changePage}
            />
          )}
        </Flexbox>
      </Flexbox>
    </>
  );

  function searchTopics(newSearchTerm: string) {
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length === 0) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", newSearchTerm);
    }

    setSearchParams(searchParams);
  }

  function changePage(activePage: number) {
    setPage(activePage);
    searchParams.set("page", activePage.toString());
    setSearchParams(searchParams);
  }
}

export default BrowseTopics;
