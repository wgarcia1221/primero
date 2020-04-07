import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useI18n } from "../../i18n";
import submitForm from "../../../libs/submit-form";
import { TRANSITIONS_TYPES } from "../../transitions/constants";

import { NAME } from "./constants";
import { hasProvidedConsent } from "./parts/helpers";
import {
  TransitionDialog,
  ReferralForm,
  ReassignForm,
  TransferForm
} from "./parts";

const Transitions = ({
  record,
  recordType,
  userPermissions,
  referral,
  setReferral,
  referDialog,
  assignDialog,
  transferDialog,
  handleReferClose,
  handleAssignClose,
  handleTransferClose,
  pending,
  setPending
}) => {
  const i18n = useI18n();
  const providedConsent = (record && hasProvidedConsent(record)) || false;
  const referralFormikRef = useRef();
  const transferFormikRef = useRef();
  const assignFormikRef = useRef();
  const [disabledReferButton, setDisabledReferButton] = useState(false);
  const [disabledTransferButton, setDisabledTransferButton] = useState(false);

  const transitions = { referDialog, transferDialog, assignDialog };

  const commonDialogProps = {
    omitCloseAfterSuccess: true,
    pending,
    record,
    recordType
  };

  useEffect(() => {
    if (referral && Object.keys(referral).length) {
      transitions.referDialog = true;
    }
  }, [referral]);

  const commonTransitionProps = {
    userPermissions,
    providedConsent,
    recordType,
    record,
    setPending
  };

  // eslint-disable-next-line react/no-multi-comp, react/display-name
  const transitionComponent = t => {
    if (t.transferDialog) {
      return (
        <TransferForm
          {...commonTransitionProps}
          isBulkTransfer={false}
          transferRef={transferFormikRef}
          disabled={disabledTransferButton}
          setDisabled={setDisabledTransferButton}
        />
      );
    }
    if (t.referDialog) {
      return (
        <ReferralForm
          {...commonTransitionProps}
          referralRef={referralFormikRef}
          disabled={disabledReferButton}
          setDisabled={setDisabledReferButton}
          referral={referral}
          setReferral={setReferral}
        />
      );
    }
    if (t.assignDialog) {
      return (
        <ReassignForm {...commonTransitionProps} assignRef={assignFormikRef} />
      );
    }

    return null;
  };

  const renderTransitionForm = () => {
    if (transitions.referDialog) {
      const referralOnClose = () => {
        setDisabledReferButton(false);
        handleReferClose();
      };

      return {
        onClose: referralOnClose,
        confirmButtonLabel: i18n.t("buttons.referral"),
        open: referDialog,
        successHandler: () => submitForm(referralFormikRef),
        transitionType: TRANSITIONS_TYPES.referral,
        enabledSuccessButton: disabledReferButton || providedConsent
      };
    }

    if (transitions.transferDialog) {
      const transferOnClose = () => {
        setDisabledTransferButton(false);
        handleTransferClose();
      };

      return {
        onClose: transferOnClose,
        confirmButtonLabel: i18n.t("buttons.transfer"),
        open: transferDialog,
        successHandler: () => submitForm(transferFormikRef),
        transitionType: TRANSITIONS_TYPES.transfer,
        enabledSuccessButton: disabledTransferButton || providedConsent
      };
    }

    if (transitions.assignDialog) {
      return {
        onClose: handleAssignClose,
        confirmButtonLabel: i18n.t("buttons.save"),
        open: assignDialog,
        successHandler: () => submitForm(assignFormikRef),
        transitionType: TRANSITIONS_TYPES.reassign
      };
    }

    return null;
  };

  const customProps = renderTransitionForm();

  if (Object.is(customProps, null)) {
    return null;
  }

  return (
    <TransitionDialog {...customProps} {...commonDialogProps}>
      {transitionComponent(transitions)}
    </TransitionDialog>
  );
};

Transitions.displayName = NAME;

Transitions.propTypes = {
  assignDialog: PropTypes.bool,
  handleAssignClose: PropTypes.func,
  handleReferClose: PropTypes.func,
  handleTransferClose: PropTypes.func,
  pending: PropTypes.bool,
  record: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  referDialog: PropTypes.bool,
  referral: PropTypes.object,
  setPending: PropTypes.func,
  setReferral: PropTypes.func,
  transferDialog: PropTypes.bool,
  userPermissions: PropTypes.object.isRequired
};

export default Transitions;