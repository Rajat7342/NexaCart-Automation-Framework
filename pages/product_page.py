from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

class ProductPage:

    BASE_URL = "http://127.0.0.1:5500/tests/apps/product.html"

    PRODUCT_NAME = (By.ID, "productName")
    QUANTITY = (By.ID, "quantity")

    MINUS_BUTTON = (By.ID, "minusButton")
    PLUS_BUTTON = (By.ID, "plusButton")

    ADD_TO_CART = (By.ID, "addCartButton")
    BUY_BUTTON = (By.ID, "buyButton")

    WISHLIST = (By.ID, "productWishlist")

    TOAST = (By.ID, "toast")
    TOAST_TITLE = (By.ID, "toastTitle")
    TOAST_MESSAGE = (By.ID, "toastMessage")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def open(self, product_name="Pro Laptop"):

        self.driver.get(
            f"{self.BASE_URL}?product={product_name.replace(' ', '%20')}"
        )

        self.wait.until(
            EC.visibility_of_element_located(
                self.PRODUCT_NAME
            )
        )

    def get_product_name(self):

        return self.wait.until(
            EC.visibility_of_element_located(
                self.PRODUCT_NAME
            )
        ).text

    def increase_quantity(self):

     for _ in range(3):
        try:
            button = self.driver.find_element(
                *self.PLUS_BUTTON
            )

            self.driver.execute_script(
                "arguments[0].click();",
                button
            )

            return

        except StaleElementReferenceException:
            continue

    def decrease_quantity(self):

     for _ in range(3):
        try:
            button = self.driver.find_element(
                *self.MINUS_BUTTON
            )

            self.driver.execute_script(
                "arguments[0].click();",
                button
            )

            return

        except StaleElementReferenceException:
            continue

    def get_quantity(self):

        return self.wait.until(
            EC.visibility_of_element_located(
                self.QUANTITY
            )
        ).text

    def add_to_cart(self):

        button = self.wait.until(
            EC.element_to_be_clickable(
                self.ADD_TO_CART
            )
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def buy_now(self):

        button = self.wait.until(
            EC.element_to_be_clickable(
                self.BUY_BUTTON
            )
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def add_to_wishlist(self):

        button = self.wait.until(
            EC.element_to_be_clickable(
                self.WISHLIST
            )
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def get_message(self):

        return self.wait.until(
            EC.visibility_of_element_located(
                self.TOAST_MESSAGE
            )
        ).text