declare module "vanta/dist/vanta.net.min" {
  type VantaNetOptions = {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundAlpha?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  };

  type VantaEffect = { destroy: () => void };
  type CreateNet = (options: VantaNetOptions) => VantaEffect;
  const createNet: CreateNet | { default: CreateNet };
  export default createNet;
}