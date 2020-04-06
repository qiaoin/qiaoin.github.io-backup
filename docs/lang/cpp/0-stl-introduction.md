---
title: C++ 标准库
---

## 目标

- level 0: 使用 C++ 标准库
- level 1: 认识 C++ 标准库（胸中自有丘壑）
- level 2: **良好**使用 C++ 标准库
- level 3: 扩充 C++ 标准库

范型编程（Generic Programming）与面向对象编程（Object-Oriented Programming）思想完全不一样

## 六大部件

```cpp
#include <vector>
#include <algorithm>
#include <functional>
#include <iostream>

using namespace std;

int main() {
    int ia[6] = {27, 210, 12, 47, 109, 83};
    vector<int, allocator<int>> vi(ia, ia+6);

    cout << count_if(vi.beging(), vi.end(), not1(bind2nd(less<int>(), 40)));

    return 0;
}
```

- `bind2nd` C++14 弃用了
- C++11 之后开始使用 lambda 表达式了
- std::bind(std::less<int>(), std::placeholders::_1, 40)
- C++ 11 中是否推荐使用适配器呢？
