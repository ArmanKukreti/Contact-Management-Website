# Contact-Management-Website Documentation

## Chosen Database and Justification  

**Database**: MongoDB  
**Why it fits this project**:  
MongoDB is a NoSQL database that stores data in a flexible JSON-like format called BSON. It is an excellent choice for this project because:  
1. **Scalability**: MongoDB can handle large amounts of data with ease, making it suitable for growing applications.  
2. **Flexibility**: Its schema-less design allows for iterative development, enabling rapid changes to the data model.  
3. **Ease of Use**: MongoDB integrates seamlessly with JavaScript and Node.js, which aligns well with the project’s tech stack.  

---

## Setup Instructions to Run the Project  

1. **Clone the Repository**:  
   ```bash  
   git clone <repository_url>  
   cd <project_directory>  

2. **Install Dependencies**:
Ensure you have Node.js installed, then run:

a) **Frontend**

    cd /client  
    npm install  

b) **Backend**

    cd /server  
    npm install 


3. **Run the Project**:
Ensure you have Node.js installed, then run:

a) **Start the server**

    cd /server  
    npm run dev  

b) **Start the frontend**

    cd /client  
    npm run dev  

4. **Database Schema Script**:

    *refer server/models/user.model.js*




## Project Description

The Contact-Management-Website is designed to provide an easy-to-use platform for managing contacts. The website allows users to create, update, and delete contacts, store personal details First Name, Last Name, Email, Phone Number, Company, Job Title, and categorize contacts for better management.


## Major Technical Decisions
1. **Tech Stack**:

a) ***Frontend***: React.js, Material-UI  
b) ***Backend***: Node.js, Express  
c) ***Database***: MongoDB  
The decision to use React.js for the frontend allows for efficient rendering and state management in a single-page application. Material-UI was chosen for a clean and responsive UI design. Node.js and Express were chosen for the backend to facilitate fast development with JavaScript, which also allows for seamless integration with the frontend.

2. **Database**: MongoDB was selected as the NoSQL database for this project because it provides flexibility in managing dynamic data structures, making it easier to adapt as the application evolves. It also integrates well with JavaScript-based technologies like Node.js.

3. **Authentication**: JSON Web Tokens (JWT) were chosen to handle user authentication. JWT allows for stateless authentication, which is scalable and fits well with the project’s REST API.


## How the App Works
1. **User Registration**:
Users can register by providing their basic details such as name, email, and password. After a successful registration, the user is redirected to the login page.

2. **Login/Authentication**:
Users authenticate via email and password. After a successful login, a JWT is issued, which is used for authenticating subsequent API requests.

3. **Contact Management**:
Logged-in users can create, update, and delete contacts. Each contact has details such as First Name, Last Name, Email, Phone Number, Company, Job Title. Contacts are stored in MongoDB and can be categorized for better management.


## Challenges Faced and Resolutions  

1. **Challenge**:
One of the main challenges faced was designing the user interface and implementing the full functionality within a short time frame.

**Resolution**:
To overcome this, I focused on using Material-UI components for a clean and responsive design. I also used React’s state management to ensure smooth interactions, while breaking down tasks into smaller, manageable chunks for rapid development.

2. **Challenge**:
Another challenge was ensuring proper database structure and handling user authentication securely.

**Resolution**:
To resolve this, I decided to use MongoDB’s flexible schema to adapt to evolving data structures and implemented JWT for secure user authentication. This ensured scalability and security while keeping the application lightweight.


