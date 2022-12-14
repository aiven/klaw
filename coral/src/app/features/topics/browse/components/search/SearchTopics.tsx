import { Grid, Icon, InputBase, PrimaryButton } from "@aivenio/aquarium";
import { FormEvent, useState } from "react";
import searchItem from "@aivenio/aquarium/dist/module/icons/search";

type SearchTopicsProps = {
  value: string;
  onChange: (searchTerm: string) => void;
};

function SearchTopics(props: SearchTopicsProps) {
  const { onChange, value } = props;
  const [searchTerm, setSearchTerm] = useState<string>(value);

  function onSearchSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    setSearchTerm(trimmed);
    onChange(trimmed);
  }

  return (
    <form role={"search"} onSubmit={onSearchSubmit} aria-label={"Topics"}>
      <label className={"visually-hidden"} htmlFor={"topics-search"}>
        Search by topic name
      </label>
      <Grid
        cols={"2"}
        rows={"1"}
        style={{ gridTemplateColumns: "minmax(auto, 300px) auto" }}
      >
        <InputBase
          type={"search"}
          placeholder="Search by topic name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          id={"topics-search"}
        />
        <PrimaryButton type={"submit"} dense>
          <span className={"visually-hidden"}>Submit search</span>
          <Icon
            aria-hidden={true}
            icon={searchItem}
            data-testid={"visually-hidden-search-icon"}
          />
        </PrimaryButton>
      </Grid>
    </form>
  );
}

export { SearchTopics };
