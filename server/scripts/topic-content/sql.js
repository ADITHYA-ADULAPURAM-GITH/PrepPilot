export const sqlContent = {
  "SELECT Queries": {
    resources: [
      {
        type: "notes",
        title: "SELECT Queries — Fundamentals",
        body:
          "The SELECT statement is used to retrieve data from one or more tables.\n\n" +
          "Basic syntax:\n" +
          "SELECT column1, column2 FROM table_name;\n\n" +
          "Use SELECT * to retrieve all columns, although explicitly selecting required columns is usually better for readability and performance.\n\n" +
          "The WHERE clause filters rows before they are returned.",
        order: 0,
      },
      {
        type: "notes",
        title: "WHERE, ORDER BY and DISTINCT",
        body:
          "WHERE filters rows based on a condition.\n\n" +
          "ORDER BY sorts the result using one or more columns. ASC is ascending order and DESC is descending order.\n\n" +
          "DISTINCT removes duplicate values from the result.\n\n" +
          "Example:\n" +
          "SELECT DISTINCT department FROM employees ORDER BY department;",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SELECT Queries — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which SQL statement is used to retrieve data?",
            options: ["INSERT", "SELECT", "UPDATE", "DELETE"],
            correctOptionIndex: 1,
            explanation:
              "SELECT is used to retrieve rows and columns from one or more tables.",
          },
          {
            question: "Which clause filters rows in a SELECT query?",
            options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
            correctOptionIndex: 2,
            explanation:
              "WHERE filters individual rows based on a condition.",
          },
        ],
      },
    ],
  },

  Joins: {
    resources: [
      {
        type: "notes",
        title: "SQL JOINs — Fundamentals",
        body:
          "JOINs combine rows from two or more tables using a related column or condition.\n\n" +
          "INNER JOIN returns matching rows from both tables.\n\n" +
          "LEFT JOIN returns every row from the left table and matching rows from the right table. If there is no match, the right-side columns contain NULL.\n\n" +
          "RIGHT JOIN is the reverse of LEFT JOIN.",
        order: 0,
      },
      {
        type: "notes",
        title: "INNER JOIN vs LEFT JOIN",
        body:
          "Consider Customers and Orders. An INNER JOIN returns customers who have matching orders.\n\n" +
          "A LEFT JOIN returns every customer, including customers who have never placed an order.\n\n" +
          "This distinction is extremely common in SQL interviews.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SQL JOINs — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which JOIN returns only rows that match in both tables?",
            options: [
              "LEFT JOIN",
              "RIGHT JOIN",
              "INNER JOIN",
              "CROSS JOIN",
            ],
            correctOptionIndex: 2,
            explanation:
              "INNER JOIN returns rows where the join condition matches in both tables.",
          },
          {
            question: "Which JOIN keeps all rows from the left table?",
            options: [
              "INNER JOIN",
              "LEFT JOIN",
              "RIGHT JOIN",
              "SELF JOIN",
            ],
            correctOptionIndex: 1,
            explanation:
              "LEFT JOIN preserves every row from the left table and adds matching data from the right table.",
          },
        ],
      },
    ],
  },

  Subqueries: {
    resources: [
      {
        type: "notes",
        title: "SQL Subqueries — Fundamentals",
        body:
          "A subquery is a query nested inside another SQL query.\n\n" +
          "Subqueries can appear in places such as WHERE, FROM, and SELECT depending on the SQL operation.\n\n" +
          "A subquery can be useful when the result of one query is required as input for another query.",
        order: 0,
      },
      {
        type: "notes",
        title: "Correlated vs Non-Correlated Subqueries",
        body:
          "A non-correlated subquery can execute independently of the outer query.\n\n" +
          "A correlated subquery refers to a value from the outer query and may be evaluated repeatedly for different outer rows.\n\n" +
          "Correlated subqueries can be useful but may require careful consideration of performance.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Subqueries — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a subquery?",
            options: [
              "A query nested inside another query",
              "A database server",
              "A table constraint",
              "A type of index",
            ],
            correctOptionIndex: 0,
            explanation:
              "A subquery is a SQL query nested within another SQL statement.",
          },
          {
            question: "What makes a correlated subquery different?",
            options: [
              "It references the outer query",
              "It cannot contain SELECT",
              "It always creates a table",
              "It never uses WHERE",
            ],
            correctOptionIndex: 0,
            explanation:
              "A correlated subquery references columns or values from the outer query.",
          },
        ],
      },
    ],
  },

  "Aggregate Functions": {
    resources: [
      {
        type: "notes",
        title: "SQL Aggregate Functions",
        body:
          "Aggregate functions calculate a value from a set of rows.\n\n" +
          "Common aggregate functions include COUNT(), SUM(), AVG(), MIN(), and MAX().\n\n" +
          "For example:\n" +
          "SELECT COUNT(*) FROM employees;\n\n" +
          "returns the number of rows in the employees table.",
        order: 0,
      },
      {
        type: "notes",
        title: "COUNT, SUM and AVG",
        body:
          "COUNT() counts rows or non-NULL values depending on the expression used.\n\n" +
          "SUM() calculates the total of numeric values.\n\n" +
          "AVG() calculates the average of numeric values.\n\n" +
          "MIN() and MAX() return the smallest and largest values respectively.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Aggregate Functions — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which function calculates the average of numeric values?",
            options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
            correctOptionIndex: 2,
            explanation:
              "AVG() calculates the arithmetic average of numeric values.",
          },
          {
            question: "Which function returns the largest value?",
            options: ["MIN()", "MAX()", "SUM()", "COUNT()"],
            correctOptionIndex: 1,
            explanation:
              "MAX() returns the largest value in the selected set.",
          },
        ],
      },
    ],
  },

  "GROUP BY & HAVING": {
    resources: [
      {
        type: "notes",
        title: "GROUP BY — Fundamentals",
        body:
          "GROUP BY groups rows that have the same values in specified columns.\n\n" +
          "It is commonly used together with aggregate functions.\n\n" +
          "Example:\n" +
          "SELECT department, COUNT(*)\n" +
          "FROM employees\n" +
          "GROUP BY department;\n\n" +
          "This produces one result group for each department.",
        order: 0,
      },
      {
        type: "notes",
        title: "WHERE vs HAVING",
        body:
          "WHERE filters individual rows before grouping takes place.\n\n" +
          "HAVING filters groups after GROUP BY has been applied.\n\n" +
          "For example, HAVING COUNT(*) > 5 can be used to return only groups containing more than five rows.\n\n" +
          "This WHERE vs HAVING distinction is a common SQL interview question.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "GROUP BY & HAVING — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is GROUP BY primarily used for?",
            options: [
              "Grouping rows for aggregation",
              "Deleting rows",
              "Creating indexes",
              "Renaming databases",
            ],
            correctOptionIndex: 0,
            explanation:
              "GROUP BY combines rows with matching grouping values so aggregate calculations can be performed for each group.",
          },
          {
            question: "Which clause filters groups after aggregation?",
            options: ["WHERE", "HAVING", "ORDER BY", "SELECT"],
            correctOptionIndex: 1,
            explanation:
              "HAVING filters grouped results, often using aggregate functions.",
          },
        ],
      },
    ],
  },

  Indexes: {
    resources: [
      {
        type: "notes",
        title: "SQL Indexes — Fundamentals",
        body:
          "An index is a data structure that helps a database find rows more efficiently without scanning the entire table.\n\n" +
          "Indexes are especially useful for frequently searched, joined, or sorted columns.\n\n" +
          "The tradeoff is that indexes require additional storage and can make INSERT, UPDATE, and DELETE operations more expensive because the index also needs to be maintained.",
        order: 0,
      },
      {
        type: "notes",
        title: "Composite Indexes",
        body:
          "A composite index contains multiple columns.\n\n" +
          "For example, an index on (last_name, first_name) can efficiently support searches beginning with last_name and searches using both last_name and first_name.\n\n" +
          "Column order matters. An index on (A, B) is generally much less useful for a query filtering only on B.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SQL Indexes — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a primary benefit of an index?",
            options: [
              "Faster data retrieval for suitable queries",
              "Smaller tables",
              "Automatic normalization",
              "Removing all NULL values",
            ],
            correctOptionIndex: 0,
            explanation:
              "Indexes can significantly improve retrieval performance for suitable queries.",
          },
          {
            question: "What is a common disadvantage of having many indexes?",
            options: [
              "Writes can become slower",
              "SELECT becomes impossible",
              "Tables cannot be joined",
              "Queries cannot use WHERE",
            ],
            correctOptionIndex: 0,
            explanation:
              "Indexes must be maintained when data changes, which can increase write cost.",
          },
        ],
      },
    ],
  },

  Views: {
    resources: [
      {
        type: "notes",
        title: "SQL Views — Fundamentals",
        body:
          "A view is a virtual table based on the result of a SQL query.\n\n" +
          "Views can simplify complex queries, provide a consistent interface to data, and restrict access to selected columns or rows.\n\n" +
          "A normal view generally stores the query definition rather than a separate physical copy of the underlying data.",
        order: 0,
      },
      {
        type: "notes",
        title: "Creating and Using Views",
        body:
          "A view can be created using CREATE VIEW.\n\n" +
          "Example:\n" +
          "CREATE VIEW active_users AS\n" +
          "SELECT id, name FROM users WHERE active = true;\n\n" +
          "The view can then be queried like a table using SELECT.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SQL Views — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a database view?",
            options: [
              "A virtual table based on a query",
              "A physical hard disk",
              "An index only",
              "A stored password",
            ],
            correctOptionIndex: 0,
            explanation:
              "A view presents the result of a stored query as a virtual table.",
          },
          {
            question: "Which statement creates a view?",
            options: [
              "CREATE VIEW",
              "MAKE TABLE",
              "ADD VIEW",
              "NEW VIEW",
            ],
            correctOptionIndex: 0,
            explanation:
              "CREATE VIEW is the SQL statement used to define a view.",
          },
        ],
      },
    ],
  },

  "Stored Procedures": {
    resources: [
      {
        type: "notes",
        title: "Stored Procedures — Fundamentals",
        body:
          "A stored procedure is a named set of SQL statements stored and executed by the database system.\n\n" +
          "Stored procedures can accept parameters and encapsulate database operations.\n\n" +
          "They can be useful for reusing database logic, enforcing consistent operations, and reducing repeated application-side SQL.",
        order: 0,
      },
      {
        type: "notes",
        title: "Procedures vs Functions",
        body:
          "The exact behavior differs between database systems, but generally a stored procedure is designed to perform an operation and may return result sets or output parameters.\n\n" +
          "A database function is typically designed to return a value and can often be used within SQL expressions.\n\n" +
          "Always check the specific database system because syntax and capabilities vary.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Stored Procedures — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a stored procedure?",
            options: [
              "A stored collection of database operations",
              "A network protocol",
              "A type of index",
              "A frontend component",
            ],
            correctOptionIndex: 0,
            explanation:
              "A stored procedure contains database logic stored and executed by the database system.",
          },
          {
            question: "Can stored procedures generally accept parameters?",
            options: [
              "Yes",
              "No",
              "Only in HTML",
              "Only in CSS",
            ],
            correctOptionIndex: 0,
            explanation:
              "Stored procedures can commonly accept input parameters and may also provide output parameters depending on the database system.",
          },
        ],
      },
    ],
  },

  Transactions: {
    resources: [
      {
        type: "notes",
        title: "SQL Transactions — Fundamentals",
        body:
          "A transaction is a logical unit of database work that should be completed as a whole.\n\n" +
          "Transactions are commonly controlled using commands such as COMMIT and ROLLBACK.\n\n" +
          "COMMIT makes the transaction's changes permanent, while ROLLBACK undoes changes made within the transaction when supported by the database and transaction context.",
        order: 0,
      },
      {
        type: "notes",
        title: "ACID Properties",
        body:
          "ACID describes important transaction properties.\n\n" +
          "Atomicity means the transaction is treated as an all-or-nothing unit.\n\n" +
          "Consistency means transactions preserve defined database rules.\n\n" +
          "Isolation controls how concurrent transactions interact.\n\n" +
          "Durability means committed changes survive appropriate failures.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Transactions — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which command permanently saves a transaction's changes?",
            options: ["ROLLBACK", "COMMIT", "DELETE", "DROP"],
            correctOptionIndex: 1,
            explanation:
              "COMMIT makes the changes performed by the transaction permanent.",
          },
          {
            question: "Which ACID property means all-or-nothing execution?",
            options: [
              "Consistency",
              "Isolation",
              "Atomicity",
              "Durability",
            ],
            correctOptionIndex: 2,
            explanation:
              "Atomicity means a transaction is treated as a single all-or-nothing unit.",
          },
        ],
      },
    ],
  },

  "Query Optimization": {
    resources: [
      {
        type: "notes",
        title: "SQL Query Optimization — Fundamentals",
        body:
          "Query optimization aims to reduce the resources and time required to execute a SQL query while producing the same result.\n\n" +
          "Common approaches include selecting only required columns, filtering early, using appropriate indexes, avoiding unnecessary joins, and examining the database execution plan.\n\n" +
          "The database optimizer may choose different execution strategies depending on table statistics, indexes, query structure, and the database engine.",
        order: 0,
      },
      {
        type: "notes",
        title: "Execution Plans",
        body:
          "An execution plan describes how the database intends to execute a query.\n\n" +
          "It can reveal whether the database is performing an index lookup, table scan, join operation, sort, aggregation, or another operation.\n\n" +
          "Learning to read execution plans is an important skill for diagnosing slow queries.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Query Optimization — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which tool is commonly used to inspect how a database executes a query?",
            options: [
              "Execution plan",
              "CSS inspector",
              "Git log",
              "DNS cache",
            ],
            correctOptionIndex: 0,
            explanation:
              "An execution plan shows the operations the database uses or plans to use to execute a query.",
          },
          {
            question: "Which can improve performance for suitable WHERE queries?",
            options: [
              "Appropriate indexing",
              "Adding random columns",
              "Removing all constraints",
              "Using SELECT * everywhere",
            ],
            correctOptionIndex: 0,
            explanation:
              "A suitable index can allow the database to locate matching rows more efficiently.",
          },
        ],
      },
    ],
  },
};