// utils/validation.ts
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const generatePin = (PIN_LENGTH: number): string => {
  let pin = "";
  for (let i = 0; i < PIN_LENGTH; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  return pin;
};

export const isValidPin = (pin: string): boolean => {
  return /^\d{5}$/.test(pin);
};
