import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

if (process.client){
  gsap.registerPlugin(Draggable);
}
