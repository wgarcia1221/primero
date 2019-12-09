import { fromJS } from "immutable";

import { DASHBOARD_NAMES } from "./constants";
import NAMESPACE from "./namespace";

export const selectFlags = state => {
  return state.getIn(["records", NAMESPACE, "flags"], fromJS({}));
};

export const selectCasesByStatus = state => {
  return state.getIn(["records", NAMESPACE, "casesByStatus"], fromJS({}));
};

export const selectCasesByCaseWorker = state => {
  return state.getIn(["records", NAMESPACE, "casesByCaseWorker"], fromJS([]));
};

export const selectCasesRegistration = state => {
  return state.getIn(["records", NAMESPACE, "casesRegistration"], fromJS({}));
};

export const selectCasesOverview = state => {
  return state.getIn(["records", NAMESPACE, "casesOverview"], fromJS({}));
};

export const selectServicesStatus = state => {
  return state.getIn(["records", NAMESPACE, "servicesStatus"], fromJS({}));
};

export const selectIsOpenPageActions = state => {
  return state.getIn(["records", NAMESPACE, "isOpenPageActions"], false);
};

export const getDashboards = state => {
  return state.getIn(["records", NAMESPACE, "data"], false);
};

const getDashboardByName = (state, name) => {
  const currentState = getDashboards(state);
  const noDashboard = fromJS([]);

  if (!currentState) {
    return noDashboard;
  }
  const dashboardData = currentState
    .filter(f => f.get("name") === name)
    .first();

  return dashboardData?.size ? dashboardData : noDashboard;
};

export const getCasesByAssessmentLevel = state => {
  const currentState = getDashboards(state);

  if (!currentState) {
    return fromJS([]);
  }
  const dashboardData = currentState
    .filter(f => f.get("name") === DASHBOARD_NAMES.case_risk)
    .first();

  return dashboardData?.size ? dashboardData : fromJS([]);
};

export const getWorkflowIndividualCases = state =>
  getDashboardByName(state, DASHBOARD_NAMES.workflow);
