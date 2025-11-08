#!/usr/bin/env node

import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const BASE_URL = 'https://bfdi.demeter.net';
const OPERATORS_URL = `${BASE_URL}/operators?f%5B0%5D=operators_country%3ACL`;
const OUTPUT_FILE = join(__dirname, '../datos/operadores_demeter_chile_2025.json');

/**
 * Fetch and parse HTML from a URL
 */
async function fetchHTML(url) {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const html = await response.text();
  return cheerio.load(html);
}

/**
 * Extract operator IDs from the main listing page
 */
async function getOperatorIds() {
  const $ = await fetchHTML(OPERATORS_URL);
  const operatorIds = [];

  // Find all operator links in the table
  $('table tbody tr').each((i, row) => {
    const $row = $(row);
    const cells = $row.find('td');

    if (cells.length > 0) {
      // First cell contains the operator ID
      const operatorId = $(cells[0]).text().trim();

      // Validate it's a DI-xxxxx format
      if (operatorId.match(/^DI-\d+$/i)) {
        operatorIds.push(operatorId);
      }
    }
  });

  // Also try to find from links as fallback
  if (operatorIds.length === 0) {
    $('a[href*="/operator/"]').each((i, elem) => {
      const href = $(elem).attr('href');
      const match = href.match(/\/operator\/(di-\d+)/i);
      if (match && !operatorIds.includes(match[1].toUpperCase())) {
        operatorIds.push(match[1].toUpperCase());
      }
    });
  }

  return operatorIds;
}

/**
 * Extract text content safely
 */
function getText($, selector) {
  const element = $(selector);
  return element.length ? element.text().trim() : null;
}

/**
 * Parse product information from the operator page
 */
function parseProducts($) {
  const products = [];

  // Look for products in table
  $('.products-table tbody tr, table tbody tr').each((i, row) => {
    const $row = $(row);
    const cells = $row.find('td');

    if (cells.length >= 1) {
      const productName = $(cells[0]).text().trim();

      // Skip empty rows or header-like rows
      if (!productName || productName.toLowerCase() === 'product') {
        return;
      }

      const product = {
        name: productName
      };

      // Check for certification status (usually in 2nd or 3rd column)
      if (cells.length >= 3) {
        const certText = $(cells[2]).text().trim();
        if (certText && certText !== 'Chile' && certText !== 'Country') {
          product.certification = certText;
        }
      }

      if (!product.certification) {
        product.certification = 'Demeter';
      }

      products.push(product);
    }
  });

  return products;
}

/**
 * Scrape detailed information for a single operator
 */
async function scrapeOperator(operatorId) {
  // Convert to lowercase for URL (but keep original for data)
  const url = `${BASE_URL}/operator/${operatorId.toLowerCase()}`;
  const $ = await fetchHTML(url);

  // Extract location information
  const addressSection = $('.address-section, section:contains("Address")');
  const addressDetails = addressSection.find('.address-details');
  const street = addressDetails.find('.street').text().trim();
  const cityRegion = addressDetails.find('.city').text().trim();

  // Parse city and region from combined text (e.g., "Panguipulli, Region de Los Rios")
  const cityRegionParts = cityRegion.split(',').map(s => s.trim());
  const city = cityRegionParts[0] || null;
  const region = cityRegionParts[1] || null;

  // Extract contact information
  const contactSection = $('.contact-section, section:contains("Contact")');
  const contactDetails = contactSection.find('.contact-details');
  const phone = contactDetails.find('.phone').text().trim() || null;
  const email = contactDetails.find('.email a').text().trim() ||
                contactDetails.find('.email').text().trim() || null;
  const website = contactDetails.find('.homepage a').attr('href') ||
                  contactDetails.find('.homepage').text().trim() || null;

  // Extract certification information
  const certSection = $('.certification-section, section:contains("Certification")');
  const certDetails = certSection.find('.certification-details');
  const certifier = certDetails.find('.certifier').text().trim() || null;
  const certStatus = certDetails.find('.certification-status').text().trim() || 'Demeter';
  const validityDate = certDetails.find('.validity-date').text().trim() || null;
  const operatorType = certDetails.find('.operator-type').text().trim() || null;

  // Look for export capability
  const exportText = $('body').text();
  const hasExport = /export.*yes/i.test(exportText);

  const operator = {
    operatorId,
    companyName: getText($, 'h1') || getText($, '.page-title') || getText($, 'title'),
    location: {
      address: street || null,
      city: city,
      region: region,
      country: 'Chile'
    },
    contact: {
      phone: phone,
      email: email,
      website: website
    },
    certification: {
      certifier: certifier,
      status: certStatus,
      validityDate: validityDate,
      operatorType: operatorType,
      exportCapability: hasExport
    },
    products: parseProducts($)
  };

  // Clean up null values from contact
  Object.keys(operator.contact).forEach(key => {
    if (!operator.contact[key]) {
      delete operator.contact[key];
    }
  });

  // Clean up null values from certification
  Object.keys(operator.certification).forEach(key => {
    if (operator.certification[key] === null || operator.certification[key] === undefined) {
      delete operator.certification[key];
    }
  });

  return operator;
}

/**
 * Main scraping function
 */
async function main() {
  try {
    console.log('Starting Demeter operators scraper for Chile...\n');

    // Get list of operator IDs
    console.log('Fetching operator list...');
    const operatorIds = await getOperatorIds();
    console.log(`Found ${operatorIds.length} operators\n`);

    if (operatorIds.length === 0) {
      console.error('No operators found. The page structure may have changed.');
      process.exit(1);
    }

    // Scrape each operator
    const operators = [];
    for (let i = 0; i < operatorIds.length; i++) {
      const id = operatorIds[i];
      console.log(`[${i + 1}/${operatorIds.length}] Scraping ${id}...`);

      try {
        const operator = await scrapeOperator(id);
        operators.push(operator);

        // Be nice to the server - wait a bit between requests
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error scraping ${id}:`, error.message);
        // Continue with next operator even if one fails
      }
    }

    // Save to file
    console.log(`\nSaving ${operators.length} operators to ${OUTPUT_FILE}...`);
    await writeFile(OUTPUT_FILE, JSON.stringify(operators, null, 2), 'utf-8');

    console.log('✓ Done!\n');
    console.log(`Total operators: ${operators.length}`);
    console.log(`Total products: ${operators.reduce((sum, op) => sum + op.products.length, 0)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the scraper
main();
