from pages.dashboard_page import DashboardPage


def test_dashboard_loads(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    assert "NexaCart" in driver.title


def test_products_are_displayed(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    product_count = dashboard.get_product_count()

    assert product_count > 0


def test_search_product(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    dashboard.search_product("Laptop")

    products = dashboard.get_product_cards()

    assert len(products) > 0


def test_add_product_to_cart(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    dashboard.click_add_to_cart()

    cart_count = dashboard.get_cart_count()

    assert cart_count == "1"


def test_cart_opens(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    dashboard.click_add_to_cart()

    dashboard.click_cart()

    assert dashboard.is_cart_open()


def test_wishlist(driver):

    dashboard = DashboardPage(driver)

    dashboard.open()

    dashboard.click_wishlist()

    wishlist_buttons = driver.find_elements(
        *dashboard.WISHLIST_BUTTONS
    )

    assert len(wishlist_buttons) > 0