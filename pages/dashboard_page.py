from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class DashboardPage:

    URL = "http://127.0.0.1:5500/tests/apps/dashboard.html"

    SEARCH = (By.ID, "navSearch")
    CART_BUTTON = (By.ID, "cartButton")
    CART_COUNT = (By.ID, "cartCount")
    WISHLIST_BUTTON = (By.ID, "wishlistButton")

    PRODUCT_CARDS = (By.CSS_SELECTOR, ".product-card")
    ADD_TO_CART_BUTTONS = (By.CSS_SELECTOR, ".add-cart")
    WISHLIST_BUTTONS = (By.CSS_SELECTOR, ".wishlist")

    CART_DRAWER = (By.ID, "cartDrawer")
    CHECKOUT_BUTTON = (By.ID, "checkoutButton")

    CATEGORY_CARDS = (By.CSS_SELECTOR, ".category-card")

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(self.URL)

    def get_product_cards(self):
        return self.driver.find_elements(
            *self.PRODUCT_CARDS
        )

    def get_product_count(self):
        return len(
            self.get_product_cards()
        )

    def search_product(self, product_name):
        search = self.driver.find_element(
            *self.SEARCH
        )

        search.clear()
        search.send_keys(product_name)

    def click_cart(self):
        self.driver.find_element(
            *self.CART_BUTTON
        ).click()

    def get_cart_count(self):
        return self.driver.find_element(
            *self.CART_COUNT
        ).text

    def click_add_to_cart(self, index=0):

        buttons = WebDriverWait(
            self.driver,
            10
        ).until(
            EC.presence_of_all_elements_located(
                self.ADD_TO_CART_BUTTONS
            )
        )

        button = buttons[index]

        self.driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            button
        )

        WebDriverWait(
            self.driver,
            10
        ).until(
            EC.element_to_be_clickable(
                self.ADD_TO_CART_BUTTONS
            )
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def click_checkout(self):
        self.driver.find_element(
            *self.CHECKOUT_BUTTON
        ).click()

    def click_wishlist(self, index=0):

        buttons = WebDriverWait(
            self.driver,
            10
        ).until(
            EC.presence_of_all_elements_located(
                self.WISHLIST_BUTTONS
            )
        )

        button = buttons[index]

        self.driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            button
        )

        WebDriverWait(
            self.driver,
            10
        ).until(
            EC.element_to_be_clickable(
                self.WISHLIST_BUTTONS
            )
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def is_cart_open(self):

        drawer = self.driver.find_element(
            *self.CART_DRAWER
        )

        return "active" in drawer.get_attribute(
            "class"
        )