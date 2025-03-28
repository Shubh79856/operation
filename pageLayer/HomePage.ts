import { Page, Locator } from '@playwright/test';
import BasePage from './basePage';
import testData from '../utility/clientAppData.json'; // Load JSON once

class HomePage {
  page: Page;
  addToCartBTN: Locator;
  inventoryList: Locator;
  shoppingCart: Locator;
  pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBTN = this.page.locator('.inventory_list button');
    this.inventoryList = this.page.locator('.inventory_list [id*=title] .inventory_item_name');
    this.shoppingCart = this.page.locator('#shopping_cart_container svg[data-icon="shopping-cart"]');
    this.pageHeader = this.page.locator('text=Products');
  }

  async addDesiredItemToCart(productName: string, errorMessage: string = '**PRODUCT NOT FOUND**'): Promise<void> {
    const itemList = await this.inventoryList.allTextContents();

    console.log(itemList);

    if (itemList.includes(productName)) {
      for (let i = 0; i < itemList.length; i++) {
        console.log(itemList[i]);

        if (itemList[i] === productName) {
          ++i;
          this.addToCartBTN = this.page.locator(
            `.inventory_list .inventory_item:nth-child(${i}) .pricebar button`
          );

          console.log('INDEX IS: ' + i);
          // await this.waitAndClick_Locator(this.addToCartBTN);
          // await this.addToCartBTN.click();
          break;
        }
      }
    } else {
      console.log('Product Not Found');
      throw new Error(`${errorMessage}`);
    }
  }

  async navigateCartPage(): Promise<void> {
    await this.shoppingCart.click();
  }

  async getDashboardPageHeader(): Promise<string> {
    const header = await this.pageHeader.textContent();
    return header ?? '';
  }

  async getHeaderTextValue(): Promise<string> {
    const headerText = await this.pageHeader.textContent();
    if (headerText === null) {
      return '';  // Return empty string if null
    }
    return headerText;
  }
  
}

export { HomePage };
