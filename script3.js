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

        // Ensure data.projects exists and is an object
        if (!data.projects || typeof data.projects !== "object") {
            console.error("❌ Invalid projects data format!");
            return;
        }

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

        // Projects Section Update
        const projectsContainer = document.getElementById("projects-list");
        console.log("projectsContainer"); // Debugging
        console.log(projectsContainer); // Debugging
        if (projectsContainer) {
            projectsContainer.innerHTML = ""; // Clear before adding new content
            
            // Function to append project categories dynamically
            function appendProjects(categoryKey, title) {
                if (Array.isArray(data.projects[categoryKey]) && data.projects[categoryKey].length > 0) {
                    let categoryTitle = document.createElement("h3");
                    categoryTitle.textContent = title;
                    projectsContainer.appendChild(categoryTitle);

                    data.projects[categoryKey].forEach(project => {
                        let projectCard = document.createElement("div");
                        projectCard.className = "project-card";
                        projectCard.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;
                        projectsContainer.appendChild(projectCard);
                    });
                }
            }

            // Append all project categories
            appendProjects("beginner", "Beginner Projects");
            appendProjects("intermediate", "Intermediate Projects");
            appendProjects("advanced", "Advanced Projects");

        } else {
            console.error("❌ Projects section not found!");
        }
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