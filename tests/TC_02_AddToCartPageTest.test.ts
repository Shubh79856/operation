import { expect } from "@playwright/test";
import test from "../testFixtures/fixtures"; // Corrected the import for TypeScript
import { addLoggingHooks, testData } from "../utility/Hooks"; // Removed `.js` extension for TypeScript
import { logger, logTestCaseStart, logTestCaseEnd } from "../utility/Logger"; // Removed `.js` extension for TypeScript

// Loading test data from a JSON file
import * as dataset from "../utility/clientAppData.json"; // Use `import` for JSON in TypeScript

addLoggingHooks(test);

test.describe("Adding the Product to the Cart", () => {
  test("Add To cart", async ({ loginPage, homePage }) => {
    test.info().annotations.push({
      type: "Description",
      description: `This test involves adding the product to the cart.
                The flow includes:
                - Login to the application.
                - Navigating to the HomePage of the application.
                - Adding the product to the cart.
                - Navigating to the product cart page.
                - Validating if the added product is reflecting in the cart or not. `,
    });

    logTestCaseStart("=>=>=> Product Added To Cart Validation Test. <=<=<=");

    // Step 1: Navigate to the specified URL
    await test.step("Navigate to the specified URL - Used Hooks to Launch the App @beforeEach", async () => {
      // Used Hooks to launch the application
    });

    // Step 2: Sign in process
    await test.step("Sign In to the application", async () => {
      await loginPage.login(testData.username, testData.password);
    });

    // Step 3: Adding the desired product to the cart
    await test.step("Adding the product to the cart & Navigate to the Cart Page", async () => {
      // expect(
      //   await homePage.addDesiredItemToCart(testData.productName)
      // ).toBeTruthy();
      await homePage.addDesiredItemToCart(testData.productName);
      await homePage.navigateCartPage();

      await loginPage.doPause();
    });
  });
});
