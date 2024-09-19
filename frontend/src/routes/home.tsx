
import { shouldNotBeLoggedIn } from "@/lib/middleware";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  beforeLoad: shouldNotBeLoggedIn,
  component: Home,
});

function Home() {
  return (
    <div> Home...</div>
  );
}
