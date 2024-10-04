import spacy

# Cargar el modelo
nlp = spacy.load("es_core_news_lg")

# Procesar un texto
texto = "Raul, 81738237, Elian, uauc"
doc = nlp(texto)

# Buscar y mostrar las entidades
for entidad in doc.ents:
    print(entidad.text, entidad.label_)  # Imprimir todas las entidades y sus etiquetas

# Filtrar solo las entidades de tipo fecha
fechas = [entidad.text for entidad in doc.ents if entidad.label_ == "PER"]
print("Nombres encontradas:", fechas)
