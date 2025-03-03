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

    console.log("Content Loaded:", contentData); // Debugging

    // About Section
    const aboutText = document.getElementById("about-text");
    if (aboutText) aboutText.textContent = contentData.about;

    // Experience Section
    const experienceText = document.getElementById("experience-text");
    if (experienceText) experienceText.textContent = contentData.experience;

    // Skills Section
    const skillsContainer = document.getElementById("skills-list");
    if (skillsContainer) {
        skillsContainer.innerHTML = contentData.skills.map(skill => `<li>${skill}</li>`).join("");
    }
    
    // Books Section Update
    const booksContainer = document.getElementById("books-list");
    if (booksContainer) {
        booksContainer.innerHTML = "";
        if (Array.isArray(contentData.books) && contentData.books.length > 0) {
            contentData.books.forEach(book => {
                let bookCard = document.createElement("div");
                bookCard.className = "book-card";
                bookCard.innerHTML = `
                    <h4>${book.title}</h4>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p>${book.description}</p>
                `;
                
                if (book.title === "Eloquent JavaScript") {
                    let buttonContainer = document.createElement("div");
                    buttonContainer.className = "book-buttons";
                    
                    let codeTerminalButton = document.createElement("button");
                    codeTerminalButton.textContent = "Go to Code Terminal";
                    codeTerminalButton.addEventListener("click", function () {
                        window.location.href = "eloquent-js-console.html";
                    });
                    
                    let bookPageButton = document.createElement("button");
                    bookPageButton.textContent = "Read Book";
                    bookPageButton.addEventListener("click", function () {
                        window.location.href = book.link;
                    });
                    
                    buttonContainer.appendChild(codeTerminalButton);
                    buttonContainer.appendChild(bookPageButton);
                    bookCard.appendChild(buttonContainer);
                } else {
                    let bookLink = document.createElement("a");
                    bookLink.href = book.link;
                    bookLink.target = "_blank";
                    bookLink.textContent = "Read More";
                    bookCard.appendChild(bookLink);
                }
                
                booksContainer.appendChild(bookCard);
            });
        }
    } else {
        console.error("❌ Books section not found!");
    }


    // Projects Section Update
    const projectsContainer = document.getElementById("projects-list");
    if (projectsContainer) {
        projectsContainer.innerHTML = "";
        function appendProjects(category, title) {
            if (contentData.projects[category].length > 0) {
                let categoryWrapper = document.createElement("div");
                categoryWrapper.className = "project-category";
                let categoryTitle = document.createElement("h3");
                categoryTitle.textContent = title;
                categoryWrapper.appendChild(categoryTitle);
                let categoryContainer = document.createElement("div");
                categoryContainer.className = "project-category-container";
                contentData.projects[category].forEach(project => {
                    let projectCard = document.createElement("div");
                    projectCard.className = "project-card";
                    projectCard.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;
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
        appendProjects("beginner", "Beginner Projects");
        appendProjects("intermediate", "Intermediate Projects");
        appendProjects("advanced", "Advanced Projects");
    } else {
        console.error("❌ Projects section not found!");
    }
});

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
    sections.forEach(section => section.classList.add("visible"));
});