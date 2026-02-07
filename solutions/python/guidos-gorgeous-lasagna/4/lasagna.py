"""Functions used in preparing Guido's gorgeous lasagna.

Learn about Guido, the creator of the Python language:
https://en.wikipedia.org/wiki/Guido_van_Rossum

This is a module docstring, used to describe the functionality
of a module and its functions and/or classes.
"""


EXPECTED_BAKE_TIME = 40
PREPARATION_TIME = 2

def bake_time_remaining(current_bake_time):
    """Calculate the bake time remaining.

    :param elapsed_bake_time: int - baking time already elapsed.
    :return: int - remaining bake time (in minutes) derived from 'EXPECTED_BAKE_TIME'.

    Function that takes the actual minutes the lasagna has been in the oven as
    an argument and returns how many minutes the lasagna still needs to bake
    based on the `EXPECTED_BAKE_TIME`.
    """

    if current_bake_time < EXPECTED_BAKE_TIME:
        return EXPECTED_BAKE_TIME - current_bake_time
    if current_bake_time == EXPECTED_BAKE_TIME:
        return "The lasagna is ready!"
    
    return "The lasagna is overcooked!"


def preparation_time_in_minutes(number_of_layers):
    """Calculate the preparation time in minutes.

    :param number_of_layers: int - the number of layers to prepare.
    :return: int - the total preparation time (in minutes) based on the
        `PREPARATION_TIME` per layer.

    Function that takes the number of layers you want to add to the lasagna
    as an argument and returns how many minutes you would spend making them
    based on the `PREPARATION_TIME` per layer.
    """
    
    return number_of_layers * PREPARATION_TIME



def elapsed_time_in_minutes(number_of_layers, elapsed_bake_time):
    """Calculate the elapsed time in minutes.

    :param number_of_layers: int - the number of layers to prepare.
    :param elapsed_bake_time: int - the baking time already elapsed.
    :return: int - the total elapsed time (in minutes) spent cooking the
        lasagna based on the preparation time and the bake time.

    Function that takes the number of layers you want to add to the lasagna
    and the number of minutes the lasagna has been baking as arguments and
    returns how many minutes you have spent cooking the lasagna in total.
    This includes both the preparation time and the bake time.
    """
    
    return preparation_time_in_minutes(number_of_layers) + elapsed_bake_time