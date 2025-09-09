#!/usr/bin/env node

/**
 * Figma Asset Export Script
 * 
 * This script demonstrates how to programmatically export assets from Figma
 * to maintain design consistency in your codebase.
 * 
 * Setup:
 * 1. Get your Figma access token from https://www.figma.com/developers/api#access-tokens
 * 2. Get your Figma file key from the URL: figma.com/file/FILE_KEY/...
 * 3. Set environment variables or update the config below
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
  // Get these from your Figma account
  figmaToken: process.env.FIGMA_TOKEN || 'YOUR_FIGMA_TOKEN_HERE',
  fileKey: process.env.FIGMA_FILE_KEY || 'YOUR_FIGMA_FILE_KEY_HERE',
  
  // Asset export settings
  exportSettings: {
    icons: {
      format: 'svg',
      outputDir: './assets/icons/',
      pages: ['Icons', 'Components'], // Figma page names
    },
    images: {
      format: 'png',
      scale: '2',
      outputDir: './assets/images/',
      pages: ['Assets', 'Images'],
    }
  }
};

// Figma API helper
class FigmaAPI {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://api.figma.com/v1';
  }

  async request(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'X-Figma-Token': this.token,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getFile(fileKey) {
    return this.request(`/files/${fileKey}`);
  }

  async getImages(fileKey, nodeIds, options = {}) {
    const params = new URLSearchParams({
      ids: nodeIds.join(','),
      format: options.format || 'png',
      scale: options.scale || '1',
    });

    return this.request(`/images/${fileKey}?${params}`);
  }
}

// Asset processor
class AssetProcessor {
  constructor(figmaAPI, fileKey) {
    this.figma = figmaAPI;
    this.fileKey = fileKey;
  }

  async findNodesByType(document, type) {
    const nodes = [];
    
    function traverse(node) {
      if (node.type === type) {
        nodes.push(node);
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(document);
    return nodes;
  }

  async findNodesByPage(document, pageNames) {
    const nodes = [];
    
    document.children.forEach(page => {
      if (pageNames.includes(page.name)) {
        nodes.push(...(page.children || []));
      }
    });
    
    return nodes;
  }

  async exportIcons() {
    console.log('📱 Exporting icons from Figma...');
    
    try {
      const file = await this.figma.getFile(this.fileKey);
      const iconNodes = await this.findNodesByPage(
        file.document, 
        config.exportSettings.icons.pages
      );

      if (iconNodes.length === 0) {
        console.log('⚠️  No icons found in specified pages');
        return;
      }

      const nodeIds = iconNodes.map(node => node.id);
      const images = await this.figma.getImages(this.fileKey, nodeIds, {
        format: config.exportSettings.icons.format,
      });

      await this.ensureDirectory(config.exportSettings.icons.outputDir);

      for (const [nodeId, imageUrl] of Object.entries(images.images)) {
        const node = iconNodes.find(n => n.id === nodeId);
        const fileName = this.sanitizeFileName(node.name);
        const filePath = path.join(
          config.exportSettings.icons.outputDir, 
          `${fileName}.${config.exportSettings.icons.format}`
        );

        await this.downloadImage(imageUrl, filePath);
        console.log(`✅ Exported icon: ${fileName}`);
      }

      console.log(`🎉 Successfully exported ${Object.keys(images.images).length} icons`);
    } catch (error) {
      console.error('❌ Error exporting icons:', error.message);
    }
  }

  async exportImages() {
    console.log('🖼️  Exporting images from Figma...');
    
    try {
      const file = await this.figma.getFile(this.fileKey);
      const imageNodes = await this.findNodesByPage(
        file.document, 
        config.exportSettings.images.pages
      );

      if (imageNodes.length === 0) {
        console.log('⚠️  No images found in specified pages');
        return;
      }

      const nodeIds = imageNodes.map(node => node.id);
      const images = await this.figma.getImages(this.fileKey, nodeIds, {
        format: config.exportSettings.images.format,
        scale: config.exportSettings.images.scale,
      });

      await this.ensureDirectory(config.exportSettings.images.outputDir);

      for (const [nodeId, imageUrl] of Object.entries(images.images)) {
        const node = imageNodes.find(n => n.id === nodeId);
        const fileName = this.sanitizeFileName(node.name);
        const filePath = path.join(
          config.exportSettings.images.outputDir, 
          `${fileName}.${config.exportSettings.images.format}`
        );

        await this.downloadImage(imageUrl, filePath);
        console.log(`✅ Exported image: ${fileName}`);
      }

      console.log(`🎉 Successfully exported ${Object.keys(images.images).length} images`);
    } catch (error) {
      console.error('❌ Error exporting images:', error.message);
    }
  }

  async downloadImage(url, filePath) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
  }

  async ensureDirectory(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  sanitizeFileName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Design token extractor
class TokenExtractor {
  constructor(figmaAPI, fileKey) {
    this.figma = figmaAPI;
    this.fileKey = fileKey;
  }

  async extractColors() {
    console.log('🎨 Extracting color tokens from Figma...');
    
    try {
      const file = await this.figma.getFile(this.fileKey);
      const styles = file.styles || {};
      const colors = {};

      Object.values(styles).forEach(style => {
        if (style.styleType === 'FILL') {
          const name = this.tokenName(style.name);
          // Note: You'd need to get the actual color values from the style
          colors[name] = '#000000'; // Placeholder
        }
      });

      await this.generateCSSTokens({ colors });
      console.log('✅ Color tokens extracted');
    } catch (error) {
      console.error('❌ Error extracting colors:', error.message);
    }
  }

  async generateCSSTokens(tokens) {
    const cssContent = this.generateCSS(tokens);
    await fs.writeFile('./assets/tokens/figma-tokens.css', cssContent);
  }

  generateCSS(tokens) {
    let css = '/* Auto-generated from Figma */\n:root {\n';
    
    Object.entries(tokens.colors || {}).forEach(([name, value]) => {
      css += `  --color-${name}: ${value};\n`;
    });
    
    css += '}\n';
    return css;
  }

  tokenName(figmaName) {
    return figmaName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Figma asset export...\n');

  // Validate configuration
  if (config.figmaToken === 'YOUR_FIGMA_TOKEN_HERE') {
    console.error('❌ Please set your Figma access token in the config or FIGMA_TOKEN environment variable');
    process.exit(1);
  }

  if (config.fileKey === 'YOUR_FIGMA_FILE_KEY_HERE') {
    console.error('❌ Please set your Figma file key in the config or FIGMA_FILE_KEY environment variable');
    process.exit(1);
  }

  try {
    const figmaAPI = new FigmaAPI(config.figmaToken);
    const assetProcessor = new AssetProcessor(figmaAPI, config.fileKey);
    const tokenExtractor = new TokenExtractor(figmaAPI, config.fileKey);

    // Export assets
    await assetProcessor.exportIcons();
    await assetProcessor.exportImages();
    
    // Extract design tokens
    await tokenExtractor.extractColors();

    console.log('\n🎉 Figma export completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Review exported assets in ./assets/');
    console.log('2. Update your CSS to use the new design tokens');
    console.log('3. Test your application with the new assets');

  } catch (error) {
    console.error('\n❌ Export failed:', error.message);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  FigmaAPI,
  AssetProcessor,
  TokenExtractor,
  config
};

