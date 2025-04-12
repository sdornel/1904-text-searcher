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
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 space-y-6 relative"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-red-900">Understanding the Patterns of Forty</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl font-bold transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-gray-800 leading-relaxed">
          <p>
            The 1904 Patriarchal Text of the Greek Holy Scriptures contains recurring "patterns of forty"
            involving the numbers 40 and 41. These patterns support the divine inspiration of Scripture
            and align with Orthodox interpretation. Validating them requires computational tools like the
            Linux terminal's grep, or the user-friendly 1904 Scripture Search Tool, which uses English
            transliteration alongside Greek. Understanding a core set of examples helps reveal deeper
            patterns, many of which relate to key doctrines such as Christology and Soteriology, making
            some familiarity with Christian theology helpful.
          </p>

          <p>In general the patterns comprise the following elements / attributes:</p>
          <ol className="pl-6">
            <li>A. Search criteria: the search string</li>
            <li>B. Search scope: the range of books, authors, text passages etc which defines the search space</li>
            <li>C. Exclusion set: matches which we exclude for contextual reasons</li>
            <li>D. Value: the value of the pattern will be either 40 or 41</li>
          </ol>

          <p>
            Below are some of the examples of the patterns of forty found in the 1904 Patriarchal Text.
            The first three relate to the Orthodox understanding of Christ as
            The Logos who is Eternally Begotten (before all ages) of The Father and is 'Homoousios'
            (Same Essence) as The Father. Here we briefly list only the attributes for these four patterns.
            Patterns are given in the format:
          </p>

          <p><strong>Search string, {'search scope'}, value.</strong></p>

          <ul className="list-disc pl-6 space-y-1">
            1. <span className='text-red-700'>Ego Eimi (I AM)</span>, {'New Testament Holy Scriptures'}, 40 instances
            <br/>
            2. <span className='text-red-700'>Proskuneo (Worship)</span>, {'New Testament Holy Scriptures'}, 40 instances
            <br/>
            3. <span className='text-red-700'>Onoma (Name)</span> contains multiple instances of the pattern:
            <br/>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li>Onoma (The Name of God), {'Matthew, Mark, Luke'}, 40 instances</li>
              <li>Onoma (The Name of God), {'Corpus of the Evangelist John'}, 40 instances</li>
              <li>Onoma (The Name of God), {'Corpus of the Evangelist Luke'}, 41 instances</li>
              <li>Onoma (The Name of God) spoken by Christ, {'Matthew, Mark, Luke, John'}, 41 instances</li>
              <li>Onoma (The Name of God) witnessed of Holy Apostles Peter and Paul, 41 instances</li>
            </ul>

              4. <span className='text-red-700'>Amēn</span> contains multiple instances of the pattern:
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Amēn, {'Matthew, Luke'}, 40 instances</li>
                <li>Amēn, {'Mark, John'}, 41 instances</li>
                <li>
                  Amēn, (spoken by the Holy Apostles, Saints, and Angels), {'New Testament'}, 41 instances
                </li>
              </ul>

          </ul>
        </div>
      </div>
    </div>
  );
};
