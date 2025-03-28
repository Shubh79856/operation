import { Page, Locator } from '@playwright/test';  // Import Playwright's Page and Locator types


class LoginPage {
  
  private page: Page;  // Declare the type of 'page'
  
  private username: Locator;  // Declare the type of 'username' as Locator
  private password: Locator;  // Declare the type of 'password' as Locator
  private loginBTN: Locator;  // Declare the type of 'loginBTN' as Locator
  private botImage: Locator;  // Declare the type of 'botImage' as Locator

  /**
   * This constructor contains all the page objects/elements that are necessary
   * to perform the actions on the Login Page
   * @param {Page} page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.password = page.locator("#password");
    this.loginBTN = page.locator("#login-button");
    this.botImage = page.locator(".bot_column");
    const button = page.locator("jkhjkede");
  }

  async launchApp(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBTN.click();
  }

  async doPause(): Promise<void> {
    console.log("Pause Executed from Login Page");
    await this.page.pause();
  }

  /**
   * Validates if the bot image is visible
   * @returns {Promise<boolean>}
   */
  async validateBotImage(): Promise<boolean> {
    return await this.botImage.isVisible();
  }
}

export { LoginPage };
