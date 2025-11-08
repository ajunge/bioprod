# Demeter Operators Scraper

This script scrapes operator and product data from the BFDI Demeter database for Chilean operators.

## Usage

Run the scraper with:

```bash
npm run scrape:demeter
```

Or directly:

```bash
node scripts/scrape-demeter.js
```

## Output

The script will:
1. Fetch the list of Chilean operators from https://bfdi.demeter.net
2. Visit each operator's detail page
3. Extract operator information and products
4. Save everything to `datos/operadores_demeter_chile_2025.json`

## Data Structure

The output JSON contains an array of operators, each with:

```json
{
  "operatorId": "DI-12345",
  "companyName": "Company Name",
  "location": {
    "address": "Street address",
    "city": "City name",
    "region": "Region",
    "country": "Chile"
  },
  "contact": {
    "phone": "+56...",
    "email": "email@example.com",
    "website": "https://..."
  },
  "certification": {
    "certifier": "BFDI International Certification Office",
    "status": "Demeter",
    "validityDate": "YYYY-MM-DD",
    "operatorType": "producer, processor",
    "exportCapability": true/false
  },
  "products": [
    {
      "name": "Product name",
      "certification": "Demeter"
    }
  ]
}
```

## Current Limitations

The scraper currently extracts:
- ✅ Operator IDs and company names
- ✅ Product lists
- ✅ Basic certification status
- ⚠️ Limited location details (structure varies by page)
- ⚠️ Limited contact information (structure varies by page)

The website's HTML structure is not fully consistent across all operator pages, which makes extracting all details challenging. The script prioritizes reliability over completeness.

## Enhancements

To improve data extraction, you could:

1. **Inspect specific operator pages** to update CSS selectors
2. **Add API calls** if the website provides a JSON API
3. **Add retry logic** for failed requests
4. **Cache results** to avoid re-scraping unchanged data

## Configuration

Edit these variables at the top of `scrape-demeter.js` to customize:

- `OPERATORS_URL`: Change the country filter (currently set to Chile - `CL`)
- `OUTPUT_FILE`: Change the output file location
- Request delay (currently 500ms between requests)
