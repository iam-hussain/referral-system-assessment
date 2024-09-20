import { CustomAnchor } from "@/components/ui/anchor";
import Box from "@/components/ui/box";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomLink } from "@/components/ui/link";
import Typography from "@/components/ui/typography";
import { cookieNames, setCookieAsync } from "@/lib/cookies";
import { shouldNotBeLoggedIn } from "@/lib/middleware";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";

const baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;
const twitterURL = `${baseURL}/auth/twitter`;

export const Route = createFileRoute("/signup")({
  beforeLoad: shouldNotBeLoggedIn,
  validateSearch: z.object({
    referralCode: z.string().optional(),
    token: z.string().optional(),
    failed: z.string().optional(),
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const referralCode = search.referralCode;
  const failed = search.failed;
  const token = search.token;
  const notified = useRef("");

  useEffect(() => {
    if (failed) {
      if (!notified.current) {
        toast.error("An unexpected error occurred. Please try again.");
        notified.current = "done";
      }
      navigate({
        to: ".",
        search: { referralCode },
      });
    }
  }, [failed]);

  useEffect(() => {
    if (token) {
      setCookieAsync(cookieNames.access_token, token);
      if (!notified.current) {
        toast.success("You have been logged in successfully");
        notified.current = "done";
      }
      setTimeout(() => {
        navigate({
          to: "/home",
        });
      }, 5000);
    }
  }, [token]);

  return (
    <Box preset={"row-center"} variant={"screen"}>
      <Box preset={"row-center"}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login Page</CardTitle>
            <CardDescription>Explore the pages.</CardDescription>
          </CardHeader>

          {token ? (
            <>
              <CardContent>
                <Typography>Redirecting....</Typography>
              </CardContent>
            </>
          ) : (
            <>
              <CardContent className="flex flex-col gap-2">
                <CustomAnchor
                  href={
                    referralCode
                      ? `${twitterURL}?referralCode=${referralCode}`
                      : twitterURL
                  }
                >
                  Register with Twitter
                </CustomAnchor>
                {referralCode && (
                  <Typography variant={"sub"}>
                    Referral code: {referralCode}
                  </Typography>
                )}
              </CardContent>
              <CardFooter>
                <CustomLink variant={"outline"} to="/">
                  Go Back
                </CustomLink>
              </CardFooter>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
}
