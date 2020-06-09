---
title: Lab 2 - Raft
---

## 环境配置

按照 [Lab1](https://pdos.csail.mit.edu/6.824/labs/lab-mr.html) Getting started 获取到代码

> git clone git://g.csail.mit.edu/6.824-golabs-2020 6.824-labs

但按照 Lab2 执行测试时一直报错

```bash
$ go test run 2A
go: cannot find main module, but found .git/config in /Users/xxxx/6.824/labs
    to create a module there, run:
    cd ../.. && go mod init

$ cd ../.. && go mod init 6.824/labs
$ go test run 2A
config.go:11:8: local import "../labrpc" in non-local package
```

使用 `go env` 查看环境变量，发现 `GO111MODULE="on"`

> go mode 是一个包管理工具，开 on 相当于默认开启 go mod 管理，但是实验仓库不是通过 go mod 管理的，因此命令行执行 `go test` 一直提示使用 go mod

命令行执行 `go env -w GO111MODULE=off`，再次使用 `go env` 确认一下；执行 `go test run 2A` 开始进行单元测试

```bash
$ go test run 2A
Test (2A): initial election ...
--- FAIL: TestInitialElection2A (5.11s)
    config.go:330: expected one leader, got none
Test (2A): election after network failure ...
--- FAIL: TestReElection2A (5.08s)
    config.go:330: expected one leader, got none
FAIL
exit status 1
FAIL    _/Users/xxxx/6.824/labs/src/raft   12.101s
```

::: warning 怎么开始
整个实验可以先从 `src/raft/test_test.go` 的测试用例入手，在实现的过程中慢慢去了解整体框架。
:::

`raft.go` how to send and receive RPCs

## Part 2A

### 测试用例及含义

- **TestInitialElection2A**
- **TestReElection2A**

### Hints

::: tip RequestVote RPC
Invoked by candidates to gather votes (5.2)

<font color="red" ><b>Arguments:</b></font>

- **term**: candidate's term
- **candidateid**: candidate requesting vote
- **lastLogIndex**: index of candidate's last log entry (5.4)
- **lastLogTerm**: term of candidate's last log entry (5.4)

<font color="red" ><b>Result:</b></font>

- **term**: currentTerm, for candidate to update itself
- **voteGranted**: true means candidate received vote

Receiver implementation:

1. Reply false if term < currentTerm (5.1)
2. If votedFor is null or candidateId, and candidate's log is at least as up-to-date as receiver's log, grant vote (5.2 & 5.4)
:::

#### 状态转换

Raft 中，节点的状态枚举为 leader、candidate、follower；在任一时刻，server 只能为这三种状态中的其中一种。集群有以下性质：

- 在正常运行期间，集群中只有一个节点为 leader，其他节点为 follower；
- 所有 client 请求都会路由到 leader，或者是经由 follower 转发（redirects）给 leader；
- follower 都是被动接收消息，然后响应 leader（AppendEntries RPC） 或者 candidate（RequestVote RPC） 的请求，不能主动发起请求；
- candidate，为开启了一轮新的选主；

每个任期都是以一次选举开始，一个或多个 condidate 节点想要转变为 leader 节点

<div align="center"><img src="/mit-6.824-labs-figures/server-state-transitions.png" width="407px" height="168px" alt="server-state-transitions"></div>

- 集群初始化时，所有的 servers 均为 follower 节点，它们的选举超时 **election timeout** 是从固定区间如 150-300ms 取的随机值；
> If a follower receives no communication over a period of time call the ***election timeout***, then it assumes there is no viable leader and begins an election to choose a new leader.
- 第一个选举超时的 follower 发现一直未收到 leader 或 candidate 的 RPC（可能是 leader 宕机了，也可能是 leader 和当前 follower 发生了网络隔离）它就认为当前集群中并没有 leader，于是升级为 candidate，向其他 followers 发起投票请求，开始新一轮选举：
  - 选举期间，若收到本轮的 leader 请求，或发现了更新一轮的节点，则自降为 follower
  - 若本轮选举超时了还未收到大多数票，也没收到请求，则重启新一轮选举
  - 若收到来自大多数 follower 的选票，则升级为 leader
- leader 如果发现有更高任期的节点，则自降为 follower。

成为 leader 节点后，需要周期性地给其他所有节点发送心跳请求（AppendEntries RPCs that carry no log entries），告诉其他节点：leader 可以 reachable，以保持自己作为 leader 的领导地位。心跳请求的间隔时间需比选举超时的时间间隔小一个量级左右。比如每隔 50ms 并行发送一次心跳请求，对应选举超时时间设为 400ms 左右，才能让 leader 一直保持自己的领导地位。

::: tip 初始状态如何触发选主？
初始状态时，如何触发选主呢？或者如何将节点从 follower 状态切换至 candidate 状态？
:::

Raft 使用心跳机制来触发选主。集群初始化时所有节点均为 follower。一个节点要保持在 follower 状态，需要它定期能够从 leader 或 candidate 接收到 RPC 请求，但现在初始化集群所有节点均处于 follower，因此没有节点会发送 RPC 请求以让 follower 节点保持 follower 状态，这样 follower 节点就会超时，第一个超时的 follower 节点会将其状态切换为 candidate，开启第一轮选主。

#### 选主流程

