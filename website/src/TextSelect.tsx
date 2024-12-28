type TextSelectProps = {
    handleTextChange: (text: string) => void;
}
export const TextSelect = ({ handleTextChange }: TextSelectProps) => {
  return (
    <div className="p-4 border rounded-md shadow-md bg-gray-50 w-64">
      <label htmlFor="text-selector" className="block text-lg font-semibold mb-2">
        Select Text:
      </label>
      <select
        id="text-selector"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleTextChange(event.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="TransliteratedLowercase">Transliterated Lowercase</option>
        <option value="GreekLowercase">Greek Lowercase</option>
        <option value="Greek">Greek</option>
      </select>
    </div>
  );
};