import { RadioButtonGroup, TextFieldElement, useWatch } from "react-hook-form-mui";
import { VenueType } from "./types";

const VenueFormGroup = () => {
  const venueType = useWatch({ name: 'venueType' });

  return (
    <>
      <RadioButtonGroup
        name="venueType"
        valueKey="value"
        row
        options={[
          { id: '1', label: 'Онлайн', value: VenueType.Online, },
          { id: '2', label: 'Офлайн', value: VenueType.Offline, },
        ]}
      />
      {venueType === VenueType.Online && <TextFieldElement type="url" name="url" label="Посилання на подію" required placeholder="https://example.com" />}
      {venueType === VenueType.Offline && (
        <>
          <TextFieldElement name="address.city" label="Місто" required />
          <TextFieldElement name="address.street" label="Вулиця" required />
          <TextFieldElement name="address.locationName" label="Назва локації" required />
          <TextFieldElement name="address.zipCode" label="Поштовий індекс" />
        </>
      )}
    </>
  );
};

export default VenueFormGroup;
