import { AuthhProvider } from "./AuthhContext";
import AppNav from "./AppNav";

export default function LaunchAppNav() {
    return (
      <AuthhProvider>
          <AppNav/>
      </AuthhProvider>
    );
}
