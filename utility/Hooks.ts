import test from "../testFixtures/fixtures";
import testData from "./clientAppData.json"; // Load JSON once

// Define type for testData (you can adjust based on the structure of the JSON)
interface TestData {
  url: string;
}

function addLoggingHooks(test: any): void {
  test.beforeAll(async () => {
    console.log();
    console.log(`🚀 Starting Test Suite 🚀`);
  });

  test.beforeEach(async ({ page }) => {
    console.log(
      "🔍 Setting up before each test...Launching the application - Swag Labs"
    );
    // Log URL from JSON
    console.log(testData.url);
    await page.goto(testData.url);
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log(
      "🚀 Browser and Page initialized, application is launched successfully."
    );
  });

  test.afterEach(async ({ page }) => {
    console.log("🧹 Tearing down after each test...");
    await page.context().clearCookies();
    // Uncomment if you want to clear storage as well
    // await page.context().clearStorage();
    console.log("✅ Test execution cleaned up.");
  });

  test.afterAll(async () => {
    console.log();
    console.log(`✅ Finished Test Suite ✅`);
    console.log();
  });
}

export { addLoggingHooks, testData };
