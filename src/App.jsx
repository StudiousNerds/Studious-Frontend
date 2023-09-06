import { Route, Routes } from "react-router-dom";
import theme from "styles/theme";
import GlobalStyle from "styles/globalStyle";
import { ThemeProvider } from "styled-components";
import Layout from "components/Layout";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "components/header/Header";
import Main from "pages/Main";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import OAuthLogin from "pages/OAuthLogin";
import StudyCafeDetails from "pages/StudyCafeDetails";
import SearchResult from "pages/SearchResult";
import Reviews from "pages/Reviews";
import ReviewWrite from "pages/ReviewWrite";
import ReviewEdit from "pages/ReviewEdit";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/oauth/kakao"
                  element={<OAuthLogin platform={"kakao"} />}
                />
                <Route
                  path="/oauth/naver"
                  element={<OAuthLogin platform={"naver"} />}
                />
                <Route
                  path="/oauth/google"
                  element={<OAuthLogin platform={"google"} />}
                />
                <Route
                  path="/studyCafe/:studyCafeId"
                  element={<StudyCafeDetails />}
                />
                <Route path="/search-result" element={<SearchResult />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/reviews/write" element={<ReviewWrite />} />
                <Route path="/review/edit/:reviewId" component={ReviewEdit} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
