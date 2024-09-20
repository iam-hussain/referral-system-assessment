import { cookieNames, removeCookieAsync } from "@/lib/cookies";
import { fetchLogout } from "@/lib/query-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/signout")({
  component: SignOut,
});

function SignOut() {
  const navigate = useNavigate();
  const { isLoading } = useQuery(fetchLogout());

  useEffect(() => {
    removeCookieAsync(cookieNames.access_token);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigate({
        to: "/signup",
      });
    }
  }, [isLoading]);

  return <div> Signing out...</div>;
}
