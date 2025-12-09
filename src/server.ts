interface User {
  id: string;
  name: string;
  franchise: string;
  pin: string;
  balance: number;
}

const seedUsers: User[] = [
  {
    id: "peter",
    name: "Peter Parker",
    pin: "1234",
    franchise: "visa",
    balance: 1200,
  },
  {
    id: "bruce",
    name: "Bruce Wayne",
    pin: "0000",
    franchise: "mastercard",
    balance: 1000000,
  },
  {
    id: "diana",
    name: "Diana Prince",
    pin: "1984",
    franchise: "maestro",
    balance: 5000,
  },
];

const ACTIVE_USER = "active_user";

const wait = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });

export const setLoggedUser = async (pin: string) => {
  await wait(300);
  const localStorageUser = localStorage.getItem(pin);
  if (!localStorageUser) {
    const user = seedUsers.find((user) => user.pin === pin);
    if (!user) {
      throw new Error("User not found");
    }
    localStorage.setItem(user.pin, JSON.stringify(user));
    localStorage.setItem(ACTIVE_USER, JSON.stringify(user));
  } else {
    localStorage.setItem(ACTIVE_USER, localStorageUser);
  }
};

export const getLoggedUser = async () => {
  await wait(300);
  const localStorageUser = localStorage.getItem(ACTIVE_USER);
  if (!localStorageUser) {
    return null;
  }
  return JSON.parse(localStorageUser) as User;
};

export const logOut = async () => {
  await wait(300);
  localStorage.removeItem(ACTIVE_USER);
};

export const updateBalance = async (addition: number) => {
  await wait(300);
  const localStorageUser = localStorage.getItem(ACTIVE_USER);
  if (!localStorageUser) {
    throw new Error("not user found");
  }
  const jsonUser = JSON.parse(localStorageUser) as User;
  if (jsonUser.balance + addition < 0) {
    throw new Error("Insufficient Funds", { cause: "insufficient_founds" });
  }
  jsonUser.balance += addition;
  localStorage.setItem(ACTIVE_USER, JSON.stringify(jsonUser));
  localStorage.setItem(jsonUser.pin, JSON.stringify(jsonUser));
};
