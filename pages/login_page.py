from selenium.webdriver.common.by import By
from selenium.common.exceptions import StaleElementReferenceException
from utils.logger import get_logger


class LoginPage:

    EMAIL = (By.ID, "email")
    PASSWORD = (By.ID, "password")
    LOGIN_BUTTON = (By.ID, "loginButton")

    EMAIL_ERROR = (By.ID, "emailError")
    PASSWORD_ERROR = (By.ID, "passwordError")
    SUCCESS_MESSAGE = (By.ID, "successMessage")

    TOGGLE_PASSWORD = (By.ID, "togglePassword")

    def __init__(self, driver):

        self.driver = driver
        self.logger = get_logger("LoginPage")

    def enter_email(self, email):

        self.logger.info("Entering email")

        for _ in range(3):
            try:
                field = self.driver.find_element(
                    *self.EMAIL
                )

                field.clear()
                field.send_keys(email)

                return

            except StaleElementReferenceException:
                continue

    def enter_password(self, password):

        self.logger.info("Entering password")

        for _ in range(3):
            try:
                field = self.driver.find_element(
                    *self.PASSWORD
                )

                field.clear()
                field.send_keys(password)

                return

            except StaleElementReferenceException:
                continue

    def click_login(self):

        self.logger.info("Clicking login button")

        for _ in range(3):
            try:
                button = self.driver.find_element(
                    *self.LOGIN_BUTTON
                )

                self.driver.execute_script(
                    "arguments[0].click();",
                    button
                )

                return

            except StaleElementReferenceException:
                continue

    def get_email_error(self):

        self.logger.info("Getting email error")

        return self.driver.find_element(
            *self.EMAIL_ERROR
        )

    def get_password_error(self):

        self.logger.info("Getting password error")

        return self.driver.find_element(
            *self.PASSWORD_ERROR
        )

    def get_success_message(self):

        self.logger.info("Getting success message")

        return self.driver.find_element(
            *self.SUCCESS_MESSAGE
        )

    def click_toggle_password(self):

        self.logger.info("Toggling password visibility")

        self.driver.find_element(
            *self.TOGGLE_PASSWORD
        ).click()