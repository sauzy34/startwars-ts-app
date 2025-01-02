import { createRootRoute } from "@tanstack/react-router";
import RootComponent from "@/components/RootComponent";
import DefaultCatchBoundary from "@/components/DefaultCatchBoundary";
import NotFound from "@/components/NotFound";

export const Route = createRootRoute({
  errorComponent: (props) => {
    return <DefaultCatchBoundary {...props} />;
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});
