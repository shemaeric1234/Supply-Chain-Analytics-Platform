## CONTRIBUTORS (Group 1 members)

- Sylvain BIKORIMANA (223028136)

- Eric SHEMA (221000428)

- Marie Justine UMUHOZA (223027308)

---

## CLOUD COMPUTING AND WEB PROGRAMMING PROJECT

## SUPPLY CHAIN ANALYTICS

### Introduction and Background

The rapid growth of e-commerce has dramatically increased the complexity of supply chain operations, requiring robust analytical tools to optimize processes and support informed decision-making. This project aims to build an advanced e-commerce platform with integrated real-time supply chain analytics. Utilizing Django APIs and ReactJS capabilities for development, Apache Kafka for real-time data streaming, and SQL for structured data storage, the platform facilitates seamless product browsing, inventory management, order processing, and actionable analytics.
By integrating these cutting-edge technologies, the project addresses the need for efficient, scalable, and user-friendly solutions in modern supply chain ecosystems. It aims to deliver a robust platform capable of handling high transaction volumes while providing real-time insights for data-driven decision-making.

### Study Objectives

The primary objective of this project is to develop an e-commerce platform that seamlessly combines user-centric features with advanced supply chain analytics to enhance operational efficiency and customer satisfaction. The project’s key goals include:

1. Enhancing User Experience

> Providing intuitive features for product search, filtering, and purchasing.
> Implementing a secure and straightforward user authentication system with sign-up and login functionalities.
> Offering real-time order tracking and notifications to boost customer satisfaction and engagement.

2. Optimizing Inventory Management

> Enabling real-time inventory monitoring to maintain optimal stock levels and prevent shortages.
> Providing suppliers with tools to add, view, edit, and update product details, ensuring inventory is well-managed.

3. Incorporating Advanced Analytics

> Utilizing predictive analytics to improve demand forecasting, helping businesses better plan inventory and logistics operations.
> Leveraging Hadoop for large-scale data analysis, extracting data from SQL databases, and processing it with MapReduce algorithms for actionable insights.

4. Streamlining Logistics Operations

> Enhancing delivery efficiency by tracking logistics data and identifying potential delays.
> Offering real-time alerts for shipment issues or stock shortages to enable proactive resolution.

5. Actionable Insights Through Dashboards

> Visualizing sales, inventory, and logistics data using interactive charts and dashboards powered by Material-UI.
> Providing comprehensive analytics that empowers stakeholders to make data-driven decisions and optimize processes.

6. Scalability and Performance

> Designing the platform to handle high transaction volumes and real-time data processing needs using Kafka for efficient data streaming.
> Ensuring the application is scalable to support future integration with other systems and technologies.

### Key Features of the Supply Chain Analytics Platform

1. Signup and Login

The platform provides a secure user authentication system that allows users to register through a simple sign-up process. This feature ensures that only authenticated users can access certain pages and functionalities, effectively protecting sensitive routes.

2. Product Management

Suppliers can efficiently manage their inventory using this feature. The platform enables users to:

> View all products currently in stock.
> Add new products to the inventory.
> Edit and update details of existing products.
> Maintain real-time visibility of stock availability.

This robust product registration and management system enhances inventory control and helps streamline operations.

3. Order Streaming with Kafka

To enhance scalability and improve performance, the platform integrates Apache Kafka for handling order processing.

> When an order is placed, a Kafka message is produced, ensuring that the process is non-blocking.
> This approach not only accelerates order processing but also allows for seamless integration with external systems in the future.
> Kafka consumers process these messages by consuming them from the order topic, saving the orders to the database.

This system ensures high throughput and reliability, essential for large-scale supply chain operations.

4. Data Analysis Using Hadoop

The platform leverages Hadoop to perform advanced data analysis, providing actionable insights into supply chain operations.

> Data is extracted from database tables and converted into CSV files.
> These CSV files are stored in Hadoop's distributed file system (HDFS).
> MapReduce algorithms, written in Java, analyze the extracted files for trends, patterns, and performance metrics.
> The analysis results are sent back to the platform, where they are visualized in interactive charts for easy interpretation.
> This feature empowers stakeholders to make data-driven decisions, optimize processes, and improve operational efficiency.

By combining these features, the platform offers a comprehensive solution for managing and analyzing supply chain operations, ensuring scalability, performance, and ease of use.

### Conclusion

This project represents a transformative solution for businesses seeking to optimize supply chain operations and deliver superior customer experiences. By integrating advanced analytics, real-time monitoring, and user-centric features, the platform is poised to drive operational excellence, improve decision-making, and enable data-driven strategies in the ever-evolving e-commerce landscape.

## Technologies used

- Django
- React JS
- Material UI
- WebSocket
- Hadoop
- Kafka
- MySQL
