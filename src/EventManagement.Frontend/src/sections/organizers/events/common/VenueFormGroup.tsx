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
      {venueType === VenueType.Online && <TextFieldElement name="url" label="Посилання на подію" required placeholder="https://example.com" />}
      {venueType === VenueType.Offline && <TextFieldElement name="location" label="Назва локаії" required />}
    </>
  );
};

export default VenueFormGroup;
