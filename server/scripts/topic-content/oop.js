export const oopContent = {
  "Classes & Objects": {
    resources: [
      {
        type: "notes",
        title: "Classes and Objects — Core Concepts",
        body:
          "A class is a blueprint that defines the data and behavior of objects. An object is an instance of a class.\n\n" +
          "A class typically contains fields that represent state and methods that represent behavior.\n\n" +
          "For example, a Student class could contain fields such as name and rollNumber and methods such as study() or displayDetails().",
        order: 0,
      },
      {
        type: "notes",
        title: "Object Creation and State",
        body:
          "Objects are created from classes. Each object has its own state stored in its instance fields, while methods describe operations that the object can perform.\n\n" +
          "Multiple objects can be created from the same class, with each object maintaining its own values.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Classes & Objects — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a class?",
            options: [
              "A blueprint for creating objects",
              "A database table",
              "A network protocol",
              "A compiler error",
            ],
            correctOptionIndex: 0,
            explanation:
              "A class defines the structure and behavior that objects created from it can have.",
          },
          {
            question: "What is an object?",
            options: [
              "A blueprint",
              "An instance of a class",
              "A method",
              "A constructor only",
            ],
            correctOptionIndex: 1,
            explanation:
              "An object is an instance created from a class.",
          },
        ],
      },
    ],
  },

  Inheritance: {
    resources: [
      {
        type: "notes",
        title: "Inheritance — Core Concepts",
        body:
          "Inheritance allows a class to acquire properties and behavior from another class.\n\n" +
          "The class being inherited from is commonly called the parent or base class, while the inheriting class is called the child or derived class.\n\n" +
          "Inheritance promotes code reuse and allows related classes to be organized into hierarchies.",
        order: 0,
      },
      {
        type: "notes",
        title: "Types of Inheritance",
        body:
          "Common forms include single inheritance, multilevel inheritance, hierarchical inheritance, and multiple inheritance where the language supports it.\n\n" +
          "Java supports single, multilevel, and hierarchical class inheritance but does not support multiple inheritance of classes. Multiple inheritance of type can be achieved through interfaces.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Inheritance — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is the main purpose of inheritance?",
            options: [
              "Code reuse and hierarchical relationships",
              "Database normalization",
              "Network routing",
              "Memory allocation",
            ],
            correctOptionIndex: 0,
            explanation:
              "Inheritance allows a child class to reuse and extend functionality from a parent class.",
          },
          {
            question: "Which class inherits properties from another class?",
            options: [
              "Parent class",
              "Derived class",
              "Database class",
              "Static class",
            ],
            correctOptionIndex: 1,
            explanation:
              "The derived or child class inherits from the parent or base class.",
          },
        ],
      },
    ],
  },

  Polymorphism: {
    resources: [
      {
        type: "notes",
        title: "Polymorphism — Core Concepts",
        body:
          "Polymorphism means 'many forms'. It allows the same interface or operation to behave differently depending on the object or context.\n\n" +
          "Two commonly discussed forms are compile-time polymorphism and runtime polymorphism.\n\n" +
          "Method overloading is commonly associated with compile-time polymorphism, while method overriding enables runtime polymorphism.",
        order: 0,
      },
      {
        type: "notes",
        title: "Runtime Polymorphism",
        body:
          "Runtime polymorphism occurs when a parent-class reference refers to a child-class object and an overridden method is selected at runtime.\n\n" +
          "This allows code to work with a general type while executing behavior specific to the actual object.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Polymorphism — Quick Check",
        order: 0,
        questions: [
          {
            question: "What does polymorphism mean?",
            options: [
              "One form only",
              "Many forms",
              "No inheritance",
              "Data hiding only",
            ],
            correctOptionIndex: 1,
            explanation:
              "Polymorphism allows an interface or operation to take or exhibit multiple forms.",
          },
          {
            question: "Which concept commonly enables runtime polymorphism?",
            options: [
              "Method overriding",
              "Variable declaration",
              "File handling",
              "Database indexing",
            ],
            correctOptionIndex: 0,
            explanation:
              "Method overriding allows a subclass to provide its own implementation that can be selected at runtime.",
          },
        ],
      },
    ],
  },

  Encapsulation: {
    resources: [
      {
        type: "notes",
        title: "Encapsulation — Core Concepts",
        body:
          "Encapsulation combines data and the operations that work on that data within a class while controlling access to the internal state.\n\n" +
          "A common implementation uses private fields together with public methods such as getters and setters.\n\n" +
          "The goal is to protect object state and expose only the operations that are appropriate.",
        order: 0,
      },
      {
        type: "notes",
        title: "Access Modifiers",
        body:
          "Access modifiers control where class members can be accessed.\n\n" +
          "Common Java modifiers include private, protected, and public.\n\n" +
          "Keeping fields private and exposing controlled methods is a common way to implement encapsulation.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Encapsulation — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a common way to implement encapsulation?",
            options: [
              "Make all fields public",
              "Use private fields with controlled methods",
              "Remove all methods",
              "Use only static variables",
            ],
            correctOptionIndex: 1,
            explanation:
              "Private fields combined with controlled public methods help protect and manage internal state.",
          },
          {
            question: "Which access modifier provides the most restricted access among these Java modifiers?",
            options: ["public", "protected", "private", "default"],
            correctOptionIndex: 2,
            explanation:
              "Private members are accessible only within the class that declares them.",
          },
        ],
      },
    ],
  },

  Abstraction: {
    resources: [
      {
        type: "notes",
        title: "Abstraction — Core Concepts",
        body:
          "Abstraction focuses on exposing essential behavior while hiding unnecessary implementation details.\n\n" +
          "For example, a user can call a method such as startEngine() without needing to understand every internal operation performed by the engine.\n\n" +
          "In Java, abstraction can commonly be implemented using abstract classes and interfaces.",
        order: 0,
      },
      {
        type: "notes",
        title: "Abstract Classes and Interfaces",
        body:
          "An abstract class can contain both abstract methods and implemented methods. It can also contain instance state.\n\n" +
          "An interface defines a contract that implementing classes must satisfy. Modern Java interfaces can also contain default and static methods.\n\n" +
          "Both mechanisms are useful for designing systems around abstractions rather than concrete implementations.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Abstraction — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is the primary goal of abstraction?",
            options: [
              "Expose every implementation detail",
              "Hide unnecessary implementation details",
              "Remove all classes",
              "Prevent object creation completely",
            ],
            correctOptionIndex: 1,
            explanation:
              "Abstraction exposes essential behavior while hiding implementation details that users of the abstraction do not need.",
          },
          {
            question: "Which Java feature can be used to define an abstraction contract?",
            options: [
              "Interface",
              "Array",
              "Package",
              "Loop",
            ],
            correctOptionIndex: 0,
            explanation:
              "Interfaces are commonly used to define contracts that implementing classes must follow.",
          },
        ],
      },
    ],
  },

  "Constructors & Destructors": {
    resources: [
      {
        type: "notes",
        title: "Constructors — Core Concepts",
        body:
          "A constructor is a special member used to initialize an object when it is created.\n\n" +
          "In Java, constructors have the same name as the class and do not have a return type.\n\n" +
          "Constructors can be overloaded, allowing objects to be initialized in different ways.",
        order: 0,
      },
      {
        type: "notes",
        title: "Destructors and Garbage Collection",
        body:
          "C++ provides destructors for cleanup when objects are destroyed. A destructor has the same name as the class preceded by a tilde.\n\n" +
          "Java does not provide C++-style deterministic destructors. Java uses automatic garbage collection to reclaim memory from objects that are no longer reachable.\n\n" +
          "This distinction is important when comparing C++ and Java object lifecycles.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Constructors & Destructors — Quick Check",
        order: 0,
        questions: [
          {
            question: "When is a constructor typically invoked?",
            options: [
              "When an object is created",
              "Only when a program ends",
              "When a database is queried",
              "When a network packet arrives",
            ],
            correctOptionIndex: 0,
            explanation:
              "Constructors are used to initialize objects during object creation.",
          },
          {
            question: "Which language provides C++-style destructors?",
            options: ["Java", "C++", "JavaScript only", "SQL"],
            correctOptionIndex: 1,
            explanation:
              "C++ provides destructors for object cleanup. Java instead relies on garbage collection.",
          },
        ],
      },
    ],
  },

  "Interfaces & Abstract Classes": {
    resources: [
      {
        type: "notes",
        title: "Interfaces vs Abstract Classes",
        body:
          "Both interfaces and abstract classes are used to define abstractions.\n\n" +
          "An abstract class can contain state, constructors, concrete methods, and abstract methods. An interface primarily defines a contract and supports multiple implementation by classes.\n\n" +
          "The choice depends on whether classes need shared implementation/state or primarily need to conform to a common contract.",
        order: 0,
      },
      {
        type: "notes",
        title: "When to Use Each",
        body:
          "Use an abstract class when closely related classes share common state or implementation.\n\n" +
          "Use an interface when you want to define a capability or contract that potentially unrelated classes can implement.\n\n" +
          "A Java class can implement multiple interfaces, which is useful when a class needs to satisfy multiple contracts.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Interfaces & Abstract Classes — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which can contain implemented methods and instance state in Java?",
            options: [
              "Abstract class",
              "Only primitive types",
              "SQL table",
              "Package",
            ],
            correctOptionIndex: 0,
            explanation:
              "Abstract classes can contain state and concrete as well as abstract methods.",
          },
          {
            question: "What is a major advantage of interfaces?",
            options: [
              "A class can implement multiple interfaces",
              "They replace all classes",
              "They automatically create objects",
              "They eliminate methods",
            ],
            correctOptionIndex: 0,
            explanation:
              "Java allows a class to implement multiple interfaces.",
          },
        ],
      },
    ],
  },

  "Method Overloading & Overriding": {
    resources: [
      {
        type: "notes",
        title: "Method Overloading",
        body:
          "Method overloading occurs when multiple methods have the same name but different parameter lists within a class or inheritance context.\n\n" +
          "The compiler determines which overloaded method should be called based on the arguments.\n\n" +
          "Therefore, overloading is commonly associated with compile-time polymorphism.",
        order: 0,
      },
      {
        type: "notes",
        title: "Method Overriding",
        body:
          "Method overriding occurs when a subclass provides its own implementation of an inherited method with a compatible signature.\n\n" +
          "When a parent reference points to a child object, the overridden method can be selected at runtime.\n\n" +
          "This is a fundamental mechanism behind runtime polymorphism.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Overloading & Overriding — Quick Check",
        order: 0,
        questions: [
          {
            question: "What must differ between overloaded methods?",
            options: [
              "Their parameter lists",
              "Only their comments",
              "Their class name",
              "Their package name only",
            ],
            correctOptionIndex: 0,
            explanation:
              "Overloaded methods must have different parameter lists.",
          },
          {
            question: "Which concept is strongly associated with runtime polymorphism?",
            options: [
              "Method overriding",
              "Method overloading",
              "Variable initialization",
              "Compilation only",
            ],
            correctOptionIndex: 0,
            explanation:
              "Overriding allows subclass behavior to be selected dynamically at runtime.",
          },
        ],
      },
    ],
  },

  "Design Patterns": {
    resources: [
      {
        type: "notes",
        title: "Design Patterns — Fundamentals",
        body:
          "Design patterns are reusable approaches to common software design problems. They are not complete programs or libraries; they are general design solutions that can be adapted to a particular system.\n\n" +
          "Patterns can improve maintainability, communication between developers, and consistency when applied appropriately.",
        order: 0,
      },
      {
        type: "notes",
        title: "Common Design Pattern Categories",
        body:
          "Design patterns are commonly grouped into Creational, Structural, and Behavioral categories.\n\n" +
          "Creational patterns deal with object creation. Structural patterns deal with relationships between objects and classes. Behavioral patterns deal with communication and responsibility between objects.\n\n" +
          "Examples include Singleton, Factory, Adapter, Decorator, Observer, and Strategy.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Design Patterns — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a design pattern?",
            options: [
              "A reusable approach to a common design problem",
              "A programming language",
              "A database schema",
              "A compiler",
            ],
            correctOptionIndex: 0,
            explanation:
              "A design pattern describes a reusable design approach to a recurring software design problem.",
          },
          {
            question: "Which is a behavioral design pattern?",
            options: [
              "Observer",
              "Factory",
              "Adapter",
              "Singleton",
            ],
            correctOptionIndex: 0,
            explanation:
              "Observer is commonly categorized as a behavioral design pattern.",
          },
        ],
      },
    ],
  },

  "SOLID Principles": {
    resources: [
      {
        type: "notes",
        title: "SOLID Principles — Overview",
        body:
          "SOLID is a set of five object-oriented design principles intended to make software easier to maintain, extend, and understand.\n\n" +
          "S — Single Responsibility Principle\n" +
          "O — Open/Closed Principle\n" +
          "L — Liskov Substitution Principle\n" +
          "I — Interface Segregation Principle\n" +
          "D — Dependency Inversion Principle",
        order: 0,
      },
      {
        type: "notes",
        title: "Understanding the Five Principles",
        body:
          "Single Responsibility: a class should have one reason to change.\n\n" +
          "Open/Closed: software entities should generally be open for extension but closed for modification.\n\n" +
          "Liskov Substitution: subtypes should be usable wherever their base types are expected without breaking correctness.\n\n" +
          "Interface Segregation: clients should not be forced to depend on methods they do not use.\n\n" +
          "Dependency Inversion: high-level modules should depend on abstractions rather than concrete low-level implementations.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "SOLID Principles — Quick Check",
        order: 0,
        questions: [
          {
            question: "What does the S in SOLID stand for?",
            options: [
              "Single Responsibility Principle",
              "Service Routing Principle",
              "Static Resource Principle",
              "System Runtime Principle",
            ],
            correctOptionIndex: 0,
            explanation:
              "S stands for Single Responsibility Principle.",
          },
          {
            question: "Which principle says software should be open for extension but closed for modification?",
            options: [
              "SRP",
              "OCP",
              "LSP",
              "DIP",
            ],
            correctOptionIndex: 1,
            explanation:
              "OCP is the Open/Closed Principle.",
          },
        ],
      },
    ],
  },
};