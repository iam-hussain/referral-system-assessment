import Box from "@/components/ui/box";
import { CustomLink } from "@/components/ui/link";
import Typography from "@/components/ui/typography";
import { shouldBeLoggedIn } from "@/lib/middleware";
import { fetchMe } from "@/lib/query-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  beforeLoad: shouldBeLoggedIn,
  component: Home,
});

function Home() {
  const { data, isLoading } = useQuery(fetchMe());

  return (
    <Box preset={"row-center"} variant={"screen"}>
      <Box preset={"stack-center"}>
        <Typography variant={"h3"}>Welcome to Home Page</Typography>
        <CustomLink to="/dashboard">See my dashboard</CustomLink>
        <CustomLink
          variant={"destructive"}
          to="/signout"
          className="absolute top-5 right-5"
        >
          SignOut
        </CustomLink>

        <Box>
          {isLoading && <Typography>Loading...</Typography>}
          {data && (
            <Box preset={"stack-center"} className="gap-0">
              <Typography variant={"h3"}>Hello, {data.payload.name}</Typography>
              <Typography>ID: {data.payload.id}</Typography>
              <Typography>Twitter ID: {data.payload.twitterId}</Typography>
              <Typography>Points: {data.payload.points}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
