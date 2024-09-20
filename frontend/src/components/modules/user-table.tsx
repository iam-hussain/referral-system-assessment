import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Typography from "@/components/ui/typography";
import { CustomLink } from "../ui/link";

const UserTable = ({
  data,
  isLoading,
}: {
  data: any[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    <Typography>Loading...</Typography>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Referral Code</TableHead>
            <TableHead className="px-4 py-2 text-center">Points</TableHead>
            <TableHead className="px-4 py-2 text-center">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell className="px-4 py-2 border-b border-gray-300">
                <Typography variant={"h6"}> {user.name}</Typography>
                <Typography variant={"sub"}>{user.id}</Typography>
              </TableCell>
              <TableCell className="px-4 py-2 border-b border-gray-300">
                {user.referralCode}
              </TableCell>
              <TableCell className="px-4 py-2 text-center border-b border-gray-300">
                {user.points}
              </TableCell>
              <TableCell className="px-4 py-2 text-center border-b border-gray-300">
                <CustomLink
                  className="text-sm"
                  to={"/signup"}
                  search={{
                    referralCode: user.referralCode,
                  }}
                >
                  Use referral
                </CustomLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
