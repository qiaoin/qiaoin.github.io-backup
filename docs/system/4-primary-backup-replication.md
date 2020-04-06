---
title: Primary Backup Replication
---

fault tolerance

provide high availability

What kind of failures, replication can be expected to deal with?

- fail-stop faults: the computer simply stops executing, e.g. kicks the power calbe out of server, unplug servers' network connection, and other hardware problems
- bugs in software, or design defects in hardware

different approaches to replication

1. state transfer -- memory
  - if we have two replicas of a server, the way you cause them to stay in sync is to be actual replicas, the backup can has everything it needs to take over if the primary fails
  - the primary sends a copy of its entire state, for example the contents of its RAM to backup and the backup just stores the latest state
  - if the primary fails, the backup can start executing with this latest state
  - the primary needs to send the entire state to the backup
2. replicated state machine -- operations from clients or external inputs or external events
  - this approach observes that most services are most computer things we want to replicate have some internal operation that's deterministic except when external input comes in
  - if there is no external influences on a computer, it just execute one instruction after another, and what each instruction does is a deterministic function of what's in the memory and the registers of the computer, and it's only when external events interene that something unexpected may happen like a packet arrives and causes the server to start doing something
  - DON'T send the state between the replicas, instead they just send those external events, for example, the arriving input from the outside world that the backup needs to konw about
  - the observation is that, two computers start from the same state and they see the same inputs that in the same order at the same time, the two computrs will continue to be replicas of each other
  - usually, operations are smaller than the state
  - this scheme (VMware scheme) tends to be quite a bit more complicated, and rely on some assumptions about how the computers operate
  - 对于获取当前时间或者是获取某一唯一ID，the primary does it and sends the answer to the backup, the backup does not execute that instruction but instead at the point where it would execute that instruction, it listens for the primary to tell it what the right answer would be

在并行 parallelism 和多核 mutil-core 的情况下，会选择 state transfer scheme，在多核和并行的情况下鲁棒性更好

- At what level we're gonna replicate state?
  - replicates the full state of the machine that is all of memory and all the machine registers
  - usually, almost everything uses application at some level -- much more efficient
- How close the synchronization is?
- Cut-over?
- Anomalies
- New replicas

Both of them see inputs and only the primary generates the outputs

- Log entries on log channel
- "Go live"

Non-deterministic events

- Inputs - packet -- the content of the packet and the timing of the interrupt
- Weird instructions
- Multi-core parallelism

=》 log entries: instruction numbers, type, data

There is a timer on the physical machine that's running the FT virtual machine monitor, and the timer on the physical ticks and delivers an interrupt to the virtual machine monitor on the primary

The backup only executes if it has an event here that tells it where to stop next, so that means it starts up after the primary, because the backup can't evet start executing until the primary has generated the first event and that event has arrived at the backup, so the backup always at least one event behind the primary

arriving packets

when the packet arrives from a network interface card, if we don't run on a virtual machine, the network interface card would DMA the packet content into the memory

if we allowed the network interface card to directly DMA incoming packets into the memory of the primary applications

bounce buffer mechanism

- NIC copies incoming packets into private memory of the virtual machine monitor
- NIC interrupts the virtual machine monitor, says a packet has arrived
- the virtual machine monitor will suspend the primary and remeber what instruction number has suspended at, copy the entire packet into the primary memory

**How output works**

- the sending packets
- the primary and backup both generate outputs, but only the primary sends the output packets, and the backup discards the generated outputs

what would happen if a failure occurred?

output rules -- after the backup sends an ACK packet

the idea is that if the client could have seen the reply, then necessarily the backup must have seen the request and at least buffered it

synchronous wait -- we can't let the primary get too far ahead of the backup, because if the primary failed while it was ahead that would leaving the backup lagging behind clients

=》 this is a real limit on performance, 从 primary 发送同步结果给到 backup，到 backup 返回 ack，可能需要等待 1ms - 5ms

- 对于实时性要求不高的应用，没有什么问题；
- 对于实时性要求很高的应用，有很大的性能问题。（是由于 VM replicated state machine 是基于 low-level 的，而不是 application-level）

- before the backup can go live, it actually has to consume all the input entries

generate duplicate outputs

- 怎么解决？
- primary 和 backup 产生了相同的 packet，都发送给同一个 client，client 会收到两个回包
- client 需要有一个重复检查机制（duplicate detection scheme）
- TCP 协议栈，标识相同的 SN，会被 discard 掉一个

NON'T have to stall the execution of the primary, you only have to hold the output

if the primary and the backup can't talk to each other, but they still can talk to the clients.

by appealing to an outside authority to make the decision about which of the primary and the backup is allowed to be live

TEST-AND-SET service (replicas): Both primary and backup have to acquire this TEST-AND-SET flag, it's a bit like a lock, in order to go live. They both send TEST-AND-SET requerst at the same time to this TEST-AND-SET server.

you can't tell whether another computers is dead or not, all you know is that you stopping receiving packets from it
