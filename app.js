// Global Variables
let map;
let markers = [];
let sites = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadSites();
    updateStats();
    renderSitesList();
    setupSearch();
    setupKeyboardShortcuts();
});

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + N = New Site
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            openAddSiteModal();
        }
        // Ctrl/Cmd + K = Focus Search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        // Escape = Close modals
        if (e.key === 'Escape') {
            closeAddSiteModal();
            closeAlertModal();
            closeSiteDetailsModal();
        }
    });
}

// Initialize Map
function initMap() {
    map = L.map('map').setView([30.0, 20.0], 2.5); // Global center view

    // Light theme tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

// Load Sites from LocalStorage
function loadSites() {
    try {
        const storedSites = localStorage.getItem('ian_sites');

        if (storedSites) {
            sites = JSON.parse(storedSites);
            // Validate data structure
            if (!Array.isArray(sites)) {
                throw new Error('Invalid data structure');
            }
        } else {
            initializeDefaultSites();
        }
    } catch (error) {
        console.error('Error loading sites:', error);
        initializeDefaultSites();
    }

    displayMarkers();
}

// Initialize Default Sites
function initializeDefaultSites() {
    // Initialize with diverse sample data
    sites = [
            {
                id: generateId(),
                name: 'Ancient City of Ephesus',
                lat: 37.9394,
                lng: 27.3410,
                type: 'excavation',
                country: 'Turkey',
                status: 'blue',
                description: 'UNESCO World Heritage Site. Ancient Roman city featuring the Library of Celsus and the Great Theatre. One of the best-preserved ancient cities in the Mediterranean.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Göbekli Tepe',
                lat: 37.2232,
                lng: 38.9225,
                type: 'excavation',
                country: 'Turkey',
                status: 'blue',
                description: 'UNESCO World Heritage Site. The world\'s oldest known temple complex, dating to 9600-8200 BCE. Revolutionary discovery in understanding Neolithic society.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Stonehenge',
                lat: 51.1789,
                lng: -1.8262,
                type: 'protection',
                country: 'United Kingdom',
                status: 'green',
                description: 'Prehistoric monument consisting of a ring of standing stones. Well-preserved and monitored site with comprehensive visitor management.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Angkor Wat',
                lat: 13.4125,
                lng: 103.8670,
                type: 'excavation',
                country: 'Cambodia',
                status: 'green',
                description: 'Largest religious monument in the world. Well-maintained UNESCO site with active preservation efforts and security measures.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Acropolis of Athens',
                lat: 37.9715,
                lng: 23.7257,
                type: 'protection',
                country: 'Greece',
                status: 'green',
                description: 'Ancient citadel containing the remains of several historically significant buildings. Under continuous monitoring and conservation.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Çatalhöyük',
                lat: 37.6681,
                lng: 32.8279,
                type: 'excavation',
                country: 'Turkey',
                status: 'green',
                description: 'Neolithic settlement dating to 7500 BCE. Active excavation site with international research teams and secure facilities.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Newgrange',
                lat: 53.6947,
                lng: -6.4754,
                type: 'protection',
                country: 'Ireland',
                status: 'green',
                description: 'Prehistoric monument older than Stonehenge and the Egyptian pyramids. Well-protected heritage site with modern conservation practices.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Mesa Verde',
                lat: 37.1853,
                lng: -108.4887,
                type: 'protection',
                country: 'United States',
                status: 'green',
                description: 'Ancestral Puebloan cliff dwellings. National Park with comprehensive protection and visitor education programs.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Chichen Itza',
                lat: 20.6843,
                lng: -88.5678,
                type: 'protection',
                country: 'Mexico',
                status: 'green',
                description: 'Large pre-Columbian city built by the Maya. Well-managed tourist site with effective security and conservation measures.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Terracotta Army Museum',
                lat: 34.3848,
                lng: 109.2790,
                type: 'museum',
                country: 'China',
                status: 'green',
                description: 'Museum complex housing the Terracotta Army. State-of-the-art facilities with climate control and advanced security systems.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            {
                id: generateId(),
                name: 'Aktopraklık Höyük',
                lat: 40.6500,
                lng: 35.8333,
                type: 'excavation',
                country: 'Turkey',
                status: 'green',
                description: 'Neolithic settlement mound in Amasya province. Active excavation site revealing important findings about early agricultural communities in Anatolia. Well-secured research area.',
                dateAdded: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            }
        ];
    saveSites();
}

// Save Sites to LocalStorage
function saveSites() {
    try {
        localStorage.setItem('ian_sites', JSON.stringify(sites));
    } catch (error) {
        console.error('Error saving sites:', error);
        showNotification('Failed to save data. Storage might be full.', 'warning');
    }
}

// Generate Unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Display Markers on Map
function displayMarkers() {
    // Clear existing markers efficiently
    markers.forEach(marker => {
        try {
            map.removeLayer(marker);
        } catch (error) {
            console.warn('Error removing marker:', error);
        }
    });
    markers = [];

    // Add new markers with validation
    sites.forEach(site => {
        if (!site || typeof site.lat !== 'number' || typeof site.lng !== 'number') {
            console.warn('Invalid site data:', site);
            return;
        }
        const color = getMarkerColor(site.status);

        const marker = L.circleMarker([site.lat, site.lng], {
            radius: 8,
            fillColor: color,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }).addTo(map);

        // Popup content
        const popupContent = `
            <div style="min-width: 250px;">
                <h3 style="margin-bottom: 0.75rem;">${site.name}</h3>
                <p><strong>Country:</strong> ${site.country}</p>
                <p><strong>Type:</strong> ${getTypeLabel(site.type)}</p>
                <p><strong>Status:</strong> ${getStatusLabel(site.status)}</p>
                <p style="margin-top: 0.75rem; color: #64748b;">${site.description || 'No description available'}</p>
                <button onclick="showSiteDetails('${site.id}')">
                    View Details
                </button>
            </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
            map.setView([site.lat, site.lng], 6);
        });

        markers.push(marker);
    });
}

// Get Marker Color by Status
function getMarkerColor(status) {
    const colors = {
        green: '#10b981',
        blue: '#0ea5e9',
        yellow: '#f59e0b',
        red: '#ef4444'
    };
    return colors[status] || colors.green;
}

// Get Type Label
function getTypeLabel(type) {
    const labels = {
        excavation: 'Excavation Site',
        museum: 'Museum',
        protection: 'Protected Area'
    };
    return labels[type] || type;
}

// Get Status Label
function getStatusLabel(status) {
    const labels = {
        green: 'Secure',
        blue: 'UNESCO Heritage',
        yellow: 'Caution',
        red: 'Critical'
    };
    return labels[status] || status;
}

// Update Statistics - Optimized to single loop
function updateStats() {
    const stats = { green: 0, blue: 0, yellow: 0, red: 0 };

    // Single loop instead of 4 separate filters
    sites.forEach(site => {
        if (stats.hasOwnProperty(site.status)) {
            stats[site.status]++;
        }
    });

    // Batch DOM updates
    const elements = {
        greenCount: stats.green,
        blueCount: stats.blue,
        yellowCount: stats.yellow,
        redCount: stats.red
    };

    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

// Render Sites List - Optimized
function renderSitesList(filteredSites = null) {
    const sitesListContainer = document.getElementById('sitesList');
    const totalSitesElement = document.getElementById('totalSites');
    const sitesToRender = filteredSites || sites;

    // Update total count
    if (totalSitesElement) {
        totalSitesElement.textContent = sitesToRender.length;
    }

    if (sitesToRender.length === 0) {
        sitesListContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No sites found</p>';
        return;
    }

    // Render sites efficiently
    sitesListContainer.innerHTML = sitesToRender.map(site => `
        <div class="site-card status-${site.status}" onclick="showSiteDetails('${site.id}')">
            <h4>${site.name}</h4>
            <div class="site-card-info">
                <span><i class="fas fa-map-marker-alt"></i> ${site.country}</span>
                <span><i class="fas fa-building"></i> ${getTypeLabel(site.type)}</span>
                <span><i class="fas fa-calendar"></i> ${new Date(site.lastUpdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <span class="site-status-badge status-badge-${site.status}">
                ${getStatusLabel(site.status)}
            </span>
        </div>
    `).join('');
}

// Sort Sites
function sortSites() {
    const sortBy = document.getElementById('sortBy').value;
    const filterValue = document.getElementById('filterStatus').value;

    let sitesToSort = filterValue === 'all' ? [...sites] : sites.filter(s => s.status === filterValue);

    switch (sortBy) {
        case 'name':
            sitesToSort.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'country':
            sitesToSort.sort((a, b) => a.country.localeCompare(b.country));
            break;
        case 'date':
            sitesToSort.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
            break;
        case 'status':
            const statusOrder = { red: 0, yellow: 1, blue: 2, green: 3 };
            sitesToSort.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
            break;
    }

    renderSitesList(sitesToSort);
}

// Filter Sites
function filterSites() {
    sortSites(); // Use sorting function which already handles filtering
}

// Debounce function for better performance
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

// Search Setup with debouncing
function setupSearch() {
    const searchInput = document.getElementById('searchInput');

    const performSearch = debounce((searchTerm) => {
        if (searchTerm === '') {
            renderSitesList();
            return;
        }

        const filtered = sites.filter(site =>
            site.name.toLowerCase().includes(searchTerm) ||
            site.country.toLowerCase().includes(searchTerm) ||
            (site.description && site.description.toLowerCase().includes(searchTerm))
        );

        renderSitesList(filtered);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        performSearch(searchTerm);
    });
}

// Reset Map View
function resetMap() {
    map.setView([30.0, 20.0], 2.5);
    document.getElementById('searchInput').value = '';
    document.getElementById('filterStatus').value = 'all';
    renderSitesList();
}

// Modal Functions - Add Site
function openAddSiteModal() {
    document.getElementById('addSiteModal').style.display = 'block';
}

function closeAddSiteModal() {
    document.getElementById('addSiteModal').style.display = 'none';
    document.getElementById('addSiteForm').reset();
}

function addSite(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newSite = {
        id: generateId(),
        name: formData.get('name'),
        lat: parseFloat(formData.get('lat')),
        lng: parseFloat(formData.get('lng')),
        type: formData.get('type'),
        country: formData.get('country'),
        status: formData.get('status'),
        description: formData.get('description') || '',
        dateAdded: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
    };

    sites.push(newSite);
    saveSites();
    displayMarkers();
    updateStats();
    renderSitesList();
    closeAddSiteModal();

    // Show success notification
    showNotification(`Site "${newSite.name}" has been successfully added!`, 'success');

    // Zoom to new site
    map.setView([newSite.lat, newSite.lng], 6);
}

// Modal Functions - Alert
function openAlertModal() {
    const modal = document.getElementById('alertModal');
    const select = document.getElementById('alertSiteSelect');

    // Populate site select
    select.innerHTML = '<option value="">Choose a site...</option>';
    sites.forEach(site => {
        select.innerHTML += `<option value="${site.id}">${site.name} - ${site.country}</option>`;
    });

    modal.style.display = 'block';
}

function closeAlertModal() {
    document.getElementById('alertModal').style.display = 'none';
    document.getElementById('alertForm').reset();
}

function createAlert(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const siteId = formData.get('siteId');
    const alertStatus = formData.get('alertStatus');
    const reason = formData.get('reason');

    // Find site and update status
    const siteIndex = sites.findIndex(s => s.id === siteId);
    if (siteIndex !== -1) {
        const oldStatus = sites[siteIndex].status;
        sites[siteIndex].status = alertStatus;
        sites[siteIndex].lastUpdate = new Date().toISOString();
        sites[siteIndex].alertReason = reason;
        sites[siteIndex].alertDate = new Date().toISOString();

        saveSites();
        displayMarkers();
        updateStats();
        renderSitesList();
        closeAlertModal();

        // Show alert notification
        const siteName = sites[siteIndex].name;
        showNotification(
            `Alert submitted for "${siteName}". Status changed from ${getStatusLabel(oldStatus)} to ${getStatusLabel(alertStatus)}. Relevant authorities have been notified.`,
            'warning'
        );
    }
}

// Show Site Details
function showSiteDetails(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (!site) return;

    const modal = document.getElementById('siteDetailsModal');
    const title = document.getElementById('detailsTitle');
    const content = document.getElementById('siteDetailsContent');

    title.textContent = site.name;

    content.innerHTML = `
        <div style="padding: 1.5rem;">
            <div style="margin-bottom: 1.5rem;">
                <span class="site-status-badge status-badge-${site.status}" style="font-size: 0.9375rem; padding: 0.5rem 1rem;">
                    <i class="fas ${getStatusIcon(site.status)}"></i>
                    ${getStatusLabel(site.status)}
                </span>
            </div>

            <div style="display: grid; gap: 1.25rem;">
                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Country</strong>
                    <p style="margin: 0.375rem 0; font-size: 1rem; color: #1e293b;">${site.country}</p>
                </div>

                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Site Type</strong>
                    <p style="margin: 0.375rem 0; font-size: 1rem; color: #1e293b;">${getTypeLabel(site.type)}</p>
                </div>

                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Coordinates</strong>
                    <p style="margin: 0.375rem 0; font-size: 1rem; color: #1e293b; font-family: monospace;">${site.lat.toFixed(4)}°N, ${site.lng.toFixed(4)}°E</p>
                </div>

                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Date Added</strong>
                    <p style="margin: 0.375rem 0; font-size: 1rem; color: #1e293b;">${new Date(site.dateAdded).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>

                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Last Update</strong>
                    <p style="margin: 0.375rem 0; font-size: 1rem; color: #1e293b;">${new Date(site.lastUpdate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>

                <div>
                    <strong style="color: #64748b; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Description</strong>
                    <p style="margin: 0.375rem 0; font-size: 0.9375rem; color: #475569; line-height: 1.6;">${site.description || 'No description available'}</p>
                </div>

                ${site.alertReason ? `
                    <div style="background: rgba(239, 68, 68, 0.08); padding: 1rem; border-radius: 8px; border-left: 3px solid #ef4444;">
                        <strong style="color: #ef4444; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">
                            <i class="fas fa-exclamation-triangle"></i> Alert Reason
                        </strong>
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9375rem; color: #1e293b;">${site.alertReason}</p>
                        ${site.alertDate ? `<p style="margin: 0.25rem 0 0 0; font-size: 0.8125rem; color: #64748b;">Reported: ${new Date(site.alertDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>` : ''}
                    </div>
                ` : ''}
            </div>

            <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button onclick="zoomToSite('${site.id}')" class="btn btn-primary" style="width: auto; margin: 0;">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>View on Map</span>
                </button>
                <button onclick="deleteSite('${site.id}')" class="btn" style="width: auto; margin: 0; background: #ef4444; color: white;">
                    <i class="fas fa-trash-alt"></i>
                    <span>Delete Site</span>
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function getStatusIcon(status) {
    const icons = {
        green: 'fa-check-circle',
        blue: 'fa-landmark',
        yellow: 'fa-exclamation-circle',
        red: 'fa-times-circle'
    };
    return icons[status] || icons.green;
}

function closeSiteDetailsModal() {
    document.getElementById('siteDetailsModal').style.display = 'none';
}

function zoomToSite(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (site) {
        map.setView([site.lat, site.lng], 8);
        closeSiteDetailsModal();

        // Open popup for this site
        const marker = markers.find(m => {
            const latlng = m.getLatLng();
            return Math.abs(latlng.lat - site.lat) < 0.0001 && Math.abs(latlng.lng - site.lng) < 0.0001;
        });
        if (marker) {
            marker.openPopup();
        }
    }
}

function deleteSite(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (!site) return;

    if (confirm(`Are you sure you want to delete "${site.name}"? This action cannot be undone.`)) {
        sites = sites.filter(s => s.id !== siteId);
        saveSites();
        displayMarkers();
        updateStats();
        renderSitesList();
        closeSiteDetailsModal();
        showNotification(`Site "${site.name}" has been deleted.`, 'info');
    }
}

// Notification System - Memory safe
let notificationStyle = null;

function showNotification(message, type = 'info') {
    // Add animation style only once
    if (!notificationStyle) {
        notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyle);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'ian-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 1rem 1.25rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#2563eb'};
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 0.875rem;
        color: #1e293b;
        line-height: 1.5;
    `;

    const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    const iconColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#2563eb';

    notification.innerHTML = `
        <div style="display: flex; align-items: start; gap: 0.75rem;">
            <i class="fas ${icon}" style="color: ${iconColor}; font-size: 1.25rem;"></i>
            <p style="margin: 0; flex: 1;">${message}</p>
            <button class="notification-close" style="border: none; background: none; cursor: pointer; color: #64748b; font-size: 1.25rem; padding: 0; line-height: 1;">
                &times;
            </button>
        </div>
    `;

    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    const timeoutId = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Store timeout ID for cleanup
    notification.dataset.timeoutId = timeoutId;
}

function removeNotification(notification) {
    if (!notification || !notification.parentElement) return;

    // Clear timeout if exists
    if (notification.dataset.timeoutId) {
        clearTimeout(parseInt(notification.dataset.timeoutId));
    }

    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Export Data - Memory safe
function exportData() {
    try {
        const dataStr = JSON.stringify(sites, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `IAN_Sites_Export_${new Date().toISOString().split('T')[0]}.json`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        // Clean up immediately
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);

        showNotification('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Export error:', error);
        showNotification('Failed to export data.', 'warning');
    }
}

// Import Data - Enhanced validation
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    // File size check (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File too large. Maximum size is 5MB.', 'warning');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onerror = function() {
        showNotification('Error reading file.', 'warning');
        event.target.value = '';
    };

    reader.onload = function(e) {
        try {
            const importedSites = JSON.parse(e.target.result);

            if (!Array.isArray(importedSites)) {
                throw new Error('Invalid data format - expected an array');
            }

            if (importedSites.length === 0) {
                throw new Error('No sites found in file');
            }

            // Validate each site thoroughly
            const validSites = importedSites.filter(site => {
                return site &&
                       typeof site.name === 'string' && site.name.trim() !== '' &&
                       typeof site.lat === 'number' && !isNaN(site.lat) &&
                       typeof site.lng === 'number' && !isNaN(site.lng) &&
                       typeof site.country === 'string' && site.country.trim() !== '' &&
                       ['green', 'blue', 'yellow', 'red'].includes(site.status);
            });

            if (validSites.length === 0) {
                throw new Error('No valid sites found in file');
            }

            // Merge with existing data (avoid duplicates)
            const existingNames = new Set(sites.map(s => s.name.toLowerCase()));
            const newSites = validSites.filter(s => !existingNames.has(s.name.toLowerCase()));

            if (newSites.length === 0) {
                showNotification('All sites already exist in the system.', 'info');
                event.target.value = '';
                return;
            }

            // Add timestamps if missing
            newSites.forEach(site => {
                if (!site.id) site.id = generateId();
                if (!site.dateAdded) site.dateAdded = new Date().toISOString();
                if (!site.lastUpdate) site.lastUpdate = new Date().toISOString();
            });

            sites = [...sites, ...newSites];
            saveSites();
            displayMarkers();
            updateStats();
            renderSitesList();

            const skipped = importedSites.length - validSites.length;
            let message = `Successfully imported ${newSites.length} new sites!`;
            if (skipped > 0) {
                message += ` (${skipped} invalid entries skipped)`;
            }

            showNotification(message, 'success');
        } catch (error) {
            console.error('Import error:', error);
            showNotification('Error importing data: ' + error.message, 'warning');
        } finally {
            event.target.value = ''; // Reset file input
        }
    };

    reader.readAsText(file);
}

// Reset to Default Sites
function resetToDefaultSites() {
    if (confirm('This will replace all current data with the default 11 archaeological sites. Continue?')) {
        // Clear localStorage
        localStorage.removeItem('ian_sites');

        // Reload page to reinitialize with default data
        location.reload();
    }
}

// Close modals when clicking outside - Optimized
(function setupModalCloseHandlers() {
    const modals = ['addSiteModal', 'alertModal', 'siteDetailsModal'];

    window.addEventListener('click', function(event) {
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
})();