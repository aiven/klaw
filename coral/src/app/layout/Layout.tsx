import { Box, Flexbox, Grid, GridItem } from "@aivenio/design-system";
import MainNavigation from "src/app/layout/MainNavigation";
import Header from "src/app/layout/Header";
import SkipLink from "src/app/layout/SkipLink";
import { ReactNode, useRef } from "react";

function Layout({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <SkipLink mainContent={ref} />
      <Grid
        colGap={"l1"}
        minHeight={"screen"}
        style={{
          gridTemplateColumns: "240px 1fr",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <GridItem
          colStart={"1"}
          colEnd={"12"}
          height={"l5"}
          backgroundColor={"primary-80"}
          paddingX={"l2"}
        >
          <Header />
        </GridItem>
        <GridItem colStart={"1"} colEnd={"2"} rowStart={"2"}>
          <MainNavigation />
        </GridItem>
        <GridItem colStart={"2"} colEnd={"12"}>
          <Box component={"main"} padding={"l2"} width={"full"}>
            <div ref={ref}>
              <Flexbox direction={"column"} rowGap={"l2"}>
                {children}
              </Flexbox>
            </div>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default Layout;
