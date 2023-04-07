import { useCallback, useEffect, useState } from "react";

import { Img } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";

import ImgModal from "../components/ImgModal";
import TextModal from "../components/TextModal";
import Card from "../components/Card";

export type EditedImg = Img & { editedUrl?: string };
export type SelectedImg = EditedImg & { type: "EDIT" | "REQUEST_EDIT" };

export default function Images() {
  const imagesQuery = trpc.getAll.useQuery();
  const saveMutation = trpc.save.useMutation();
  const [data, setData] = useState<Array<EditedImg>>([]);
  const [selectedImg, setSelectedImg] = useState<SelectedImg | null>(null);

  useEffect(() => {
    setData(imagesQuery.data?.images ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesQuery.isSuccess]);

  const onSave = useCallback(
    (
      data: { id: number } & Partial<
        Pick<EditedImg, "editedUrl" | "description">
      >
    ) => {
      setData((prev) =>
        prev.map((i) => (i.id === data.id ? { ...i, ...data } : i))
      );
    },
    []
  );

  if (!imagesQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {selectedImg?.type === "EDIT" && (
        <ImgModal
          url={selectedImg.url}
          onClose={() => setSelectedImg(null)}
          onSave={(url) => onSave({ id: selectedImg.id, editedUrl: url })}
        />
      )}

      {selectedImg?.type === "REQUEST_EDIT" && (
        <TextModal
          text={selectedImg.description}
          onClose={() => setSelectedImg(null)}
          onSave={async (description) => {
            try {
              onSave({ id: selectedImg.id, description });
              await saveMutation.mutateAsync({
                id: selectedImg.id,
                description,
                url: selectedImg.url,
              });
            } catch (e) {
              console.error(e);
            }
          }}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((i) => (
          <Card img={i} setSelectedImg={setSelectedImg} key={i.id} />
        ))}
      </div>
    </div>
  );
}
