// Projects-specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectFilters();
    initializeProjectModals();
    initializeProjectSearch();
});

// Project filter functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const projectCards = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update project count
            updateProjectCount(filter, projectCards);
        });
    });
}

// Update project count display
function updateProjectCount(filter, projectCards) {
    let visibleCount = 0;
    
    projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        }
    });
    
    // Update count display if it exists
    const countDisplay = document.querySelector('.project-count');
    if (countDisplay) {
        countDisplay.textContent = `${visibleCount} project${visibleCount !== 1 ? 's' : ''} found`;
    }
}

// Initialize project modals
function initializeProjectModals() {
    const projectModals = document.querySelectorAll('[id^="projectModal"]');
    
    projectModals.forEach(modal => {
        const modalElement = new bootstrap.Modal(modal);
        
        // Add animation classes when modal is shown
        modal.addEventListener('show.bs.modal', function() {
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
        });
        
        modal.addEventListener('shown.bs.modal', function() {
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        });
        
        // Reset animation when modal is hidden
        modal.addEventListener('hidden.bs.modal', function() {
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.opacity = '';
            modalContent.style.transform = '';
            modalContent.style.transition = '';
        });
    });
}

// Initialize project search functionality
function initializeProjectSearch() {
    // Create search input if it doesn't exist
    const searchContainer = document.querySelector('.filter-buttons');
    if (searchContainer && !document.querySelector('.project-search')) {
        const searchInput = document.createElement('div');
        searchInput.className = 'project-search mt-3';
        searchInput.innerHTML = `
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-search"></i>
                </span>
                <input type="text" class="form-control" placeholder="Search projects..." id="projectSearch">
            </div>
        `;
        searchContainer.appendChild(searchInput);
        
        // Add search functionality
        const searchField = document.getElementById('projectSearch');
        if (searchField) {
            searchField.addEventListener('input', debounce(handleProjectSearch, 300));
        }
    }
}

// Handle project search
function handleProjectSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const projectCards = document.querySelectorAll('[data-category]');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const techStack = Array.from(card.querySelectorAll('.badge')).map(badge => badge.textContent.toLowerCase()).join(' ');
        
        const matches = title.includes(searchTerm) || 
                      description.includes(searchTerm) || 
                      techStack.includes(searchTerm);
        
        if (matches) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update project count
    updateProjectCount('search', projectCards);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Project card hover effects
function initializeProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize project card effects
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectCardEffects();
});

// Project statistics
function initializeProjectStats() {
    const stats = {
        totalProjects: document.querySelectorAll('[data-category]').length,
        webProjects: document.querySelectorAll('[data-category="web"]').length,
        desktopProjects: document.querySelectorAll('[data-category="desktop"]').length,
        consoleProjects: document.querySelectorAll('[data-category="console"]').length,
        schoolProjects: document.querySelectorAll('[data-category="school"]').length
    };
    
    // Display stats if stats container exists
    const statsContainer = document.querySelector('.project-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="row text-center">
                <div class="col-md-2">
                    <h4 class="fw-bold text-primary">${stats.totalProjects}</h4>
                    <p class="small text-muted">Total Projects</p>
                </div>
                <div class="col-md-2">
                    <h4 class="fw-bold text-primary">${stats.webProjects}</h4>
                    <p class="small text-muted">Web Apps</p>
                </div>
                <div class="col-md-2">
                    <h4 class="fw-bold text-primary">${stats.desktopProjects}</h4>
                    <p class="small text-muted">Desktop Apps</p>
                </div>
                <div class="col-md-2">
                    <h4 class="fw-bold text-primary">${stats.consoleProjects}</h4>
                    <p class="small text-muted">Console Apps</p>
                </div>
                <div class="col-md-2">
                    <h4 class="fw-bold text-primary">${stats.schoolProjects}</h4>
                    <p class="small text-muted">School Projects</p>
                </div>
            </div>
        `;
    }
}

// Initialize project stats
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectStats();
});

// Project modal content management
function loadProjectModalContent(modalId, projectData) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    if (modalTitle) modalTitle.textContent = projectData.title;
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="project-modal-image text-center mb-3">
                        <i class="${projectData.icon} display-1 text-primary"></i>
                        <p class="small text-muted mt-2">Project Preview</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>Description</h6>
                    <p>${projectData.description}</p>
                    
                    <h6 class="mt-3">Key Features</h6>
                    <ul class="small">
                        ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h6 class="mt-3">Technologies Used</h6>
                    <div class="tech-stack">
                        ${projectData.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

// Export functions for external use
window.ProjectManager = {
    initializeProjectFilters,
    initializeProjectModals,
    initializeProjectSearch,
    loadProjectModalContent,
    updateProjectCount
};
