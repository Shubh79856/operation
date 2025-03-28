import { expect, Page, Locator } from "@playwright/test";

class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Action Methods
   */
  
  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async pause(): Promise<void> {
    await this.page.pause();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async wait(): Promise<void> {
    await this.page.waitForTimeout(10000);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * @param {string} selector
   */
  async waitAndClick(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * @param {Locator} locator
   */
  async waitAndClick_Locator(locator: Locator): Promise<void> {
    await locator.click();
  }

  // async waitAndHardClick(selector: string): Promise<void> {
  //   await this.page.$eval(selector, (element) => element.click());
  // }
  async waitAndHardClick(selector: string): Promise<void> {
    await this.page.$eval(selector, (element) => {
      const el = element as HTMLElement; // Cast the element to HTMLElement
      el.click();
    });
  }

  async waitAndFill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async keyPress(selector: string, key: string): Promise<void> {
    await this.page.press(selector, key);
  }

  async takeScreenShot(): Promise<void> {
    await expect(await this.page.screenshot()).toMatchSnapshot("MyScreenShot.png");
  }

  async getElement(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  async getElementText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  async getElementAllTextContent(selector: string): Promise<string[]> {
    const elements = await this.page.locator(selector);
    return elements.allTextContents();
  }

  // async getJSElementValue(selector: string): Promise<string> {
  //   return await this.page.$eval(selector, (element) => element.value);
  // }

  async getJSElementValue(selector: string): Promise<string> {
    const textValue = await this.page.$eval(selector, (element) => {
      // Narrow the element type to HTMLInputElement or HTMLTextAreaElement
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return element.value;
      }
      throw new Error("Element does not have a value property");
    });
    return textValue;
  }
  

  async selectValueFromDropdown(selector: string, text: string): Promise<void> {
    const dropdown = await this.page.locator(selector);
    await dropdown.selectOption({ value: text });
  }

  async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  async getFirstElementFromTheList(selector: string): Promise<string | null> {
    const rows = await this.page.locator(selector);
    const count = await rows.count();
    if (count > 0) {
      return await rows.nth(0).textContent();
    }
    return null;
  }

  async getLastElementFromTheList(selector: string): Promise<string | null> {
    const rows = await this.page.locator(selector);
    const count = await rows.count();
    if (count > 5) {
      return await rows.nth(5).textContent();
    }
    return null;
  }

  async clickAllElements(selector: string): Promise<void> {
    const rows = await this.page.locator(selector);
    const count = 2;
    for (let i = 0; i < count; ++i) {
      await rows.nth(i).click();
    }
  }

  async clickAllLinksInNewTabs(selector: string): Promise<void> {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      await rows.nth(i).click({ modifiers: ["Control", "Shift"] });
    }
  }

  async isElementVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isEnabled();
  }

  async isElementChecked(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isChecked();
  }

  /**
   * Verification Methods
   */

  async verifyElementText(selector: string, text: string): Promise<void> {
    const textValue = await this.page.textContent(selector);
    expect(textValue?.trim()).toBe(text);
  }

  async verifyElementContainsText(selector: string, text: string): Promise<void> {
    const locatorText = await this.page.locator(selector);
    await expect(locatorText).toContainText(text);
  }

  // async verifyJSElementValue(selector: string, text: string): Promise<void> {
  //   const textValue = await this.page.$eval(selector, (element) => element.value);
  //   expect(textValue?.trim()).toBe(text);
  // }

  async verifyJSElementValue(selector: string, text: string): Promise<void> {
    const textValue = await this.page.$eval(selector, (element) => {
      // Narrow the element type to HTMLInputElement or HTMLTextAreaElement
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return element.value;
      }
      throw new Error("Element does not have a value property");
    });
    expect(textValue?.trim()).toBe(text);
  }
  

  async verifyElementAttribute(selector: string, attribute: string, value: string): Promise<void> {
    const textValue = await this.page.getAttribute(selector, attribute);
    expect(textValue?.trim()).toBe(value);
  }

  async verifyIsElementVisible(selector: string, errorMessage: string): Promise<void> {
    const element = this.page.locator(selector);
    try {
      const isVisible = await element.isVisible();
      expect(isVisible).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async verifyIsElementNotVisible(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    expect(await element.isHidden()).toBeTruthy();
  }

  async verifyIsElementChecked(selector: string, errorMessage: string): Promise<void> {
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async verifyIsElementEnabled(selector: string, errorMessage: string): Promise<void> {
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }
}

export default BasePage;

