(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{310:function(e,t,a){"use strict";a.r(t);var s=a(29),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("ul",[a("li",[e._v("how to design a good interface to a big storage system")]),e._v(" "),a("li",[e._v("how to design the inner of the storage system")])]),e._v(" "),a("p",[e._v("the space of the distributed system")]),e._v(" "),a("ul",[a("li",[e._v("Why is it hard?\n"),a("ul",[a("li",[e._v("Performance -> Sharding")]),e._v(" "),a("li",[e._v("Faults -> Tolerance")]),e._v(" "),a("li",[e._v("Tolerance -> Replication")]),e._v(" "),a("li",[e._v("Replication -> In-Consistency")]),e._v(" "),a("li",[e._v("Consistency -> Low Performance")])])])]),e._v(" "),a("p",[e._v("Strong consistency / good consistency: we want to build a system whose behavior to applications or clients looks just like you would expect from talking to a single server.")]),e._v(" "),a("p",[e._v("The worst replication design")]),e._v(" "),a("p",[e._v("two servers, each with a complete copy of data, so on disks they are both these keys and values in tables")]),e._v(" "),a("p",[e._v("intuition: want to keep these tables identical so that if one server fails we can read or write from the other server. Writes must be processed by both servers and reads have to be able to be processed by a single server otherwise it's not fault tolerant")]),e._v(" "),a("p",[a("strong",[e._v("GFS")])]),e._v(" "),a("p",[e._v("Big\nFast\nGlobal\nSharding\nAutomatic recovery\nSingle data center\nInternal use\nBig sequential access, not random access\n各个想法都不是新的，但是让学术界看到工业界使用的大的分布式存储系统，并且运行的很好\nSingle master\nApplidcations 通过 checksum 去做校验，是否是 right data")]),e._v(" "),a("p",[e._v("master keeps the mapping from the file names to where to find the data")]),e._v(" "),a("p",[a("strong",[e._v("Master data")])]),e._v(" "),a("ul",[a("li",[e._v("file name -> array of chunk handles: tells you where to find the data or what the identifiers are, on disk")]),e._v(" "),a("li",[e._v("handle -> 1. list of chunk servers, not no disk\n2. every chunk has a current version number, on disk\n3. primary, not on disk\n4. a lease expiration time, not on disk")]),e._v(" "),a("li",[e._v("log, checkpoint - on disk")])]),e._v(" "),a("p",[e._v("master stores all these data on disk as well as in memory")]),e._v(" "),a("p",[e._v('whenever a file is extended with a new chunk goes to the next 64MB boundary or the version number changes because the new primary is designated, that means that the master has to first append a little record to its log basically saying "oh, I just added a chunk to this file or I just changed the version number", so every time I changes one of those that needs to writes right to its disk')]),e._v(" "),a("p",[e._v("=> there is limits the rate at which the master can change things because you can only write your disk many times per second")]),e._v(" "),a("p",[e._v("=> using a log here, rather than a database, a b-tree or a hash table on disk, you can append to a log very efficiently")]),e._v(" "),a("p",[e._v("=> checkpoints its complete state to disk")]),e._v(" "),a("p",[a("strong",[e._v("Read")])]),e._v(" "),a("p",[e._v("the application has a file name and an offset, it sends the file name and the offset to the master, and the master looks up the file name in its file table and then chunk is 64MB, and we can use the offset divided by 64MB to find which chunk and then it looks at that chunk in its chunk table to find the list of chunk servers that have replicas of that data, and returns that list to the client")]),e._v(" "),a("ol",[a("li",[e._v("filename, offset -> master")]),e._v(" "),a("li",[e._v("Master sends chunk handler, list of chunk server\nClient cached the result")]),e._v(" "),a("li",[e._v("Client talk to the chunk server, the chunk server sends the data to the client")])]),e._v(" "),a("p",[a("strong",[e._v("Write")])]),e._v(" "),a("p",[e._v("record appends")]),e._v(" "),a("ol",[a("li",[e._v("clent asks the master to tell about the chunk servers that hold the very last current chunk in this file")])]),e._v(" "),a("p",[e._v("No primary?")]),e._v(" "),a("ul",[a("li",[e._v("the master needs to find out the set of chunk servers that have the most up-to-data copy of the chunk => find out up-to-date replicas\n"),a("ul",[a("li",[e._v('"up-to-date": a replica whose version of the chunk is equal to the version number that the master knows is the most up-to-date version numbers')]),e._v(" "),a("li",[e._v("master memorys the version numbers on disk")])])]),e._v(" "),a("li",[e._v("the master picks one of them to be the primary, and the others to be secondary servers among the replicas set at the most recent version")]),e._v(" "),a("li",[e._v("the master increments the version number, and writes that to disk")]),e._v(" "),a("li",[e._v('the master tells the client the primary, the secondary servers, and the most recent version number, and the primary, the secondary servers store the version on their own disks, the master also gives the primary a lease which basically tells the primary "you are allowed to be primary for the next 60s, after 60s you have to stop"')]),e._v(" "),a("li",[e._v("the master writes the version number on disk")])]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("the client now konws who the primary and the secondaries are")]),e._v(" "),a("li",[e._v("the primary picks an offset, and all replicas including the primary are told to write the new appended record at that offset")]),e._v(" "),a("li",[e._v('if a secondary actually wrote the data to its disk at that offset, it will reply "yes" to the primary')]),e._v(" "),a("li",[e._v('if the primary collects a "yes" answer from all of the secondaries, the primary reply "success" to the client')])]),e._v(" "),a("ul",[a("li",[e._v('if the primary doesn\'t get the "yes" answer from one of the secondaries or the secondary replay "sorry" something bad, then the primary replies "no" to the client')]),e._v(" "),a("li",[e._v("if the client gets an error like that back from the primary, the client is supposed to reissue the entire append sequence")])]),e._v(" "),a("p",[e._v("the master needs to assemble the list of chunk servers that have the most recent version number, the master know the most recent version number stored on disk")]),e._v(" "),a("p",[e._v("each chunk server along with each chunk also remembers the version number of the chunk that it stores")]),e._v(" "),a("p",[e._v("if the master reboots and talks to chunk servers, and one of the chunk servers reboot and reports a version number that is higher than the version number the master remembers, then the master assumes that there was a failure while it was assigning a new primary and adopts the higher version number that it heard from the a chunk server")]),e._v(" "),a("p",[e._v("split brain")]),e._v(" "),a("p",[e._v("network partition: some network error which the master can't talk to the primary, but the primary can talk to clients, partial network failure")]),e._v(" "),a("p",[e._v("避免给同一个 chunk 同时分配两个 primary")]),e._v(" "),a("ul",[a("li",[e._v("master 在分配一个 primary 时，同时给它一个 lease，the right to be primary until a certain time")]),e._v(" "),a("li",[e._v("the master remembers and knows how long the lease lasts")]),e._v(" "),a("li",[e._v("the primary know how long the lease lasts, if the lease expires, the primary will simply stop executing client requests (ignore or reject)")]),e._v(" "),a("li",[e._v("if the master can't talk to the primary, the master would like to designate a new primary, the master must wait for the lease to expire for the previous primary")])]),e._v(" "),a("p",[e._v("true GFS to Strong consistency")]),e._v(" "),a("ul",[a("li",[e._v("the primary needs to detect duplicate requests")]),e._v(" "),a("li",[e._v("when the primary asks the secondaries to append something, the secondaries have to be able to execute it successfully, and have to be careful not to expose that data to readers until the primary is sure that all the secondaries really will be able to execute the append\n"),a("ul",[a("li",[e._v("first phase: the primary asks the secondaries to do this append operation")]),e._v(" "),a("li",[e._v("all the secondaries promose to be able to do the operation, only then the primary says ok you can do this append operation")]),e._v(" "),a("li",[e._v("two-phase commit")])])]),e._v(" "),a("li",[e._v("if the primary crashes, 从 secondaries 选出新的 primary, 需要确定现在的操作执行到了哪里")])]),e._v(" "),a("p",[e._v("the most serious limitation:")]),e._v(" "),a("p",[e._v("a single master and the master had to have a table entry for every file and every chunk, that means does the GFS use grew and they're about more and more files, the master just ran out of the memory to store the files")]),e._v(" "),a("p",[e._v("the load on a single master from thousands of clents started to be too much in the master kernel")]),e._v(" "),a("p",[e._v("the master was not an automatic store for master failover in the original GFS paper, it required human intervention to deal with a master that had permanently crashed and needs to be replaced, and that cound take tens of minutes or more, it was too long for failure recovery for some applications")])])}),[],!1,null,null,null);t.default=r.exports}}]);