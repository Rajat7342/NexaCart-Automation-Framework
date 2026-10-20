from selenium.webdriver.common.by import By
from pages.product_page import ProductPage


def test_product_page_loads(driver):
    product = ProductPage(driver)
    product.open("Pro Laptop")

    assert "Pro Laptop" in driver.find_element(
        By.TAG_NAME, "body"
    ).text


def test_product_quantity_increase(driver):
    product = ProductPage(driver)
    product.open("Pro Laptop")

    product.increase_quantity()

    assert product.get_quantity() == "2"


def test_product_quantity_decrease(driver):
    product = ProductPage(driver)
    product.open("Pro Laptop")

    product.increase_quantity()
    product.decrease_quantity()

    assert product.get_quantity() == "1"


def test_add_product_to_cart(driver):
    product = ProductPage(driver)
    product.open("Pro Laptop")

    product.add_to_cart()

    assert "added" in product.get_message().lower()


def test_product_wishlist(driver):
    product = ProductPage(driver)
    product.open("Pro Laptop")

    product.add_to_wishlist()

    assert "wishlist" in product.get_message().lower()