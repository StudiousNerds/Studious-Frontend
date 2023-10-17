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
import MyReservationCancel from "pages/MyReservationCancel";
import MyReservationModify from "pages/myPage/MyReservationModify";
import RedirectPayment from "pages/RedirectPayment";
import ReviewWrite from "pages/ReviewWrite";
import ReviewEdit from "pages/ReviewEdit";
import MyPageReservation from "pages/MyPageReservation";
import PrivateRoute from "PrivateRoute";

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
                <Route element={<PrivateRoute />}>
                  <Route path="/myPage/account" element={<Account />} />
                </Route>
                <Route
                  path="/myPage/reviews/:reviewId/write"
                  element={<ReviewWrite />}
                />
                <Route
                  path="/myPage/reviews/:reviewId/edit"
                  component={<ReviewEdit />}
                />
                <Route
                  path="/myPage/reservation"
                  element={<MyPageReservation />}
                />
                <Route
                  path="/myPage/reservation/:reservationId/cancel"
                  element={<MyReservationCancel />}
                />
                <Route
                  path="/myPage/reservation/:reservationId/modify"
                  element={<MyReservationModify />}
                />
                {/* TODO 북마크 페이지 element 추가 */}
                <Route path="/myPage/bookmarks" />
              </Routes>
            </AppLayout>
          </ThemeProvider>
        </RecoilRoot>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
