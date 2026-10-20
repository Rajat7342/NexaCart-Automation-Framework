from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from pages.checkout_page import CheckoutPage
import pytest

DASHBOARD_URL = "http://127.0.0.1:5500/tests/apps/dashboard.html"


def add_product_and_open_checkout(driver):

    driver.get(DASHBOARD_URL)

    wait = WebDriverWait(driver, 10)

    add_to_cart = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, ".add-cart")
        )
    )

    driver.execute_script(
        "arguments[0].click();",
        add_to_cart
    )

    cart_count = wait.until(
        EC.visibility_of_element_located(
            (By.ID, "cartCount")
        )
    )

    assert cart_count.text == "1"

    cart_button = wait.until(
        EC.element_to_be_clickable(
            (By.ID, "cartButton")
        )
    )

    driver.execute_script(
        "arguments[0].click();",
        cart_button
    )

    checkout_button = wait.until(
        EC.element_to_be_clickable(
            (
                By.XPATH,
                "//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'proceed to checkout')]"
            )
        )
    )

    driver.execute_script(
        "arguments[0].click();",
        checkout_button
    )

    wait.until(
        lambda d: "checkout.html" in d.current_url
    )

    return CheckoutPage(driver)


@pytest.mark.smoke
def test_checkout_invalid_email(driver):

    checkout = add_product_and_open_checkout(driver)

    checkout.enter_email("invalid-email")
    checkout.enter_first_name("Rajat")
    checkout.enter_last_name("sharma")
    checkout.enter_address("123 Main Street")
    checkout.enter_city("Chandigarh")
    checkout.enter_postal_code("160001")
    checkout.enter_phone("9876543210")
    checkout.enter_card_number("4111111111111111")
    checkout.enter_expiry("12/28")
    checkout.enter_cvv("123")

    checkout.place_order()

    alert = WebDriverWait(
        driver, 5
    ).until(
        EC.alert_is_present()
    )

    assert alert.text == "Please enter a valid email address."

    alert.accept()