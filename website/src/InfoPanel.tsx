import React, { useEffect, useRef } from 'react';
import './index.css';

type InfoPanelProps = {
  onClose: () => void;
};

export const InfoPanel = ({ onClose }: InfoPanelProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
        <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Understanding the Patterns of Forty</h2>
                <button
                onClick={onClose}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
                >
                ✕
                </button>
            </div>
            <h2>An introduction to the patterns of 40 in the Holy Scriptures.</h2>

            <p>
                The Greek Holy Scriptures and in particular the 1904 Patriarchal Text abounds in a property
                which we will refer to as "patterns of forty" and involve the numbers 40, and by extension 41.
                While the patterns cannot practically be searched by manual work they can easily be validated
                using simple computational tools. These patterns demonstrate both the divine inspiration of
                the Holy Scriptures and moreover attest to the Orthodox understanding and interpretation of
                scripture. The proper evaluation of these claims requires analysis of the text to validate
                these patterns and this requires the use of a suitable computational tool to perform the
                search. One such tool is the Linux terminal which provides excellent text search capability
                via the grep utility. Documentation on using the Linux terminal to search and validate the
                patterns will be provided in a separate document. The 1904 Scripture Search Tool provides a
                simple and direct way to search the text, requires no technical knowledge, and was developed
                specifically for this task. To facilitate the usage of the tool for users who do not know the
                Greek language, the 1904 Scripture Search Tool uses the English transliteration of the Greek
                Scriptures which is provided in parallel to the Greek letters. The patterns are best understood
                by thoroughly familiarizing oneself with a dozen or so of the core examples first which forms
                the general framework for how the patterns function and using this to understand the more subtle
                examples afterwards. These core examples demonstrate foundational claims of the Holy Scriptures
                concerning Christology and Soteriology and thus it greatly helps the reader to have a working
                knowledge of the fundamental doctrines of the Christian Faith to understand the significance of
                the patterns.
            </p>

            <p>In general the patterns comprise the following elements / attributes:</p>
            <ul>
                <li>A. Search criteria: the search string</li>
                <li>B. Search scope: the range of books, authors, text passages etc which defines the search space</li>
                <li>C. Exclusion set: matches which we exclude for contextual reasons</li>
                <li>D. Value: the value of the pattern will be either 40 or 41</li>
            </ul>

            <p>
                Four examples of the concept of the patterns of 40 help to illustrate the general concepts of
                the patterns and serve as introduction to the rest of the patterns.
            </p>
            <ol>
                <li>Ego Eimi (I AM)</li>
                <li>Worship 'Proskuneo' - in the context of the worship of God</li>
                <li>Name 'Onoma' - in the context of the name of God (multiple patterns)</li>
                <li>Amin (multiple patterns)</li>
            </ol>

            <p>
                The first three of these patterns especially relate to the Orthodox understanding of Christ as
                The Logos who is Eternally Begotten (before all ages) of The Father and is 'Homoousios'
                (Same Essence) as The Father. Here we briefly list only the attributes for these four patterns,
                a separate document will further explain the theological significance of these and other
                patterns. Patterns are given in the format:
            </p>

            <p><strong>Search string, {'search scope'}, value.</strong></p>

            <ul>
                <li>1. Ego Eimi (I AM), {'New Testament Holy Scriptures'}, 40 instances</li>
                <li>2. Proskuneo (Worship), {'New Testament Holy Scriptures'}, 40 instances</li>
                <li>
                3. Onoma (Name) contains multiple instances of the pattern:
                <ul>
                    <li>Onoma (The Name of God), {'Matthew, Mark, Luke'}, 40 instances</li>
                    <li>Onoma (The Name of God), {'Corpus of the Evangelist John'}, 40 instances</li>
                    <li>Onoma (The Name of God), {'Corpus of the Evangelist Luke'}, 41 instances</li>
                    <li>Onoma (The Name of God) spoken by Christ, {'Matthew, Mark, Luke, John'}, 41 instances</li>
                    <li>Onoma (The Name of God) witnessed of Holy Apostles Peter and Paul, 41 instances</li>
                </ul>
                </li>
                <li>
                4. Amin contains multiple instances of the pattern:
                <ul>
                    <li>Amin, {'Matthew, Luke'}, 40 instances</li>
                    <li>Amin, {'Mark, John'}, 41 instances</li>
                    <li>
                        Amin, (spoken by the Holy Apostles, Saints, and Angels), {'New Testament'}, 41 instances
                    </li>
                </ul>
                </li>
            </ul>
        </div>
    </div>
  );
};
