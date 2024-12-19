import json

def load_text_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def convert_to_json(data):
    lines = data.strip().split("\n")
    result = []

    for line in lines:
        parts = line.split("|")
        if len(parts) == 4:
            book, chapter, verse, text = parts
            result.append({
                "book": book,
                "chapter": int(chapter),
                "verse": int(verse),
                "text": text.strip()
            })

    return result

def save_json_file(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

'''
Assumes your txt files are at the same folder level as main.py. You will need to change input_file
and output_file variables to suit your requirements.
'''
def main():
    input_file = "transliterated.lowercase.txt"
    output_file = "transliterated.lowercase.json"

    data = load_text_file(input_file)
    json_data = convert_to_json(data)

    save_json_file(json_data, output_file)
    print(f"Conversion complete. JSON saved to {output_file}")

if __name__ == "__main__":
    main()
