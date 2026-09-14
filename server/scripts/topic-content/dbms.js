export const dbmsContent = {
  "ER Model": {
    resources: [
      {
        type: "notes",
        title: "ER Model — Core Concepts",
        body:
          "The Entity-Relationship (ER) model represents data using entities, attributes, and relationships. " +
          "An entity represents a real-world object such as Student, Employee, or Course. An attribute describes " +
          "an entity, while a relationship describes an association between entities.\n\n" +
          "Entities are represented by rectangles, attributes by ovals, and relationships by diamonds in traditional " +
          "ER diagrams. Cardinality describes how many instances of one entity can be associated with another.",
        order: 0,
      },
      {
        type: "notes",
        title: "Keys and Cardinality",
        body:
          "A key attribute uniquely identifies an entity instance. Relationships may be one-to-one, one-to-many, " +
          "or many-to-many. For example, one department can have many employees, giving a one-to-many relationship " +
          "between Department and Employee.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "ER Model — Quick Check",
        questions: [
          {
            question: "What does an entity represent in an ER model?",
            options: [
              "A real-world object or concept",
              "Only a database index",
              "A SQL keyword",
              "A network packet",
            ],
            correctOptionIndex: 0,
            explanation:
              "An entity represents a real-world object or concept about which the system stores information.",
          },
          {
            question: "Which symbol traditionally represents an entity in an ER diagram?",
            options: ["Rectangle", "Diamond", "Oval", "Arrow"],
            correctOptionIndex: 0,
            explanation:
              "Entities are traditionally represented using rectangles.",
          },
          {
            question: "What does cardinality describe?",
            options: [
              "Number of relationships between entity instances",
              "Size of a database file",
              "Number of SQL statements",
              "CPU execution time",
            ],
            correctOptionIndex: 0,
            explanation:
              "Cardinality describes how many instances of one entity can be associated with instances of another.",
          },
          {
            question: "A relationship where one department has many employees is:",
            options: ["One-to-many", "One-to-one", "Many-to-one only", "Many-to-zero"],
            correctOptionIndex: 0,
            explanation:
              "One department can be associated with many employees, giving a one-to-many relationship.",
          },
        ],
      },
    ],
  },

  Normalization: {
    resources: [
      {
        type: "notes",
        title: "Database Normalization",
        body:
          "Normalization is the process of organizing relational data to reduce redundancy and prevent update anomalies. " +
          "The commonly discussed normal forms are 1NF, 2NF, 3NF, and BCNF.\n\n" +
          "Normalization usually decomposes large relations into smaller related relations while preserving important " +
          "dependencies and minimizing unnecessary duplication.",
        order: 0,
      },
      {
        type: "notes",
        title: "1NF, 2NF and 3NF",
        body:
          "First Normal Form requires atomic attribute values and no repeating groups. Second Normal Form requires 1NF " +
          "and eliminates partial dependency on part of a composite candidate key. Third Normal Form requires 2NF and " +
          "eliminates transitive dependencies of non-key attributes on a key.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Normalization — Quick Check",
        questions: [
          {
            question: "What is a major goal of normalization?",
            options: [
              "Reduce data redundancy and anomalies",
              "Increase duplicate data",
              "Remove all primary keys",
              "Make every table contain one column",
            ],
            correctOptionIndex: 0,
            explanation:
              "Normalization organizes data to reduce redundancy and prevent insertion, update, and deletion anomalies.",
          },
          {
            question: "Which normal form requires atomic values?",
            options: ["1NF", "2NF", "3NF", "BCNF only"],
            correctOptionIndex: 0,
            explanation:
              "First Normal Form requires attributes to contain atomic values rather than repeating groups.",
          },
          {
            question: "2NF primarily removes:",
            options: [
              "Partial dependencies",
              "All foreign keys",
              "All indexes",
              "All functional dependencies",
            ],
            correctOptionIndex: 0,
            explanation:
              "Second Normal Form removes partial dependencies of non-key attributes on part of a composite key.",
          },
          {
            question: "3NF primarily addresses:",
            options: [
              "Transitive dependencies",
              "Network routing",
              "Disk scheduling",
              "CPU scheduling",
            ],
            correctOptionIndex: 0,
            explanation:
              "Third Normal Form removes transitive dependencies involving non-key attributes.",
          },
        ],
      },
    ],
  },

  "Transactions & ACID": {
    resources: [
      {
        type: "notes",
        title: "Transactions and ACID",
        body:
          "A transaction is a logical unit of database work. A transaction may contain several operations but should " +
          "behave as a single unit from the database's perspective.\n\n" +
          "ACID stands for Atomicity, Consistency, Isolation, and Durability. These properties help databases maintain " +
          "correctness even when multiple users access data concurrently or failures occur.",
        order: 0,
      },
      {
        type: "notes",
        title: "Commit and Rollback",
        body:
          "COMMIT permanently records the successful changes made by a transaction. ROLLBACK reverses changes made " +
          "during the transaction. If a transaction fails before committing, rollback helps return the database to a " +
          "previous consistent state.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Transactions — Quick Check",
        questions: [
          {
            question: "What does ACID stand for?",
            options: [
              "Atomicity, Consistency, Isolation, Durability",
              "Access, Control, Index, Data",
              "Atomicity, Control, Integrity, Database",
              "Availability, Consistency, Indexing, Durability",
            ],
            correctOptionIndex: 0,
            explanation:
              "ACID represents Atomicity, Consistency, Isolation, and Durability.",
          },
          {
            question: "Which ACID property means a transaction happens completely or not at all?",
            options: ["Atomicity", "Isolation", "Durability", "Consistency"],
            correctOptionIndex: 0,
            explanation:
              "Atomicity ensures that a transaction is treated as an indivisible unit.",
          },
          {
            question: "What does COMMIT do?",
            options: [
              "Permanently records transaction changes",
              "Deletes the database",
              "Creates an index",
              "Starts a new server",
            ],
            correctOptionIndex: 0,
            explanation:
              "COMMIT makes the successful changes of a transaction permanent.",
          },
          {
            question: "Which command reverses uncommitted transaction changes?",
            options: ["ROLLBACK", "COMMIT", "SELECT", "CREATE"],
            correctOptionIndex: 0,
            explanation:
              "ROLLBACK reverses changes made by the current transaction that have not been committed.",
          },
        ],
      },
    ],
  },

  Joins: {
    resources: [
      {
        type: "notes",
        title: "SQL Joins",
        body:
          "A JOIN combines rows from two or more tables based on a related condition. Common joins include INNER JOIN, " +
          "LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.\n\n" +
          "An INNER JOIN returns matching rows from both tables. A LEFT JOIN returns every row from the left table and " +
          "matching rows from the right table, using NULL where no match exists.",
        order: 0,
      },
      {
        type: "notes",
        title: "INNER vs LEFT JOIN",
        body:
          "Consider Customers and Orders. An INNER JOIN returns customers that have matching orders. A LEFT JOIN returns " +
          "all customers, including customers with no orders. In those unmatched cases, columns from Orders contain NULL.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Joins — Quick Check",
        questions: [
          {
            question: "What does an INNER JOIN return?",
            options: [
              "Rows satisfying the join condition in both tables",
              "Every row from the left table only",
              "Every row from both tables regardless of matches",
              "Only NULL rows",
            ],
            correctOptionIndex: 0,
            explanation:
              "INNER JOIN returns rows where the join condition matches in both tables.",
          },
          {
            question: "Which join keeps every row from the left table?",
            options: ["LEFT JOIN", "INNER JOIN", "CROSS JOIN only", "RIGHT JOIN"],
            correctOptionIndex: 0,
            explanation:
              "LEFT JOIN preserves all rows from the left table and adds matching right-side data where available.",
          },
          {
            question: "What appears on the right side of a LEFT JOIN when no match exists?",
            options: ["NULL", "0 automatically", "False", "The left key"],
            correctOptionIndex: 0,
            explanation:
              "Unmatched right-side columns are represented by NULL values.",
          },
          {
            question: "A JOIN is primarily used to:",
            options: [
              "Combine related data from tables",
              "Delete every table",
              "Create operating-system processes",
              "Encrypt passwords",
            ],
            correctOptionIndex: 0,
            explanation:
              "JOIN operations combine related rows from different tables.",
          },
        ],
      },
    ],
  },

  "SQL Queries": {
    resources: [
      {
        type: "notes",
        title: "SQL Query Fundamentals",
        body:
          "SQL queries retrieve and manipulate relational data. SELECT is used to retrieve rows, WHERE filters rows, " +
          "ORDER BY sorts results, and LIMIT can restrict the number of returned rows in databases that support it.\n\n" +
          "A typical query might use SELECT columns FROM table WHERE condition ORDER BY column.",
        order: 0,
      },
      {
        type: "notes",
        title: "WHERE, ORDER BY and DISTINCT",
        body:
          "WHERE filters rows before the result is produced. ORDER BY sorts the result using one or more columns. " +
          "DISTINCT removes duplicate result rows for the selected columns. Understanding the order and purpose of " +
          "these clauses is essential for writing correct queries.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SQL Queries — Quick Check",
        questions: [
          {
            question: "Which SQL keyword retrieves data?",
            options: ["SELECT", "FETCHONLY", "GETDATA", "READTABLE"],
            correctOptionIndex: 0,
            explanation:
              "SELECT is the standard SQL statement used to retrieve data.",
          },
          {
            question: "Which clause filters rows?",
            options: ["WHERE", "ORDER BY", "GROUP BY", "SELECT"],
            correctOptionIndex: 0,
            explanation:
              "WHERE specifies conditions that rows must satisfy.",
          },
          {
            question: "Which clause sorts query results?",
            options: ["ORDER BY", "WHERE", "HAVING", "FROM"],
            correctOptionIndex: 0,
            explanation:
              "ORDER BY sorts the returned result set according to one or more expressions.",
          },
          {
            question: "What does DISTINCT do?",
            options: [
              "Removes duplicate result rows",
              "Deletes duplicate records from the table",
              "Creates a primary key",
              "Sorts rows automatically",
            ],
            correctOptionIndex: 0,
            explanation:
              "DISTINCT removes duplicate rows from the query result; it does not delete data from the table.",
          },
        ],
      },
    ],
  },

  "Concurrency Control": {
    resources: [
      {
        type: "notes",
        title: "Concurrency Control",
        body:
          "Concurrency control manages simultaneous database transactions so that their execution remains correct. " +
          "Without proper control, concurrent transactions can produce problems such as lost updates, dirty reads, " +
          "non-repeatable reads, and inconsistent results.\n\n" +
          "Locking and timestamp-based techniques are common approaches.",
        order: 0,
      },
      {
        type: "notes",
        title: "Locks and Two-Phase Locking",
        body:
          "Shared locks generally allow multiple transactions to read a resource, while exclusive locks are used " +
          "when a transaction needs to modify it. Two-Phase Locking (2PL) divides a transaction into a growing phase, " +
          "where locks are acquired, and a shrinking phase, where locks are released.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Concurrency Control — Quick Check",
        questions: [
          {
            question: "Why is concurrency control needed?",
            options: [
              "To maintain correctness during concurrent transactions",
              "To increase table size",
              "To replace SQL",
              "To remove all transactions",
            ],
            correctOptionIndex: 0,
            explanation:
              "Concurrency control prevents incorrect interactions between simultaneously executing transactions.",
          },
          {
            question: "Which problem occurs when one transaction reads uncommitted data from another?",
            options: ["Dirty read", "Deadlock only", "Normalization", "Index scan"],
            correctOptionIndex: 0,
            explanation:
              "A dirty read occurs when a transaction reads data written by another transaction before it commits.",
          },
          {
            question: "Which lock is generally used for reading?",
            options: ["Shared lock", "Exclusive lock", "Delete lock", "Write-only lock"],
            correctOptionIndex: 0,
            explanation:
              "Shared locks allow compatible read access by multiple transactions.",
          },
          {
            question: "In 2PL, the growing phase is when a transaction:",
            options: [
              "Acquires locks",
              "Releases all locks",
              "Commits only",
              "Deletes tables",
            ],
            correctOptionIndex: 0,
            explanation:
              "During the growing phase, a transaction can acquire locks but does not release them.",
          },
        ],
      },
    ],
  },

  "Deadlocks in DBMS": {
    resources: [
      {
        type: "notes",
        title: "Database Deadlocks",
        body:
          "A database deadlock occurs when transactions wait indefinitely for resources or locks held by each other. " +
          "For example, Transaction A may hold a lock on Row 1 while waiting for Row 2, while Transaction B holds Row 2 " +
          "and waits for Row 1.\n\n" +
          "The database system must detect, prevent, or recover from such situations.",
        order: 0,
      },
      {
        type: "notes",
        title: "Deadlock Detection and Recovery",
        body:
          "Wait-for graphs can be used to detect cycles representing deadlocks. Once a deadlock is detected, the DBMS " +
          "may choose a transaction as a victim, roll it back, release its locks, and allow the remaining transactions " +
          "to continue.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "DBMS Deadlocks — Quick Check",
        questions: [
          {
            question: "What causes a database deadlock?",
            options: [
              "Transactions waiting indefinitely for each other's locked resources",
              "A SELECT statement returning zero rows",
              "An empty table",
              "A successful COMMIT",
            ],
            correctOptionIndex: 0,
            explanation:
              "Deadlock occurs when transactions form a cycle of waiting for resources held by one another.",
          },
          {
            question: "What structure can help detect database deadlocks?",
            options: ["Wait-for graph", "B-Tree", "Page table", "ER diagram"],
            correctOptionIndex: 0,
            explanation:
              "A wait-for graph represents transaction dependencies and cycles can indicate deadlock.",
          },
          {
            question: "What can a DBMS do after detecting a deadlock?",
            options: [
              "Roll back a selected transaction",
              "Delete every database",
              "Disable SQL permanently",
              "Ignore all locks forever",
            ],
            correctOptionIndex: 0,
            explanation:
              "The DBMS can select a victim transaction, roll it back, and release its locks.",
          },
          {
            question: "A cycle in a wait-for graph indicates:",
            options: ["Potential deadlock", "Normalization", "Successful commit", "Index creation"],
            correctOptionIndex: 0,
            explanation:
              "A cycle in the wait-for graph indicates transactions are waiting on one another cyclically.",
          },
        ],
      },
    ],
  },

  "Storage & File Structure": {
    resources: [
      {
        type: "notes",
        title: "Database Storage and File Organization",
        body:
          "Database systems store records in files made up of pages or blocks. File organization determines how records " +
          "are arranged on storage and affects the efficiency of searching, inserting, deleting, and updating records.\n\n" +
          "Common approaches include heap files, sorted files, and hashed files.",
        order: 0,
      },
      {
        type: "notes",
        title: "Heap, Sorted and Hash Files",
        body:
          "Heap files store records without maintaining a particular ordering and can be efficient for simple inserts. " +
          "Sorted files maintain records according to a search key and can support efficient ordered access. Hash-based " +
          "organization uses a hash function to locate records based on a key.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Storage & File Structure — Quick Check",
        questions: [
          {
            question: "What does file organization determine?",
            options: [
              "How records are arranged in storage",
              "How CPUs are scheduled",
              "How passwords are encrypted only",
              "How network packets are routed",
            ],
            correctOptionIndex: 0,
            explanation:
              "File organization determines how records are physically arranged and accessed.",
          },
          {
            question: "Which file organization stores records without a required ordering?",
            options: ["Heap file", "Sorted file", "B-Tree only", "Queue file"],
            correctOptionIndex: 0,
            explanation:
              "Heap files generally store records without maintaining a particular ordering.",
          },
          {
            question: "Hash-based file organization uses:",
            options: ["A hash function", "A CPU scheduler", "A page fault", "An ER diamond"],
            correctOptionIndex: 0,
            explanation:
              "Hash-based organization uses a hash function to map search keys to storage locations.",
          },
          {
            question: "Why is file organization important?",
            options: [
              "It affects database access performance",
              "It changes the programming language",
              "It removes SQL",
              "It eliminates transactions",
            ],
            correctOptionIndex: 0,
            explanation:
              "The physical organization of records affects the cost of common database operations.",
          },
        ],
      },
    ],
  },

  "Query Processing": {
    resources: [
      {
        type: "notes",
        title: "Query Processing",
        body:
          "Query processing is the sequence of steps a DBMS uses to execute an SQL query. The system parses the query, " +
          "translates it into an internal representation, generates possible execution plans, estimates their costs, " +
          "and selects an efficient plan.\n\n" +
          "The query optimizer plays a major role in choosing operations such as table scans, index scans, joins, and filters.",
        order: 0,
      },
      {
        type: "notes",
        title: "Query Optimization",
        body:
          "Query optimization attempts to find a low-cost execution plan. The optimizer may consider available indexes, " +
          "join order, filtering conditions, table statistics, and estimated result sizes. An available index does not " +
          "guarantee that the optimizer will use it; a full table scan may be cheaper when a large fraction of rows is needed.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Query Processing — Quick Check",
        questions: [
          {
            question: "What is the purpose of a query optimizer?",
            options: [
              "Choose an efficient execution plan",
              "Create user passwords",
              "Replace the database",
              "Compile JavaScript",
            ],
            correctOptionIndex: 0,
            explanation:
              "The query optimizer evaluates possible execution strategies and selects a relatively low-cost plan.",
          },
          {
            question: "Which can influence query optimization?",
            options: ["Indexes and table statistics", "Monitor size", "Keyboard layout", "CPU brand only"],
            correctOptionIndex: 0,
            explanation:
              "Indexes, statistics, estimated cardinalities, and join strategies can influence the selected plan.",
          },
          {
            question: "Will a DBMS always use an available index?",
            options: [
              "No, a table scan may be cheaper",
              "Yes, always",
              "Only for INSERT statements",
              "Only when the table is empty",
            ],
            correctOptionIndex: 0,
            explanation:
              "The optimizer chooses the cheaper estimated strategy; for large result sets, a sequential scan can be preferable.",
          },
          {
            question: "What does query processing ultimately produce?",
            options: [
              "An execution strategy for obtaining the query result",
              "A new operating system",
              "A new programming language",
              "A CPU thread",
            ],
            correctOptionIndex: 0,
            explanation:
              "Query processing transforms SQL into an executable strategy that produces the requested result.",
          },
        ],
      },
    ],
  },
};