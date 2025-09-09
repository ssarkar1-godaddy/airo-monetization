const fs = require('fs');

// Read the file
const content = fs.readFileSync('pages/generate-logo.html', 'utf8');

// Find and replace the specific section
const oldText = `                    // Restore original content and footer
                    sidebarContent.style.display = 'block';
                    footer.style.display = 'flex';
                    
                    // Update to V2 logos (new versions from customize tab)
                    updateLogoSidebarWithNewVersion(2);`;

const newText = `                    // Restore original content, footer, and header with tabs
                    sidebarContent.style.display = 'block';
                    footer.style.display = 'flex';
                    if (sidebarHeader) {
                        sidebarHeader.style.display = 'block';
                    }
                    
                    // Update to V2 logos (new versions from customize tab)
                    updateLogoSidebarWithNewVersion(2);`;

// Make the replacement
const updatedContent = content.replace(oldText, newText);

// Write back to file
fs.writeFileSync('pages/generate-logo.html', updatedContent);

console.log('Header restoration fix applied successfully!');
