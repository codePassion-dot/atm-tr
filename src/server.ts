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
      throw new Error("user not found");
    }
    localStorage.setItem(user.pin, JSON.stringify(user));
    localStorage.setItem("active_user", JSON.stringify(user));
  } else {
    localStorage.setItem("active_user", localStorageUser);
  }
};

export const getLoggedUser = async () => {
  await wait(300);
  const localStorageUser = localStorage.getItem("active_user");
  if (!localStorageUser) {
    return null;
  }
  return JSON.parse(localStorageUser) as User;
};

export const logOut = async () => {
  await wait(300);
  localStorage.removeItem("active_user");
};
