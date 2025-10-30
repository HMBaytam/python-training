def bin_converter(bin_num):
    decimal_num = 0
    for index, digit in enumerate(reversed(bin_num)):
        decimal_num += int(digit) * (2 ** index)
    return decimal_num


