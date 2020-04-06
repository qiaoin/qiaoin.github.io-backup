---
title: 分布式系统导入
---

什么是分布式系统？

The core of a distributed system is a set of cooperating computers that are communicating with each other over network to get some coherent tasks done

- storage for big websites
- big data computations, such as MapReduce
- peer-to-peer file sharing

1. high-performance, achieve some sort of parallelism
2. fault tolerance
3. physical reasons, some problems are just naturally spread out in space
4. achieve some sort of security goal, isolated

- concurrency，并发，
- partial failures，分布式系统+网络
- performance，高性能如何达到

读论文应该要关注什么

- What the basic problems are?
- What ideas people have had that might or might not be useful in solving distributed system problems?
- Looking into implementation details in some of these papers because a lot of this has to do with actual construction of software based systems
- Looking at evaluations. How fault tolerant their systems by measuring. How much performance or whether they got performance improvement at all 

read a paper rapidly and skip over the parts that maybe aren't that important, and focus on teasing out the important ideas

Three infrastructure:

- storage -- a very well-defined and useful abstraction
- communication -- 6.829
- commputation -- MapReduce

the dream is to build an interface that looks like an application, it's a non distributed storage system just like a file system, every one knows how to program and has a pretty simple model semantics

=> build interfaces that look and act just like non distributed storage and computation systems, but they are actually extremely high performance, fault tolerant, distributed systems underneath

conventient abstractions for application programmers

Abstrations 抽象

Implementation tools

1. PC(Remote Procedure Call), mask the fact that we're communicating over an unreliable network
2. threads 
3. concurrency

Performance 性能

- scalability, scalable speed-up
- bottlenect is moving

很难，需要精密的设计

Fault tolerance

在分布式系统中，每天可能会有三台计算机出现错误

系统不再稳定

there is always failures

different kinds of failures that can occur

we must hide the failures from application programmers or masks them

Availability - under certain set of failures, we're going to continue providing service

Recoverability - if something goes wrong, 

- non-volatile storage 非易失存储，when something goes wrong, we can store a check point or a log of the state of the system
- replication, 复制

Consistency 一致性

- strong consistency - gets see most recent puts, requiering expensive communication
- weak consistency - avoid communication as much as possible

we use the replication for fault tolerance, then we really want the replicas to have independent failure probability, to have uncorrelated failure

In the search for making replicas as independent and failure as possible in order to get decent fault tolerance, people would love to put different replicas as far apart as possible like in different cities or maybe on opposite sides of the continent

MapReduce 

a framework that would make it easy for non specialists to be able to write and run giant distributed computations 

map(): takes the input data and produce a list of key-value pairs as output (intermediate output stores on local disk)
reduce(): arrange for one call to reduce() for every key that occurred in any of the map() output, fetch from every worker all of the instances of the key that it's responsible for that the master has told it to be responsible for, and once it collects all of that data, then it can call reduce()

the MapReduce framework collects together all instances from all maps of each key word

job -- map tasks and reduce tasks

wordcount 例子

map emit - produce files on the map workers local disk, accumulating all the keys and values produced by the maps run on that worker
reduce emit - write the output to a file in a cluster file service (Google File System - GFS)

Input file 1 -->  Map() --> intermediate output  --> Reduce()

Input file 2 -->  Map() --> intermediate output  --> Reduce()

Input file 3 -->  Map() --> intermediate output  --> Reduce()

what does this arrow here actually involve?

the answer changes over the year as Google involve this system

MapReduce worker process has to go off and talk across the network to the correct GFS server or maybe servers that store it's part of the input, and fetch it over the network to the MapReduce worker machine in order to pass the map()

in the world of this paper in 2004, the most constraining bottleneck in their MapReduce system was network throughput, because they were running on a network

they played a bunch of tricks to avoid sending stuff over the network when they possibly could avoid it. One of them was they would run the GFS servers and the MapReduce workers on the same set of machines.

the arrow, by default, was actually local read from the local disk and did not involve the network

Almost all the maps would be run the very same machine and stored the data, thus saving them vast amount of time that they would otherwise had to wait to move the input data across the network

Map stores this output on the local disk of the machine that you run the map on, so again storing the output of the map does not require network communication

In order to group together all of the values associated with the given key and pass them to a single invocation to produce on some machine. This is going to require network communication.

suffle phrase -- really requires moving every piece of data across the network from the map that produced it to the reduce that we need it.

it is the expensive part of the MapReduce.

batch approach v.s. streaming process

the reduce output can be the input of another MapReduce

get the output of each reduce to the GFS server

MapReduce 过程的主要网络耗时：
1）shuffle 过程
2）reduce 的结果写 GFS（GFS 会做三备份）

data center has only one root switch in 2004

In 2020, some modern data center has many root switches, and each rack switch has a connection to each of these replicated root switches, and the traffice is split up among the root switches, so modern data center networks have far more network throughput