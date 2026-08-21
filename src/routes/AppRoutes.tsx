import { MainLayout } from "../layouts/MainLayout";
import { AgendaPage } from "../pages/AgendaPage";
import { HomePage } from "../pages/HomePage";
import { ModulePlaceholderPage } from "../pages/ModulePlaceholderPage";
import { menuItems } from "../modules/navigation/menuItems";
import { useAppRouter } from "./useAppRouter";

export function AppRoutes() {
  const { path } = useAppRouter();
  const item = menuItems.find((menuItem) => menuItem.path === path);
  const page =
    path === "/" ? (
      <HomePage />
    ) : path === "/agenda" ? (
      <AgendaPage />
    ) : (
      <ModulePlaceholderPage name={item?.label ?? "Página no encontrada"} />
    );
  return <MainLayout>{page}</MainLayout>;
}
