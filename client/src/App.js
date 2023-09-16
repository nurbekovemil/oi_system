import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useLazyCheckAuthQuery } from "./store/services/auth-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Reports from "./pages/reports/index";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Users from "./pages/users/index";
import UserForm from "./pages/users/Form";
import UserView from "./pages/users/View";

import Companies from "./pages/companies/index";
import CompanyForm from "./pages/companies/Form";
import CompanyView from "./pages/companies/View";

import Public from "./components/route/Public";
import Private from "./components/route/Private";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import ReportForm from "./pages/reports/Form";
import ReportTypes from "./pages/reports/Types";

import moment from "moment";
import "moment/locale/ru";
import Eds from "./pages/Eds";

function App() {
  moment.locale("ru");
  const [checkAuth, {}] = useLazyCheckAuthQuery();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="/dashboard/" element={<Private />}>
            <Route index element={<Home />} />

            <Route path="/dashboard/users" element={<Users />} />

            <Route path="/dashboard/users/:formType" element={<UserForm />} />

            <Route
              path="/dashboard/users/:formType/:id"
              element={<UserForm />}
            />

            <Route path="/dashboard/users/view/:id" element={<UserView />} />

            <Route path="/dashboard/companies" element={<Companies />} />

            <Route
              path="/dashboard/companies/:formType"
              element={<CompanyForm />}
            />

            <Route
              path="/dashboard/companies/:formType/:cid"
              element={<CompanyForm />}
            />

            <Route
              path="/dashboard/companies/view/:id"
              element={<CompanyView />}
            />

            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/reports/types" element={<ReportTypes />} />
            <Route
              path="/dashboard/reports/:formType/:reportType/:tempId/:reportId"
              element={<ReportForm />}
            />
            <Route path="/dashboard/eds/:reportId" element={<Eds />} />

            {/* <Route
              path="/dashboard/reports/view/:reportType/:tempId/:reportId"
              element={<ReportView />}
            /> */}

            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
