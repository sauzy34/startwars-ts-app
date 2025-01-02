import { memo } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense } from "react";
import { Link } from "@tanstack/react-router";
import s from "./RootComponent.module.scss";

function RootComponent() {
  return (
    <main>
      <section className={s.root}>
        <Link
          className={s.logo}
          to="/"
          search={(old) => ({
            ...old,
          })}
        >
          Star Wars 💥
        </Link>
      </section>
      <Outlet />
      <Suspense>
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </main>
  );
}

export default memo(RootComponent);
