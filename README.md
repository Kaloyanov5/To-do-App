# Todo App
A Spring Boot application that allows users to manage their tasks efficiently. This application provides features for creating, updating and deleting todo tasks.

## Features
- **Create Todo:** Users can add new todo items with details.
- **Update Todo:** Edit existing todo items.
- **Delete Todo:** Remove todo items.
- **Mark as Completed:** Easily mark tasks as complete or incomplete.

## Technologies Used
- **Spring Boot 3.4.2** – Application framework
- **Spring MVC & Spring Data JPA** – For handling web requests and data persistence
- **MySQL** – Database for storing todo data
- **HTML/CSS/JS** – Front-end interface
- **Maven** – Dependency management and build tool

## Setup & Installation

### 1️⃣ Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/Kaloyanov5/todo-app.git
cd todo-app
```

### 2️⃣ Database Setup
This application uses MySQL for storing todo items.

- **Create a MySQL database** (for example, "todo_app"):

```sql
CREATE DATABASE todo_app;
```

- **Update the application properties file** with your MySQL connection details. Edit the `src/main/resources/application.properties.example` and then rename to `application.properties`.

### 3️⃣ Build the Application

**Using IntelliJ IDEA:**
- Open the project in IntelliJ IDEA.
- Ensure Maven dependencies are loaded.
- Locate the main class (for example, `TodoAppApplication.java`) and run the project.

**Using Command Line:**
- Build and run the application using Maven:

```bash
mvn clean install
mvn spring-boot:run
```

### 4️⃣ Test the Application
1. Run the application.
2. Open your browser and navigate to [http://localhost:8080](http://localhost:8080) (or the URL specified in your configuration).
3. Use the provided interface to add, edit, delete, and mark todos as complete.

## License
This project is open-source and available under the MIT License.

## Contributing
Contributions are welcome! Feel free to submit pull requests. For major changes, please open an issue first to discuss your ideas.
