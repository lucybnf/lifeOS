import { LifeOSDataProvider } from "./data/LifeOSDataProvider";
import { AppRoutes } from "./routes/AppRoutes";
import { AppRouterProvider } from "./routes/useAppRouter";

export function App() {
  return (
    <AppRouterProvider>
      <LifeOSDataProvider>
        <AppRoutes />
      </LifeOSDataProvider>
    </AppRouterProvider>
  );
}
