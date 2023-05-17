import { ChangeEvent, FC, useState } from "react";

interface ReportTextareaProps {
  reportText: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ReportTextarea: FC<ReportTextareaProps> = ({
  reportText,
  onChange,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <button
          className="p-2 text-gray-500 rounded sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
          onClick={copyToClipboard}
          type="button"
        >
          {copySuccess ? "Скопировано!" : "Копировать"}
        </button>
      </div>
      <div className="px-4 py-2 whitespace-pre bg-white rounded-b-lg dark:bg-gray-800">
        <textarea
          cols={100}
          rows={20}
          value={reportText}
          onChange={onChange}
          readOnly
          className="w-full px-0 resize-none outline-0 text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        />
      </div>
    </div>
  );
};
