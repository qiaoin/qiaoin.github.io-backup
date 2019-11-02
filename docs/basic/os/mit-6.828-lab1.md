---
title: Lab 1 - Booting a PC
---

# [Lab1: Booting a PC](https://pdos.csail.mit.edu/6.828/2018/labs/lab1/)

> 【实验一于2019年4月3日开始做，环境配置及 Exercises，于4月6日完成，初稿报告4月7日】

实验分为三个部分：

- 1）`bootstrap` 执行流程，熟悉 x86 汇编，QEMU x86 模拟器，PC's power
- 2）`lab/boot` 目录，bootloader
- 3）`lab/kernel` 目录，JOS 内核初始化模块

## Part 1: PC Bootstrap

::: tip Exercise 1
熟悉内联汇编
:::

阅读 [Brennan's Guide to Inline Assembly](http://www.delorie.com/djgpp/doc/brennan/brennan_att_inline_djgpp.html)，JOS 里面会使用 AT&T 语法。另外还有更详细的参考资料：

- [80386 Programmer's Reference Manual](https://pdos.csail.mit.edu/6.828/2018/readings/i386/toc.htm) 包含在 6.828 中将要使用到的所有处理器特性的介绍
- [IA-32 Intel Architecture Software Developer's Manuals](https://software.intel.com/en-us/articles/intel-sdm)
- [AMD64 Architecture Programmer's Manual](https://developer.amd.com/resources/developer-guides-manuals/)
- 推荐阅读 [最牛 X 的 GCC 内联汇编](https://www.linuxprobe.com/gcc-how-to.html)，查看更完整的内容，整理的内容足够阅读内联汇编代码

**【准备工作】为了进行下面的实验，需要进行一些配置**：

1. 按照 [Tools Used in 6.828](https://pdos.csail.mit.edu/6.828/2018/tools.html) 进行配置，macOS 需要按照网页说明安装定制化的 QEMU 模拟器
    - 安装 QEMU 的依赖文件，`brew install $(brew deps qemu)`
    - 安装定制的 QEMU，假设安装在用户主目录下的 `~/opt/` 下，即 `./configure` 时指定 `--prefix=/Users/xxxx/opt`
    - Install 步骤 `PATH=${PATH}:/usr/local/opt/gettext/bin make install`
2. 安装 `i386` 相关依赖包 `brew install i386-elf-binutils i386-elf-gcc i386-elf-gdb`
3. 不修改各个实验的 Makefile，转而修改用户主目录（`~`）下的 `.zshenv` (或者对应的 `.bashrc`)，这是对当前用户环境变量的全局修改
    - 找到 QEMU 可执行文件，`export PATH="/Users/xxxx/opt/bin:$PATH"`
    - 添加 `GCCPREFIX`，`export GCCPREFIX="i386-elf-"`
    - 添加 `gdb` 同名，`alias gdb="i386-elf-gdb"`

::: tip Exercise 2
使用 GDB 进行调试，跟踪 ROM BIOS 指令的执行
:::

1. 打开两个终端，`cd ~/6.828/lab`，到达相同的目录
2. 一个终端启动 QEMU 模拟器的 GDB 模式执行 `make qemu-nox-gdb`，QEMU 在第一条指令之前暂停，等待 GDB 的连接
3. 另一个终端执行 `gdb`（这里不是如 [Lab 1](https://pdos.csail.mit.edu/6.828/2018/labs/lab1/) 官网说明的执行 `make gdb`，而是执行 `gdb`，需要注意）

最开始是一条跳转指令，跳转到 `0xfe05b` 进行执行：

```shell-session
[f000:fff0]    0xffff0:  ljmp   $0xf000,$0xe05b  # 跳转指令
```

使用 `si` 单步执行

```shell-session
[f000:d15f]    0xfd15f:   cli                    # 关闭中断
[f000:d171]    0xfd171:   lidtw  %cs:0x6ab8
[f000:d177]    0xfd177:   lgdtw  %cs:0x6a74      #
[f000:d17d]    0xfd17d:   mov    %cr0,%eax
[f000:d180]    0xfd180:   or     $0x1,%eax
[f000:d184]    0xfd184:   mov    %eax,%cr0       # cr0 最低位置 0
```

BIOS 建立中断描述符表和初始化一系列硬件设备，进行一些检验工作，之后搜索可启动的设备，**加载该存储设备上的第一个扇区的 512 字节到内存的 0x7C00**（这是 BIOS 固件完成的），然后跳转到 `@0x7C00` 的第一条指令开始执行（**将控制权转移给 bootloader**）

设置断点在 `0x7C00`，`b *0x7c00`，继续执行 `c(ontinue)`

```shell-session
[   0:7c00] => 0x7c00:    cli
[   0:7c01] => 0x7c01:    cld

[   0:7c1e] => 0x7c1e:    lgdtw  0x7c64
[   0:7c23] => 0x7c23:    mov    %cr0,%eax
[   0:7c26] => 0x7c26:    or     $0x1,%eax
[   0:7c2a] => 0x7c2a:    mov    %eax,%cr0
[   0:7c2d] => 0x7c2d:    ljmp   $0x8,$0x7c32
```

执行 `x/Ni ADDR` 打印从 `ADDR` 地址开始的连续 `N` 条汇编指令（以上关于 BIOS 的部分不是 6.828 重点关注的部分，执行时单步跟踪能够看出一点端倪，具体在 lab 实验目录中没有源码对应）

## Part 2: The Boot Loader

源代码：1）汇编源文件 `boot/boot.S`，2）C 源文件 `boot/main.c`。bootloader 主要做三件事：

1）从实模式（real mode）切换到保护模式（32-bit protected mode）。在实模式下只能寻址 1MB 的内存空间（2^20），在保护模式下能够寻址 4GB（2^32），这样就能够访问处理器全部的物理内存空间
2）读取内核映像到内存中固定位置，ELF 文件格式（解析 ELF 文件，将内核需要加载进入内存的段 <有 LOAD 标记的段> 加载进内存，放置在指定的加载地址）
3）把控制权转移给 JOS，即将 `CS:EIP` 的值指向操作系统内核所在内存中的起始点（`.text` 段中程序开始执行时的起始地址）

两个源文件代码的阅读：

- **`boot/boot.S`**：执行 `start` 函数，进行一定的初始化，完成从实模式到保护模式的切换（`CR0` 最低位置 1），并调用 `bootmain` 函数，具体细节参见 bootloader 实模式切换到保护模式（Google 一下）
- **`boot/main.c`**：bootloader 让 CPU 进入保护模式后，下一步的工作就是**从硬盘上加载并运行 OS**。考虑到实现的简单性，bootloader 的访问硬盘都是 LBA 模式 的 PIO（Program IO）方式，即所有的 IO 操作是通过 CPU 访问硬盘的 IO 地址寄存器完成。当前硬盘数据是储存到硬盘扇区中，一个扇区大小为 512 字节。读一个扇区的流程（可参看 readsect 函数实现，大致理解就可以）大致如下：
    1. 等待磁盘准备好；
    2. 发出读取扇区的命令；
    3. 等待磁盘准备好；
    4. 把磁盘扇区数据读到指定内存。

主要查看 `bootmain` 函数实现：

```c {9}
#define SECTSIZE    512                      // 扇区大小 512 字节
#define ELFHDR      ((struct Elf *) 0x10000) // 将 0x10000 设置为内核起始地址

void bootmain(void)
{
    struct Proghdr *ph, *eph;

    // 从0开始读取 8*512=4096byte 的内容到 ELFHDR（4KB）
    readseg((uint32_t) ELFHDR, SECTSIZE*8, 0);  // 1.

    // is this a valid ELF?
    if (ELFHDR->e_magic != ELF_MAGIC)
        goto bad;

    // load each program segment (ignores ph flags)
    ph = (struct Proghdr *) ((uint8_t *) ELFHDR + ELFHDR->e_phoff);  // 2.
    eph = ph + ELFHDR->e_phnum;
    for (; ph < eph; ph++)
        // p_pa is the load address of this segment (as well
        // as the physical address)
        readseg(ph->p_pa, ph->p_memsz, ph->p_offset);  // 3.

    // call the entry point from the ELF header
    // note: does not return!
    ((void (*)(void)) (ELFHDR->e_entry))();  // 4.
}
```

关键的几行代码已经标注序号，需要结合下面 ELF 文件格式来进行理解。

1. 将 `ELFHDR` 从磁盘中读取到内存指定位置，`0x10000`；
2. 对 `ELFHDR` 格式进行解析，得到 program header table 的起始地址存放在 `ph` 中，结束地址存放在 `eph` 中。这里将 `ELFHDR` 进行转型为 `uint8_t` 指针，做加法这个指针变量按照 byte 的偏移来加，得到 program header table 的起始地址，并转换为 `struct Proghdr` 类型指针

    ```c
    ph = (struct Proghdr *) ((uint8_t *) ELFHDR + ELFHDR->e_phoff);
    ```

3. 根据每个 program header 的信息读取各个段进入内存指定位置，从 `ph->p_offset` 开始拷贝 `ph->p_memsz` 个 bytes 到 `ph->p_pa`

    ```c
    readseg(ph->p_pa, ph->p_memsz, ph->p_offset);
    ```

4. 在将内核加载到内存中后，转移到 entry point 开始执行，即 JOS 开始运行时要执行的第一条指令的地址。这里将 `e_entry` 转换为一个无参数无返回值的函数，并进行函数调用

    ```c
    ((void (*)(void)) (ELFHDR->e_entry))();
    ```

::: tip Exercise 3
使用 GDB 单步跟踪执行
:::

设置断点在 `0x7C00`，`b *0x7c00`，另外还设置两个断点：

1. `b *0x7d56`，`bootmain` 函数 `for` 循环开始处
2. `b *0x7d71`，ELF 调用 entry point 处

继续执行 `c(ontinue)`，就可以看到 `for` 循环处的断点 hit 3 次（最后一次是判断 `for` 循环条件不成立），说明根据 ELF header 信息读入了另外 2 个段（`.text`/`.data`，可以使用 `i386-elf-objdump -x obj/kern/kernel` 命令查看到 Program Header）。执行到达 `0x7d71` 处时，对应汇编指令为：

```shell-session
0x7d71: call   *0x10018
```

但 `si` 单步执行的真实地址为 `0x1000c`

```shell-session
(gdb) x/10i 0x10000c
=> 0x10000c:    movw   $0x1234,0x472
   0x100015:    mov    $0x110000,%eax
   0x10001a:    mov    %eax,%cr3
   0x10001d:    mov    %cr0,%eax
   0x100020:    or     $0x80010001,%eax
   0x100025:    mov    %eax,%cr0
   0x100028:    mov    $0xf010002f,%eax
   0x10002d:    jmp    *%eax                <- 0xf010002f <relocated>
   0x10002f:    mov    $0x0,%ebp
   0x100034:    mov    $0xf0110000,%esp
```

回答以下 4 个问题：

1. At what point does the processor start executing 32-bit code? What exactly causes the switch from 16- to 32-bit mode?

    使能保护模式（置 CR0 最低位为 1）和段机制（建立好全局描述符表 GDT）。执行一条长跳转指令 ljmp cs:eip 转而执行 32-bit mode

2. What is the last instruction of the boot loader executed, and what is the first instruction of the kernel it just loaded?

    ```shell-session
    call   *0x10018
    0x10000c:  movw   $0x1234,0x472
    ```

    这两个地址不相同，这是为什么？因为开启了分页机制，虚拟地址与物理地址之间的映射关系已建立好

3. Where is the first instruction of the kernel?

    0x10000c

4. How does the boot loader decide how many sectors it must read in order to fetch the entire kernel from disk? Where does it find this information?

    ```c
    // load each program segment (ignores ph flags)
    ph = (struct Proghdr *) ((uint8_t *) ELFHDR + ELFHDR->e_phoff);  // ii
    eph = ph + ELFHDR->e_phnum;
    ```

::: tip Exercise 4
C 语言中的指针
:::

C 程序设计语言 第 5 章 数组与指针 5.1 - 5.5（待读，之前已经看过好几遍了）

### ELF 文件格式

ELF header + 待加载的信息（包含连续的多个段，数据段和代码段等，这些段需要被加载到内存的指定地址）。bootloader 不会去修改数据段和代码段，只是将它们加载进内存，然后将控制权转移给这些程序进行执行

ELF header 长度固定（fixed-length），后跟可变长度（variable-length）的 program header，列出了要加载的各个程序段（program sections）。`inc/elf.h` 定义了 `ELF header`

```c
struct Elf {            // ELF 文件头
    uint32_t e_magic;   // must equal ELF_MAGIC
    uint8_t e_elf[12];
    uint16_t e_type;
    uint16_t e_machine;
    uint32_t e_version;
    uint32_t e_entry;   // 程序开始执行的起始地址
    uint32_t e_phoff;   // program header table 的起始位置
    uint32_t e_shoff;   // section header 的起始位置
    uint32_t e_flags;
    uint16_t e_ehsize;  // ELF 文件本身的大小
    uint16_t e_phentsize;
    uint16_t e_phnum;   // program header 的个数
    uint16_t e_shentsize;
    uint16_t e_shnum;
    uint16_t e_shstrndx;
};

struct Proghdr {        // program header table
    uint32_t p_type;
    uint32_t p_offset;
    uint32_t p_va;      // 虚拟地址
    uint32_t p_pa;      // 物理地址
    uint32_t p_filesz;  // 段在文件中的大小
    uint32_t p_memsz;   // 段在内存中的大小
    uint32_t p_flags;   // 读写执行权限
    uint32_t p_align;
};
```

这里为什么需要 `p_filesz`、`p_memsz` 两个长度呢？在之后会介绍到，`.bss` 在磁盘上没有存储空间，在内存中程序需要为其分配空间

bootloader 利用 ELF program header 来决定如何加载各 program sections，而 program header 指定应该读取 ELF 对象的哪个部分进内存，以及应该放在哪里

<img src="/mit-6.828-lab1-figures/elf-layout.png" width="322px" height="358px" alt="elf-layout">[Wikipedia](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)

在 6.828 实验中将用到的 program sections：

- **`.text`**：代码段。程序的可执行指令
- `.rodata`：只读数据段。例如 C 编译器产生的 ASCII 字符串常量
- **`.data`**：数据段。已初始化的全局变量和局部静态变量
- `.bss`：为未初始化的全局变量和局部静态变量预留位置，但并没有内容，因此在文件中也不占据磁盘空间。由于未初始化的全局变量和局部静态变量默认值都是 0，本来它们也可以被放在 `.data` 段里，但是因为它们都是 0，为它们在 `.data` 段分配空间并存放数据 0 是没有必要的
- **`.stab`**：符号表部分，在程序报错时提供错误信息
- **`.stabstr`**：符号表字符串部分
- ...

```shell-session {1}
i386-elf-objdump -h obj/kern/kernel

obj/kern/kernel:     file format elf32-i386
Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .text         0000171e  f0100000  00100000  00001000  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  1 .rodata       00000714  f0101720  00101720  00002720  2**5
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  2 .stab         000040ed  f0101e34  00101e34  00002e34  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  3 .stabstr      00001957  f0105f21  00105f21  00006f21  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  4 .data         0000a300  f0108000  00108000  00009000  2**12
                  CONTENTS, ALLOC, LOAD, DATA
  5 .bss          00000648  f0112300  00112300  00013300  2**5
                  CONTENTS, ALLOC, LOAD, DATA
  6 .debug ......
  ......
```

得到 ELF 文件各个段的基本信息，可以知道很多段都是 Debug 信息（program loader 不会将这些段加载进内存）

查看更详细的信息：

```shell-session {1}
i386-elf-objdump -x obj/kern/kernel

obj/kern/kernel:     file format elf32-i386
obj/kern/kernel
architecture: i386, flags 0x00000112:
EXEC_P, HAS_SYMS, D_PAGED
start address 0x0010000c

Program Header:
    LOAD off    0x00001000 vaddr 0xf0100000 paddr 0x00100000 align 2**12
         filesz 0x00007878 memsz 0x00007878 flags r-x
    LOAD off    0x00009000 vaddr 0xf0108000 paddr 0x00108000 align 2**12
         filesz 0x0000a948 memsz 0x0000a948 flags rw-

Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .text         0000171e  f0100000  00100000  00001000  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  1 .rodata       ...
  2 .stab         ...
  3 .stabstr      ...
  4 .data         0000a300  f0108000  00108000  00009000  2**12
                  CONTENTS, ALLOC, LOAD, DATA
  ......
```

对于内核映像，其链接地址和加载地址不同，内核希望 bootloader 将其加载到低物理地址处（**`0x00100000`** 最下面的 1MB 处），但是期望在高地址（虚拟地址）处进行执行（**`0xf0100000`**）。这里带标识 `LOAD` 的 Program Header 段（可能一个段包含多个 Sections，`.data`/`.text`/etc.），即多个 Sections 被同时加载进入内存

### 链接地址和加载地址（link address and load address）

我们关注 `.text` 段的 `VMA`(or link address，虚拟地址) 和 `LMA`(or load address，物理地址)。段的 `LMA`(load address)指定了将这个段加载进内存时需要放置的物理地址。段的 `VMA`(link address)指定了程序执行时这个段需要放置在内存中的虚拟地址。为了保证程序能够正常的执行，需要进行链接。

**链接地址实际上就是程序自己假设在内存中存放的地址，即编译器在编译的时候会认定程序将会连续的存放在从起始处的链接地址开始的内存空间。而加载地址这是可执行程序在物理内存中真正存放的位置**，在 JOS 中，bootloader 是被 BIOS 装载到内存的，由于 BIOS 实际上规定 bootloader 要被存放在物理内存的 `0x7c00` 处，于是不论程序的链接地址怎么改变，它装载在内存中的位置（加载地址）都不会变化。

**链接地址是指令运行时的地址，加载地址是指令加载到内存中的地址。实模式下这两个地址是一样的，因为没有开启分页机制，指令执行的时候就没有地址映射关系**。

我们可以看到 bootloader 的链接地址和加载地址是相等的，为 `0x7c00`

```shell-session {1}
i386-elf-objdump -h obj/boot/boot.out

obj/boot/boot.out:     file format elf32-i386
Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .text         0000018c  00007c00  00007c00  00000054  2**2
                  CONTENTS, ALLOC, LOAD, CODE
  1 .eh_frame     0000009c  00007d8c  00007d8c  000001e0  2**2
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  2 .stab         00000744  00000000  00000000  0000027c  2**2
                  CONTENTS, READONLY, DEBUGGING
  3 .stabstr      000008e1  00000000  00000000  000009c0  2**0
                  CONTENTS, READONLY, DEBUGGING
  4 .comment      00000011  00000000  00000000  000012a1  2**0
                  CONTENTS, READONLY
```

::: tip Exercise 5
修改 `boot/Makefrag`，将 bootloader 的 link address 改为非 `0x7c00` 的数值，看看会出现什么问题？
:::

在 `boot/Makefrag` 中指定了 bootloader 的链接地址 `-Ttext 0x7C00`，现在我们将链接地址修改为 `0x8C00`，重新编译

1. 设置断点 `b *0x7c00`，BIOS 一定会将 bootloader 加载到这个位置
2. `si` 单步跟踪执行，执行到 `0x7c2d: ljmp $0x8,$0x8c32` 指令时发生错误
3. 查看编译同时生成的反汇编文件 `obj/boot/boot.asm`，其中显示了汇编指令和相应的链接地址，由于我们修改了 bootloader 的链接地址为 `0x8c00`，`“ljmp   $0x8,$0x8c32”` 这条指令在 `boot.asm` 文件中显示的实际汇编地址为 `0x8c2d`，其后的 `protcseg` 标识的指令的链接地址为 `0x8c32`，即 `si` 单步执行到 `0x8c2d` 处需要跳转到的标识符地址
4. CPU 报错？为什么会报错呢？链接是怎么做的？

`VMA`/`LMA` 是给加载器做参考，告诉加载器“需要将某个段加载到某某地址”，但现在连操作系统都还没有运行起来，更不会有加载器。因此，bootloader 的源代码还是会被加载到内存的 `0x7c00` 处（因为 BIOS 在 ROM，里面的程序代码是在出厂时就已经规定好了的，将磁盘的第一个扇区加载到内存的 `0x7c00` 处）。链接最重要的一步是符号重定位（symbol relocation），在源代码 `boot/boot.S` 中：

```asm6502 {5}
  # Jump to next instruction, but in 32-bit code segment.
  # Switches processor into 32-bit mode.
  ljmp    $PROT_MODE_CSEG, $protcseg
  .code32                     # Assemble for 32-bit mode
protcseg:
  # Set up the protected-mode data segment registers
```

这里的 `protcseg` 符号（symbol）用来标记位置，可以是一段子程序的起始地址，也可以是一个变量的起始地址。在这里 `protcseg` 表示一段程序的起始地址，在编译生成可重定位目标文件（relocatable object file）时其值是不确定的。在链接时，链接器会对这些符号进行替换（因为程序已经链接好了）

现在的问题是，链接器按照 `0x8C00` 的链接起始地址对这些符号进行替换，但 BIOS 还是将 bootloader 读到了内存中的 `0x7C00` 处，实模式下（仅开启了段机制），加载地址和链接地址应该是相同的。而现在，`ljmp` 指令要跳转到 `0x8c32` 处，本来应该跳转到下一条指令 `0x7c32` 处【TODO 需要更加细致的分析！】

```shell-session {6}
(gdb) x/10i 0x7c1e
   0x7c1e: lgdtw  -0x739c
   0x7c23: mov    %cr0,%eax
   0x7c26: or     $0x1,%eax
   0x7c2a: mov    %eax,%cr0
=> 0x7c2d: ljmp   $0x8,$0x8c32
   0x7c32: mov    $0xd88e0010,%eax
   0x7c38: mov    %ax,%es
   0x7c3a: mov    %ax,%fs
   0x7c3c: mov    %ax,%gs
   0x7c3e: mov    %ax,%ss
```

::: tip Exercise 6
执行 `x/Nx ADDR` 打印从 `ADDR` 开始的 `N` 个 word（在 GNU 汇编标准中，1 word = 2 bytes）。在两个不同的时刻检查 `0x00100000` 出的 8 个 word，1）BIOS 将控制权转移给 bootloader 和 2）bootloader 将 JOS 内核映像读入内存之后，将控制权转移给 JOS（entry point），有什么不一样，并且为什么这 8 个 word 会不一样？
:::

1. 关闭 QEMU 和 GDB，重新运行；
2. 设置断点 `b *0x7c00`（BIOS 将控制权转移给 bootloader）和 `b *0x7d71`（bootloader 将控制权转移给 JOS）

<img src="/mit-6.828-lab1-figures/ex-6.png" width="600px" height="501px" alt="ex-6">

前后两次执行 `x/Nx ADDR` 结果不一样，第二次是因为我们使用 bootloader 将 JOS 的程序段（Program Header 中有 `LOAD` 标记的段）加载到了 `0x100000` 处，因此，从 `0x100000` 开始都存放着 **JOS 内核映像**。

## Part 3：The Kernel

操作系统内核一般链接地址都比较大，会选择在高虚拟地址空间上运行，将低虚拟地址空间留给用户程序使用（在 Lab2 中会进行更清晰的解释）

很多机器的物理内存空间地址都不会到达 **`0xf010002f`**，因此 JOS 内核映像不会真实存储于此，而是，我们使用处理器的内存管理硬件（memory management hardware）将高虚拟地址空间 **`0xf0100000`**（内核的链接地址，期望运行的虚拟地址）映射到实际的低物理地址空间 **`0x00100000`**（内核的加载地址，bootloader 将内核映像加载进内存中的地址），bootloader 加载磁盘上的内核映像存放在内存中的地址为 **`0x00100000`**（刚好在 BIOS ROM 的上面，从 1MB 地址往上），可以查看命令 `i386-elf-objdump -x obj/kern/kernel` 的返回内容

`kern/entrypgdir.c` 中已经建立好了虚拟地址和物理地址的映射关系 `entry_pgdir`：

- Map VA's [0, 4MB) to PA's [0, 4MB)
- Map VA's [`KERNBASE`, `KERNBASE`+4MB) to PA's [0, 4MB) 其中，`KERNBASE=0xF0000000`

在 `kern/entry.S` 中会对 `CR0_PG` flag 进行设置，在此设置之前，代码中对内存的引用（memory references）都会被解释为物理地址（更准确的说是线性地址，在 `boot/boot.S` 中仅开启段机制，线性地址与物理地址相等），当对 `CR0_PG` 设置之后，对内存的引用将被解释为虚拟地址（即开启页机制），再由 `entry_pgdir` 翻译为对应的物理地址

- 将 `0xf0000000 ~ 0xf0400000` 虚拟地址翻译为对应的物理地址 `0x00000000 ~ 0x00400000`
- 将 `0x00000000 ~ 0x00400000` 虚拟地址翻译为对应的物理地址 `0x00000000 ~ 0x00400000`

在内核被加载到内存后系统便立即跳转开始执行 `kern/entry.S` 的代码，这个文件中的程序相当于内核的入口程序

```asm6502
.globl      _start
_start = RELOC(entry)

.globl entry
entry:
    movw    $0x1234,0x472           # warm boot

    # We haven't set up virtual memory yet, so we're running from
    # the physical address the boot loader loaded the kernel at: 1MB
    # (plus a few bytes).  However, the C code is linked to run at
    # KERNBASE+1MB.  Hence, we set up a trivial page directory that
    # translates virtual addresses [KERNBASE, KERNBASE+4MB) to
    # physical addresses [0, 4MB).  This 4MB region will be
    # sufficient until we set up our real page table in mem_init
    # in lab 2.

    # Load the physical address of entry_pgdir into cr3.  entry_pgdir
    # is defined in entrypgdir.c.
    movl    $(RELOC(entry_pgdir)), %eax
    movl    %eax, %cr3
    # Turn on paging.
    movl    %cr0, %eax
    orl $(CR0_PE|CR0_PG|CR0_WP), %eax
    movl    %eax, %cr0

    # Now paging is enabled, but we're still running at a low EIP
    # (why is this okay?).  Jump up above KERNBASE before entering
    # C code.
    mov $relocated, %eax  # $relocated 为链接地址，因此需要重定位
    jmp *%eax
relocated:

    # Clear the frame pointer register (EBP)
    # so that once we get into debugging C code,
    # stack backtraces will be terminated properly.
    movl    $0x0,%ebp           # nuke frame pointer

    # Set the stack pointer
    movl    $(bootstacktop),%esp

    # now to C code
    call    i386_init
```

::: tip Exercise 7
使用 QEMU 和 GDB 单步跟踪 JOS，执行到 `movl %eax, %cr0`，检查在执行这条汇编指令前后内存单元 `0x00100000` 和 `0xf0100000` 的内容
:::

1. 设置断点 `b *0x7d71`（bootloader 将控制权转移给 JOS）
2. `si` 单步跟踪执行

```shell-session {1}
=> 0x100025:    mov    %eax,%cr0
(gdb) x/8x 0x00100000
0x100000:                       0x1badb002 0x00000000 0xe4524ffe 0x7205c766
0x100010:                       0x34000004 0x0000b812 0x220f0011 0xc0200fd8
(gdb) x/8x 0xf0100000
0xf0100000 <_start+4026531828>: 0x00000000 0x00000000 0x00000000 0x00000000
0xf0100010 <entry+4>:           0x00000000 0x00000000 0x00000000 0x00000000
(gdb) si
=> 0x100028:    mov    $0xf010002f,%eax
(gdb) x/8x 0x00100000
0x100000:                       0x1badb002 0x00000000 0xe4524ffe 0x7205c766
0x100010:                       0x34000004 0x0000b812 0x220f0011 0xc0200fd8
(gdb) x/8x 0xf0100000
0xf0100000 <_start+4026531828>: 0x1badb002 0x00000000 0xe4524ffe 0x7205c766
0xf0100010 <entry+4>:           0x34000004 0x0000b812 0x220f0011 0xc0200fd8
```

执行 `mov %eax, %cr0` 之后，建立好了虚拟地址和物理地址的映射关系。如果将这条指令给注释掉，重新编译执行，同样设置断点，在 `0xf010002c <relocated>: add %al,(%eax)` 处 QEMU 出错退出，出错信息为：“qemu: fatal: Trying to execute code outside RAM or ROM at 0xf010002c”

### cprintf 函数的实现（C 语言中常用的 printf 函数）

三个源文件代码的阅读：【TODO 分析并实现 printf 函数，包括实现浮点数打印】

- `kern/printf.c`：封装格式化输出函数，提供 `cprintf` 函数接口
- `lib/printfmt.c`：格式化字符串输出，需好好学习这个源码文件
- `kern/console.c`：实现基本的 I/O 操作，提供 `cputchar`/`getchar` 供 `readline`/`cprinf` 使用

::: tip Exercise 8
填充代码，支持使用 "%o" 打印八进制数（这个很简单，模仿着写，但需理解）
:::

```c
        // (unsigned) octal
        case 'o':
            num = getuint(&ap, lflag);
            base = 8;
            goto number;
```

在 `kern/init.c i386_init()` 函数中添加测试代码

### 栈

几条与栈相关的汇编指令解释

| 汇编指令       | 解释           |
| ------------- | ------------- |
| pushl %eax    | subl $4, %esp; movl %eax, (%esp) |
| popl %eax     | movl (%esp), %eax; addl $4, %esp |
| call 0x1234   | pushl %eip; movl 0x1234, %eip    |
| ret           | popl %eip                        |

（注：这里为了解释清晰，右侧指令大都不规范）

**栈的生长方向是高地址到低地址**，esp 指向栈顶（低地址），ebp 指向栈底（高地址）

1. 当进入一个函数（callee）进行执行时，将调用者（caller）的 ebp 压入栈
2. 给 `ebp` 赋新值为当前 `esp`（`ebp` 为 callee 的栈帧栈底）

<img src="/mit-6.828-lab1-figures/my-func-enter-call.png" width="823px" height="216px" alt="my-func-enter-call">

现在就建立好了一个**函数调用的链接关系**（类似链表），根据当前正在执行的函数找到 `ebp` 的值，其为一个地址，该地址中存储的值为调用者的 `ebp`

```c {1}
uint32_* ebp = (uint32_t*)read_ebp();  // 得到 callee 的 ebp
while (ebp) {  // 这里可以直接这样写，因为最初始化栈之前 ebp 的值为 NULL
    ......// 得到返回值和函数调用的参数，进行处理
    ebp = (uint32_t*)(*ebp);  // 对当前 ebp 存储地址解引用就能够得到存储的 caller 的 ebp
}
```

<img src="/mit-6.828-lab1-figures/stack-frame.png" width="390px" height="378px" alt="stack-frame">

::: tip Exercise 9
确定栈是怎么初始化的？
:::

1. 设置断点 `b *0x7d71`，`si` 单步执行，对应的源码在 `kern/entry.S`
2. 对 `CR0` 进行设置，开启分页机制，然后执行跳转到 `relocated` 标识处开始运行
3. **将 `ebp` 设置为 `NULL`**（在进行函数调用栈分析的时候使用 `NULL` 作为结束标识），在 `.data` 段设置的栈顶地址给 `esp`（高地址，`0xf0110000`，虚拟地址），预留了栈空间。这里定义了两个全局变量 `bootstack` 和 `bootstacktop`，`bootstack` 标识了内存中的一个位置，表示从这里开始的 `KSTKSIZE` 个字节的区域都是属于这个临时堆栈的（`KSTKSIZE` 在 `inc/memlayout.h` 中定义为 32K），`bootstacktop` 指向这段区域后的第一个字节，由于刚开始堆栈是空的，所以栈顶便是 `bootstacktop` 所指向的位置【TODO 这里还是有点模糊】

```asm6502 {21}
    relocated:

        # Clear the frame pointer register (EBP)
        # so that once we get into debugging C code,
        # stack backtraces will be terminated properly.
        movl    $0x0,%ebp           # nuke frame pointer

        # Set the stack pointer
        movl    $(bootstacktop),%esp

        # now to C code
        call    i386_init

    .data
    # boot stack
       .p2align    PGSHIFT     # 强制四字节对齐
       .globl      bootstack
    bootstack:
        .space      KSTKSIZE
       .globl      bootstacktop
    bootstacktop:
```

4. 调用 `i386_init` 函数会将下一条指令的地址压入栈（spin，程序不会运行到这里），同时将旧的 `ebp` 压栈，`ebp` 指向 `esp` 的当前位置，这样就设置好了 JOS 调用第一个 C 函数的栈帧

::: tip Exercise 10
单步调试查看 `backtrace` 函数是怎么递归调用的？
:::

`mon_backtrace` 函数是在 `test_backtrace` 函数中被调用的

<img src="/mit-6.828-lab1-figures/recursion.png" width="473px" height="273px" alt="recursion">

::: tip Exercise 11
`mon_backtrace` 功能实现（查看函数调用栈），将 `backtrace` 功能加入 JOS monitor 中
:::

函数参数的入栈顺序是从右到左的，即对于函数参数，最后一个参数先入栈，从右至左，第一个参数最后入栈：

<img src="/mit-6.828-lab1-figures/func-args-push-order.png" width="528px" height="292px" alt="func-args-push-order">

正在执行的函数有自己的一个 `ebp` 值，而这个 `ebp` 作为指针（对应的那块内存）又指向调用该函数的函数的 `ebp` 的值，即 **callee 的 `ebp` 作为指针指向 caller 的 `ebp` 值**。这样我们使用 `ebp` 不断回溯就能够打印出函数的调用栈了

```c {7}
int mon_backtrace(int argc, char **argv, struct Trapframe *tf)
{
    size_t i;
    const size_t N = 4;
    uint32_t args[N];
    uint32_t* ebp = (uint32_t*)read_ebp();
    while(ebp) {             // 这个循环终止条件在 ex9 中有解释，movl $0x0,%ebp 
        uint32_t eip = *(ebp + 1);
        for (i = 0; i < N; ++i)
            args[i] = *(ebp + 2 + i);  // 依次得到各个参数
        cprintf("ebp %08x eip %08x args", ebp, eip);
        for (i = 0; i < N; ++i)
            cprintf(" %08x", args[i]);
        cprintf("\n");

        ebp = (uint32_t*) (*ebp);
    }

    return 0;
}
```

JOS 启动后会出现“`K>`”等待用户输入命令，已经提供了“`help`”和“`kerninfo`”两个，这里我们需要添加“`backtrace`”命令。实现原理：

```c
struct Command {
    const char *name;  // 命令名
    const char *desc;  // 命令作用，help 时展示
    // return -1 to force monitor to exit
    int (*func)(int argc, char** argv, struct Trapframe* tf);
};

static struct Command commands[] = {
    { "help", "Display this list of commands", mon_help },
    { "kerninfo", "Display information about the kernel", mon_kerninfo },
    { "backtrace", "Display stack backtrace", mon_backtrace },
};
```

在 `kern/monitor.c` 中定义一个 `Command` 结构体，包含能够使用的交互命令。主要是第三个参数，表示在 monitor 中键入命令时具体调用的处理函数。

当用户在 monitor 中键入命令时是如何进行处理的呢？

1. `monitor` 函数中调用 `readline` 读入一个命令，`buf` 指向命令字符串

```c
while (1) {
    buf = readline("K> ");
    if (buf != NULL)
        if (runcmd(buf, tf) < 0)
            break;
}
```

2. `runcmd` 处理命令，接受两个参数，第一个就是命令字符串，第二个参数先不做讨论（跳过）。接下来分析 `runcmd` 函数的实现：（**这个函数实现要好好学习，Redis 中也有这样的命令查表操作**）

- i) 变量声明与初始化，argv 是一个指针数组，每个数组项指向一个字符串。一个命令分为命令名+命令参数，因此一个命令字符串一般可以分为多个子字符串，argv 的每个数组项指向一个子字符串。argc 代表命令参数的个数

```c
#define WHITESPACE "\t\r\n "

static int runcmd(char *buf, struct Trapframe *tf)
{
    int argc;
    char *argv[MAXARGS];
    int i;

    // Parse the command buffer into whitespace-separated arguments
    argc = 0;
    argv[argc] = 0;
```

- ii) 将 argv 中保存每一个子字符串，并且将命令字符串中的空格都换成空字符（因为我们在输入命令是，命令名和参数之间、参数和参数之间都是使用空格间隔的），这样处理之后每个子字符串的结尾便都是一个空字符，方便处理【这个实现需要好好学习】

```c {3}
    while (1) {
        // gobble whitespace
        while (*buf && strchr(WHITESPACE, *buf))
            *buf++ = 0;    // 把所有空格字符都置为空字符
        if (*buf == 0)
            break;         // 命令结束

        // save and scan past next arg
        if (argc == MAXARGS-1) {
            cprintf("Too many arguments (max %d)\n", MAXARGS);
            return 0;
        }
        argv[argc++] = buf;// 指向子字符串
        while (*buf && !strchr(WHITESPACE, *buf))
            buf++;         // 跳过非空格的字符
    }
    argv[argc] = 0;
```

<img src="/mit-6.828-lab1-figures/runcmd-argv-argc.png" width="565px" height="224px" alt="runcmd-argv-argc">

- iii) 获取到 argc 和 argv 两个参数后，就可以开始处理命令了。在所有可以执行的命令表中查找对应的函数，调用执行

```c {5}
    // Lookup and invoke the command
    if (argc == 0)  return 0;
    for (i = 0; i < ARRAY_SIZE(commands); i++) {
        if (strcmp(argv[0], commands[i].name) == 0)
            return commands[i].func(argc, argv, tf);
    }
    cprintf("Unknown command '%s'\n", argv[0]);
    return 0;
}
```

::: tip Exercise 12
修改 `mon_backtrace` 使得其能够打印出当前所在的文件、行号和函数（更方便的查看函数调用栈，以及当程序出错时能够更方便的知道哪些函数可能存在 bug）
:::

【TODO】符号表理解，这个如何做的，通过查看 debuginfo_eip 函数实现大致知道怎么处理，但为什么是这样需要理解？

1. debuginfo_eip 函数中添加行号查找

```c {3}
    stab_binsearch(stabs, &lline, &rline, N_SLINE, addr);
    if (lline <= rline) {
        info->eip_line = stabs[lline].n_desc;
    } else {
        return -1;
    }
```

2.	在 mon_trace 函数中加入：

```c {3}
    // 打印额外的信息：所在文件:行数:所在函数
    struct Eipdebuginfo info;
    if (debuginfo_eip(eip, &info) == 0)
        cprintf("    %s:%d: %.*s+%u\n", info.eip_file, info.eip_line,
            info.eip_fn_namelen, info.eip_fn_name,
            (uint32_t)(eip - info.eip_fn_addr));
    else
        cprintf("Error happened when reading symbol table\n");
```

### 主要参考

- 主要参考 [系统启动与初始化](http://grid.hust.edu.cn/zyshao/Teaching_Material/OSEngineering/Chapter3.pdf)，为华科的一个老师的课程讲义，现地址已不能访问
- [程序员的自我修养：装载、链接与库](https://book.douban.com/subject/3652388/) 国人写的一本书，分析的很详细，很有实践意义
  - 第 2 章 编译与链接 2.4 模块拼装——静态链接
  - 第 3 章 目标文件里有什么
  - 第 4 章 静态链接
- [深入理解计算机系统](https://book.douban.com/subject/26912767/) 第 7 章 链接 之前看过好几遍，需要理解
- [Linux 内核应该怎么去学习？](https://www.zhihu.com/question/58121772/answer/156287959) 如陈硕所说，“学习操作系统要注意区分共性与平台特性”
- [C函数调用过程原理及函数栈帧分析](https://segmentfault.com/a/1190000007977460) 函数调用和栈帧讲解的很清晰
- [Using the GNU Debugger](https://pdos.csail.mit.edu/6.828/2018/lec/gdb_slides.pdf) MIT 6.828 LEC 3 课程讲义
