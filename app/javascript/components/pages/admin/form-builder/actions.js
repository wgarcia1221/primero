import { namespaceActions } from "../../../../libs";
import NAMESPACE from "../forms-list/namespace";

export default namespaceActions(NAMESPACE, [
  "CLEAR_SELECTED_FORM",
  "CREATE_SELECTED_FIELD",
  "CLEAR_SELECTED_FIELD",
  "CLEAR_SELECTED_SUBFORM_FIELD",
  "CLEAR_SELECTED_SUBFORM",
  "FETCH_FORM",
  "FETCH_FORM_FAILURE",
  "FETCH_FORM_FINISHED",
  "FETCH_FORM_STARTED",
  "FETCH_FORM_SUCCESS",
  "REORDER_FIELDS",
  "SAVE_FORM",
  "SAVE_FORM_FAILURE",
  "SAVE_FORM_FINISHED",
  "SAVE_FORM_STARTED",
  "SAVE_FORM_SUCCESS",
  "SET_SELECTED_FIELD",
  "SET_SELECTED_SUBFORM",
  "SET_NEW_FIELD",
  "SET_SELECTED_SUBFORM_FIELD",
  "SET_NEW_FIELD_SUBFORM",
  "UPDATE_SELECTED_FIELD",
  "UPDATE_SELECTED_SUBFORM",
  "UPDATE_SELECTED_SUBFORM_FIELD"
]);
