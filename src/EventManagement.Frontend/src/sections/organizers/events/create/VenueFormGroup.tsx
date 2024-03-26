import { RadioButtonGroup, TextFieldElement, useWatch } from "react-hook-form-mui";

const VenueFormGroup = () => {
  const venueType = useWatch({ name: 'venueType' });

  return (
    <>
      <RadioButtonGroup
        name="venueType"
        valueKey="value"
        row
        options={[
          { id: '1', label: 'Онлайн', value: 'online', },
          { id: '2', label: 'Офлайн', value: 'offline' },
        ]}
      />
      {venueType === 'online' && <TextFieldElement name="url" label="Посилання на подію" required placeholder="https://example.com" />}
      {venueType === 'offline' && <TextFieldElement name="location" label="Назва локаії" required />}
    </>
  );
};

export default VenueFormGroup;
