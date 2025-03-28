import { Page } from '@playwright/test';  // Import Playwright's Page type

class ProductPage {
  private page: Page;  // Declare the type of 'page'

  /**
   * Constructor for ProductPage class
   * @param {Page} page - Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Method to get the title of the Product Page
   */
  async getTitleProductPage(): Promise<void> {
    console.log("Title of the page :" + (await this.page.title()));
  }
}

export { ProductPage };
