from utils.logger import get_logger
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

from pages.login_page import LoginPage
from test_data.login_data import (
    VALID_EMAIL,
    VALID_PASSWORD,
    INVALID_EMAIL,
    SHORT_PASSWORD
)
from config.config import BASE_URL


URL = "http://127.0.0.1:5500/tests/apps/index.html"


@pytest.mark.regression
def test_empty_login_validation(driver):

    driver.get(URL)

    login_page = LoginPage(driver)
    login_page.click_login()

    wait = WebDriverWait(driver, 5)

    email_error = wait.until(
        EC.visibility_of_element_located(
            login_page.EMAIL_ERROR
        )
    )

    password_error = wait.until(
        EC.visibility_of_element_located(
            login_page.PASSWORD_ERROR
        )
    )

    assert email_error.get_attribute("textContent") == "Email is required."
    assert password_error.get_attribute("textContent") == "Password is required."


import pytest


@pytest.mark.smoke
def test_valid_form_submission(driver):
    driver.get(URL)

    login_page = LoginPage(driver)

    login_page.enter_email("user@nexacart.com")
    login_page.enter_password("Test@123")
    login_page.click_login()

    wait = WebDriverWait(driver, 5)

    success_message = wait.until(
        EC.visibility_of_element_located(
            login_page.SUCCESS_MESSAGE
        )
    )

    assert success_message.text == "Login successful!"

@pytest.mark.regression
def test_invalid_email(driver):

    driver.get(URL)

    login_page = LoginPage(driver)

    login_page.enter_email(INVALID_EMAIL)
    login_page.enter_password(VALID_PASSWORD)
    login_page.click_login()

    wait = WebDriverWait(driver, 5)

    email_error = wait.until(
        EC.visibility_of_element_located(
            login_page.EMAIL_ERROR
        )
    )

    assert email_error.get_attribute("textContent") == \
        "Enter a valid email address."


@pytest.mark.regression
def test_short_password(driver):

    driver.get(URL)

    login_page = LoginPage(driver)

    login_page.enter_email(VALID_EMAIL)
    login_page.enter_password(SHORT_PASSWORD)
    login_page.click_login()

    wait = WebDriverWait(driver, 5)

    password_error = wait.until(
        EC.visibility_of_element_located(
            login_page.PASSWORD_ERROR
        )
    )

    assert password_error.get_attribute("textContent") == \
        "Password must be at least 6 characters."


@pytest.mark.regression
def test_password_visibility_toggle(driver):

    driver.get(URL)

    login_page = LoginPage(driver)

    login_page.enter_password(VALID_PASSWORD)

    password_field = driver.find_element(
        *login_page.PASSWORD
    )

    assert password_field.get_attribute("type") == "password"

    login_page.click_toggle_password()

    assert password_field.get_attribute("type") == "text"

    login_page.click_toggle_password()

    assert password_field.get_attribute("type") == "password"


@pytest.mark.regression
def test_login_button_loading_state(driver):

    driver.get(BASE_URL)

    login_page = LoginPage(driver)

    login_page.enter_email(VALID_EMAIL)
    login_page.enter_password(VALID_PASSWORD)

    login_page.click_login()

    login_button = driver.find_element(
        *login_page.LOGIN_BUTTON
    )

    assert "loading" in login_button.get_attribute("class")
    assert login_button.get_attribute("disabled") is not None

    wait = WebDriverWait(driver, 5)

    success_message = wait.until(
        EC.visibility_of_element_located(
            login_page.SUCCESS_MESSAGE
        )
    )

    assert success_message.text == "Login successful!"