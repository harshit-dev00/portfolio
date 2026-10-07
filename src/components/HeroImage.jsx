//import React from "react";

//export default function HeroImage() {
 // return <div className="hidden md:block absolute top-10 right-12 bottom-0 w-[45%]" />;
//}
import React from "react";
import AgentBot3D from "./AgentBot3D.jsx";

export default function HeroImage() {
  return (
    <div className="hidden md:block absolute top-0 right-0 bottom-0 w-[45%]">
      <AgentBot3D />
    </div>
  );
}
