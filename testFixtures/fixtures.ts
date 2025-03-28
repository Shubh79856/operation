import { test as fixture, Page } from "@playwright/test";  // Importing Page from Playwright
import { LoginPage } from "../pageLayer/LoginPage";
import { HomePage } from "../pageLayer/HomePage";
import { ProductPage } from "../pageLayer/ProductPage";
import readExcel from "../utility/excelReader";

// Define the structure of the data you are reading from Excel
/*
interface ExcelData {
  Logindata: any[];  // Modify type as per your Excel data structure
  ProductData: any[];  // Modify type as per your Excel data structure
}*/
/*
const excelData: { Logindata: any[]; ProductData: any[] } = {
  Logindata: [],
  ProductData: [],
};
*/
type ExcelData = {
  Logindata: any[];
  ProductData: any[];
};

// Define the test fixture with proper types
const test = fixture.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  excelData: ExcelData;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  excelData: async ({}, use) => {
    const logindata = await readExcel(
      "./utility/ExcelTestData.xlsx",
      "LoginData"
    ); // Replace with your file path and sheet name
    const productData = await readExcel(
      "./utility/ExcelTestData.xlsx",
      "ProductData"
    );

    const ExcelData: ExcelData = {
      Logindata: logindata,
      ProductData: productData,
    };

    await use(ExcelData); // Pass data as a fixture
  },
});

export default test;
