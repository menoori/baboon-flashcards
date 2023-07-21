export class AnimationManager {
  private _errorColor = "#C83E4D";
  private _successColor = "#73A580";
  constructor() {}
  animateElement = (
    e: HTMLElement | HTMLInputElement | HTMLTextAreaElement | HTMLFormElement,
    animationType:
      | "shakeHor"
      | "shakeHorError"
      | "shakeHorErrorCentered"
      | "shakeVert"
      | "shakeVertSuccess"
      | "shakeRotSuccess"
      | "scaleDown"
      | "scaleUp"
  ) => {
    let elementAnimation: Keyframe[] | PropertyIndexedKeyframes | null;
    let elementTiming: { duration: number; iteration: number };

    switch (animationType) {
      case "shakeHor":
        elementAnimation = [
          { transform: "translate(0)" },
          { transform: "translate(0.5rem)" },
          { transform: "translate(-0.5rem)" },
          { transform: "translate(0)" },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "shakeHorError":
        elementAnimation = [
          { transform: "translate(0)", borderColor: this._errorColor },
          { transform: "translate(0.5rem)", borderColor: this._errorColor },
          {
            transform: "translate(-0.5rem)",
            borderColor: this._errorColor,
          },
          { transform: "translate(0)", borderColor: this._errorColor },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "shakeHorErrorCentered":
        elementAnimation = [
          {
            transform: "translate(-50%,-50%)",
            borderColor: this._errorColor,
          },
          {
            transform: "translate(-52%,-50%)",
            borderColor: this._errorColor,
          },
          {
            transform: "translate(-48%,-50%)",
            borderColor: this._errorColor,
          },
          {
            transform: "translate(-50%,-50%)",
            borderColor: this._errorColor,
          },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "shakeVert":
        elementAnimation = [
          { transform: "translateY(0)" },
          { transform: "translateY(0.5rem)" },
          { transform: "translateY(-0.5rem)" },
          { transform: "translateY(0)" },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "shakeVertSuccess":
        elementAnimation = [
          {
            transform: "translateY(0)",
            borderColor: this._successColor,
          },
          {
            transform: "translateY(0.5rem)",
            borderColor: this._successColor,
          },
          {
            transform: "translateY(-0.5rem)",
            borderColor: this._successColor,
          },
          {
            transform: "translateY(0)",
            borderColor: this._successColor,
          },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "shakeRotSuccess":
        elementAnimation = [
          {
            transform: "rotate(0deg)",
            borderColor: this._successColor,
          },
          {
            transform: "rotate(3deg)",
            borderColor: this._successColor,
          },
          {
            transform: "rotate(-3deg)",
            borderColor: this._successColor,
          },
          {
            transform: "rotate(0)",
            borderColor: this._successColor,
          },
        ];
        elementTiming = {
          duration: 200,
          iteration: 2,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "scaleDown":
        elementAnimation = [
          { transform: "scale(1)" },
          { transform: "scale(0.5)" },
          { transform: "scale(0.1)" },
          { transform: "scale(0.01)" },
        ];
        elementTiming = {
          duration: 300,
          iteration: 1,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      case "scaleUp":
        elementAnimation = [
          { transform: "scale(0.01)" },
          { transform: "scale(0.1)" },
          { transform: "scale(0.5)" },
          { transform: "scale(1)" },
        ];
        elementTiming = {
          duration: 300,
          iteration: 1,
        };
        e.animate(elementAnimation, elementTiming);
        break;
      default:
        break;
    }
  };
}
