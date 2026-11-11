import hero640 from "@/assets/photos/hero-640.webp";
import hero1280 from "@/assets/photos/hero-1280.webp";
import lighting640 from "@/assets/photos/lighting-640.webp";
import lighting1280 from "@/assets/photos/lighting-1280.webp";
import hall640 from "@/assets/photos/hall-640.webp";
import hall1280 from "@/assets/photos/hall-1280.webp";
import audience640 from "@/assets/photos/audience-640.webp";
import audience1280 from "@/assets/photos/audience-1280.webp";
import bouquet640 from "@/assets/photos/bouquet-640.webp";
import bouquet1280 from "@/assets/photos/bouquet-1280.webp";
import banquet640 from "@/assets/photos/banquet-640.webp";
import banquet1280 from "@/assets/photos/banquet-1280.webp";
import crowd640 from "@/assets/photos/crowd-640.webp";
import crowd1280 from "@/assets/photos/crowd-1280.webp";
import stage640 from "@/assets/photos/stage-640.webp";
import stage1280 from "@/assets/photos/stage-1280.webp";

export interface Photo {
  small: string;
  large: string;
  alt: string;
}

export const photos = {
  hero: { small: hero640, large: hero1280, alt: "Stage lights cutting through haze over a drummer at a live show" },
  lighting: { small: lighting640, large: lighting1280, alt: "A hand holding a phone up to record beams of stage light" },
  hall: { small: hall640, large: hall1280, alt: "Conference hall with round tables and projection screens" },
  audience: { small: audience640, large: audience1280, alt: "Audience watching a keynote in a darkened hall" },
  bouquet: { small: bouquet640, large: bouquet1280, alt: "Bride holding a bouquet in warm evening light" },
  banquet: { small: banquet640, large: banquet1280, alt: "Banquet hall with white table settings and flowers" },
  crowd: { small: crowd640, large: crowd1280, alt: "Crowd cheering at a live concert" },
  stage: { small: stage640, large: stage1280, alt: "Singer and guitarist on a smoky, blue-lit stage" },
} satisfies Record<string, Photo>;
