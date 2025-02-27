document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed."); // Debugging
    // Fix Dark Mode Toggle (Ensures Correct Class is Used)
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode"); // Fixed class name
            console.log("Dark mode toggled. Current state:", document.body.classList.contains("dark-mode"));
        });
    } else {
        console.error("Dark mode toggle button not found!");
    }
});

// Load Content from content.json
fetch('content.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Content Loaded:", data); // Debugging

        // About Section
        const aboutText = document.getElementById("about-text");
        if (aboutText) aboutText.textContent = data.about;

        // Experience Section
        const experienceText = document.getElementById("experience-text");
        if (experienceText) experienceText.textContent = data.experience;

        // Skills Section
        const skillsContainer = document.getElementById("skills-list");
        if (skillsContainer) {
            skillsContainer.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join("");
        }
        
        console.log("breakpoint2"); // Debugging

        // Books Section Update
        const booksContainer = document.getElementById("books-list");
        console.log("booksContainer:", booksContainer); // Debugging
        if (booksContainer) {
            booksContainer.innerHTML = ""; // Clear before adding new content
            
            if (Array.isArray(data.books) && data.books.length > 0) {
                data.books.forEach(book => {
                    let bookCard = document.createElement("div");
                    bookCard.className = "book-card";
                    bookCard.innerHTML = `
                        <h4>${book.title}</h4>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p>${book.description}</p>
                        <a href="${book.link}" target="_blank">Read More</a>
                    `;

                    // Add a click event to navigate to the book page
                    if (book.link) {
                        bookCard.style.cursor = "pointer";
                        bookCard.addEventListener("click", function () {
                            window.location.href = book.link;
                        });
                    }

                    booksContainer.appendChild(bookCard);
                });
            }
        } else {
            console.error("❌ Books section not found!");
        }

        //console.log("breakpoint2"); // Debugging

        // Projects Section Update
        const projectsContainer = document.getElementById("projects-list");
        //console.log("projectsContainer:", projectsContainer); // Debugging
        if (projectsContainer) {
            projectsContainer.innerHTML = ""; // Clear before adding new content
            
            // Function to create and append project sections properly
            function appendProjects(category, title) {
                if (data.projects[category].length > 0) {
                    let categoryWrapper = document.createElement("div");
                    categoryWrapper.className = "project-category";

                    let categoryTitle = document.createElement("h3");
                    categoryTitle.textContent = title;
                    categoryWrapper.appendChild(categoryTitle);
                    
                    let categoryContainer = document.createElement("div");
                    categoryContainer.className = "project-category-container";
                    
                    data.projects[category].forEach(project => {
                        let projectCard = document.createElement("div");
                        projectCard.className = "project-card";
                        projectCard.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;
                        
                        // Add a click event to navigate to a project page
                        if (project.link) {
                            projectCard.style.cursor = "pointer";
                            projectCard.addEventListener("click", function () {
                                window.location.href = project.link;
                            });
                        }
                        
                        categoryContainer.appendChild(projectCard);
                    });
                    
                    categoryWrapper.appendChild(categoryContainer);
                    projectsContainer.appendChild(categoryWrapper);
                }
            }
            
            // Append all project categories
            appendProjects("beginner", "Beginner Projects");
            appendProjects("intermediate", "Intermediate Projects");
            appendProjects("advanced", "Advanced Projects");
        } else {
            console.error("❌ Projects section not found!");
        }

        // // Projects Section
        // const projectsContainer = document.getElementById("projects");
        // if (projectsContainer) {
        //     projectsContainer.innerHTML = ""; // Clear before adding new content
        //     data.projects.forEach(project => {
        //         let projectCard = document.createElement("div");
        //         projectCard.className = "project-card";
        //         projectCard.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        //         projectsContainer.appendChild(projectCard);
        //     });
        // }
    })
    .catch(error => console.error("Error loading content:", error));

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission (basic example)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! I will get back to you soon.");
        contactForm.reset();
    });
}

// JavaScript Fix for Visibility
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => section.classList.add("visible")); // Ensure sections become visible
});