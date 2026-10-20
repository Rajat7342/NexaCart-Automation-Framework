from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CheckoutPage:

    URL = "http://127.0.0.1:5500/tests/apps/checkout.html"

    EMAIL = (By.ID, "email")
    EMAIL_ERROR = (By.ID, "emailError")

    FIRST_NAME = (By.ID, "firstName")
    LAST_NAME = (By.ID, "lastName")
    ADDRESS = (By.ID, "address")
    CITY = (By.ID, "city")
    POSTAL_CODE = (By.ID, "postalCode")
    PHONE = (By.ID, "phone")

    CARD_NUMBER = (By.ID, "cardNumber")
    EXPIRY = (By.ID, "expiry")
    CVV = (By.ID, "cvv")

    PLACE_ORDER = (By.ID, "placeOrder")

    ITEM_COUNT = (By.ID, "itemCount")
    SUMMARY_ITEMS = (By.ID, "summaryItems")

    SUBTOTAL = (By.ID, "subtotal")
    SHIPPING = (By.ID, "shipping")
    TAX = (By.ID, "tax")
    TOTAL = (By.ID, "total")

    SUCCESS_OVERLAY = (By.ID, "successOverlay")
    ORDER_NUMBER = (By.ID, "orderNumber")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def open(self):
        self.driver.get(self.URL)

    def enter_email(self, email):
        field = self.wait.until(
            EC.visibility_of_element_located(self.EMAIL)
        )
        field.clear()
        field.send_keys(email)

    def enter_first_name(self, name):
        field = self.wait.until(
            EC.visibility_of_element_located(self.FIRST_NAME)
        )
        field.clear()
        field.send_keys(name)

    def enter_last_name(self, name):
        field = self.wait.until(
            EC.visibility_of_element_located(self.LAST_NAME)
        )
        field.clear()
        field.send_keys(name)

    def enter_address(self, address):
        field = self.wait.until(
            EC.visibility_of_element_located(self.ADDRESS)
        )
        field.clear()
        field.send_keys(address)

    def enter_city(self, city):
        field = self.wait.until(
            EC.visibility_of_element_located(self.CITY)
        )
        field.clear()
        field.send_keys(city)

    def enter_postal_code(self, postal_code):
        field = self.wait.until(
            EC.visibility_of_element_located(self.POSTAL_CODE)
        )
        field.clear()
        field.send_keys(postal_code)

    def enter_phone(self, phone):
        field = self.wait.until(
            EC.visibility_of_element_located(self.PHONE)
        )
        field.clear()
        field.send_keys(phone)

    def enter_card_number(self, card_number):
        field = self.wait.until(
            EC.visibility_of_element_located(self.CARD_NUMBER)
        )
        field.clear()
        field.send_keys(card_number)

    def enter_expiry(self, expiry):
        field = self.wait.until(
            EC.visibility_of_element_located(self.EXPIRY)
        )
        field.clear()
        field.send_keys(expiry)

    def enter_cvv(self, cvv):
        field = self.wait.until(
            EC.visibility_of_element_located(self.CVV)
        )
        field.clear()
        field.send_keys(cvv)

    def place_order(self):

        button = self.wait.until(
            EC.element_to_be_clickable(self.PLACE_ORDER)
        )

        self.driver.execute_script(
            "arguments[0].scrollIntoView({block: 'center'});",
            button
        )

        self.driver.execute_script(
            "arguments[0].click();",
            button
        )

    def get_email_error(self):
        return self.wait.until(
            EC.visibility_of_element_located(
                self.EMAIL_ERROR
            )
        ).text

    def get_total(self):
        return self.wait.until(
            EC.visibility_of_element_located(
                self.TOTAL
            )
        ).text

    def get_item_count(self):
        return self.wait.until(
            EC.visibility_of_element_located(
                self.ITEM_COUNT
            )
        ).text

    def is_order_successful(self):

        overlay = self.wait.until(
            EC.visibility_of_element_located(
                self.SUCCESS_OVERLAY
            )
        )

        return overlay.is_displayed()

    def get_order_number(self):
        return self.wait.until(
            EC.visibility_of_element_located(
                self.ORDER_NUMBER
            )
        ).text