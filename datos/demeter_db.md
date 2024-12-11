## Demeter DB
https://bfdi.demeter.net/operators?f%5B0%5D=operators_country%3ACL

Operator (es como el productor o procesador o comerciante)
- Name
- Address
	- Street
	- Postal code
	- City
	- State
	- Country
	- Wine Growing Region??
- Contact
	- Email
	- Homepage
	- Phone
	- Fax?
- Operator Number
- Certification
	- Certifier (id del certificador)
	- Operator Type: producer | processor | trader (puede ser los tres) 
	- Certification status: Demeter | Conversion to Demeter | Other
	- Validity Date ? (Supongo que desde cuando es valida la certificacion?)
	- Certification Date
	- Export: Yes | No
	- Remark
	- Imported (Me imagino que la fecha que se importo el registro)

Products
- Name
- Operator (id del operador)
- Product Type: Product | Crop |  Livestock
- (si product type es product):
	- Processed Product
	- Brand Name
- (si product type es crop):
	- Crops: (tipo de cultivo) (categoria, subcategoria)
	- Agricultural Area: (en há)
- (si product type es livestock):
	- Livestock (tipo de ganado) (Categoria, subcategoria)
	- Number of livestock
- Certification Status: Demeter |  Conversion to Demeter | Ingredients Labelling (solo para Products) | Other
- Certification Date
- Imported: (Fecha que se importo el registro?)
- Publishing Status: true | false


Certifier (Certificador)
- https://bfdi.demeter.net/certifiers
- Name
- Address
	- Street
	- Postal Code
	- City
	- Country
- Contact
	- Phone
	- email
	- homepage
- Operator Prefix
