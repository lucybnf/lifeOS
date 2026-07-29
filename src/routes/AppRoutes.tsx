import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';

export function AppRoutes() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}
