import { Box } from "@aivenio/aquarium";
import questionMark from "@aivenio/aquarium/dist/module/icons/questionMark";
import user from "@aivenio/aquarium/dist/module/icons/user";
import notifications from "@aivenio/aquarium/dist/module/icons/notifications";
import HeaderMenuLink from "src/app/layout/header/HeaderMenuLink";
import logo from "src/app/layout/header/klaw_logo.png";

function Header() {
  return (
    <Box
      component={"header"}
      display={"flex"}
      height={"full"}
      justifyContent={"space-between"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <a href={"/"}>
        <span style={{ color: "white" }} className={"visually-hidden"}>
          Klaw homepage
        </span>
        <img aria-hidden="true" alt="" src={logo} height={50} width={150} />
      </a>
      <nav aria-label={"Quick links"}>
        <Box component={"ul"} display={"flex"} colGap={"l2"}>
          <li>
            <HeaderMenuLink
              icon={notifications}
              linkText={"Go to approval requests"}
              href={`/execTopics`}
            />
          </li>
          <li>
            <HeaderMenuLink
              icon={questionMark}
              linkText={"Go to Klaw documentation page"}
              href={"https://www.klaw-project.io/docs"}
              rel={"noreferrer"}
            />
          </li>
          <li>
            <HeaderMenuLink
              icon={user}
              linkText={"Go to your profile"}
              href={`/myProfile`}
            />
          </li>
        </Box>
      </nav>
    </Box>
  );
}

export default Header;
