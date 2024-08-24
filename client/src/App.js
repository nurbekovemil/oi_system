import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useLazyCheckAuthQuery } from "./store/services/auth-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./pages/private/Home";
import Profile from "./pages/private/Profile/index";
import Auth from "./pages/public/Auth";

import Public from "./components/route/Public";
import Private from "./components/route/Private";

import Companies from "./pages/private/companies/index";
import CompanyForm from "./pages/private/companies/Form";
import CompanyView from "./pages/private/companies/View";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import Reports from "./pages/private/reports/index";
import ReportForm from "./pages/private/reports/Form";
import ReportTypes from "./pages/private/reports/Types";

import Users from "./pages/private/users/index";
import UserForm from "./pages/private/users/Form";
import UserView from "./pages/private/users/View";

import moment from "moment";
import "moment/locale/ru";
import Eds from "./pages/private/Eds";
import ReportPublicView from "./pages/public/reports/View";
import ListingView from "./pages/public/reports/ListingView";
import Receipt from "./pages/private/Receipt";
import UserGuide from "./pages/private/UserGuide";
import ChangeAccess from "./components/profile/ChangeUserPass";
import Regulations from "./pages/private/Regulations";
import ChangeDefaultPass from "./pages/private/ChangeDefaultPass";
import Saerch from "./pages/private/Search";
import Contracts from "./pages/private/contracts";
import ContractForm from "./pages/private/contracts/Form";
import ContractTypes from "./pages/private/contracts/Types";
import ContractEds from "./pages/private/contracts/Eds";

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
            <Route path="/" index element={<Auth />} />
            <Route
              path="/report/:reportType/:tempId/:reportId"
              element={<ReportPublicView />}
            />
            <Route
              path="/report/:name/:reportType/:tempId/:reportId"
              element={<ListingView />}
            />
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
            <Route path="/dashboard/contracts" element={<Contracts />} />
            <Route path="/dashboard/contracts/types" element={<ContractTypes />} />
            <Route path="/dashboard/contracts/eds/:contractId" element={<ContractEds />} />
            <Route path="/dashboard/contracts/:formType/:contractType" element={<ContractForm />} />
            <Route path="/dashboard/contracts/:formType/:contractType/:contractId" element={<ContractForm />} />
            
            <Route path="/dashboard/reports/types" element={<ReportTypes />} />
            <Route
              path="/dashboard/reports/:formType/:reportType/:tempId/:reportId"
              element={<ReportForm />}
            />
            <Route path="/dashboard/eds/:reportId" element={<Eds />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route
              path="/dashboard/profile/changeAccess"
              element={<ChangeAccess />}
            />
            <Route path="/dashboard/receipt/:receiptId" element={<Receipt />} />
            <Route path="/dashboard/user-guide" element={<UserGuide />} />
            <Route path="/dashboard/regulations" element={<Regulations />} />
            <Route
              path="/dashboard/change-pass"
              element={<ChangeDefaultPass />}
            />
            <Route path="/dashboard/search" element={<Saerch />} />
            <Route path="*" element={<Navigate to="/dashboard/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
