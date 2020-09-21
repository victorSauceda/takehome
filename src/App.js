import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
function App() {
  const [formItem, setFormItem] = useState({});

  const handleSubmit = (e) => {
    if (e.currentTarget.reportValidity()) {
      console.log(
        "e.currentTarget.reportValidity(): ",
        e.currentTarget.reportValidity()
      );
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formItem }),
      })
        .then(() => alert("Success!"))
        .catch((error) => alert(error));
    } else {
      alert("form is invalid");
    }

    e.preventDefault();
  };
  const handleChange = async (event) => {
    setFormItem({ ...formItem, [event.target.name]: event.target.value });
  };

  return (
    <div className="App" style={{ marginBottom: "55px" }}>
      <h1>Code For America</h1>
      <form
        style={{ marginTop: "55px" }}
        data-netlify="true"
        method="post"
        name="formFunc"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            name="fName"
            value={formItem.fName}
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lName"
            value={formItem.lName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="streetAddress"
            label="Street Address"
            name="streetAddress"
            value={formItem.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="streetAddress2"
            label="Street Address 2"
            name="streetAddress2"
            value={formItem.street2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="city"
            value={formItem.city}
            label="city"
            id="city"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="state"
            label="State"
            name="state"
            value={formItem.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            error={!RegExp(`[0-9]{5}`).test(formItem.zipcode)}
            inputProps={{ pattern: "[0-9]{5}" }}
            id="zipcode"
            label="Zipcode"
            name="zipcode"
            value={formItem.zipcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            value={formItem.email}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            type="tel"
            id="phone"
            label="Phone Number"
            name="phone"
            inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
            value={formItem.phone}
            onChange={handleChange}
          />
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default App;
