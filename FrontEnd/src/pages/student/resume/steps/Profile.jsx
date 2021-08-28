import React, { useState } from "react";
import {
  EuiFormRow,
  EuiFieldText,
  EuiForm,
  EuiDatePicker,
  EuiFlexGrid,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiFilePicker,
} from "@elastic/eui";

function Profile({ profile, setProfile, errors, showErrors, props }) {
  const [bday, setBday] = useState();
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleInputChange = async (event) => {
    const formData = new FormData();
    formData.append("image", event[0]);
    // console.log(formData);
    console.log(event[0]);
    // setData({ formData });
    let response = await fetch(
      `http://localhost:6700/resume/${props.match.params.id}/image`,
      {
        method: "POST",
        body: formData,
      }
    );
    response = await response.json();
    console.log(response);
    // console.log(props.match.params.id);
  };
  const handleBdayChange = (date) => {
    setBday(date);
    setProfile({ ...profile, bday: date.format("L") });
  };
  return (
    <EuiForm component="form">
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiFormRow
            label="First Name"
            error={errors.profile.firstName}
            isInvalid={showErrors.profile.firstName}
          >
            <EuiFieldText
              name="firstName"
              onChange={handleChange}
              value={profile.firstName}
              isInvalid={showErrors.profile.firstName}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="Last Name"
            error={errors.profile.lastName}
            isInvalid={showErrors.profile.lastName}
          >
            <EuiFieldText
              name="lastName"
              onChange={handleChange}
              value={profile.lastName}
              isInvalid={showErrors.profile.lastName}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="Subtitle"
            error={errors.profile.subTitle}
            isInvalid={showErrors.profile.subTitle}
          >
            <EuiFieldText
              name="subTitle"
              onChange={handleChange}
              value={profile.subTitle}
              isInvalid={showErrors.profile.subTitle}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="Birth Date"
            error={errors.profile.bday}
            isInvalid={showErrors.profile.bday}
          >
            <EuiDatePicker
              onChange={handleBdayChange}
              selected={bday}
              value={profile.bday}
              isInvalid={showErrors.profile.bday}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiHorizontalRule />
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiFormRow
            label="Address Line 1"
            error={errors.profile.address1}
            isInvalid={showErrors.profile.address1}
          >
            <EuiFieldText
              name="address1"
              onChange={handleChange}
              value={profile.address1}
              isInvalid={showErrors.profile.address1}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Address Line 2">
            <EuiFieldText
              name="address2"
              onChange={handleChange}
              value={profile.address2}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Address Line 3">
            <EuiFieldText
              name="address3"
              onChange={handleChange}
              value={profile.address3}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiFormRow
            label="Country"
            error={errors.profile.country}
            isInvalid={showErrors.profile.country}
          >
            <EuiFieldText
              name="country"
              onChange={handleChange}
              value={profile.country}
              isInvalid={showErrors.profile.country}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="City"
            error={errors.profile.city}
            isInvalid={showErrors.profile.city}
          >
            <EuiFieldText
              name="city"
              onChange={handleChange}
              value={profile.city}
              isInvalid={showErrors.profile.city}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="Zipcode"
            error={errors.profile.zipcode}
            isInvalid={showErrors.profile.zipcode}
          >
            <EuiFieldText
              name="zipcode"
              onChange={handleChange}
              value={profile.zipcode}
              isInvalid={showErrors.profile.zipcode}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiHorizontalRule />
      <EuiFlexGrid columns={3}>
        <EuiFlexItem>
          <EuiFormRow
            label="Phone Number"
            error={errors.profile.number}
            isInvalid={showErrors.profile.number}
          >
            <EuiFieldText
              name="number"
              onChange={handleChange}
              value={profile.number}
              isInvalid={showErrors.profile.number}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Alternative Number">
            <EuiFieldText
              name="number2"
              onChange={handleChange}
              value={profile.number2}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            label="Email Address"
            error={errors.profile.email}
            isInvalid={showErrors.profile.email}
          >
            <EuiFieldText
              name="email"
              onChange={handleChange}
              value={profile.email}
              isInvalid={showErrors.profile.email}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Website">
            <EuiFieldText
              name="website"
              onChange={handleChange}
              value={profile.website}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
      <EuiHorizontalRule />
      <EuiFlexGrid>
        <EuiFlexItem>
          <EuiFormRow label="Pick a professional image of yours.">
            <EuiFilePicker
              id="image"
              initialPromptText="Select or drag and drop image"
              name="image"
              onChange={handleInputChange}
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiForm>
  );
}

export default Profile;
