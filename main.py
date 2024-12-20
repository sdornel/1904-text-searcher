import json

def load_text_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def convert_to_nested_json(data):
    lines = data.strip().split("\n")
    nested_structure = {}

    for line in lines:
        parts = line.split("|")
        if len(parts) == 4:
            book, chapter, verse, text = parts
            chapter = int(chapter)
            verse = int(verse)

            if book not in nested_structure:
                nested_structure[book] = {
                    "book_name": book,
                    "chapters": {}
                }

            if chapter not in nested_structure[book]["chapters"]:
                nested_structure[book]["chapters"][chapter] = {
                    "number": chapter,
                    "verses": []
                }

            nested_structure[book]["chapters"][chapter]["verses"].append({
                "number": verse,
                "text": text.strip()
            })

    json_structure = []
    for book, book_data in nested_structure.items():
        chapters = list(book_data["chapters"].values())
        json_structure.append({
            "book": {
                "book_name": book_data["book_name"],
                "chapters": chapters
            }
        })

    return json_structure

def save_json_file(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def main():
    input_file = "transliterated.lowercase.txt"
    output_file = "output.json"    
    data = load_text_file(input_file)
    nested_json_data = convert_to_nested_json(data)

    save_json_file(nested_json_data, output_file)
    print(f"Conversion complete. JSON saved to {output_file}")

if __name__ == "__main__":
    main()