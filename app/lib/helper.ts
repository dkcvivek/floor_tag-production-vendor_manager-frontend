export const handleMobileInput = (
  value: string,
  setValue: (val: string) => void
) => {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length <= 10) {
    setValue(digitsOnly);
  }
};
