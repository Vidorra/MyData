# next()函数调用并不断返回下一个值的对象称为迭代器：Iterator。
# list、dict、str虽然是Iterable，却不是Iterator。

# 判断一个对象是否可迭代
from collections import Iterable
print(isinstance([], Iterable))

from collections import Iterator
print(isinstance([], Iterator))

# 小结

# 凡是可作用于for循环的对象都是Iterable类型；

# 凡是可作用于next()函数的对象都是Iterator类型，它们表示一个惰性计算的序列；

# 集合数据类型如list、dict、str等是Iterable但不是Iterator，不过可以通过iter()函数获得一个Iterator对象。

# Python的for循环本质上就是通过不断调用next()函数实现的
