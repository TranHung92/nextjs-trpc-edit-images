import { useEffect, useRef } from "react";

import Modal from "./Modal";

type Props = {
  url: string;
  onClose: () => void;
  onSave: (url: string) => void;
};

export default function ImgModal(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    var canvas = canvasRef.current;
    var context = canvas?.getContext("2d");
    var imageObj = new Image();
    imageObj.crossOrigin = "anonymous";
    imageObj.onload = () => {
      if (!context || !canvas) return;
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;
      context.drawImage(imageObj, 0, 0);
    };
    imageObj.src = props.url;
  }, [props.url]);

  return (
    <Modal
      onClose={props.onClose}
      onSave={() => {
        canvasRef.current && props.onSave(canvasRef.current.toDataURL());
        props.onClose();
      }}
    >
      <canvas
        className="cursor-pointer"
        ref={canvasRef}
        onClick={(e) => {
          const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          var canvas = canvasRef.current;
          var context = canvas?.getContext("2d");
          if (!context) return;
          context.beginPath();
          context.fillStyle = "#000000";
          context.arc(x, y, 10, 0, 2 * Math.PI);
          context.fill();
        }}
      />
    </Modal>
  );
}
