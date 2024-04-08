import { RadioButtonGroup, SwitchElement, TextFieldElement, useWatch } from "react-hook-form-mui";

const AttendanceFormGroup = () => {
  const limit = useWatch({ name: 'limit' });

  return (
    <>
      <RadioButtonGroup
        name="limit"
        label="Кількість учасників"
        valueKey="value"
        options={[
          { id: '1', label: 'Необмежена кількість учасників', value: 'unlimited' },
          { id: '2', label: 'Максимальна кількість учасників', value: 'limited' },
        ]}
      />
      {limit === 'limited' && <TextFieldElement type="number" name="limitNumber" label="Осіб" required />}
      <SwitchElement
        name="shouldBeApproved"
        label="Підтвердження участі"
      />
    </>
  );
};

export default AttendanceFormGroup;
