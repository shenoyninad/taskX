// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import './firebase';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </AuthProvider>
  );
}
