import { expect } from "@playwright/test";
import test from "../testFixtures/fixtures.js";
import { addLoggingHooks, testData } from "../utility/Hooks.js";
import { logger, logTestCaseStart, logTestCaseEnd } from "../utility/Logger.js";
addLoggingHooks(test);

test.describe("Clicking the Product", () => {
  test("Open Product", async ({
    loginPage,
    homePage,
    productPage,
    excelData,
  }) => {
    test.info().annotations.push({
      type: "Description",
      description: `This test involves adding the product to the cart.
                The flow includes:
                - Login to the application.
                - Navigating to the HomePage of the application.
                - Clicking on the product. `,
    });
    logTestCaseStart("=>=>=> Open Product Validation Test. <=<=<=");

    // Step 1: Navigate to the specified URL
    await test.step("Navigate to the specified URL - Used Hooks to Launch the App @beforeEach", async () => {
      // Used Hooks to launch the application
    });

    //Step 2 : Sign in process
    await test.step("Sign In to the application", async () => {
      await loginPage.login(testData.username, testData.password);
    });

    //Step 3 : Adding the desired product to the cart
    await test.step("Clicking on the product reflected on the Home Pgae", async () => {
      await productPage.getTitleProductPage();
      console.log(testData.userData[0].user1);
      console.log(testData.userData[1].phoneNumber);
      console.log(testData.productData.item1);
      console.log(excelData.ProductData[0].ProductData);
    });
  });
});
