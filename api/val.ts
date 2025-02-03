// pretent this is some real validation logic

export const val = (input) => {
 if (input.name && input.make && input.mileage && input.category) {
  return true;
 }
};
