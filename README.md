# 1904-text-searcher

To get this app running:
- First ensure you have node and a code editor installed
1) git clone
2) cd into website folder
3) npm install
4) npm run dev

If typescript is too strict you can modify the tsconfig.app.json to be less strict.

This repository contains copies of the 1904 Patriarchal text. It uses texts found in https://github.com/bibleproofs/1904/.
It serves these purposes:
1) Allows the public to easily access the 1904 Patriarchal text
2) Search the 1904 Patriarchal text for specific words/phrases
3) Through various patterns that exist in the text show the Holy Scriptures are divinely inspired
     ^ WIP needs to be updated

To view the text in its entirety:
- cat transliterated_lowercase.txt

If searching for "egō eimi" via mac/linux terminal:
- grep "egō eimi" transliterated_lowercase.txt

To count the occurrences of the phrase "egō eimi" in transliterated_lowercase.txt, you can use the grep command with the -c option. This will count the number of matching lines:
- grep -c "egō eimi" transliterated_lowercase.txt

If you want to ensure that you're counting exact word matches and not partial matches (e.g., pantokratōros), use grep with the -w option:

- - -

The 1904 Patriarchal Text and the Patterns of Forty in the Holy Scriptures

The Scripture Text Search tool was developed to bring attention to patterns within the Orthodox Patriarchal Greek Text of the New Testament which demonstrate the divine inspiration of the Holy Scriptures. These patterns relate to the number 40, 41. The number 40, and by extension 41, correspond to the Incarnation of The Lord. The number 40 occurs many times throughout the Holy Scriptures, mostly occuring in the context of time - 40 days or 40 years. Saint Augustine notes there are 40 Generations in the Geneology in Matthew not counting The Lord and 41 Generations when including The Lord. The Nativity Fast is 40 days long, and the 41st day is the Feast of the Nativity. If we map the the 276 days on the Liturgical Calendar denoting the space of time from Evangelismos (Annunciation) March 25 to The Nativity of The Lord December 25 onto the calendar, this period will consist of 40 calendar week cycles when Evangelismos occurs Sunday thru Thursday, and 41 calendar week cycles when Evangelismos occurs on Friday or Saturday. These yield 40 generations, 40 days, 40 weeks and from these examples, and others, we can see how the significance of the numbers 40 and 41 relates to the Mystery of The Incarnation of The Lord.

The Holy Scriptures can be shown to embed these numbers as simple patterns within the Greek text which can easily be checked using computational search tools. For brevity we will refer to the patterns of {40, 41} in the Holy Scriptures as the Patterns of Forty. Most of these patterns are unique to the Greek Text of the Holy Scriptures and in particular the 1904 Patriarchal Text of the Holy Orthodox Church. The 1904 Patriarchal Text represents the traditional Orthodox Ekklesiastical Textual tradition of the New Testament Greek Holy Scriptures. While it bears many similarities to other texts within the "byzantine text type" family it also differs from other texts within this category in subtle but important ways. The significance of these differences will become much more apparent with familiarity with the patterns of 40.

A brief background of the history of the 1904 Patriarchal Text.
The question of standardizing the text of the Holy Scriptures entered relatively late into the Orthodox Church. Prior to the invention of the printing press in the mid 1400s the Holy Scriptures were copied manually by hand. This process could obviously introduce variants and even scribal errors over time. When the invention of the printing press allowed for the mass production of identical copies, it became important to address the question of variant readings and this naturally led to various attempts at standardizing the text over the remaining centuries. The heterodox world would develop its own methodologies and systems for evaluating variants and deciding which variant to use. In the heterodox world this is the academic field of textual criticism, a field which has undergone many changes over the last few hundred years, increasingly moving away from the traditional text type towards non standard variants and over the centuries moving towards increasingly contradictory ideas and criteria by which it would judge the question concerning "authenticity".

By contrast in Orthodoxy the question of dealing with variants in the Scriptural manuscript traditions was settled not by appealing to the academic theories of textual criticism pioneered by the west, but by the Orthodox criteria of Holy Tradition. This standardization took place only relatively recently in 1899, when the Patriarch of Constantinople organized an effort to examine the manuscript tradition of the Orthodox Greek Texts of the Holy Scriptures which were in Liturgical use on the Holy Mountain (Mount Athos) and Constantinople. This effort resulted in what is known as the 1904 Patriarchal Text published in 1904, with minor corrections in 1907 and 1912.
- grep -cw "pantokratōr" transliterated_lowercase.txt

To highlight occurrences of the string in the output, use (assuming your terminal does not already highlight by default):
- grep --color=always "egō eimi" transliterated_lowercase.txt
