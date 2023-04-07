import { readFile, writeFile } from "node:fs/promises";
import { z } from "zod";

import { procedure, router } from "../trpc";

const urls = [
  "https://images.unsplash.com/photo-1680371371611-9168e2d7bfcd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ1NQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1675739506940-249ec174fe57?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ1OA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679097316266-e760624ee5e0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ2MA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678954585484-c0859ab3e1b9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ2Mw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679304617948-bb11d0a980db?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ2NQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678845536613-5cf0ec5245cd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ2OA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679996716439-b3fd9195c43b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ3MQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678069085073-7145a8f676e9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ3Mw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679991811892-2f5714f5c9a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ3Ng&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680457405591-5b20bbf782dd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ3OA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678024119498-3c08b014e82f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ4MQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678188535890-29a2def44b4f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ4NA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678818546219-d955db483f66?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ4Nw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678622993211-6b7630f3fc01?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ5MA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678680081129-17f2ac502d20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ5Mg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680459468606-acf517e9311a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ5NA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678198628337-e0f4abe54593?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ5Nw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679390248331-c258a5b30f89?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzQ5OQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678815927938-0fb01822962c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUwMg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678933632079-d29d876dbc0e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUwNQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679646485963-8a9b91ff1f42?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUwNw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678069615257-81dcc223f4e2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUwOQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678842048560-1d8bbc486e2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUxMg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678583536865-befbdf365d9b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUxNQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680028136470-5a957bc07a5f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUxNw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678951680486-5b8e5f81324c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUyMA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679180130672-bf7d40f826e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUyMg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679926596467-582e7270902c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUyNQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680607622395-9c950a984612?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUyOA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679931974860-1af5ac3cc051?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUzMA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1671301510934-7c9177902f7d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUzMg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680431370738-b5b0fa01424f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUzNQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678048632050-2e3a3ee69ab0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzUzNw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679771071225-a6fda8ce134b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU0MA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678222453727-00e17c2e582e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU0NA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678818546183-b1ca90255723?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU0Ng&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680618051492-9f2b51e1642c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU0OQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679198488857-d49a6c1d1907?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU3NA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679599767344-d28d47771cdd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU3OA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679240360999-92f46d4781b9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU4MA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678802909226-a0901e04cf28?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU4Mw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678272684266-3bccd933e38b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU4Ng&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680531331515-649be8dea9fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU4OA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678769705659-eeebc4b2bddb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU5MA&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678653300286-94e7cce4d826?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU5Mw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680296421617-572b65c23cc4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzU5NQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1677873326678-ed70efd05aac?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzYwMQ&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1678497178543-dde658d2e732?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzYwMw&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1679735812353-aea5edbfca7f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzYwNg&ixlib=rb-4.0.3&q=80&w=600",
  "https://images.unsplash.com/photo-1680120603076-c086ec523217?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MDc3MzYwOQ&ixlib=rb-4.0.3&q=80&w=600",
];

export type Img = {
  id: number;
  url: string;
  description: string;
};

const PATH = "/tmp/data.json";

const getImages = async (): Promise<Img[]> => {
  const data = await readFile(PATH, { encoding: "utf-8" });
  return JSON.parse(data);
};

export const appRouter = router({
  getAll: procedure.query(async () => {
    let images: Img[] = [];
    try {
      images = await getImages();
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") {
        images = urls.map<Img>((url, id) => ({
          id,
          url,
          description: "",
        }));
        await writeFile(PATH, JSON.stringify(images, null, 2));
      } else {
        throw e;
      }
    }

    return { images };
  }),
  save: procedure
    .input(
      z.object({
        id: z.number(),
        url: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const images = await getImages();
      const img = images.find((i) => i.id === input.id);
      img && (img.description = input.description);
      await writeFile(PATH, JSON.stringify(images, null, 2));
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
