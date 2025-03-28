import { expect } from "@playwright/test";
import test from "../testFixtures/fixtures"; // Import the fixture from the fixture.js file
import { logger, logTestCaseStart, logTestCaseEnd } from "../utility/Logger";
import {addLoggingHooks, testData} from '../utility/Hooks';

addLoggingHooks(test);
// Test using the imported fixture
test.describe("Login Page Test - Standard User", () => {
  test("Standard User Login Test @smoke, @regression", async ({
    loginPage,
    homePage,
    excelData,
  }) => {
    test.info().annotations.push({
      type: "Description",
      description: `This test involves login to the application for standard user.
                The flow includes:
                - Navigating to the specified URL.
                - Entering the standard username.
                - Entering the Password.
                - Clicking on the Sign In Button.
                - Navigating to the HomePage of the application`,
    });

    logTestCaseStart("=>=>=> Standard Login Validation Test. <=<=<=");

    // Step 1: Navigate to the specified URL
    await test.step("Navigate to the specified URL - Used Hooks to Launch the App @beforeEach", async () => {
      // Used Hooks to launch the application
    });

    // Step 2: Validating the bot Image on the login page
    await test.step("Validating the bot Image", async () => {
      logger.info("Checking the bot Image...");
      const botImageValue = await loginPage.validateBotImage();
      expect(botImageValue).toBeTruthy();
    });

    // Step 3: Sign in process
    await test.step("Sign in to the application", async () => {
      logger.info("Signing in...");
      logger.info("Entering the Username & Password for Standard User");

      await loginPage.login(
        excelData.Logindata[2].username,
        excelData.Logindata[2].password
      );
      logger.info("User signed in successfully!");

      const headerValue = await homePage.getHeaderTextValue();
      expect(headerValue).toBe("Products");

      logTestCaseEnd("=>=>=> Standard User Login Test Ended. <=<=<=");
    });
  });
});

test.describe("Login Page Test - Basic User", () => {
  test("Basic User Login Test", async ({ loginPage, homePage, excelData }) => {
    test.info().annotations.push({
      type: "Description",
      description: `This test involves login to the application using basic user.
                The flow includes:
                - Navigating to the specified URL.
                - Entering the Username.
                - Entering the Password.
                - Clicking on the Sign In Button.
                - Navigating to the HomePage of the application`,
    });

    logTestCaseStart("=>=>=> Basic User Login Validation Test. <=<=<=");

    // Step 1: Navigate to the specified URL
    await test.step("Navigate to the specified URL - Used Hooks to Launch the App @beforeEach", async () => {
      // Used Hooks to launch the application
    });

    // Step 2: Validating the bot Image on the login page
    await test.step("Validating the bot Image", async () => {
      logger.info("Checking the bot Image...");
      const botImageValue = await loginPage.validateBotImage();
      expect(botImageValue).toBeTruthy();
    });

    // Step 3: Sign in process
    await test.step("Sign in to the application", async () => {
      logger.info("Signing in...");
      logger.info("Entering the Username & Password for Basic User");

      await loginPage.login(
        testData.username,
        testData.password // Using basic user credentials
      );
      logger.info("User signed in successfully!");

      const headerValue = await homePage.getHeaderTextValue();
      expect(headerValue).toBe("Products");

      logTestCaseEnd("=>=>=> Basic User Login Test Ended. <=<=<=");
    });
  });
});
