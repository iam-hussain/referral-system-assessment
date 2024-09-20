import UserTable from "@/components/modules/user-table";
import Box from "@/components/ui/box";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomLink } from "@/components/ui/link";
import Typography from "@/components/ui/typography";
import { fetchUsers } from "@/lib/query-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useQuery(fetchUsers());

  return (
    <Box preset={"row-center"} variant={"screen"}>
      <Box preset={"grid-split"} variant={"page"}>
        <Box preset={"stack-center"}>
          <Typography variant={"h3"}>Welcome to Referral</Typography>
          <Box>
            <UserTable data={data?.payload || []} isLoading={isLoading} />
          </Box>
        </Box>

        <Box preset={"row-center"}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Referral Modal</CardTitle>
              <CardDescription>Explore the pages.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <CustomLink to="/signup">Go to Register</CustomLink>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
