# 1904-text-searcher

To get this app running:
- First ensure you have node and a code editor installed
1) git clone
2) cd into website folder
3) npm install
4) npm run dev

This repository contains copies of the 1904 Patriarchal text. It uses texts found in https://github.com/bibleproofs/1904/.
It serves these purposes:
- 1) Allows the public to easily access the 1904 Patriarchal text
- 2) Search the 1904 Patriarchal text for specific words/phrases
- 3) Through various patterns that exist in the text show the Holy Scriptures are divinely inspired
     ^ WIP needs to be updated

To view the text in its entirety:
- cat transliterated.lowercase.txt

If searching for "egō eimi" via mac/linux terminal:
- grep "egō eimi" transliterated.lowercase.txt

To count the occurrences of the phrase "egō eimi" in transliterated.lowercase.txt, you can use the grep command with the -c option. This will count the number of matching lines:
- grep -c "egō eimi" transliterated.lowercase.txt

If you want to ensure that you're counting exact word matches and not partial matches (e.g., pantokratōros), use grep with the -w option:
- grep -cw "pantokratōr" transliterated.lowercase.txt

To highlight occurrences of the string in the output, use (assuming your terminal does not already highlight by default):
- grep --color=always "egō eimi" transliterated.lowercase.txt
