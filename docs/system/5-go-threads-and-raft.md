---
title: Go, Threads, and Raft
---

::: warning 包含的内容
> 从助教 TA 讲的例子着手

- Go memory model
- Concurrency primitives
- Concurrency patterns
- Debugging
:::

## Go memory model

> https://golang.org/ref/mem

## Concurrency primitives

### closure 闭包

```go {7}
package main

import "sync"

func main() {
    var a string
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        a = "hello world"  // 在闭包中可以修改外层参数
        wg.Done()
    }()
    wg.Wait()
    println(a)
}
```

[WaitGroup](https://go-zh.org/pkg/sync/#WaitGroup) 的使用模式：Add - goroutine { Done } - Wait

> Typically this means the calls to Add should execute before the statement creating the goroutine or other event to be waited for.

### 闭包依赖外层参数，进行不同的操作

```go {9}
package main

import "sync"

func main() {
    var wg sync.WaitGroup
    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(x int) {
            sendRPC(x)
            wg.Done()
        }(i)
    }
    wg.Wait()
}

func sendRPC(i int) {
    println(i)
}
```

正确做法如上，需要将外层变量作为参数传递。这是因为，`for-range` 遍历时定义的 `i`，在第一次为 `0`，传入第一个 `go routine`，接下来遍历到第二个索引 `1`，传入第二个 `go routine`，希望得到 `i` 的一份 copy，而不是每次循环都更新 `i`，因为可能循环更新的时候，之前 launch 的 `go routine` 还未读取到旧的 `i`，而读取到了更新的 `i`，这是不符合预期的。

例如，Lab2 中 condidate 会向其他所有节点发送拉票请求（`RequestVote RPC`），就可以使用这种模式。

### 定时器

周期性的做某事

```go
package main

import "time"

func main() {
    time.Sleep(1 * time.Second)
    println("started")
    go periodic()
    // wait for a while so we can observe what ticker does
    time.Sleep(5 * time.Second)
}

func periodic() {
    for {
        println("tick")
        time.Sleep(1 * time.Second)
    }
}
```

start a raft here and then periodically send heartbeats, but when we call `rf.killed` on the raft instance, you want to actually show down all these goroutines

```go
package main

import "time"
import "sync"

var done bool
var mu sync.Mutex

func main() {
    time.Sleep(1 * time.Second)
    println("started")
    go periodic()
    // wait for a while so we can observe what ticker does
    time.Sleep(5 * time.Second)
    mu.Lock()
    done = true  // 在执行到这里之前，done 是默认值，false
    mu.Unlock()
    println("cancelled")
    time.Sleep(3 * time.Second) // observe no output
}

func periodic() {
    // for Lab2
    // for !rf.killed() {
    for {
        println("tick")
        time.Sleep(1 * time.Second)
        mu.Lock()
        if done {
            defer mu.Unlock()
            return
        }
        mu.Unlock()
    }
}
```

在上面这个例子中，为什么需要对 `done` 使用 `mu.Lock()/mu.Unlock()` 进行包裹？可以删掉这些 `mu.Lock()/mu.Unlock()` 吗？

如果将 `mu.Lock()/mu.Unlock()` 删掉，Go memory model 在进行编译时会进行代码优化，将对 `done` 的读取移至 `for` 循环外，因为我们去没有同步原语（synchronization primitives），mutex lock and unlock，channel sends or receives；因此，Go 认为变量 `done` 不会被其他并行线程所修改

当在访问一个共享变量时，希望在不同的 goroutines 访问这个变量，在进行读写这个变量时都去 require lock。

> Hold locks before you mutate shared variables. Locks protect invariants.

```go
func periodic1() {
    for {
        println("tick")
        time.Sleep(1 * time.Second)
        if done {
            return
        }
    }
}

func periodic2() {
    if done {
        return
    }
    for {
        println("tick")
        time.Sleep(1 * time.Second)
    }
}
```

### mutex

```go
package main

import "sync"

func main() {
    counter := 0
    var mu sync.Mutex
    var done sync.WaitGroup
    for i := 0; i < 1000; i++ {
        done.Add(1)
        go func() {
            mu.Lock()
            defer mu.Unlock()
            counter = counter + 1
            done.Done()
        }()
    }

    done.Wait()
    println(counter)
}
```

RPC handlers in the lab, handlers manipulate either read or write data on the Raft struct. And those updates should be synchronized with other concurrently happening updates.

### condition variable

whenever a Raft peer becomes a candidate, it wants to send out vote requests to all of its followers, and eventually the followers come back to the candidate and say yes or no whether or not the candidate got the vote

when we ask the peers in parallel, we don't want to wait for all responses before making up our decision; 

## Concurrency patterns


## Debugging


