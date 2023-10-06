import { Route, Routes } from "react-router-dom";
import theme from "styles/theme";
import GlobalStyle from "styles/globalStyle";
import { ThemeProvider } from "styled-components";
import AppLayout from "components/layouts/AppLayout";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "components/header/Header";
import Main from "pages/Main";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import OAuthLogin from "pages/OAuthLogin";
import StudyCafeDetails from "pages/StudyCafeDetails";
import Payment from "pages/Payment";
import SearchResult from "pages/SearchResult";
import Reservation from "pages/Reservation";
import Reviews from "pages/Reviews";
import Account from "pages/myPage/Account";
import RedirectPayment from "pages/RedirectPayment";
import ReviewWrite from "pages/ReviewWrite";
import ReviewEdit from "pages/ReviewEdit";
import MyPageReservation from "pages/MyPageReservation";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppLayout>
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
                <Route
                  path="/studyCafe/:studyCafeId/reservation"
                  element={<Reservation />}
                />
                <Route
                  path="/studyCafe/:studyCafeId/payment"
                  element={<Payment />}
                />
                <Route
                  path="/payments/success"
                  element={<RedirectPayment status="success" virtual={false} />}
                />
                <Route
                  path="/payments/fail"
                  element={<RedirectPayment status="fail" virtual={false} />}
                />
                <Route
                  path="/payments/virtual/success"
                  element={<RedirectPayment status="success" virtual={true} />}
                />
                <Route
                  path="/payments/virtual/fail"
                  element={<RedirectPayment status="success" virtual={true} />}
                />
                <Route path="/search-result" element={<SearchResult />} />
                <Route path="/myPage/reviews" element={<Reviews />} />
                <Route path="/myPage/account" element={<Account />} />
                <Route
                  path="/myPage/reviews/:reviewId/write"
                  element={<ReviewWrite />}
                />
                <Route
                  path="/myPage/reservation"
                  element={<MyPageReservation />}
                />
                <Route
                  path="/myPage/reviews/:reviewId/write"
                  element={<ReviewEdit />}
                />
                <Route
                  path="/myPage/reservation"
                  element={<MyPageReservation />}
                />
              </Routes>
            </AppLayout>
          </ThemeProvider>
        </RecoilRoot>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
