import { absoluteURLForAsset } from "./utils";

export function inflateMediaImage(node, componentProps, otherComponents) {
  componentProps.src = absoluteURLForAsset(componentProps.src);

  // Create a new entity and copy the position and quaternion of the node.
  const el = document.createElement("a-entity");
  el.object3D.position.copy(node.position);
  el.object3D.quaternion.copy(node.quaternion);
  el.object3D.scale.copy(node.scale);
  node.el.sceneEl.appendChild(el);
  node.removeFromParent();

  el.classList.add("mediaimage");
  el.classList.add(node.name); // to view it in the editor

  // Set networked component first, media-image is getting the networkId from networked component
  el.setAttribute("networked", {
    template: "#media-template",
    attachTemplateToLocal: false,
    networkId: otherComponents.networked.id,
    persistent: true,
    owner: "scene",
  });
  el.setAttribute("media-image", componentProps);

  return el;
}
