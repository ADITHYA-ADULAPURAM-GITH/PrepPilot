export const computerNetworksContent = {
  "OSI Model": {
    resources: [
      {
        type: "notes",
        title: "OSI Model — Fundamentals",
        body:
          "The OSI (Open Systems Interconnection) model is a seven-layer conceptual model used to understand how data moves between applications and network devices.\n\n" +
          "The seven layers from top to bottom are: Application, Presentation, Session, Transport, Network, Data Link, and Physical.\n\n" +
          "Each layer has a specific responsibility. The upper layers mainly deal with application-level communication, while the lower layers handle data transmission across the network.",
        order: 0,
      },
      {
        type: "notes",
        title: "Seven OSI Layers",
        body:
          "Application — provides network services directly to applications.\n" +
          "Presentation — handles translation, encryption, and compression.\n" +
          "Session — establishes and manages communication sessions.\n" +
          "Transport — provides end-to-end delivery, reliability, flow control, and segmentation.\n" +
          "Network — handles logical addressing and routing.\n" +
          "Data Link — handles frames, MAC addressing, and local delivery.\n" +
          "Physical — transmits raw bits through the physical medium.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "OSI Model — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which OSI layer is responsible for routing packets?",
            options: [
              "Transport",
              "Network",
              "Data Link",
              "Session",
            ],
            correctOptionIndex: 1,
            explanation:
              "The Network layer is responsible for logical addressing and routing packets between networks.",
          },
          {
            question: "Which OSI layer handles MAC addresses?",
            options: [
              "Physical",
              "Network",
              "Data Link",
              "Transport",
            ],
            correctOptionIndex: 2,
            explanation:
              "MAC addressing is handled at the Data Link layer.",
          },
        ],
      },
    ],
  },

  "TCP/IP Model": {
    resources: [
      {
        type: "notes",
        title: "TCP/IP Model — Fundamentals",
        body:
          "The TCP/IP model is the practical networking model used by the Internet. It commonly consists of four layers: Application, Transport, Internet, and Network Access.\n\n" +
          "Unlike the seven-layer OSI model, TCP/IP combines some OSI responsibilities into fewer layers.\n\n" +
          "Examples include HTTP and DNS at the Application layer, TCP and UDP at the Transport layer, and IP at the Internet layer.",
        order: 0,
      },
      {
        type: "notes",
        title: "OSI vs TCP/IP",
        body:
          "The OSI model is mainly a conceptual reference model, while TCP/IP describes the protocol architecture used in real-world networks.\n\n" +
          "The OSI model has seven layers. The commonly used TCP/IP model has four layers.\n\n" +
          "For interviews, remember that TCP/IP is closely associated with the actual Internet protocol suite.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "TCP/IP Model — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which protocol operates at the Transport layer of TCP/IP?",
            options: ["HTTP", "IP", "TCP", "Ethernet"],
            correctOptionIndex: 2,
            explanation:
              "TCP is a Transport-layer protocol that provides reliable, connection-oriented delivery.",
          },
          {
            question: "Which protocol is responsible for logical addressing?",
            options: ["IP", "HTTP", "Ethernet", "DNS"],
            correctOptionIndex: 0,
            explanation:
              "IP provides logical addressing and enables routing between networks.",
          },
        ],
      },
    ],
  },

  "IP Addressing": {
    resources: [
      {
        type: "notes",
        title: "IP Addressing — Fundamentals",
        body:
          "An IP address identifies a device or network interface at the network layer.\n\n" +
          "IPv4 addresses contain 32 bits and are commonly written as four decimal octets, such as 192.168.1.10.\n\n" +
          "IPv6 uses 128-bit addresses and was introduced to provide a much larger address space.",
        order: 0,
      },
      {
        type: "notes",
        title: "IPv4, IPv6 and Private Addresses",
        body:
          "IPv4 provides approximately 4.3 billion possible addresses, which is insufficient for the modern Internet.\n\n" +
          "IPv6 provides a vastly larger address space.\n\n" +
          "Private IPv4 address ranges are commonly used inside local networks and are not directly routable on the public Internet. NAT is commonly used when private devices access the Internet.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "IP Addressing — Quick Check",
        order: 0,
        questions: [
          {
            question: "How many bits are in an IPv4 address?",
            options: ["16", "32", "64", "128"],
            correctOptionIndex: 1,
            explanation:
              "IPv4 addresses are 32 bits long.",
          },
          {
            question: "How many bits are in an IPv6 address?",
            options: ["32", "64", "96", "128"],
            correctOptionIndex: 3,
            explanation:
              "IPv6 addresses are 128 bits long.",
          },
        ],
      },
    ],
  },

  Routing: {
    resources: [
      {
        type: "notes",
        title: "Routing — Fundamentals",
        body:
          "Routing is the process of determining a path for packets to travel from a source network to a destination network.\n\n" +
          "Routers examine destination IP addresses and use routing tables to determine where packets should be forwarded.\n\n" +
          "Routing can be static, where routes are manually configured, or dynamic, where routing protocols automatically exchange route information.",
        order: 0,
      },
      {
        type: "notes",
        title: "Routing Tables and Protocols",
        body:
          "A routing table contains information about available destinations and the next hop or interface used to reach them.\n\n" +
          "Common routing protocols include RIP, OSPF, and BGP.\n\n" +
          "OSPF is commonly used inside an autonomous system, while BGP is the major routing protocol used between autonomous systems on the Internet.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Routing — Quick Check",
        order: 0,
        questions: [
          {
            question: "What does a router primarily use to decide where to forward a packet?",
            options: [
              "Routing table",
              "MAC address of the sender only",
              "HTTP headers",
              "DNS cache only",
            ],
            correctOptionIndex: 0,
            explanation:
              "Routers use routing tables to determine the appropriate next hop or outgoing interface.",
          },
          {
            question: "Which protocol is primarily used for routing between autonomous systems?",
            options: ["BGP", "ARP", "HTTP", "FTP"],
            correctOptionIndex: 0,
            explanation:
              "BGP is the primary inter-domain routing protocol used between autonomous systems.",
          },
        ],
      },
    ],
  },

  "Congestion Control": {
    resources: [
      {
        type: "notes",
        title: "Congestion Control — Fundamentals",
        body:
          "Network congestion occurs when the amount of traffic entering a network exceeds the network's ability to process or forward it.\n\n" +
          "Congestion can cause increased delay, packet loss, and reduced throughput.\n\n" +
          "TCP uses congestion-control mechanisms to adjust its sending rate according to perceived network conditions.",
        order: 0,
      },
      {
        type: "notes",
        title: "TCP Congestion Control",
        body:
          "Important TCP congestion-control concepts include Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.\n\n" +
          "Slow Start increases the congestion window rapidly at first. Congestion Avoidance then increases it more conservatively.\n\n" +
          "When congestion is detected, TCP reduces its sending rate.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Congestion Control — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is a major symptom of network congestion?",
            options: [
              "Reduced latency",
              "Packet loss and increased delay",
              "Unlimited bandwidth",
              "Faster transmission",
            ],
            correctOptionIndex: 1,
            explanation:
              "Congestion can cause packet loss, queueing delay, and reduced throughput.",
          },
          {
            question: "Which protocol commonly implements congestion control?",
            options: ["TCP", "ARP", "DNS", "Ethernet"],
            correctOptionIndex: 0,
            explanation:
              "TCP dynamically adjusts its sending rate based on network conditions.",
          },
        ],
      },
    ],
  },

  "TCP vs UDP": {
    resources: [
      {
        type: "notes",
        title: "TCP vs UDP — Fundamentals",
        body:
          "TCP is connection-oriented and provides reliable, ordered delivery of data. It uses acknowledgements, retransmissions, flow control, and congestion control.\n\n" +
          "UDP is connectionless and provides a lightweight transport mechanism without guaranteeing delivery, ordering, or retransmission.\n\n" +
          "TCP is useful when reliability matters. UDP is useful when low overhead and speed are more important than guaranteed delivery.",
        order: 0,
      },
      {
        type: "notes",
        title: "Common TCP and UDP Use Cases",
        body:
          "TCP is commonly used by HTTP/HTTPS, SSH, and FTP because reliable delivery is important.\n\n" +
          "UDP is commonly used for applications such as DNS queries, streaming, online gaming, and real-time communication where avoiding retransmission delays can be valuable.\n\n" +
          "The exact protocol used depends on the application requirements.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "TCP vs UDP — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which protocol provides reliable, ordered delivery?",
            options: ["UDP", "TCP", "IP", "ARP"],
            correctOptionIndex: 1,
            explanation:
              "TCP provides reliable and ordered byte-stream delivery.",
          },
          {
            question: "Which protocol generally has lower transport-layer overhead?",
            options: ["TCP", "UDP", "HTTP", "TLS"],
            correctOptionIndex: 1,
            explanation:
              "UDP has a smaller and simpler transport header and does not provide TCP's reliability mechanisms.",
          },
        ],
      },
    ],
  },

  DNS: {
    resources: [
      {
        type: "notes",
        title: "DNS — Fundamentals",
        body:
          "The Domain Name System (DNS) translates human-readable domain names into IP addresses and supports other types of resource records.\n\n" +
          "For example, a browser can use DNS to resolve a domain name into the IP address of a server.\n\n" +
          "DNS is hierarchical and distributed rather than relying on one central database.",
        order: 0,
      },
      {
        type: "notes",
        title: "DNS Resolution",
        body:
          "A typical DNS lookup can involve a client resolver, recursive DNS resolver, root servers, top-level domain servers, and authoritative name servers.\n\n" +
          "Caching is heavily used in DNS to reduce lookup time and network traffic.\n\n" +
          "Common DNS records include A, AAAA, CNAME, MX, and NS records.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "DNS — Quick Check",
        order: 0,
        questions: [
          {
            question: "What is the primary purpose of DNS?",
            options: [
              "Encrypt network traffic",
              "Translate domain names to network information such as IP addresses",
              "Transfer files",
              "Route packets directly",
            ],
            correctOptionIndex: 1,
            explanation:
              "DNS provides name resolution, most commonly translating domain names into IP addresses.",
          },
          {
            question: "Which DNS record maps a name to an IPv4 address?",
            options: ["AAAA", "MX", "A", "CNAME"],
            correctOptionIndex: 2,
            explanation:
              "An A record maps a hostname to an IPv4 address.",
          },
        ],
      },
    ],
  },

  "HTTP/HTTPS": {
    resources: [
      {
        type: "notes",
        title: "HTTP and HTTPS — Fundamentals",
        body:
          "HTTP is an application-layer protocol used for communication between clients and servers on the Web.\n\n" +
          "HTTPS is HTTP transmitted over a secure TLS connection. TLS provides encryption, authentication, and integrity protection for the connection.\n\n" +
          "HTTP follows a request-response model in which a client sends a request and the server returns a response.",
        order: 0,
      },
      {
        type: "notes",
        title: "HTTP Methods and Status Codes",
        body:
          "Common HTTP methods include GET, POST, PUT, PATCH, and DELETE.\n\n" +
          "Status codes are grouped into classes: 2xx indicates success, 3xx redirection, 4xx client errors, and 5xx server errors.\n\n" +
          "Examples include 200 OK, 201 Created, 404 Not Found, and 500 Internal Server Error.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "HTTP/HTTPS — Quick Check",
        order: 0,
        questions: [
          {
            question: "What does HTTPS add to HTTP?",
            options: [
              "TLS-based security",
              "DNS resolution",
              "IP routing",
              "MAC addressing",
            ],
            correctOptionIndex: 0,
            explanation:
              "HTTPS uses HTTP over TLS to provide encryption, authentication, and integrity.",
          },
          {
            question: "What does HTTP status code 404 normally indicate?",
            options: [
              "Successful request",
              "Resource not found",
              "Server started",
              "Unauthorized DNS query",
            ],
            correctOptionIndex: 1,
            explanation:
              "404 Not Found indicates that the requested resource could not be found.",
          },
        ],
      },
    ],
  },

  "Network Security": {
    resources: [
      {
        type: "notes",
        title: "Network Security — Fundamentals",
        body:
          "Network security protects systems, applications, devices, and data from unauthorized access, misuse, disruption, and attacks.\n\n" +
          "Important security goals include confidentiality, integrity, and availability, commonly called the CIA triad.\n\n" +
          "Common mechanisms include firewalls, encryption, authentication, intrusion detection, and access control.",
        order: 0,
      },
      {
        type: "notes",
        title: "Common Network Attacks",
        body:
          "Common network attacks include denial-of-service attacks, man-in-the-middle attacks, spoofing, packet sniffing, and various forms of social engineering.\n\n" +
          "Security controls attempt to reduce the likelihood or impact of these attacks.\n\n" +
          "Encryption protects information from unauthorized observation, while authentication verifies identity.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Network Security — Quick Check",
        order: 0,
        questions: [
          {
            question: "Which of the following is part of the CIA triad?",
            options: [
              "Confidentiality",
              "Compilation",
              "Compression",
              "Caching",
            ],
            correctOptionIndex: 0,
            explanation:
              "The CIA triad consists of Confidentiality, Integrity, and Availability.",
          },
          {
            question: "What is the primary purpose of encryption?",
            options: [
              "Increase CPU speed",
              "Protect information from unauthorized access",
              "Assign IP addresses",
              "Route packets",
            ],
            correctOptionIndex: 1,
            explanation:
              "Encryption transforms information so unauthorized parties cannot easily understand it.",
          },
        ],
      },
    ],
  },

  Sockets: {
    resources: [
      {
        type: "notes",
        title: "Network Sockets — Fundamentals",
        body:
          "A socket is a communication endpoint used by applications to exchange data over a network.\n\n" +
          "A socket is commonly associated with an IP address and port number, allowing the operating system to identify the application endpoint.\n\n" +
          "TCP sockets provide connection-oriented communication, while UDP sockets provide connectionless datagram communication.",
        order: 0,
      },
      {
        type: "notes",
        title: "Client-Server Socket Communication",
        body:
          "In a typical TCP server, the server creates a socket, binds it to an address and port, listens for connections, and accepts client connections.\n\n" +
          "A client creates a socket and connects to the server.\n\n" +
          "After the connection is established, both sides can exchange data through the socket.",
        order: 1,
      },
    ],
    practice: [
      {
        title: "Sockets — Quick Check",
        order: 0,
        questions: [
          {
            question: "What identifies a network service on a host together with its IP address?",
            options: [
              "Port number",
              "MAC address only",
              "DNS zone",
              "Subnet mask only",
            ],
            correctOptionIndex: 0,
            explanation:
              "A port number identifies a particular application or service endpoint on a host.",
          },
          {
            question: "Which transport protocol is connection-oriented?",
            options: ["UDP", "TCP", "IP", "ARP"],
            correctOptionIndex: 1,
            explanation:
              "TCP establishes a connection before exchanging application data.",
          },
        ],
      },
    ],
  },
};