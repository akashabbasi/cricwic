import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment, // ✅ Added for native input adornment placement
  IconButton      // ✅ Replaced custom Button for standard input alignment sizing
} from "@material-ui/core";

// ✅ Upgraded legacy v4 imports to match your project dependencies
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Link } from "react-router-dom";
import CricketBallLoader from "../layouts/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstanat";
import MetaData from "../layouts/MataData/MataData";
import { useHistory } from "react-router-dom";
import useStyles from "./LoginFromStyle";

function UpdatePassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, isUpdated, error } = useSelector(
    (state) => state.profileData
  );
  const alert = useAlert();

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
    setisValidConfirmPassword(event.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  function updatePasswordSubmitHandler(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert.error("Password and Confirm Password do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      history.push("/account");
    }
  }, [dispatch, error, alert, isUpdated, loading, history]);

  const isSignInDisabled = !(
    newPassword &&
    confirmPassword &&
    oldPassword &&
    isValidPassword
  );

  return (
    <>
      <MetaData title={"Update Password"} />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={updatePasswordSubmitHandler}>
            <Avatar className={classes.avatar}>
              <VpnKeyIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Update Password
            </Typography>

            <TextField
              style={{ marginTop: "1rem" }}
              label="Old Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              value={oldPassword}
              onChange={handleOldPassword}
              /* ⚡ Corrected Input End Adornment Layout */
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              style={{ marginTop: "4rem" }}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={`${classes.passwordInput} ${classes.textField}`}
              error={!isValidPassword && newPassword !== ""}
              helperText={
                !isValidPassword && newPassword !== ""
                  ? "Password must be at least 8 characters"
                  : ""
              }
              value={newPassword}
              onChange={handlePasswordChange}
              /* ⚡ Corrected Input End Adornment Layout */
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!isValidConfirmPassword && confirmPassword !== ""}
              helperText={
                !isValidConfirmPassword && confirmPassword !== ""
                  ? "Password must be at least 8 characters"
                  : ""
              }
              className={`${classes.passwordInput} ${classes.textField}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              /* ⚡ Corrected Input End Adornment Layout */
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit" /* Form naturally maps submission natively */
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSignInDisabled}
              style={{ marginTop: "3.5rem" }}
            >
              Update New Password
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: ".5rem" }}
            >
              <Link to="/account" className={classes.createAccount}>
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdatePassword;