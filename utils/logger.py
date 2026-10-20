import logging
import os


def get_logger(name):

    os.makedirs("reports/logs", exist_ok=True)

    logger = logging.getLogger(name)

    if not logger.handlers:

        logger.setLevel(logging.INFO)

        file_handler = logging.FileHandler(
            "reports/logs/automation.log"
        )

        console_handler = logging.StreamHandler()

        formatter = logging.Formatter(
            "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
        )

        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        logger.addHandler(file_handler)
        logger.addHandler(console_handler)

    return logger