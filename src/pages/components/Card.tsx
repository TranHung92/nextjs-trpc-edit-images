import { Dispatch, SetStateAction, memo } from "react";
import Button from "./Button";
import { EditedImg, SelectedImg } from "../images";
import Image from "next/image";

type Props = {
  img: EditedImg;
  setSelectedImg: Dispatch<SetStateAction<SelectedImg | null>>;
};

export default memo(function Card(props: Props) {
  if (!props.img) return <></>;
  return (
    <div className="relative group">
      {props.img.description && (
        <div className="hidden group-hover:block absolute top-0 w-full p-4 backdrop-brightness-50 rounded-lg">
          <p className="text-base text-gray-900 dark:text-white">
            {props.img.description}
          </p>
        </div>
      )}

      <Image
        className="h-auto max-w-full rounded-lg"
        src={props.img.editedUrl ?? props.img.url}
        loading="lazy"
        decoding="async"
        width={600}
        height={600}
        alt=""
      />
      <div className="hidden group-hover:grid grid-cols-2 absolute bottom-2 w-full">
        <Button
          variant="PRIMARY"
          onClick={() => props.setSelectedImg({ ...props.img, type: "EDIT" })}
        >
          Edit
        </Button>
        <Button
          variant="PRIMARY"
          onClick={() =>
            props.setSelectedImg({ ...props.img, type: "REQUEST_EDIT" })
          }
        >
          Request Edit
        </Button>
      </div>
    </div>
  );
});
