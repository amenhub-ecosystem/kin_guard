import { AppRouter } from "./routes";
import { MockUserProvider } from "@/features/app/rbac/MockUserContext";

export default function App() {
  return (
    <MockUserProvider>
      <AppRouter />
    </MockUserProvider>
  );
}
