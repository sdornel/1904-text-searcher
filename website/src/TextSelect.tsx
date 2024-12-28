type TextSelectProps = {
    handleTextChange: (text: string) => void;
}
export const TextSelect = ({ handleTextChange }: TextSelectProps) => {
    return (
        <div className="p-4 border rounded-md shadow-md bg-gray-50 w-full max-w-xl flex items-center gap-4">
          <label htmlFor="text-selector" className="text-lg font-semibold whitespace-nowrap">
            Select Text Version:
          </label>
          <select
            id="text-selector"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleTextChange(event.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TransliteratedLowercase">Transliterated Lowercase</option>
            <option value="GreekAndLowercaseTransliteration">Greek and Lowercase Transliteration</option>
            <option value="Greek">Greek</option>
          </select>
        </div>
    );
};