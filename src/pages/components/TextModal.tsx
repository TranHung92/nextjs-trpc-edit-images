import { useState } from "react";

import Modal from "./Modal";

type Props = {
  text: string;
  onClose: () => void;
  onSave: (text: string) => void;
};

export default function TextModal(props: Props) {
  const [text, setText] = useState(props.text ?? "");
  return (
    <Modal
      onClose={props.onClose}
      onSave={() => {
        props.onSave(text);
        props.onClose();
      }}
    >
      <div className="p-4 w-96">
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          autoFocus
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write something here..."
        />
      </div>
    </Modal>
  );
}
