import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FilterListIcon from "@material-ui/icons/FilterList";

import { PageHeading } from "./../page";
import RecordActions from "./../record-actions";

import AddRecordMenu from "./add-record-menu";
import styles from "./styles.css";

const RecordListToolbar = ({
  title,
  recordType,
  handleDrawer,
  mobileDisplay
}) => {
  const css = makeStyles(styles)();

  return (
    <Box mb={3} alignItems="center" display="flex" className={css.toolbar}>
      <Box flexGrow={1}>
        <PageHeading title={title} />
      </Box>
      <Box>
        {mobileDisplay && (
          <IconButton onClick={handleDrawer} color="primary">
            <FilterListIcon />
          </IconButton>
        )}
        <AddRecordMenu recordType={recordType} />
        <RecordActions recordType={recordType} iconColor="primary" />
      </Box>
    </Box>
  );
};

RecordListToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  recordType: PropTypes.string.isRequired,
  mobileDisplay: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired
};

export default RecordListToolbar;