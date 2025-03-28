export default async () => {
  console.log("Global Setup: Running before the test suite starts.");

  // Example of setting environment variables or global configurations

  process.env.BASE_URL = "https://www.google.com/"; // setting a global variable
  // You can also perform tasks like setting up authentication tokens, etc.
};
