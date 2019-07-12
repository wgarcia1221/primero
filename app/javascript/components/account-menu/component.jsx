import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "components/i18n";
import { makeStyles } from "@material-ui/styles";
import { ListIcon } from "components/list-icon";
import styles from "./styles.css";

const AccountMenu = ({ username, mobile }) => {
  const css = makeStyles(styles)();
  const i18n = useI18n();

  const nav = [
    { name: i18n.t("navigation.my_account"), to: "/account" },
    { name: i18n.t("navigation.logout"), to: "/signout" }
  ];

  if (mobile) {
    return (
      <>
        <IconButton edge="start" color="default" aria-label="Menu">
          <ListIcon icon="support" />
        </IconButton>
        <IconButton edge="start" color="default" aria-label="Menu">
          <ListIcon icon="account" />
        </IconButton>
      </>
    );
  }
  return (
    <>
      <div className={css.navSeparator} />
      <List className={css.navListAccount}>
        <ListItem>
          <NavLink
            to="/support"
            className={css.navLink}
            activeClassName={css.navActive}
            exact
          >
            <ListItemIcon classes={{ root: css.listIcon }}>
              <ListIcon icon="support" />
            </ListItemIcon>
            <ListItemText
              primary={i18n.t("navigation.support")}
              classes={{ primary: css.listText }}
            />
          </NavLink>
        </ListItem>
        <ListItem className={css.readOnlyNavListItem}>
          <ListItemIcon classes={{ root: css.listIcon }}>
            <ListIcon icon="account" />
          </ListItemIcon>
          <ListItemText
            primary={username}
            classes={{ primary: css.listText }}
          />
        </ListItem>
        {nav.map(l => (
          <ListItem className={css.accountListItem} key={l.to}>
            <NavLink
              to={l.to}
              className={css.navLink}
              activeClassName={css.navActive}
              exact
            >
              <ListItemText
                primary={l.name}
                classes={{ primary: css.listText }}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </>
  );
};

AccountMenu.propTypes = {
  username: PropTypes.string,
  mobile: PropTypes.bool
};

export default AccountMenu;