export const operatingSystemsContent = {
  Processes: {
    resources: [
      {
        type: "notes",
        title: "Processes — Core Concepts",
        body:
          "A process is a program in execution. It has its own address space and execution state. " +
          "A process typically contains code, data, heap, stack, program counter, CPU registers, " +
          "and operating-system-managed resources. The Process Control Block (PCB) stores important " +
          "information such as process state, program counter, CPU registers, scheduling information, " +
          "and memory-management information.\n\n" +
          "Common process states are New, Ready, Running, Waiting/Blocked, and Terminated. " +
          "A context switch occurs when the CPU switches from one process to another. Context switching " +
          "is necessary for multitasking but introduces overhead because the operating system must save " +
          "and restore execution state.",
        order: 0,
      },
      {
        type: "notes",
        title: "Process vs Program",
        body:
          "A program is a passive set of instructions stored on disk, while a process is an active " +
          "instance of a program being executed. Multiple processes can be created from the same program. " +
          "Processes may also communicate through mechanisms such as shared memory, pipes, message queues, " +
          "or sockets.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Processes — Quick Check",
        questions: [
          {
            question: "What is a process?",
            options: [
              "A program stored permanently on disk",
              "A program currently in execution",
              "A CPU register",
              "A type of memory",
            ],
            correctOptionIndex: 1,
            explanation:
              "A process is an executing instance of a program, together with its execution state and resources.",
          },
          {
            question: "Which data structure stores information about a process?",
            options: ["PCB", "Page table", "File allocation table", "Stack only"],
            correctOptionIndex: 0,
            explanation:
              "The Process Control Block (PCB) stores information required by the OS to manage a process.",
          },
          {
            question: "What happens during a context switch?",
            options: [
              "A process is permanently deleted",
              "The CPU changes from one process to another",
              "RAM is completely cleared",
              "A program is compiled",
            ],
            correctOptionIndex: 1,
            explanation:
              "The OS saves the current process state and restores another process's state so the CPU can execute it.",
          },
          {
            question: "Which is a typical process state?",
            options: ["Ready", "Compiled", "Encrypted", "Downloaded"],
            correctOptionIndex: 0,
            explanation:
              "New, Ready, Running, Waiting/Blocked, and Terminated are common process states.",
          },
        ],
      },
    ],
  },

  Threads: {
    resources: [
      {
        type: "notes",
        title: "Threads — Core Concepts",
        body:
          "A thread is the smallest unit of CPU execution within a process. Threads belonging to the same " +
          "process share resources such as code, data, and open files, while each thread has its own program " +
          "counter, registers, and stack.\n\n" +
          "Multithreading can improve responsiveness and allow parallel or concurrent work. However, shared " +
          "data introduces synchronization problems such as race conditions.",
        order: 0,
      },
      {
        type: "notes",
        title: "Process vs Thread",
        body:
          "Processes normally have separate address spaces, while threads within a process share the same " +
          "address space. Creating and switching between threads is generally cheaper than doing the same " +
          "with processes. The tradeoff is that threads require careful synchronization when accessing shared data.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Threads — Quick Check",
        questions: [
          {
            question: "What is a thread?",
            options: [
              "The smallest unit of CPU execution",
              "A physical CPU",
              "A type of hard disk",
              "A database table",
            ],
            correctOptionIndex: 0,
            explanation:
              "A thread is commonly described as the smallest unit of CPU execution within a process.",
          },
          {
            question: "Which resource is generally shared by threads of the same process?",
            options: ["Stack", "Program counter", "Address space", "CPU register set"],
            correctOptionIndex: 2,
            explanation:
              "Threads in the same process share the process address space and resources such as code and data.",
          },
          {
            question: "What problem can occur when multiple threads modify shared data without synchronization?",
            options: ["Race condition", "Compilation", "Paging", "Fragmentation"],
            correctOptionIndex: 0,
            explanation:
              "A race condition occurs when the result depends on the timing/order of concurrent accesses.",
          },
          {
            question: "Compared with processes, threads in the same process generally have:",
            options: [
              "Completely separate address spaces",
              "Shared address space",
              "Separate operating systems",
              "No execution state",
            ],
            correctOptionIndex: 1,
            explanation:
              "Threads belonging to the same process share the process's address space.",
          },
        ],
      },
    ],
  },

  "CPU Scheduling": {
    resources: [
      {
        type: "notes",
        title: "CPU Scheduling — Fundamentals",
        body:
          "CPU scheduling determines which ready process should receive the CPU next. The scheduler attempts " +
          "to balance goals such as CPU utilization, throughput, turnaround time, waiting time, response time, " +
          "and fairness.\n\n" +
          "Common scheduling algorithms include FCFS, SJF, SRTF, Priority Scheduling, Round Robin, and Multilevel " +
          "Queue scheduling.",
        order: 0,
      },
      {
        type: "notes",
        title: "FCFS, SJF and Round Robin",
        body:
          "FCFS (First-Come, First-Served) executes processes in arrival order and is simple but can suffer from " +
          "the convoy effect. SJF selects the process with the shortest CPU burst and can minimize average waiting " +
          "time when burst lengths are known. Round Robin assigns each process a time quantum and is commonly used " +
          "for interactive systems.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "CPU Scheduling — Quick Check",
        questions: [
          {
            question: "Which scheduling algorithm uses a fixed time quantum?",
            options: ["FCFS", "Round Robin", "SJF", "FIFO paging"],
            correctOptionIndex: 1,
            explanation:
              "Round Robin gives each ready process a limited time slice called a time quantum.",
          },
          {
            question: "Which algorithm selects the process with the shortest CPU burst?",
            options: ["SJF", "FCFS", "Round Robin", "FIFO"],
            correctOptionIndex: 0,
            explanation:
              "Shortest Job First selects the process with the shortest estimated CPU burst.",
          },
          {
            question: "What is a common disadvantage of FCFS?",
            options: [
              "Convoy effect",
              "It cannot execute processes",
              "It requires virtual memory",
              "It always causes deadlock",
            ],
            correctOptionIndex: 0,
            explanation:
              "A long CPU-bound process at the front can make many short processes wait, producing the convoy effect.",
          },
          {
            question: "Which metric measures the time from process submission to completion?",
            options: ["Turnaround time", "Response time", "CPU burst", "Quantum"],
            correctOptionIndex: 0,
            explanation:
              "Turnaround time is the total time from submission/arrival until completion.",
          },
        ],
      },
    ],
  },

  Synchronization: {
    resources: [
      {
        type: "notes",
        title: "Process Synchronization",
        body:
          "Process synchronization coordinates concurrent processes or threads that access shared resources. " +
          "The goal is to prevent incorrect results caused by race conditions.\n\n" +
          "A critical section is the part of a program where shared data is accessed. A correct critical-section " +
          "solution should provide mutual exclusion, progress, and bounded waiting.",
        order: 0,
      },
      {
        type: "notes",
        title: "Mutexes and Semaphores",
        body:
          "A mutex provides mutual exclusion so that only one thread can enter a protected critical section " +
          "at a time. A semaphore is a synchronization primitive represented by a counter and operations such " +
          "as wait and signal. Semaphores can be binary or counting semaphores.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Synchronization — Quick Check",
        questions: [
          {
            question: "What is a critical section?",
            options: [
              "Code that accesses shared resources",
              "Code that only prints output",
              "A bootloader",
              "A disk partition",
            ],
            correctOptionIndex: 0,
            explanation:
              "A critical section is the portion of execution where shared resources are accessed or modified.",
          },
          {
            question: "Which property ensures only one process enters a critical section at a time?",
            options: ["Mutual exclusion", "Paging", "Throughput", "Fragmentation"],
            correctOptionIndex: 0,
            explanation:
              "Mutual exclusion prevents multiple concurrent executions from entering the protected section simultaneously.",
          },
          {
            question: "A mutex is primarily used for:",
            options: [
              "Mutual exclusion",
              "Disk formatting",
              "Memory allocation",
              "Process compilation",
            ],
            correctOptionIndex: 0,
            explanation:
              "A mutex protects shared resources by allowing one owner/thread into the critical section at a time.",
          },
          {
            question: "What can happen if shared data is accessed without proper synchronization?",
            options: ["Race condition", "Guaranteed speedup", "Automatic encryption", "No possible effect"],
            correctOptionIndex: 0,
            explanation:
              "Unsynchronized concurrent access can produce race conditions and inconsistent results.",
          },
        ],
      },
    ],
  },

  Deadlocks: {
    resources: [
      {
        type: "notes",
        title: "Deadlocks — Fundamentals",
        body:
          "A deadlock occurs when a set of processes becomes permanently blocked because each process is waiting " +
          "for a resource held by another process in the set.\n\n" +
          "The four necessary Coffman conditions are mutual exclusion, hold and wait, no preemption, and circular wait. " +
          "Removing at least one of these conditions can prevent deadlock.",
        order: 0,
      },
      {
        type: "notes",
        title: "Deadlock Handling",
        body:
          "Operating systems can handle deadlocks through prevention, avoidance, detection and recovery, or by " +
          "ignoring the problem when appropriate. Banker's Algorithm is a classic deadlock-avoidance algorithm " +
          "that checks whether granting a request keeps the system in a safe state.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Deadlocks — Quick Check",
        questions: [
          {
            question: "Which is a necessary condition for deadlock?",
            options: ["Circular wait", "Compilation", "Paging", "Caching"],
            correctOptionIndex: 0,
            explanation:
              "Circular wait is one of the four Coffman conditions required for deadlock.",
          },
          {
            question: "Which algorithm is associated with deadlock avoidance?",
            options: ["Banker's Algorithm", "Binary Search", "Round Robin", "Merge Sort"],
            correctOptionIndex: 0,
            explanation:
              "Banker's Algorithm evaluates whether resource allocation leaves the system in a safe state.",
          },
          {
            question: "What does hold and wait mean?",
            options: [
              "A process holds resources while waiting for additional resources",
              "A process has no resources",
              "A process has terminated",
              "A CPU waits for RAM",
            ],
            correctOptionIndex: 0,
            explanation:
              "In hold and wait, a process keeps resources it already owns while requesting additional resources.",
          },
          {
            question: "How can deadlock prevention work?",
            options: [
              "Break at least one necessary deadlock condition",
              "Increase monitor brightness",
              "Delete every process",
              "Disable the CPU",
            ],
            correctOptionIndex: 0,
            explanation:
              "Deadlock prevention deliberately ensures at least one Coffman condition cannot hold.",
          },
        ],
      },
    ],
  },

  "Memory Management": {
    resources: [
      {
        type: "notes",
        title: "Memory Management",
        body:
          "Memory management is responsible for allocating and freeing memory, translating logical addresses to " +
          "physical addresses, protecting processes, and supporting efficient use of RAM.\n\n" +
          "The operating system may use contiguous allocation, paging, segmentation, or combinations of these techniques.",
        order: 0,
      },
      {
        type: "notes",
        title: "Logical and Physical Addresses",
        body:
          "A logical (virtual) address is generated by the CPU and used by a process. A physical address identifies " +
          "a location in main memory. The memory-management unit (MMU) performs address translation between them.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Memory Management — Quick Check",
        questions: [
          {
            question: "Which hardware component commonly performs address translation?",
            options: ["MMU", "ALU", "Keyboard controller", "Disk controller"],
            correctOptionIndex: 0,
            explanation:
              "The Memory Management Unit translates virtual/logical addresses into physical addresses.",
          },
          {
            question: "A logical address is generated by the:",
            options: ["CPU", "Hard disk", "Monitor", "Printer"],
            correctOptionIndex: 0,
            explanation:
              "The CPU generates logical or virtual addresses during program execution.",
          },
          {
            question: "Which is a goal of memory management?",
            options: [
              "Efficient allocation of memory",
              "Removing all CPU registers",
              "Replacing the operating system",
              "Disabling multitasking",
            ],
            correctOptionIndex: 0,
            explanation:
              "Memory management aims to allocate memory efficiently while providing protection and address translation.",
          },
          {
            question: "Physical addresses refer to:",
            options: [
              "Actual locations in main memory",
              "Source-code variables",
              "URLs",
              "Database keys",
            ],
            correctOptionIndex: 0,
            explanation:
              "A physical address identifies an actual location in physical memory.",
          },
        ],
      },
    ],
  },

  Paging: {
    resources: [
      {
        type: "notes",
        title: "Paging — Core Idea",
        body:
          "Paging divides a process's logical address space into fixed-size pages and physical memory into fixed-size " +
          "frames. Pages can be placed into any available frames, eliminating external fragmentation caused by " +
          "contiguous allocation.\n\n" +
          "A page table maps virtual page numbers to physical frame numbers.",
        order: 0,
      },
      {
        type: "notes",
        title: "Page Faults",
        body:
          "A page fault occurs when a process references a page that is not currently in physical memory. The OS " +
          "must locate the page on secondary storage, load it into a free frame or replace another page, update the " +
          "page table, and resume execution.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Paging — Quick Check",
        questions: [
          {
            question: "What does paging divide logical memory into?",
            options: ["Pages", "Segments only", "Files", "Processes"],
            correctOptionIndex: 0,
            explanation:
              "Paging divides the logical address space into fixed-size pages.",
          },
          {
            question: "Physical memory is divided into:",
            options: ["Frames", "Pages", "Threads", "Files"],
            correctOptionIndex: 0,
            explanation:
              "Physical memory is divided into fixed-size frames that hold pages.",
          },
          {
            question: "What is a page fault?",
            options: [
              "A referenced page is not currently in physical memory",
              "A CPU overheats",
              "A file is deleted",
              "A process terminates normally",
            ],
            correctOptionIndex: 0,
            explanation:
              "A page fault occurs when the required page is absent from physical memory.",
          },
          {
            question: "What data structure maps virtual pages to physical frames?",
            options: ["Page table", "PCB", "Stack", "File table"],
            correctOptionIndex: 0,
            explanation:
              "The page table stores mappings between virtual page numbers and physical frame numbers.",
          },
        ],
      },
    ],
  },

  "Virtual Memory": {
    resources: [
      {
        type: "notes",
        title: "Virtual Memory",
        body:
          "Virtual memory allows a process to use an address space larger than the available physical RAM. " +
          "Only the actively needed pages must be resident in memory, while other pages can remain on secondary storage.\n\n" +
          "Demand paging loads pages when they are actually referenced.",
        order: 0,
      },
      {
        type: "notes",
        title: "Page Replacement",
        body:
          "When a page fault occurs and no free frame exists, the operating system must choose a page to remove. " +
          "Common replacement algorithms include FIFO, LRU, and Optimal. Poor replacement decisions can increase " +
          "page faults and cause thrashing.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Virtual Memory — Quick Check",
        questions: [
          {
            question: "What is the main purpose of virtual memory?",
            options: [
              "Allow processes to use a larger virtual address space than physical RAM",
              "Remove secondary storage",
              "Increase CPU clock speed",
              "Replace the file system",
            ],
            correctOptionIndex: 0,
            explanation:
              "Virtual memory lets programs operate with an address space larger than available physical memory.",
          },
          {
            question: "Which technique loads a page only when it is needed?",
            options: ["Demand paging", "FCFS", "Compaction", "Spooling"],
            correctOptionIndex: 0,
            explanation:
              "Demand paging loads pages into memory when they are actually referenced.",
          },
          {
            question: "Which is a page replacement algorithm?",
            options: ["LRU", "Round Robin", "FCFS scheduling", "DFS"],
            correctOptionIndex: 0,
            explanation:
              "Least Recently Used (LRU) is a page replacement strategy.",
          },
          {
            question: "Excessive page faults can lead to:",
            options: ["Thrashing", "Compilation", "Deadlock automatically", "Normalization"],
            correctOptionIndex: 0,
            explanation:
              "Thrashing occurs when the system spends excessive time handling page faults rather than executing useful work.",
          },
        ],
      },
    ],
  },

  "File Systems": {
    resources: [
      {
        type: "notes",
        title: "File Systems — Fundamentals",
        body:
          "A file system organizes and manages files on storage devices. It maintains metadata such as file names, " +
          "permissions, ownership, sizes, timestamps, and locations. Common file operations include create, open, read, " +
          "write, seek, close, and delete.",
        order: 0,
      },
      {
        type: "notes",
        title: "File Allocation",
        body:
          "Common file-allocation methods include contiguous allocation, linked allocation, and indexed allocation. " +
          "Contiguous allocation offers efficient sequential and direct access but can suffer from external fragmentation. " +
          "Indexed allocation uses an index block to store pointers to file blocks.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "File Systems — Quick Check",
        questions: [
          {
            question: "What is a file system responsible for?",
            options: [
              "Managing files and their storage",
              "Scheduling only CPU instructions",
              "Compiling source code",
              "Controlling monitor resolution",
            ],
            correctOptionIndex: 0,
            explanation:
              "A file system organizes files, metadata, storage allocation, and access operations.",
          },
          {
            question: "Which is a file allocation method?",
            options: ["Indexed allocation", "Round Robin", "Paging", "SJF"],
            correctOptionIndex: 0,
            explanation:
              "Indexed allocation is one of the standard approaches for organizing file blocks.",
          },
          {
            question: "Which metadata can a file system store?",
            options: ["Permissions", "CPU temperature only", "Keyboard layout only", "Source-code compiler only"],
            correctOptionIndex: 0,
            explanation:
              "File systems maintain metadata such as permissions, ownership, timestamps, and file size.",
          },
          {
            question: "Which operation reads data from an opened file?",
            options: ["read", "compile", "schedule", "fork"],
            correctOptionIndex: 0,
            explanation:
              "The read operation obtains data from an opened file.",
          },
        ],
      },
    ],
  },

  "Disk Scheduling": {
    resources: [
      {
        type: "notes",
        title: "Disk Scheduling",
        body:
          "Disk scheduling determines the order in which pending disk I/O requests are serviced. The goal is often " +
          "to reduce seek time and improve throughput.\n\n" +
          "Common algorithms include FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK. Each makes different tradeoffs between " +
          "performance and fairness.",
        order: 0,
      },
      {
        type: "notes",
        title: "SCAN and SSTF",
        body:
          "SSTF (Shortest Seek Time First) chooses the request closest to the current head position, which can reduce " +
          "average seek distance but may starve far-away requests. SCAN moves the disk head in one direction servicing " +
          "requests and then reverses direction, resembling an elevator.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Disk Scheduling — Quick Check",
        questions: [
          {
            question: "What does disk scheduling primarily try to reduce?",
            options: ["Seek time", "Source-code size", "RAM size", "Network latency"],
            correctOptionIndex: 0,
            explanation:
              "Disk scheduling commonly aims to reduce disk-head movement and therefore seek time.",
          },
          {
            question: "Which algorithm chooses the closest pending request?",
            options: ["SSTF", "Round Robin", "SJF CPU scheduling", "FIFO paging"],
            correctOptionIndex: 0,
            explanation:
              "Shortest Seek Time First selects the request requiring the least head movement from the current position.",
          },
          {
            question: "SCAN is often compared to:",
            options: ["An elevator", "A compiler", "A hash table", "A database index"],
            correctOptionIndex: 0,
            explanation:
              "SCAN moves the disk head in one direction and then reverses, similar to an elevator.",
          },
          {
            question: "A possible disadvantage of SSTF is:",
            options: ["Starvation", "It cannot service requests", "It requires no disk", "It always scans the whole disk"],
            correctOptionIndex: 0,
            explanation:
              "Requests far from the current head position can potentially wait for a long time under SSTF.",
          },
        ],
      },
    ],
  },
};